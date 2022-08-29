const mongoose = require('mongoose');
const User = require('./user.model').User;

const server = 'localhost:27017';
const database = 'nodeJS-Chat-App';

exports.NewRequest = async (update,filter)=>{
  
    await mongoose.connect(`mongodb://${server}/${database}`);
     
}