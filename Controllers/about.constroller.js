
exports.getAbout = (req,res,next) =>{
    res.render('about',{
        pageTitle : 'About',
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
    });
}