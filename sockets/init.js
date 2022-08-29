module.exports = io => {
  
    io.on('connection',(socket)=>{
        socket.on('joinNotificationRom',id =>{
            socket.join(id);
        })

    })
}

