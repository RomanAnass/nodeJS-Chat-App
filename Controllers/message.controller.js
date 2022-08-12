const loginModel = require('../Models/message.modal');

exports.getMessage = (req,res,next) => {
  
    res.render('messages',{pageTitle : 'Messages'})
  
}