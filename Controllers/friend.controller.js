const friendModal = require('../Models/friend.model');

exports.getfriend = (req,res,next)=>{
    res.render('friend',{
        pageTile: 'friend'
    })
}