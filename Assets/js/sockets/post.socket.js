const photo        =  document.getElementById('photoprofile').value;
const username     =  document.getElementById('username').value;
const content      =  document.getElementById('postForm');

function sendNewPost(){
    const image = document.getElementById('fileImage');
    const reader = new FileReader();
    const filename = image.files[0].name;

    reader.onload = function(event) {
    
        const bytes = new Uint8Array(event.target.result); 
        socket.emit('post',{
            myId: myId,
            username: username,
            photo: photo,
            caption: content.value,
            bytes : bytes,
            filename: filename
        })
        };
    reader.readAsArrayBuffer(image.files[0]);
}

function previewPostImage(self) {
    var file = self.files;
    filename = file[0].name;
    if (file.length > 0) {
        var fileReader = new FileReader();

        fileReader.onload = function (event) {
            document.getElementById("post-img-preview").style.display = "";
            document.getElementById("post-img-preview").setAttribute("src", event.target.result);
            bytes = new Uint8Array(event.target.result);
        };

        fileReader.readAsDataURL(file[0]);
    }
}

socket.on('newPost',data=> {
    console.log(data);
})