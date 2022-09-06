const mongoose = require('mongoose');
const validator = require('validator');
const Chat = require('./chat.model').Chat;

const Schema = mongoose.Schema;

const server = '127.0.0.1:27017';
const database = 'nodeJS-Chat-App';


const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    email: {
       type: String,
       required: true,
       unique: true,
       lowercase: true,
       validate: (value) => {
       return validator.isEmail(value)
       }
    },
    password: { type: String, required: true },
    phoneNumber : String,
    photo: { type: String, default: "default-user-image.png" },
    date_naissance :{ type: Date, required: true },
    adresse: String,
    friendRequests: {
        type: [{id: String, friendname: String, friendphoto: String}],
        default: []
    },
    sentRequests: {
        type: [{id: String, name: String, photo: String}],
        default: []
    },
    friends: {
        type: [{id: String, name: String, photo: String, chatId: String}],
        default: []
    }  
});

const User = mongoose.model('Users', UserSchema);

exports.User = User;

exports.getUserData = async id =>{    
    try {
        await mongoose.connect(`mongodb://${server}/${database}`);
        user = await User.findById(id);
        if(!user){
          mongoose.disconnect()
          return new Error('user is not exist'); 
        }
        return user;
    }catch (error) {
        mongoose.disconnect();
        return error; 
    }  
};

exports.sendFriendRequests = async (data)=>{
  
    try {
     
        await mongoose.connect(`mongodb://${server}/${database}`);
        await User.updateOne({_id: data.friendId},{$push: {friendRequests : {id: data.myId, friendname: data.myname, friendphoto: data.myphoto}}});
        await User.updateOne({_id: data.myId},{$push: {sentRequests : {id: data.friendId, name: data.friendname, photo: data.friendphoto}}}); 
        mongoose.disconnect();
        return;
    } catch (error) {
       mongoose.disconnect();
       throw new Error();
    }   
};

exports.cancelfriendRequests = async (data)=>{
    
    try {
         await mongoose.connect(`mongodb://${server}/${database}`);
         await User.updateOne({_id: data.myId},{$pull : {sentRequests : {id: data.friendId}}});
         await User.updateOne({_id: data.friendId},{$pull : {friendRequests : {id: data.myId}}});
         mongoose.disconnect();
         return;
    } catch (err) {
        mongoose.disconnect();
        return new Error(err);
    }
}

exports.rejectfriendRequests = async (data)=>{
    
    try {
         await mongoose.connect(`mongodb://${server}/${database}`);
         await User.updateOne({_id: data.friendId},{$pull : {sentRequests : {id: data.myId}}});
         await User.updateOne({_id: data.myId},{$pull : {friendRequests : {id: data.friendId}}});
         mongoose.disconnect();
         return;
    } catch (err) {
        mongoose.disconnect();
        return new Error(err);
    }
}

exports.acceptefriendRequests = async (data)=>{
    
    try {
         await mongoose.connect(`mongodb://${server}/${database}`);
         await User.updateOne({_id: data.friendId},{$pull : {sentRequests : {id: data.myId}}});
         await User.updateOne({_id: data.myId},{$pull : {friendRequests : {id: data.friendId}}});

         let newchat = new Chat({users: [data.myId,data.friendId]})  
         
         let chatdoc = await newchat.save();

         await User.updateOne({_id: data.myId},{$push : {friends : {
                                                                    id: data.friendId,
                                                                    name: data.friendname,
                                                                    photo: data.friendphoto,
                                                                    chatId: chatdoc._id 
                                                                     }}});
         await User.updateOne({_id: data.friendId},{$push : {friends : {
                                                                    id: data.myId,
                                                                    name: data.myname,
                                                                    photo: data.myphoto,
                                                                    chatId: chatdoc._id 
                                                                }}});
         mongoose.disconnect();
         return;
    } catch (err) {
        mongoose.disconnect();
        return new Error(err);
    }
}

exports.deletefriendRequests = async (data)=>{
    
    try {
         await mongoose.connect(`mongodb://${server}/${database}`);
         await User.updateOne({_id: data.myId},{$pull : {friends : {id: data.friendId}}});
         await User.updateOne({_id: data.friendId},{$pull : {friends : {id: data.myId}}});
         mongoose.disconnect();
         return;
    } catch (err) {
        mongoose.disconnect();
        return new Error(err);
    }
}

exports.updateprofilephoto = async (id,imagename)=>{
    try {
        await mongoose.connect(`mongodb://${server}/${database}`);
        await User.findOneAndUpdate({_id : id},{photo: imagename})
        mongoose.disconnect();
        return; 
    } catch (error) {
         mongoose.disconnect();
         return error;
    }
     
}

exports.getFriendRequests = async (id)=>{
    try {
        await mongoose.connect(`mongodb://${server}/${database}`);
        const data = await User.findById(id,{friendRequests: true});
        mongoose.disconnect();
        return data.friendRequests; 
    } catch (err) {
        throw new Error(err);
    }
};