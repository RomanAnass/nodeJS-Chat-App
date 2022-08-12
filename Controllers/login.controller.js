const loginModel = require('../Models/login.model');

exports.getLogin = (req,res,next) => {
  
  res.render('signin',{pageTitle : 'sign-in'})

}

exports.postLogin = (req,res,next) => {
     loginModel.login({email    : req.body.email,
                       password : req.body.password
                    });
                    
    res.redirect('/');
}