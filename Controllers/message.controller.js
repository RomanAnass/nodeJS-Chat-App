const loginModel = require('../Models/message.modal');

exports.getMessage = (req,res,next) => {
    console.log(req.session)
    res.render('messages',{
        pageTitle : 'Messages',
        IsUser: req.session.userId,
        firstname: req.session.firstname,
        lastname: req.session.lastname,
        date_naissance: req.session.date_naissance,
        photo: req.session.photo
    }) 
}