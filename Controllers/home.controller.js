const loginModel = require('../Models/home.model');

exports.getHome = (req,res,next) => {
    res.render('home',{
       pageTitle : 'Home',
       IsUser: req.session.userId,
       firstname: req.session.firstname,
       lastname: req.session.lastname,
       date_naissance: req.session.date_naissance,
       photo: req.session.photo,
       email: req.session.email 
      })
}