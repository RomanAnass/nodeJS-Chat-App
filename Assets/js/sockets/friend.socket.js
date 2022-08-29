const addfriendBtn = document.getElementById('addfriendBtn');

const myname = document.getElementById('myname').value;
const Myphoto= document.getElementById('Myphoto').value;
const friendId = document.getElementById('friendId').value;
const username = document.getElementById('username').value;
const friendPhoto = document.getElementById('friendPhoto').value;


addfriendBtn.onclick  = (e) =>{
    e.preventDefault();
    socket.emit('sendFriendRequest',{
        myId: myId,
        myname: myname,
        Myphoto: Myphoto,
        friendId: friendId,
        username: username ,
        friendPhoto: friendPhoto 
    })
};

socket.on('requestSent',()=>{
    console.log(1);
    addfriendBtn.innerText = 'Cancel Request';
})
