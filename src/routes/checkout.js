const express = require('express')
const router = express.Router()

const checkoutController = require('../app/controllers/CheckoutController')

router.get('/set-default', checkoutController.setDefault)
router.get('/', checkoutController.checkout)
// router.get('/', checkoutController.show)

module.exports = router