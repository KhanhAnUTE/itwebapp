class ShopController{

    //GET /shop
    show(req, res){
        res.render('shop')
    }

    detail(req, res){
        res.render('detail')
    }
}

module.exports = new ShopController