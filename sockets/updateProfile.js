const fs = require("fs");
const path = require('path');
const {updateprofilephoto} = require('../Models/user.model');

module.exports = io => {
    io.on('connection',socket => {
        
        socket.on('profileImage', imageData => {
            // image is an array of bytes
            const buffer = Buffer.from(imageData.bytes);
            fs.writeFile(path.join(__dirname,'..','Assets','images','users',imageData.Imagename), buffer,(err, result) => {
                if(err) {
                    console.log('error', err);
                }else{
                   // photo = "http//localhost:3000/userImage/images/users/"+imageData.Imagename;
                    photo = `http://localhost:3000/image/${imageData.Imagename}`;
                    updateprofilephoto(imageData.myId,photo)
                    .then(()=>{
                        console.log('1 : ',imageData.Imagename)
                         socket.emit('newprofilephoto',imageData.Imagename);
                         console.log('2 : ',imageData.Imagename)
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