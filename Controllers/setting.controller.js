const settingModel = require('../Models/signup.model');

exports.getsetting =(req,res,next)=>{
    res.render('settings',{
        pageTitle: 'Settings'
    })
}