const contactRouter = require('./contact')
const shopRouter = require('./shop')
const cartRouter = require('./cart')
const loginRouter = require('./login')
const signupRouter = require('./signup')
const homeRouter = require('./home')
const checkoutRouter = require('./checkout')

const bodyParser = require('body-parser')


//body-parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

function route(app){
    app.use('/contact', contactRouter)
    app.use('/shop', shopRouter)
    app.use('/cart', cartRouter)
    app.use('/login', loginRouter)
    app.use('/signup', signupRouter)
    app.use('/checkout', checkoutRouter)

    
    app.get('/test', (req, res)=>{
        res.render('test')
    })
    app.post('/test', urlencodedParser, (req, res)=>{
        res.send(req.body)
        // res.render('Xin chào ' + req.body.name)
    })

    app.use('/', homeRouter)
    
}

module.exports = route