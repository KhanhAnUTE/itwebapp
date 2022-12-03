class CartController{

    //GET /cart
    show(req, res){
        res.render('cart')
    }
}

module.exports = new CartController