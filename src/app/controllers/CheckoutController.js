const Carts = require("../models/CartModel")

class Checkout{

    //GET /checkout/set-default
    setDefault(req, res){
        const user_id = 1
        const addr_id = req.query.addr_id

        Carts.setDefaultCheckout(user_id, addr_id, (flag)=>{

        })
        res.redirect('back')
    }

    //GET /checkout
    checkout(req, res){

        const user_id = 1
        Carts.getCheckOut(user_id, (items) => {
            var shipFee = 22000
            var saveFee = 0
            res.render('checkout', {
                page: 'Kiểm tra đơn hàng',
                product: items[0],
                count: items[1][0],
                sum: items[2][0],
                countCart: items[3][0],
                catalogies: items[4],
                addr: items[5],
                shipFee,
                saveFee,
            })
            // res.send(items[5])
        })
        // res.render('cart', {page: 'Giỏ hàng'})
    }
}

module.exports = new Checkout()