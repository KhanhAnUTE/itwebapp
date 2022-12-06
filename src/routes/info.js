const express = require('express')
const router = express.Router()

const meController = require('../app/controllers/MeController')

router.post('/', meController.updateInfo)
router.get('/', meController.info)

module.exports = router