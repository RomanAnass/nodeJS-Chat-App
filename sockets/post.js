const {addPost}= require('../Models/user.model');

module.exports = (io)=>{
  
    io.on('connect',socket =>{
        socket.on('post',data =>{
            console.log(data);
           addPost(data.myId,data).then((userId)=>{
            socket.emit('newPost',data);
           // socket.to(userId).emit('newPost',data); 
           })
 
        })   

        socket.on('disconnect',()=>{
          console.log('a client disconnected');
        })
    })
}    
