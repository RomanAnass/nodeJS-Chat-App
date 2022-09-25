 const modelMessage = require('../Models/messages.model');

module.exports = (io) =>{

    io.on('connection',socket =>{
        
        socket.on('chat',chatId =>{
            socket.join(chatId);
        });

        socket.on('newMessage', message =>{
            modelMessage.createNewMessage(message)
            .then(()=>{
              socket.to(message.chatId).emit('message',message); 
            })
            .catch(err=>{
                console.log(err);
            })

        })
    })
}