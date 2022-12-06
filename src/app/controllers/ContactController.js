const Sites = require('../models/SiteModel')

class ContactController{

    //GET /contact
    show(req, res){
        var user_id = 1
        Sites.getElements(user_id, (items)=>{
            res.render('contact', {
                page: 'Liên hệ',
                countCart: items[0][0],
                catalogies: items[1],
            })
            // res.send(items)
        })

    }
}

module.exports = new ContactController;