class ContactController{

    //GET /contact
    show(req, res){
        res.render('contact')
    }
}

module.exports = new ContactController;