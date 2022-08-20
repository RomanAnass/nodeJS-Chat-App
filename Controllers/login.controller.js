const loginModel = require('../Models/login.model');

exports.getLogin = (req,res,next) => {
  
  res.render('signin',{pageTitle : 'sign-in'})

}

exports.postLogin = (req,res,next) => {
     loginModel.login({email: req.body.email,password : req.body.password})
               .then((result)=>{
                    req.session.userId = String(result.id);
                    req.session.username = result.username;
                    req.session.photo = result.photo;
                    res.redirect('/');
               })
               .catch((err)=>{
                    console.log(err);
                    res.redirect('/signin');
               })
}