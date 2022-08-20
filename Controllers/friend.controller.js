const friendModal = require('../Models/friend.model');

exports.getfriend = (req,res,next)=>{
    res.render('friend',{
        pageTile: 'friend',
        userId: req.session.userId,
        firstname: req.session.firstname,
        lastname: req.session.lastname,
        date_naissance: req.session.date_naissance,
        photo: req.session.photo,
        email: req.session.email 
    })
}