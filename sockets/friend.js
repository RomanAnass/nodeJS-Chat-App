
module.exports = (io)=>{

    io.on('connection',(socket)=>{
        socket.on('sendFriendRequest',(data)=>{
            console.log(data);
            socket.emit('requestSent');
            io.to(data.friendId).emit('NewFriendRequest',data);
        })    
    })
}