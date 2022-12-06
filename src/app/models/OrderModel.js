const db = require('../../config/db')
const { order } = require('../controllers/CheckoutController')

const Orders = function(cart){
}

Orders.getNewOrder = (callback) =>{
    var sqlgetMaxId = "select max(order_id) as id from orders"
    db.query(sqlgetMaxId, (err, order_id) =>{
        if (err){
            console.log(err)
            callback(null)
            return
        }
        callback(order_id[0].id)
    })

}

Orders.makeOrder = (order, callback)=>{
    var sqlMakeOrder = "Insert into orders (user_id, addr_id, shipping_price, order_total, status) values (" + order.user_id + ", " + order.addr_id + "," + order.shipping_price + ", " + order.order_total + ", '" + order.status + "')"

    db.query(sqlMakeOrder, (err, flag)=>{
        if (err){
            console.log(err)
            callback(null)
            return
        }
        flag = true
        callback(flag)
    })
}

Orders.makeOrderItem  = (order_item, callback)=>{
    var sqlMakeOrderItem = "Insert into order_items (product_id, order_id, quantity, total_price) values (" + order_item.product_id + ", " + order_item.order_id + ", " + order_item.quantity + ", " + order_item.total_price + ")"

    db.query(sqlMakeOrderItem, (err, flag)=>{
        if (err){
            console.log(err)
            callback(null)
            return
        }
        flag = true
        callback(flag)
    })
}

Orders.getOrderDetail = (user_id, callback) =>{
    var sqlGetOrdered = "select * from products, images, order_items, orders where images.product_id = products.product_id and products.product_id = order_items.product_id and orders.order_id = order_items.order_id and images.isdefault = 1 and user_id = "+ user_id

    db.query(sqlGetOrdered, (err, items)=>{
        if (err){
            console.log(err)
            callback(null)
            return
        }
        callback(items)
    })
}

module.exports = Orders