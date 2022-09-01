const mongoose = require('mongoose');
const User = require('./user.model').User;

const server = 'localhost:27017';
const database = 'nodeJS-Chat-App';

exports.NewFriendRequest = async (update,filter)=>{
  
    try {
     
        await mongoose.connect(`mongodb://${server}/${database}`);
        
    } catch (error) {
       console.log(err); 
    }
   
     
}