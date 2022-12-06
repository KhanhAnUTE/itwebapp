const db = require('../../config/db')

const Carts = function(cart){
    this.id = cart.id
    this.product_id = cart.product_id
    this.user_id = cart.user_id
    this.quantity = cart.quantity
    this.to_price = cart.to_price
}

Carts.add = (user_id, product_id, quantity, to_price, callback)=>{
    var sqlAddCart = "Insert into carts (user_id, product_id, quantity, to_price) values (?, ?, ?, ?)"

    db.query(sqlAddCart, [user_id, product_id, quantity, to_price], (err, flag)=>{
        if (err){
            console.log(err)
            callback(null)
            return
        }
        flag = true
        callback(flag)
    })
}

Carts.updateToPrice = (user_id, product_id, callback) => {
    var sqlUpdateToPrice = "Update carts set to_price = quantity * (select price from products where id = " + product_id + ") where user_id = " + user_id + " and product_id = " + product_id

    db.query(sqlUpdateToPrice, (err, flag)=>{
        if (err){
            console.log(err)
            callback(null)
            return
        }
        flag = true
        callback(flag)
    })
}

Carts.deleteOne = (user_id, product_id, callback)=>{
    var sqlDeleteCartItem = "Delete from carts where user_id = " + user_id + " and product_id = " + product_id

    db.query(sqlDeleteCartItem, (err, flag)=>{
        if (err){
            console.log(err)
            callback(null)
            return
        }
        flag = true
        callback(flag)
    })
}

Carts.getQuantity = (user_id, product_id, callback) =>{
    var sqlGetQuantity = "select quantity from carts where user_id = " + user_id + " and product_id = " + product_id
    db.query(sqlGetQuantity, (err, count) => {
        if (err){
            console.log(err)
            callback(null)
            return
        }
        if (count!=null && count.length != 0)
            callback(count[0].quantity)
        else
            callback(0)
    })
}

Carts.modifyQuantity = (user_id, product_id, type, callback) =>{
    var sign = "+"
    if (type == "minus")
        sign = '-'
    else if (type == "plus")
        sign = "+"
    else
        callback(null)
    var sqlUpdateQuantity = "update carts set quantity = quantity " + sign + " 1 where user_id = " + user_id + " and product_id = " + product_id

    db.query(sqlUpdateQuantity, (err, flag) => {
        if (err){
            console.log(err)
            callback(null)
            return
        }
        flag = true
        callback(flag)
    })
}

Carts.getCartDetail = (user_id, callback) =>{
    var sqlGetCartItem = "select * from carts, products, users, images where carts.product_id = products.id and carts.user_id = users.id and products.id = images.product_id and images.isdefault = 1 and user_id = " + user_id
    var sqlCountCartItem = "select sum(quantity) as count from carts where user_id = " + user_id + " group by user_id"
    var sqlSumOrder = "select sum(to_price) as sum from carts where user_id = " + user_id + " group by user_id"
    var sqlSites = "select count(user_id) as count from carts where user_id = " + user_id + " group by user_id; select * from catalogies"

    db.query(sqlGetCartItem + "; " + sqlCountCartItem + "; " + sqlSumOrder + "; " + sqlSites, (err, items) => {
        if (err){
            console.log(err)
            callback(null)
        }
        else{
            callback(items)
        }
    })
}

Carts.getCheckOut = (user_id, callback)=>{
    var sqlGetCartItem = "select * from carts, products, users, images where carts.product_id = products.id and carts.user_id = users.id and products.id = images.product_id and images.isdefault = 1 and user_id = " + user_id
    var sqlCountCartItem = "select sum(quantity) as count from carts where user_id = " + user_id + " group by user_id"
    var sqlSumOrder = "select sum(to_price) as sum from carts where user_id = " + user_id + " group by user_id"
    var sqlSites = "select count(user_id) as count from carts where user_id = " + user_id + " group by user_id; select * from catalogies"
    var sqlGetAddress = "select * from addresses, users where addresses.user_id = users.id"

    db.query(sqlGetCartItem + "; " + sqlCountCartItem + "; " + sqlSumOrder + "; " + sqlSites + "; " + sqlGetAddress, (err, items) => {
        if (err){
            console.log(err)
            callback(null)
        }
        else{
            callback(items)
        }
    })
}

Carts.setDefaultCheckout = (user_id, addr_id, callback)=>{
    var sqlUpdate = "Update addresses set isdefault = 1 where addr_id = " + addr_id
    var sqlUpdateTrigger = "Update addresses set isdefault = 0 where addr_id != " + addr_id + " and user_id = " + user_id
    
    db.query(sqlUpdate + "; " + sqlUpdateTrigger, (err, flag)=>{
        if (err){
            console.log(err)
            callback(null)
        }
        else{
            callback(true)
        }
    })
}

module.exports = Carts