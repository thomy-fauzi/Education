const { where } = require("sequelize")
const { Category, Course, Profile, User, UserCourse } = require("../models")
const formatTanggal = require("../helpers/formatDate")

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
            res.render("adminCourse", { courses, formatDate })
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async showCategory(req, res) {
        try{
            const category = await Category.findAll()
            res.render("category", { category })
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
                    id: categoryId
                }
            })
            console.log(course.createdAt)
            // const date = formatTanggal(course.createdAt)

            res.render("course-by-categoryId", { course, formatTanggal })
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async formAddCourse(req, res) {
        try{

        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async postAddCourse(req, res) {
        try{

        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async renderAddCategory(req, res) {
        try{
            res.render("form-add-category")
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

        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async postEditCourse(req, res) {
        try{

        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async deleteCourse(req, res) {
        try{

        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    // for user

    static async home(req, res) {
        try{
            res.render("home")
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async allCourse(req, res) {
        try{

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