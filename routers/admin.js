const { Controller } = require("../controllers/controller")
const express = require('express')
const router = express.Router()

router.use(function (req, res, next) {
    console.log(req.session)
    if (req.session.role !== "admin") {
        res.redirect(`/user`)
    } else {
        next()
    }
})

router.get('/', Controller.showCategory)

router.get('/course', Controller.showCourse)
router.get('/category/:categoryId', Controller.showCategoryById)

router.get('/add-course', Controller.formAddCourse)
router.post('/add-course', Controller.postAddCourse)

router.get('/add-category', Controller.renderAddCategory)
router.post('/add-category', Controller.postAddCategory)

router.get('/:id/edit', Controller.formEditCourse)
router.post('/:id/edit', Controller.postEditCourse)

router.get('/:id/delete', Controller.deleteCourse)

module.exports = router