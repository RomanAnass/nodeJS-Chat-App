const loginModel = require('../Models/home.model');

exports.getHome = (req,res,next) => {
    console.log(req.session.photo);
    res.render('home',{
       pageTitle : 'Home',
       userId: req.session.userId,
       firstname: req.session.firstname,
       lastname: req.session.lastname,
       date_naissance: req.session.date_naissance,
       photo: req.session.photo,
       email: req.session.email 
      })
}