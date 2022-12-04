class ContactController{

    //GET /contact
    show(req, res){
        res.render('contact', {page: 'Liên hệ'})
    }
}

module.exports = new ContactController;