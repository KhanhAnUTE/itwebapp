class LoginController{

    //GET /login
    show(req, res){
        res.render('login')
    }
}

module.exports = new LoginController