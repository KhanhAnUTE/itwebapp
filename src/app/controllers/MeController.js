const Orders = require('../models/OrderModel');
const Sites = require('../models/SiteModel')

class MeController{

    //GET /me
    show(req, res){
        var user_id = 1
        Orders.getOrderDetail(user_id, (items) =>{
            // res.send(items)
            var products = []
            for (var i = 0; i < items.length; i ++)
            {
                if (products.length == 0)
                {
                    products.push({})
                    products[0].order_id = items[i].order_id
                    products[0].order_date = items[i].order_date
                    products[0].shipping_price = items[i].shipping_price
                    products[0].order_total = items[i].order_total
                    products[0].status = items[i].status
                    products[0].pros = []

                    var order_item = {}
                    order_item.product_id = items[i].product_id
                    order_item.product = items[i].product
                    order_item.description = items[i].description
                    order_item.quantity = items[i].quantity
                    order_item.total_price = items[i].total_price
                    order_item.link = items[i].link
                    order_item.slug = items[i].slug
                    
                    products[0].pros.push(order_item)
                }
                else{
                    var index;
                    for (index = 0; index < products.length; index ++)
                    {
                        if (products[index].order_id == items[i].order_id)
                            break
                    }
                    if (index < products.length)
                    {
                        var order_item = {}
                        order_item.product_id = items[i].product_id
                        order_item.product = items[i].product
                        order_item.description = items[i].description
                        order_item.quantity = items[i].quantity
                        order_item.total_price = items[i].total_price
                        order_item.link = items[i].link
                        order_item.slug = items[i].slug

                        products[index].pros.push(order_item)
                    }
                    else{
                        products.push({})
                        products[products.length - 1].order_id = items[i].order_id
                        products[products.length - 1].order_date = items[i].order_date
                        products[products.length - 1].shipping_price = items[i].shipping_price
                        products[products.length - 1].order_total = items[i].order_total
                        products[products.length - 1].status = items[i].status
                        products[products.length - 1].pros = []

                        var order_item = {}
                        order_item.product_id = items[i].product_id
                        order_item.product = items[i].product
                        order_item.description = items[i].description
                        order_item.quantity = items[i].quantity
                        order_item.total_price = items[i].total_price
                        order_item.link = items[i].link
                        order_item.slug = items[i].slug
                        
                        products[index].pros.push(order_item)
                    }
                }
            }
            // console.log(products)
            // res.send(products)
            res.render('me', {
                product: products,
                page: 'Thông tin cá nhân',
            })   
        })

    }

}

module.exports = new MeController;