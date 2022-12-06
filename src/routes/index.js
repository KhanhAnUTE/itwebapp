const contactRouter = require('./contact')
const shopRouter = require('./shop')
const cartRouter = require('./cart')
const loginRouter = require('./login')
const signupRouter = require('./signup')
const homeRouter = require('./home')
const checkoutRouter = require('./checkout')
const testRouter = require('./test')
const meRouter = require('./me')
const infoRouter = require('./info')
const addrRouter = require('./addr')
const editRouter = require('./edit')

const bodyParser = require('body-parser')

//body-parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

function route(app){
    app.use('/contact', urlencodedParser, contactRouter)
    app.use('/shop', urlencodedParser, shopRouter)
    app.use('/cart', urlencodedParser, cartRouter)
    app.use('/login', urlencodedParser, loginRouter)
    app.use('/signup', urlencodedParser, signupRouter)
    app.use('/checkout', urlencodedParser, checkoutRouter)
    app.use('/test', urlencodedParser, testRouter)
    app.use('/me', urlencodedParser, meRouter)
    app.use('/info', urlencodedParser, infoRouter)
    app.use('/addr', urlencodedParser, addrRouter)
    app.use('/edit', urlencodedParser, editRouter)
    app.use('/', homeRouter)
    
}

module.exports = route