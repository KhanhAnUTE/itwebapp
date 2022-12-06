const express = require('express')
const router = express.Router()

const meController = require('../app/controllers/MeController')

router.post('/', meController.updateAddr)
router.get('/', meController.addr)

module.exports = router