const contactRouter = require('./contact')
const shopRouter = require('./shop')
const cartRouter = require('./cart')
const loginRouter = require('./login')
const signupRouter = require('./signup')
const homeRouter = require('./home')
const checkoutRouter = require('./checkout')

function route(app){
    app.use('/contact', contactRouter)
    app.use('/shop', shopRouter)
    app.use('/cart', cartRouter)
    app.use('/login', loginRouter)
    app.use('/signup', signupRouter)
    app.use('/checkout', checkoutRouter)

    app.use('/', homeRouter)
}

module.exports = route