const messageModel = require('../Models/messages.model');

exports.getMessage = (req,res,next) => {
   

     messageModel.getMessages(req.params.chatId)
     .then((messages)=>{
       // console.log(messages)
       /* res.render('messages',{
            pageTitle : 'Messages',
            IsUser: req.session.userId,
            username: req.session.username,
            friendRequests: req.friendRequests,
            photo: req.session.photo,
            chatId: req.params.chatId,
            messages: messages 
        }) */
        res.send(messages)
         
     })
     .catch(err=>{
         console.log(err);
     })
     

    
}