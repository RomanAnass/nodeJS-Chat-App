const constact = require('../Models/constact.model');

exports.getConstact = (req,res,next)=>{
    res.render('contact',{
      pageTitle: 'constact',
      userId: req.session.userId,
      username: req.session.username,
      photo: req.session.photo 
    })
}

exports.postConstact = (req,res,next)=>{
     console.log(req.body.email,req.body.phonenumber,req.body.address)
      const update = {email : req.body.email, phoneNumber: req.body.phonenumber, adresse: req.body.address}; 
      const filter = {id: req.session.userId};

    constact.updateConstact(update,filter)
    .then(()=>{
       res.redirect('/settings-contact')
    })
    .catch(err =>{
         console.log(err);
    })
}