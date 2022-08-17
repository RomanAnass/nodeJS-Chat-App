const loginModel = require('../Models/login.model');

exports.getLogin = (req,res,next) => {
  
  res.render('signin',{pageTitle : 'sign-in'})

}

exports.postLogin = (req,res,next) => {
     loginModel.login({email: req.body.email,password : req.body.password})
                     .then((result)=>{
                          req.session.userId = String(result.id);
                          req.session.firstname = result.firstname;
                          req.session.lastname = result.lastname;
                          req.session.photo = result.photo;
                          req.session.date_naissance = result.date_naissance;
                          res.redirect('/');
                     })
                     .catch((err)=>{
                      console.log(err);
                      res.redirect('/signin');
                     })

}