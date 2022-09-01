const mongoose = require('mongoose');


const server = 'localhost:27017';
const database = 'nodeJS-Chat-App';

const chatSchema = mongoose.Schema({
    users: [{type: mongoose.Schema.ObjectId,ref:'user'}]
});

const Chat = mongoose.model('chat',chatSchema);

exports.Chat = Chat;

exports.getChat = async chatId =>{
   
    
    try {
        await mongoose.connect(`mongodb://${server}/${database}`);
        let chat = await Chat.findById(chatId).populate('users');
        mongoose.disconnect();
        return chat;
    } catch (error) {
        mongoose.disconnect();
        throw new Error;
    }  
}