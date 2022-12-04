const Carts = require("../models/CartModel")

class CartController{

    //GET /cart/delete
    delete(req, res){
        var user_id = req.query.user_id
        var product_id = req.query.product_id

        Carts.deleteOne(user_id, product_id, (flag)=>{

        })
        res.redirect('back')
    }

    //GET /cart/pacth
    modify(req, res){
        var user_id = req.query.user_id
        var product_id = req.query.product_id
        var type = req.query.type

        Carts.modifyQuantity(user_id, product_id, type, (flag)=>{
            Carts.getQuantity(user_id, product_id, (count) =>{
                if (count == 0 || count == null)
                {
                    Carts.deleteOne(user_id, product_id, (flag)=>{
                        
                    })
                }
                else{
                    Carts.updateToPrice(user_id, product_id, (flag)=>{

                    })
                }
            })

            res.redirect('back')
        })
        // res.send(req.query)
    }

    //GET /cart
    show(req, res){
        const user_id = 1
        Carts.getCartDetail(user_id, (items) => {
            var shipFee = 22000
            var saveFee = 0
            res.render('cart', {
                page: 'Giỏ hàng',
                product: items[0],
                count: items[1][0],
                sum: items[2][0],
                shipFee,
                saveFee,
            })
            // res.send(items[0])
            // res.send(items)
        })
        // res.render('cart', {page: 'Giỏ hàng'})
    }
}

module.exports = new CartController