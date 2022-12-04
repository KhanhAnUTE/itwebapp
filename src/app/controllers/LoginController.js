class LoginController{

    //GET /login
    show(req, res){
        res.render('login', {page: 'Đăng nhập'})
    }
}

module.exports = new LoginController