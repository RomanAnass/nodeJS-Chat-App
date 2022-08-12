const groupsModel = require('../Models/group.model');

exports.getgroups = (req,res,next)=>{
    res.render('groups',{
        pageTitle : 'groups'
    })
}