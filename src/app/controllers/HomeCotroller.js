class HomeController{

    //GET /news
    index(res, req){
        res.render('home')
    }
}

module.exports = new HomeController;