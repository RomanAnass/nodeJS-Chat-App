const profileModal = require('../Models/profile.model');

exports.getProfile = (req,res,next)=>{
     res.render('profile',{
        pageTitle: 'porfile'
     })
};

