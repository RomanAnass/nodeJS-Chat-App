const myname       = document.getElementById('myname').value;
const myphoto      = document.getElementById('myphoto').value;
const userId       = document.getElementById('userId').value;
const username     = document.getElementById('username').value;
const photo        = document.getElementById('photo').value;
const friendsDiv   = document.getElementById('friends-div');


function sendFriendRequest(){

   // e.preventDefault();
    socket.emit('sendFriendRequest',{
        myId: myId,
        myname: myname,
        myphoto: myphoto,
        friendId: userId,
        friendname: username ,
        friendphoto: photo 
    })
}

socket.on('requestSent',()=>{
    document.getElementById('addfriendBtn').remove();
    friendsDiv.innerHTML += "<button type='button' class='btn btn-addfriend mr-3'  id='cancelBtn' onclick='cancelfriendRequest()'>Cancel Request</button>";
})


function cancelfriendRequest(){
   // e.preventDefault();
        socket.emit('cancelFriendRequest',{
            myId: myId,
            myname: myname,
            myphoto: myphoto,
            friendId: userId,
            friendname: username,
            friendphoto: photo 
        });
}


socket.on('cancelrequest',()=>{
    document.getElementById('cancelBtn').remove();
        friendsDiv.innerHTML += "<button type='button' class='btn btn-addfriend mr-3' id='addfriendBtn' onclick='sendFriendRequest()' ><i class='fa fa-user-plus'></i> Add Friend</button>"         
})


function rejectFriendRequest(){

   // e.preventDefault();
    socket.emit('rejectFriendRequest',{
        myId: myId,
        myname: myname,
        myphoto: myphoto,
        friendId: userId,
        friendname: username,
        friendphoto: photo 
    })
}

socket.on('rejectrequest',()=>{
    document.getElementById('rejectBtn').remove();
    document.getElementById('accepteBtn').remove();
    friendsDiv.innerHTML += "<button type='button' class='btn btn-addfriend mr-3' id='addfriendBtn' onclick='sendFriendRequest()' ><i class='fa fa-user-plus'></i> Add Friend</button>"

})

function accepteFriendRequest(){

   // e.preventDefault();
    socket.emit('accepteFriendRequest',{
        myId: myId,
        myname: myname,
        myphoto: myphoto,
        friendId: userId,
        friendname: username,
        friendphoto: photo 
    })
}

socket.on('accepterequest',()=>{
    document.getElementById('rejectBtn').remove();
    document.getElementById('accepteBtn').remove();
    friendsDiv.innerHTML += "<button type='button' class='btn btn-addfriend mr-3' id='deleteBtn' onclick='deleteFriendRequest()'>Delete Friend</button>"
})

function deleteFriendRequest(){

   // e.preventDefault();
    socket.emit('deleteFriendRequest',{
        myId: myId,
        myname: myname,
        myphoto: myphoto,
        friendId: userId,
        friendname: username ,
        friendphoto: photo 
    })
}

socket.on('deleterequest',()=>{
    
    document.getElementById('deleteBtn').remove()
    friendsDiv.innerHTML += "<button type='button' class='btn btn-addfriend mr-3' id='deleteBtn' onclick='sendFriendRequest()' ><i class='fa fa-user-plus'></i> Add Friend</button>"
})

