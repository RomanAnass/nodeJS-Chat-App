const socket = io();

const myId = document.getElementById('userId').value;
const notification = document.getElementById('notification');

console.log(socket.connected);
socket.on('connect', ()=>{
    socket.emit('joinNotificationRom',myId);
});

socket.on('NewFriendRequest',(data)=>{
    console.log(data);
    
    notification.innerHTML += "<li><div class='col-md-2 col-sm-2 col-xs-2'>" +
    "<div class='notify-img'><img src='/images/users/"+data.Myphoto+"'"+"alt='notification user image'>"+
    "</div></div><div class='col-md-10 col-sm-10 col-xs-10'><a href='#' class='notification-user'>"+ data.myname+"</a>"+
    "<span class='notification-type'> send you  a friend request </span><a href='#' class='notification-for'>PHP</a>"+
    "<a href='#' class='notify-right-icon'><i class='bx bx-radio-circle-marked'></i></a>"+
    "<p class='time'><span class='badge badge-pill badge-primary'><i class='bx bxs-group'></i></span> 3h</p></div></li>";
    
});