const Brand = require("../models/BrandModel")

class NewsController{

    //GET /news
    index(req, res){
        res.render('news')
    }

    detail(req, res){
        res.send('This is the detail')
    }

    getBrand(req, res){
        var id = 1
        Brand.getByID(id, function (products){
            res.send({ products })
        })
    }
}

module.exports = new NewsController;