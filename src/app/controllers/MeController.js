const Orders = require('../models/OrderModel');
const Users = require('../models/UserModle')

class MeController{
    updateInfo(req, res){
        var user_id = 1
        Users.updateUser(req.body, user_id, (flag)=>{
            res.redirect('info')
        })
    }

    updateAddr(req, res){
        var user_id = 1
    }

    save(req, res){
        var user_id = 1
        Users.updateAddr(req.body, user_id, (flag)=>{
            res.redirect('addr')  
        })
    }

    //GET /edit
    edit(req, res){
        var user_id = 1
        if (req.query.addr_id){
            if (!req.query.delete)
                Users.getAddrById(req.query.addr_id, user_id, (items)=>{
                    res.render('editaddr', {
                        page: 'Chỉnh sửa địa chỉ',
                        addr: items[0][0],
                        me: items[1][0],
                        countCart: items[2][0],
                        catalogies: items[3],
                    })
                })
            else
                Users.deleteById(req.query.addr_id, user_id, (flag) => {
                    res.redirect('back')
                })
        }
        else{
            res.render('editaddr', {
                page: "Thêm địa chỉ mới"
            })
        }
    }

    addr(req, res){
        var user_id = 1
        Users.getAddr(user_id, (items)=>{
            // res.send(items)

            res.render('addr', {
                page: "Địa chỉ thanh toán",
                addr: items[0],
                me: items[1][0],
                countCart: items[2][0],
                catalogies: items[3],
            })
        })
    }

    info(req, res){
        var user_id = 1
        Users.getUserInfo(user_id, (items)=>{
            // res.send(items)
            res.render('info', {
                page: "Thông tin cá nhân",
                me: items[0][0],
                countCart: items[1][0],
                catalogies: items[2],
            })
        })
            
    }

    //GET /me
    show(req, res){
        var user_id = 1
        Orders.getOrderDetail(user_id, (result) =>{
            var items = result[0]
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
                countCart: result[1][0],
                catalogies: result[2],
                me: result[3][0],
                page: 'Thông tin cá nhân',
            })   
        })
    }

}

module.exports = new MeController;