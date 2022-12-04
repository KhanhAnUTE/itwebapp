const express = require('express')
const router = express.Router()

const newsController = require('../app/controllers/NewController')

router.use('/:slug', newsController.detail)
router.use('/', newsController.getBrand)


module.exports = router