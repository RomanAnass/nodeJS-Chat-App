const groupsModel = require('../Models/group.model');

exports.getgroups = (req,res,next)=>{
    res.render('groups',{
        pageTitle : 'groups',
        userId: req.session.userId,
        firstname: req.session.firstname,
        lastname: req.session.lastname,
        date_naissance: req.session.date_naissance,
        photo: req.session.photo 
    })
}