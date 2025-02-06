const { where } = require("sequelize")
const {Op} = require("sequelize")
const { Category, Course, Profile, User, UserCourse } = require("../models")
const formatTanggal = require("../helpers/formatDate")
const { format } = require("sequelize/lib/utils")

class Controller {

    // for admin
    static async loginForm(req, res) {
        try{
            res.render("login")
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async login(req, res) {
        try{

        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async registerForm(req, res) {
        try{

        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async register(req, res) {
        try{

        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async showCourse(req, res) {
        try{
            const courses = await Course.findAll({
                include: [Category]
            })
            res.render("admin/adminCourse", { courses, formatTanggal })
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async showCategory(req, res) {
        try{
            const category = await Category.findAll()
            res.render("admin/category", { category })
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async showCategoryById(req, res) {
        try{
            const { categoryId } = req.params

            const course = await Course.findOne({
                where: {
                    CategoryId: categoryId
                }
            })
            console.log(course)
            // const date = formatTanggal(course.createdAt)

            res.render("admin/course-by-categoryId", { course, formatTanggal })
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async formAddCourse(req, res) {
        try{
            const categories = await Category.findAll()
            res.render("admin/addCourse", { categories })
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async postAddCourse(req, res) {
        try{
            const {name, CategoryId, duration, description } = req.body

            const newCourse = await Course.create({ name, CategoryId, duration, description })
            await newCourse.capitalizeName()
            res.redirect("/admin")
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async renderAddCategory(req, res) {
        try{
            res.render("admin/form-add-category")
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async postAddCategory(req, res) {
        try{
            const { name } = req.body
            await Category.create({
                name
            })

            res.redirect("/admin/category")
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async formEditCourse(req, res) {
        try{
            const { id } = req.params
            const course = await Course.findByPk(id)
            const categories = await Category.findAll()
            res.render("admin/editCourse", { course, categories})
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async postEditCourse(req, res) {
        try{
            const { id } = req.params
            const { name, CategoryId, duration, description } = req.body
            console.log(req.body)
            Course.update({ name, CategoryId, duration, description }, {
                where: { id }
            })
        res.redirect("/admin")
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async deleteCourse(req, res) {
        try{
            const { id } = req.params
            Course.destroy({
                where: { id }
            })
        res.redirect("/admin")
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    // for user

    static async home(req, res) {
        try{
            const category = await Category.findAll()
            res.render("./users/home", { category })
            // res.render("home")
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async allCourse(req, res) {
        try{
            const {name, age} = req.query

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
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async profile(req, res) {
        try{

        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async courseList(req, res) {
        try{
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
            // res.send(data)
            res.render("./users/courseList", { data, formatTanggal })
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async editProfileForm(req, res) {
        try{

        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async editProfile(req, res) {
        try{

        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async deleteCourseUser(req, res) {
        try{

        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async buy(req, res) {
        try{

        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }
}

module.exports = {
    Controller
}