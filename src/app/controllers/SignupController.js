class SignupController{

    //GET /signup
    show(req, res){
        res.render('signup')
    }
}

module.exports = new SignupController