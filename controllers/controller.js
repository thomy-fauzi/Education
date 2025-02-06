const { where } = require("sequelize")
const { Op } = require("sequelize")
const { Category, Course, Profile, User, UserCourse } = require("../models")
const formatTanggal = require("../helpers/formatDate")
const getUserCourse = require("../helpers/getUserCourse")
const bcrypt = require("bcryptjs")
const { format } = require("sequelize/lib/utils")
const getUserId = require("../helpers/getUserCourse")

class Controller {

    // for admin
    static async loginForm(req, res) {
        try {
            res.render("login/login")
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body

            const user = await User.findOne({
                where: {
                    username
                }
            })

            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user.password)

                if (isValidPassword) {

                    req.session.userId = user.id

                    if (user.role === "admin") {
                        req.session.role = "admin"
                        // console.log("redirect ke /admin")
                        return res.redirect("/admin")
                    } else if(user.role === "user") {
                        req.session.role = "user"
                        // console.log("redirect ke /user")
                        return res.redirect("/user")
                    }
                } else {
                    return res.redirect("/")
                }
            }
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async registerForm(req, res) {
        try {
            res.render("login/register")
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async register(req, res) {
        try{
            const { username, password, role, fullName, imgURL, age } = req.body

            const data = await User.create({
                username,
                password,
                role
            })
            if (data){
                await Profile.create({
                    fullName,
                    imgURL,
                    age,
                    UserId: data.id
                })
            }

            res.redirect("/")
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async showCourse(req, res) {
        try {
            const courses = await Course.findAll({
                include: [Category]
            })
            res.render("admin/adminCourse", { courses, formatTanggal })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async showCategory(req, res) {
        try {
            const category = await Category.findAll()
            res.render("admin/category", { category })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async showCategoryById(req, res) {
        try {
            const { categoryId } = req.params

            const course = await Course.findOne({
                where: {
                    CategoryId: categoryId
                }
            })
            // console.log(course)
            // const date = formatTanggal(course.createdAt)

            res.render("admin/course-by-categoryId", { course, formatTanggal })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async formAddCourse(req, res) {
        try {
            let err = req.query.errors
            const categories = await Category.findAll()
            res.render("admin/addCourse", { categories, err })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async postAddCourse(req, res) {
        try {
            const { name, CategoryId, duration, description } = req.body

            const newCourse = await Course.create({ name, CategoryId, duration, description })
            await newCourse.capitalizeName()
            res.redirect("/admin")
        } catch (err) {
            if (err.name === "SequelizeValidationError") {
                const error = err.errors.map(function (el) {
                    return el.message
                })
                res.redirect(`/admin/add-course?errors=${error}`)
            } else {
                console.log(err);
                res.send(err)
            }
        }
    }

    static async renderAddCategory(req, res) {
        try {
            res.render("admin/form-add-category")
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async postAddCategory(req, res) {
        try {
            const { name } = req.body
            await Category.create({
                name
            })

            res.redirect("/admin")
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async formEditCourse(req, res) {
        try {
            const { id } = req.params
            const course = await Course.findByPk(id)
            const categories = await Category.findAll()
            res.render("admin/editCourse", { course, categories })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async postEditCourse(req, res) {
        try {
            const { id } = req.params
            const { name, CategoryId, duration, description } = req.body
            // console.log(req.body)
            Course.update({ name, CategoryId, duration, description }, {
                where: { id }
            })
            res.redirect("/admin")
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async deleteCourse(req, res) {
        try {
            const { id } = req.params
            Course.destroy({
                where: { id }
            })
            res.redirect("/admin")
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    // for user

    static async home(req, res) {
        try {
            const category = await Category.findAll()
            res.render("./users/home", { category })
            // res.render("home")
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async allCourse(req, res) {
        try {
            const { name } = req.query

            const options = {
                where: {}
            };

            if (name) {
                options.where.name = {
                    [Op.iLike]: `%${name}%`
                };
            }
            const data = await Course.findAll(options)
            res.render("./users/showCourses", { data, formatTanggal })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async profile(req, res) {
        try {
            const id = req.session.userId
            const data = await Profile.findOne({
                where: { UserId: id },
                include: [
                    User,
                    {
                        model: User,
                        include: [
                            {
                                model: UserCourse,
                                include: [Course]
                            }
                        ]
                    }
                ]
            })

            const userCourses = data.User.UserCourses || []

            res.render("users/profile", {
                data,
                userCourses,
                formatTanggal
            })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async courseList(req, res) {
        try {
            const { categoryId } = req.params
            const data = await Category.findOne({
                where: { id: categoryId },
                include: [
                    {
                        model: Course,
                        include: {
                            model: UserCourse
                        }
                    }
                ]

            })
            let userCourse = getUserId(data.Courses)
            res.render("./users/courseList", { data, formatTanggal, userCourse, id: req.session.userId })
        } catch(err) {
            // console.log(err)
            res.send(err)
        }
    }

    static async editProfileForm(req, res) {
        try {
            const id = req.session.userId
            const data = await Profile.findOne({
                where: { UserId: id }
            })

            res.render("users/edit-profile", { data })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async editProfile(req, res) {
        try {
            const id = req.session.userId
            const { fullName, age, imgURL } = req.body
    
            await Profile.update(
                {
                    fullName,
                    age,
                    imgURL
                },
                {
                    where: { UserId: id }
                }
            )
    
            res.redirect('/user/profile')
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async deleteCourseUser(req, res) {
        try {
            const { courseId } = req.params
            const userId = req.session.userId

            await UserCourse.destroy({
                where: {
                    UserId: userId,
                    CourseId: courseId
                }
            })

            res.redirect('/user/profile')
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async buy(req, res) {
        const  courseId  = +req.params.courseId;
        const { userId } = req.session;
    
        try {
            // Cari course berdasarkan ID
            const result = await Course.findOne({
                where: { id: courseId },
                include: {
                    model: UserCourse,
                },
            });
    
            // Jika tidak ditemukan course
            if (!result) {
                return res.status(404).send('Course not found');
            }
    
            // Buat relasi antara user dan course
            const data = await UserCourse.create({
                UserId: userId,
                CourseId: courseId,
            });
            // console.log(data, userId, courseId)
    
    
            // Redirect ke halaman kategori
            res.redirect(`/user/category/${result.CategoryId}`);
        } catch (err) {
            // Menangani error
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = {
    Controller
}