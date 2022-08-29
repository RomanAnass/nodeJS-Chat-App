
exports.getAbout = (req,res,next) =>{
    res.render('about',{
        pageTitle : 'About',
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
        isRequestSent: user.friendRequest.find(friend => friend.id === req.session.userId),
        isRequestRecieve: user.sentRequest.find(friend => friend.id === req.session.userId),
        isfriend: user.friends.find(friend => friend.id === req.session.userId)
    });
}