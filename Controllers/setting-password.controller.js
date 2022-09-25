const settingPasswordModel = require('../Models/setting-password.model');

exports.getSettingPassword = (req,res,next)=>{
    res.render('setting-password',{
        pageTitle: 'setting-password',
        IsUser: req.session.userId,
        photo: req.session.photo,
        username: req.session.username,
        notifications: req.notifications
    })
};

exports.postSettingPassword = (req,res,next)=>{
    filter = {id: req.session.userId};
    NewPassword = req.body.NewPassword;
    cureentpassword = req.body.CurrentPassword;
    settingPasswordModel.updatePassword(filter,NewPassword,cureentpassword)
     .then(()=>{
         res.redirect('/settings-password');
     })
     .catch(err =>{
         console.log(err);
     })
}