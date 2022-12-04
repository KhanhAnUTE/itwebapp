class CartController{

    //GET /cart
    show(req, res){
        res.render('cart', {page: 'Giỏ hàng'})
    }
}

module.exports = new CartController