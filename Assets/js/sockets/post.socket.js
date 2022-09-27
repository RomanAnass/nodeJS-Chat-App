const photo        =  document.getElementById('photoprofile').value;
const username     =  document.getElementById('username').value;
const content      =  document.getElementById('postForm')


function sendNewPost(){
    socket.emit('post',{
        myId: myId,
        username: username,
        photo: photo,
        content: content.value
    })
    console.log(2)
}

socket.on('newPost',data=> {
    console.log(data);
})