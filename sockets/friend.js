

const { sendFriendRequests,cancelfriendRequests,rejectfriendRequests,acceptefriendRequests,deletefriendRequests,getNotifications } = require('../Models/user.model'); 

module.exports = (io)=>{

    io.on('connection',(socket)=>{
        socket.on('sendFriendRequest',(data)=>{

            sendFriendRequests(data).then(()=>{
                console.log(data);
                socket.emit('requestSent');
                io.to(data.friendId).emit('NewFriendRequest',{
                    friendId: data.myId,
                    friendname: data.myname,
                    friendphoto: data.myphoto
                });
            })
            .catch((err)=>{
                console.log(err);
            }) 
        });
        
        socket.on('cancelFriendRequest',(data)=>{
            cancelfriendRequests(data)
            .then(()=>{
                socket.emit('cancelrequest'); 
            })
            .catch((err)=>{
                console.log(err);
            })
        });

        socket.on('rejectFriendRequest',(data)=>{
            rejectfriendRequests(data)
            .then(()=>{
                socket.emit('rejectrequest'); 
            })
            .catch((err)=>{
                console.log(err);
            })
        });

        socket.on('accepteFriendRequest',(data)=>{
            acceptefriendRequests(data)
            .then(()=>{
                socket.emit('accepterequest'); 
            })
            .catch((err)=>{
                console.log(err);
            })
        });

        socket.on('deleteFriendRequest',(data)=>{
            deletefriendRequests(data)
            .then(()=>{
                socket.emit('deleterequest'); 
            })
            .catch((err)=>{
                console.log(err);
            })
        });


    })
};