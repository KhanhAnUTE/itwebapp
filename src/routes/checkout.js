const express = require('express')
const router = express.Router()

const checkoutController = require('../app/controllers/CheckoutController')

router.get('/set-default', checkoutController.setDefault)
// router.get('/order', checkoutController.order)
router.get('/', checkoutController.checkout)
router.post('/', checkoutController.order)
// router.get('/', checkoutController.show)

module.exports = router