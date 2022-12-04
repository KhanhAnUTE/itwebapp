const Products = require('../models/ProductsModel')

class ShopController{

    //GET /shop
    show(req, res){
        if (req.query.brandsId) res.locals.brandsId = req.query.brandsId
        if (req.query.gendersId) res.locals.gendersId = req.query.gendersId
        if (req.query.for_agesId) res.locals.for_agesId = req.query.for_agesId
        if (req.query.page) res.locals.page = req.query.page
        if (req.query.sort) res.locals.sort = req.query.sort
        if (req.query.catalog) res.locals.catalog = req.query.catalog

        Products.getFilter(res.locals, (items) => {
                res.render('shop', {
                    products: items[0],
                    genders: items[1],
                    brands: items[2],
                    for_ages: items[3],
                    catalogies: items[4],
                    page: 'Cửa hàng',
                })
            // else 
                // res.redirect('back')
                // res.send(items)
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