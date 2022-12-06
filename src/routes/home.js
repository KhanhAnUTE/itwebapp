const express = require('express')
const router = express.Router()

const HomeController = require('../app/controllers/HomeCotroller')

router.get('/', HomeController.index)

module.exports = router