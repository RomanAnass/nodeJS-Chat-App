const settingModel = require('../Models/setting.model');

exports.getsetting =(req,res,next)=>{
    res.render('settings',{
        pageTitle: 'Settings',
        IsUser: req.session.userId,
        photo: req.session.photo,
        username: req.session.username,
<<<<<<< HEAD
        friendRequests: req.friendRequests  
=======
<<<<<<< HEAD
        friendRequests: req.friendRequests  
=======
        notifications: req.notifications, 
>>>>>>> 39751f9 (share new post)
>>>>>>> 210d3e7 (share new post)
    })
}

exports.postSetting = (req,res,next)=>{
      const filter = { id: req.session.userId };
      const update = { firstname: req.body.firstname, lastname: req.body.lastname, username:req.body.username};
      settingModel.updateAccount(filter,update)
      .then(()=>{
        res.redirect('/settings');
      })
      .catch(err =>{
          console.log(err);
      })
}