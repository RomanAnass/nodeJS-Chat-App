const {addPost}= require('../Models/user.model');
const fs = require("fs");
const path = require('path');

module.exports = (io)=>{
 
    io.on('connect',socket =>{
        socket.on('post',postData =>{
            console.log(postData);
            const buffer = Buffer.from(postData.bytes);

            fs.writeFile(path.join(__dirname,'..','Assets','images','posts',postData.filename), buffer,(err, result) => {
                if(err) {
                    console.log('error', err);
                }else{
                    addPost(postData.userId,postData).then((userId)=>{
                        socket.emit('newPost',postData);
                       // socket.to(userId).emit('newPost',data); 
            
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
                  
            })
        })   

        socket.on('disconnect',()=>{
          console.log('a client disconnected');
        })
    })
}    
