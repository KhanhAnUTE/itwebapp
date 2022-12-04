const express = require('express')
const router = express.Router()

const cartController = require('../app/controllers/CartController')

router.get('/delete', cartController.delete)
router.get('/pacth', cartController.modify)
router.get('/', cartController.show)

module.exports = router