const express = require('express')
const router = express.Router()


router.get('/', (req, res)=>{
    res.render('test')
})

router.post('/', (req, res)=>{
    res.send('Hello ' + req.body.name)
})

module.exports = router