const constact = require('../Models/constact.model');

exports.getConstact = (req,res,next)=>{
    res.render('contact',{
      pageTitle: 'constact',
      IsUser: req.session.userId,
      username: req.session.username,
<<<<<<< HEAD
      photo: req.session.photo 
=======
<<<<<<< HEAD
      photo: req.session.photo 
=======
      photo: req.session.photo,
      notifications: req.notifications, 
>>>>>>> 39751f9 (share new post)
>>>>>>> 210d3e7 (share new post)
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