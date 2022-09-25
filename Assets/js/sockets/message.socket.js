const chatId = document.getElementById('chatId').value;
const RecieveId = document.getElementById('recieveId'); 


socket.emit('chat',chatId);


document.getElementById('msg-text').addEventListener('keydown',(e)=>{

    if(e.key === 'Enter'){
        socket.emit('newMessage',{
            chat: chatId,
            Sender: myId,
            message: e.target.value 
        })
    }
});

socket.on('message',message =>{
    console.log(message)
})
