const Carts = require('../models/CartModel')
const Products = require('../models/ProductsModel')

class ShopController{

    //GET /shop/add-to-cart
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

    //GET /shop
    show(req, res){
        const user_id = 1
        if (req.query.brandsId) res.locals.brandsId = req.query.brandsId
        if (req.query.gendersId) res.locals.gendersId = req.query.gendersId
        if (req.query.for_agesId) res.locals.for_agesId = req.query.for_agesId
        if (req.query.page) res.locals.page = req.query.page
        if (req.query.sort) res.locals.sort = req.query.sort
        if (req.query.catalog) res.locals.catalog = req.query.catalog

        Products.getFilter(user_id, res.locals, (items) => {
                if (items != null)
                    res.render('shop', {
                        page: 'Cửa hàng',
                        products: items[0],
                        genders: items[1],
                        brands: items[2],
                        for_ages: items[3],
                        catalogies: items[4],
                        countCart: items[5][0],
                    })
                else
                    res.send(items)
        })
    }

    //GET /shop/:slug
    detail(req, res){
        Products.getProductDetailBySlug(req.params.slug, (items)=>
        {   
            //config links img
            for (var i = 0; i < items[1].length; i++){
                if (i == 0)
                    items[1][i].isFirst = true
                else
                    items[1][i].isFirst = false
            }

            res.render('detail', { 
                page: 'Cửa hàng',
                product: items[0][0],
                imgs: items[1],
                countCart: items[2][0],
                catalogies: items[3],
            })
        })
    }
}

module.exports = new ShopController