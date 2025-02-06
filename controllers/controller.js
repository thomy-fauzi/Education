const { Category, Course, Profile, User, UserCourse } = require("../models")

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

        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async showCategory(req, res) {
        try{

        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async showCategoryById(req, res) {
        try{

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

        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }

    static async postAddCategory(req, res) {
        try{

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