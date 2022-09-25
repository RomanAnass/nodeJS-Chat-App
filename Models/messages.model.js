const mongoose = require('mongoose');
const message = require('../sockets/message');
const chat = require('./chat.model');
const { User } = require('./user.model');

const messageSchema = mongoose.Schema({
    chat: {type: mongoose.Schema.Types.ObjectId,ref:'chat'},
    Sender: String,
    message: {type: String, required: true},
    timestamp: Number
})

const Message = mongoose.model('messages',messageSchema);

exports.Message = Message;

const server = 'localhost:27017';
const database = 'nodeJS-Chat-App';


exports.createNewMessage = async (msg)=>{
   
    try {
      
        await mongoose.connect(`mongodb://${server}/${database}`);
        console.log(msg);
        let message = new  Message(msg);
        message.timestamp = Date.now();
        await message.save();  
        mongoose.disconnect();
        return;
        
    } catch (error) {
        throw new Error(error);
    }

}

exports.getMessages = async (chatId)=>{
   
    
    try {

        await mongoose.connect(`mongodb://${server}/${database}`);
        const messages = await Message.find({chat: chatId}, null , {sort: {timestamp: 1}}).populate({
            path: 'chat',
            model: 'chat',
            populate: {
                path: 'users',
                model: 'user'
            }
    })
        mongoose.disconnect();
        return messages;

    } catch (error) {
       mongoose.disconnect();
       throw new Error(error);
    }
}