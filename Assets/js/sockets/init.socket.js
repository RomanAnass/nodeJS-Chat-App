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


document.getElementById('updateProfilePicInput').addEventListener('change', function() {
    

    if (this.files[0].type && !this.files[0].type.startsWith('image/')) {
        console.log('File is not an image.', file.type, file);
        return;
    }

    const reader = new FileReader();
    const Imagename = this.files[0].name;
    
    console.log(Imagename)

    reader.onload = function() {
    
    const bytes = new Uint8Array(this.result);
    
    const dataImage = {
        bytes: bytes,
        Imagename: Imagename,
        myId: myId
    };

    socket.emit('profileImage', dataImage);
    };
    reader.readAsArrayBuffer(this.files[0]);
  
}, false);


socket.on('newprofilephoto',Imagename=>{
    //var img = new Image();
    const img = document.getElementById('Profileimage');
    const photo = document.getElementById('photoprofile');
    console.log(Imagename);
    img.src = `http://localhost:3000/${Imagename}`;
    photo.src = `http://localhost:3000/${Imagename}`;

    // let blob = new Blob([new Uint8Array([buffer]).buffer]);
    //createObjectURL && asign it to ur image src
    //img.src = URL.createObjectURL(blob);
    // const image = document.getElementById('image');
    //img.remove();
    //img.src = "data:image/jpg;base64,"+buffer;  //'/images/users/user-5.png';
    //console.log(imageName)
    //const myCanvas = document.getElementById('myCanvas');
     //'data:image/jpeg;base64,'+buffer.toString('base64');
    //myCanvas.drawImage(img, 0, 0);
   // image.innerHTML += "<img src='/images/users/"+imageName+"'  id='Profileimage' alt='Avatar' class='avatar img-circle'></img>";
})