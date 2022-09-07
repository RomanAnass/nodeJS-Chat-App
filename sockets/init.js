const fs = require("fs");
const path = require('path');
const {updateprofilephoto} = require('../Models/user.model');

module.exports = io => {
  
    io.on('connection',(socket)=>{
        
        socket.on('joinNotificationRom',id =>{
            socket.join(id);
        });

        socket.on('disconnect',()=>{
            console.log('a client disconnected');
        })

    })
}

