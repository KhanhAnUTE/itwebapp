const Sites = require('../models/SiteModel')

class HomeController{

    //GET /
    index(req, res){
        var user_id = 1
        Sites.homeDetail(user_id, (items)=>{
            res.render('home', {
                countCart: items[0][0],
                catalogies: items[1],
                bestSeller: items[2],
            })
            // res.send(items)
        })
        // res.render('home')
    }
}

module.exports = new HomeController;