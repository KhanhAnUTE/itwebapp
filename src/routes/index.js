const contactRouter = require('./contact')
const shopRouter = require('./shop')
const cartRouter = require('./cart')
const loginRouter = require('./login')
const signupRouter = require('./signup')

function route(app){
    app.use('/contact', contactRouter)
    app.use('/shop', shopRouter)
    app.use('/cart', cartRouter)
    app.use('/login', loginRouter)
    app.use('/signup', signupRouter)
    app.get('/', (req, res) =>  res.render('home'))
}

module.exports = route