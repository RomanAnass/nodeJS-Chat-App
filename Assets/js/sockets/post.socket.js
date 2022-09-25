const photo        =  document.getElementById('photoprofile').value;
const username     =  document.getElementById('username').value;
const content      =  document.getElementById('postForm').value


function sendNewPost(){
   // e.preventDefault();
   console.log(1)
    socket.emit('post',{
        myId: myId,
        username: username,
        photo: photo,
        content: content
    })
    console.log(2)
}

socket.on('newPost',data=> {
    console.log(data);
})