const path = require('path')
const express = require('express')
const morgan = require('morgan')
const hbs = require('express-handlebars')
const app = express()
const port = 3000

const route = require('./routes')
const db = require('./config/db')

app.use(express.static(path.join(__dirname, 'public')))

//use morgan to log http request
app.use(morgan('combined'))

//use template engine - handlebars
app.engine('hbs', hbs.engine({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => {
            if (a!=null && b !=null)
                return a + b;
            return 0
        },
        check: (a)=>{
            if (a!=null)
                return a
            return 0
        },
        currency: (int)=>{
            if (!int)
                int = 0
            return Intl.NumberFormat('vi-VI', {
                style: 'currency',
                currency: 'VND',
              }).format(int) 
        },
        currencySum: (a, b) => {
            if (a!=null && b !=null)
                return Intl.NumberFormat('vi-VI', {
                    style: 'currency',
                    currency: 'VND',
                }).format(a + b)
            return Intl.NumberFormat('vi-VI', {
                style: 'currency',
                currency: 'VND',
            }).format(0)
        }
    }
})) //define and config
app.set('view engine', 'hbs') //set
app.set('views', path.join(__dirname, 'resources/views'))

//route
route(app)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))