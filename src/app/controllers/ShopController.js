const Carts = require('../models/CartModel')
const Products = require('../models/ProductsModel')

class ShopController{

    //GET /shop
    show(req, res){
        const user_id = 1
        const filters = {}
        if (req.query.brandsId) filters.brandsId = req.query.brandsId
        if (req.query.gendersId) filters.gendersId = req.query.gendersId
        if (req.query.for_agesId) filters.for_agesId = req.query.for_agesId
        if (req.query.page) filters.page = req.query.page
        if (req.query.sort) filters.sort = req.query.sort
        if (req.query.catalog) filters.catalog = req.query.catalog

        Products.getFilter(user_id, filters, (items) => {
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
                bestSeller: items[4],
            })
        })
    }
}

module.exports = new ShopController