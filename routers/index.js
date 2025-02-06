const { Controller } = require("../controllers/controller")
const express = require('express')
const router = express.Router()
const admin = require("./admin")
const user = require("./user")

router.get("/", Controller.loginForm)
router.post("/", Controller.login)

router.get("/register", Controller.registerForm)
router.post("/register", Controller.register)

router.use(function (req, res, next) {
    console.log(req.session)
    if (!req.session.userId) {
        const error = "Please login"
        res.redirect(`/?error=${error}`)
    } else {
        next()
    }
})

router.use("/admin", admin)
router.use("/user", user)

module.exports = router