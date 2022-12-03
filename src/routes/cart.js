const express = require('express')
const router = express.Router()

const cartController = require('../app/controllers/CartController')

router.use('/', cartController.show)

module.exports = router