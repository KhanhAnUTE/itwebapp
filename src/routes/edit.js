const express = require('express')
const router = express.Router()

const meController = require('../app/controllers/MeController')

router.post('/', meController.save)
router.get('/', meController.edit)

module.exports = router