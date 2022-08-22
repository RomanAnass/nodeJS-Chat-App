const settingModel = require('../Models/setting.model');

exports.getsetting =(req,res,next)=>{
    res.render('settings',{
        pageTitle: 'Settings',
        userId: req.session.userId,
        photo: req.session.photo,
        username: req.session.username  
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