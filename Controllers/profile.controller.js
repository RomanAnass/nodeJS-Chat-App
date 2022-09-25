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
         myname: req.session.username,
         myphoto: req.session.photo,
         notifications: req.notifications,
         userId: user.id,
         email: user.email,
         photo: user.photo,
         username: user.username,
         date_naissance: user.date_naissance,
         adresse:   user.adresse,
         phoneNumber: user.phoneNumber,
         isOwner: id === req.session.userId,
         isRequestSent: user.friendRequests.find(friend => friend.id === req.session.userId),
         isRequestRecieve: user.sentRequests.find(friend => friend.id === req.session.userId),
         isfriend: user.friends.find(friend => friend.id === req.session.userId)
      })
     
   })
   .catch((err)=>{
      console.log(err);
      res.redirect('/error');
   })   
};

