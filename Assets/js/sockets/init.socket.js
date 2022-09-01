const socket = io();

const myId = document.getElementById('myId').value;
const notification = document.getElementById('notification');


socket.on('connect', ()=>{
    socket.emit('joinNotificationRom',myId);
});

socket.on('NewFriendRequest',(data)=>{
    notification.innerHTML += "<li><div class='col-md-2 col-sm-2 col-xs-2'>" +
    "<div class='notify-img'><a href='/profile/"+ data.friendId +"'><img src='/images/users/"+data.friendphoto+"'"+"alt='notification user image'></a>"+
    "</div></div><div class='col-md-10 col-sm-10 col-xs-10'><a href='/profile/"+ data.friendId +"' class='notification-user'>"+ data.friendname+"</a>"+
    "<span class='notification-type'> send you  a friend request </span><a href='#' class='notification-for'>PHP</a>"+
    "<a href='#' class='notify-right-icon'><i class='bx bx-radio-circle-marked'></i></a>"+
    "<p class='time'><span class='badge badge-pill badge-primary'><i class='bx bxs-group'></i></span> 3h</p></div></li>"; 
});