const mongoose = require('mongoose');
const User = require('./user.model').User;

const server = "127.0.0.1:27017";
const database = "nodeJS-Chat-App";

exports.updateAccount = async (filter,update) =>{
   try {
      await mongoose.connect(`mongodb://${server}/${database}`);
      await User.findOneAndUpdate(filter,update);
      mongoose.disconnect();
      return;
   } catch (error) {
      mongoose.disconnect();
      return error;
   }
}