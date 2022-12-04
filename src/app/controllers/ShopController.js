const Products = require('../models/ProductsModel')

class ShopController{

    //GET /shop
    show(req, res){
        Products.getAllProducts((products) => {
            res.render('shop', {products, page: 'Cửa hàng'})
        })
        // res.render('shop')
    }

    //GET /shop/:slug
    detail(req, res){
        Products.getProductDetailBySlug(req.params.slug, (product)=>
        {   
            //config links img
            for (var i = 0; i < product[1].length; i++){
                if (i == 0)
                    product[1][i].isFirst = true
                else
                    product[1][i].isFirst = false
            }

            res.render('detail', { product: product[0][0], imgs: product[1], page: 'Cửa hàng'})
        })
        // res.render('detail')
    }
}

module.exports = new ShopController