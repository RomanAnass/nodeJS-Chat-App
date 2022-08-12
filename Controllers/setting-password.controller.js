const settingPasswordModel = require('../Models/setting-password.model');

exports.getSettingPassword = (req,res,next)=>{
    res.render('setting-password',{
        pageTitle: 'setting-password'
    })
};