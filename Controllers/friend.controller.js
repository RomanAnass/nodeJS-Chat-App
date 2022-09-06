const friendModal = require('../Models/friend.model');
const userModel = require('../Models/user.model');

exports.getfriend = (req,res,next)=>{
    id = req.params.id;
   if(!id) return res.redirect(`friends/${req.session.userId}`)  
   userModel.getUserData(id).then((user)=>{
      res.render('friend',{
         pageTitle: 'friends',
         IsUser: req.session.userId,
         MyId: req.session.userId,
         myname: req.session.username,
         myphoto: req.session.photo,
         friendRequests: req.friendRequests,
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
}