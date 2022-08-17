const loginModel = require('../Models/home.model');

exports.getHome = (req,res,next) => {
    res.render('home',{
       pageTitle : 'Home',
      })
}