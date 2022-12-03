class NewsController{

    //GET /news
    index(req, res){
        res.render('news')
    }

    detail(req, res){
        res.send('This is the detail')
    }
}

module.exports = new NewsController;