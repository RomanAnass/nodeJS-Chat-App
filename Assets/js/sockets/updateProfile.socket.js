
document.getElementById('updateProfilePicInput').addEventListener('change', function() {
    
   console.log(1)
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
    console.log("image : ",Imagename);
   // img.src = `http//localhost:3000/image/${Imagename}`;
    //photo.src = `http//localhost:3000/image/${Imagename}`;

    img.src = `http://localhost:3000/image/${Imagename}`;
    photo.src = `http://localhost:3000/image/${Imagename}`;

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