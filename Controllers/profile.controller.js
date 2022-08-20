const profileModal = require('../Models/profile.model');
const userModel = require('../Models/user.model');

exports.getProfile = (req,res,next)=>{
   id = req.params.id;
   if(!id) return res.redirect(`profile/${req.session.userId}`)  
   userModel.getUserData(id).then((user)=>{
      res.render('profile',{
         pageTitle: 'porfile',
         IsUser: req.session.userId,
         MyId: req.session.userId,
         friendId: user.id,
         email: user.email,
         photo: user.photo,
         username: user.username,
         date_naissance: user.date_naissance,
         adresse:   user.adresse,
         phoneNumber: user.phoneNumber,
         isOwner: id === req.session.userId, 
      }) 
   })  
};

