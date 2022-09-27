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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
    notifications: {
        type: [{id: String, friendname: String, friendphoto: String, Type: String ,isRead: {type: Boolean, default: true}}],
        default: [] 
    },
>>>>>>> 39751f9 (share new post)
>>>>>>> 210d3e7 (share new post)
    sentRequests: {
        type: [{id: String, name: String, photo: String}],
        default: []
    },
    friends: {
        type: [{id: String, name: String, photo: String, chatId: String}],
        default: []
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 210d3e7 (share new post)
    }  
});

const User = mongoose.model('Users', UserSchema);
<<<<<<< HEAD
=======
=======
    },
    myPosts: [{
        id: String,
        name: String,
        photo: String,
        content: String,
        createdAt: Number
    }],
    friendPosts: [{
        friendId: String,
        name: String,
        photo: String, 
        content: String,
        createdAt: Number,
    }],
    newMessage: [{
        chatId: String,
        name: String,
        photo: String, 
        content: String,
        createdAt: Number
    }]
});

const User = mongoose.model('user', UserSchema);
>>>>>>> 39751f9 (share new post)
>>>>>>> 210d3e7 (share new post)

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
<<<<<<< HEAD
     
        await mongoose.connect(`mongodb://${server}/${database}`);
        await User.updateOne({_id: data.friendId},{$push: {friendRequests : {id: data.myId, friendname: data.myname, friendphoto: data.myphoto}}});
=======
<<<<<<< HEAD
     
        await mongoose.connect(`mongodb://${server}/${database}`);
        await User.updateOne({_id: data.friendId},{$push: {friendRequests : {id: data.myId, friendname: data.myname, friendphoto: data.myphoto}}});
=======
        await mongoose.connect(`mongodb://${server}/${database}`);
        await  User.updateOne({_id: data.friendId},{$push: {friendRequests : {id: data.myId, friendname: data.myname, friendphoto: data.myphoto},notifications : {id: data.myId, friendname: data.myname, friendphoto: data.myphoto, Type: 'friend request'}}});
>>>>>>> 39751f9 (share new post)
>>>>>>> 210d3e7 (share new post)
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
<<<<<<< HEAD
        throw new Error(err);
    }
};
=======
<<<<<<< HEAD
        throw new Error(err);
    }
};
=======
        mongoose.disconnect();
        throw new Error(err);
    }
};

exports.getNewMessages = async (id)=>{
  
    try {
      await mongoose.connect(`mongodb://${server}/${database}`);
      const user = await User.findById(id,{newMessage: true});
      mongoose.disconnect();
      return user.newMessage; 
    } catch (error) {
        mongoose.disconnect();
        throw new Error(err);
    }
}


exports.getNotifications = async (id)=>{

    try {
        await mongoose.connect(`mongodb://${server}/${database}`);
        const user = await User.findById(id,{notifications: true});
        mongoose.disconnect(); 
        return user.notifications ;

    } catch (err) {
        mongoose.disconnect();
        throw new Error(err);
    }

}

exports.addPost = async (id,post)=>{
  
    try {
        let usersId = [];
        console.log(id);
        await mongoose.connect(`mongodb://${server}/${database}`);
        const user = await User.findByIdAndUpdate(id,{$push: {friendPosts: {friendId: post.myId,name: post.username,photo: post.photo, content: post.content, createdAt: Date.now()},
                                                    myPosts: {id: post.myId,name: post.username,photo: post.photo, content: post.content, createdAt: Date.now()}}});

        user.friends.forEach(friend =>{
           usersId.push(friend.id);
        })

        await User.updateMany({
            _id: {
                $in: usersId
            }
        },
        {$push: {notifications: {id: post.myId, friendname: post.username, friendphoto: post.photo, Type: "post"},
                friendPosts: {friendId: post.myId,name: post.username,photo: post.photo, content: post.content, createdAt: Date.now()}}}
        )

        mongoose.disconnect();
        return usersId;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.deletePost = async ()=>{
  
    try {
        
    } catch (error) {
        
    }
}

exports.addMessage = async ()=>{
    try {
        
    } catch (error) {
        
    }
}

exports.deleteMessage = async ()=>{
    try {
        
    } catch (error) {
        
    }
}
>>>>>>> 39751f9 (share new post)
>>>>>>> 210d3e7 (share new post)
