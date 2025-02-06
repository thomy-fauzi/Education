const { Controller } = require("../controllers/controller")
const express = require('express')
const router = express.Router()

router.use(function (req, res, next) {
    console.log(req.session)
    if (req.session.role !== "user") {
        res.redirect(`/admin`)
    } else {
        next()
    }
})

router.get('/', Controller.home)
router.get('/course', Controller.allCourse)
router.get('/profile', Controller.profile)
router.get('/category/:categoryId', Controller.courseList)

router.get('/profile/edit/:profileId', Controller.editProfileForm)
router.post('/profile/edit/:profileId', Controller.editProfile)

router.get('/profile/:courseId/delete', Controller.deleteCourseUser)
router.get('/:courseId/buy', Controller.buy)

module.exports = router