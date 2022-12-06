const Carts = require("../models/CartModel")

class CartController{
    //GET /cart/add-to-cart
    addCart(req, res){
        var product_id = req.query.product_id
        var user_id = req.query.user_id
        var price = req.query.price

        Carts.getQuantity(user_id, product_id, (count)=>{
            if (count == 0 || count == null){
                var quantity = 1
                var to_price = quantity * price
                Carts.add(user_id, product_id, quantity, to_price, (flag)=>{
                    
                })
            }
            else{
                var type = 'plus'
                Carts.modifyQuantity(user_id, product_id, type, (flag)=>{

                })
            }
        })
        res.redirect('back')
    }

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
        // res.render('checkout')
        const user_id = 1
        Carts.getCartDetail(user_id, (items) => {
            var shipFee = 22000
            var saveFee = 0
            res.render('cart', {
                page: 'Giỏ hàng',
                product: items[0],
                count: items[1][0],
                sum: items[2][0],
                countCart: items[3][0],
                catalogies: items[4],
                shipFee,
                saveFee,
            })
        })
    }
}

module.exports = new CartController