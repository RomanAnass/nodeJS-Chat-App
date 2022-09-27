const settingPasswordModel = require('../Models/setting-password.model');

exports.getSettingPassword = (req,res,next)=>{
    res.render('setting-password',{
        pageTitle: 'setting-password',
        IsUser: req.session.userId,
        photo: req.session.photo,
        username: req.session.username,
<<<<<<< HEAD
        friendRequests: req.friendRequests
=======
<<<<<<< HEAD
        friendRequests: req.friendRequests
=======
        notifications: req.notifications
>>>>>>> 39751f9 (share new post)
>>>>>>> 210d3e7 (share new post)
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