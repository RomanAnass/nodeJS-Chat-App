const fs = require("fs");
const path = require('path');
const {updateprofilephoto} = require('../Models/user.model');

module.exports = io => {
  
    io.on('connection',(socket)=>{
        
        socket.on('joinNotificationRom',id =>{
            socket.join(id);
        });

        socket.on('profileImage', imageData => {
            // image is an array of bytes
            const buffer = Buffer.from(imageData.bytes);
            fs.writeFile(path.join(__dirname,'..','Assets','images','users',imageData.Imagename), buffer,(err, result) => {
                if(err) {
                    console.log('error', err);
                }else{
                    updateprofilephoto(imageData.myId,imageData.Imagename)
                    .then(()=>{
                         socket.emit('newprofilephoto',imageData.Imagename);
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                }
                  
            })
        });

        socket.on('disconnect',()=>{
            console.log('a client disconnected');
        })

    })
}

