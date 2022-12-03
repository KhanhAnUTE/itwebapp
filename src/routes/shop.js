const express = require('express')
const router = express.Router();

const shopController = require('../app/controllers/ShopController')

router.use('/:slug', shopController.detail)
router.use('/', shopController.show)

module.exports = router
