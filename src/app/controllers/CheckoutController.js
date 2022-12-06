const Carts = require("../models/CartModel")
const Orders = require("../models/OrderModel")

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
        })
    }

    //GET /checkout/order
    order(req, res)
    {
        var user_id = 1
        var order = {}
        var order_items = []

        //init order
        order.user_id = user_id
        order.addr_id = req.body.addr_id
        order.shipping_price = req.body.shipping_price
        order.order_total = req.body.order_total
        order.status = false

        //init order_item
        var length = req.body["productId[]"].length
        if (length == 1) {
            order_items.push({})
            order_items[0].product_id = req.body["productId[]"]
            order_items[0].quantity = req.body["quantity[]"]
            order_items[0].total_price = req.body["total_price[]"]

        } else{
            for (var i = 0; i < length; i++){
                order_items.push({})
                order_items[i].product_id = req.body["productId[]"][i]
                order_items[i].quantity = req.body["quantity[]"][i]
                order_items[i].total_price = req.body["total_price[]"][i]
            }
        }
        

        // res.send(order_items)   
        Orders.makeOrder(order, (flag)=>{
            // console.log(flag)
        })

        Orders.getNewOrder((order_id)=>{
            for (var i = 0; i < length; i++){
                order_items[i].order_id = order_id
                Orders.makeOrderItem(order_items[i], (flag)=>{
                    // console.log(flag)
                    res.redirect('/me')
                })
            }
        })

    }
}

module.exports = new Checkout()