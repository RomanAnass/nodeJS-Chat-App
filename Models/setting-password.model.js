const mongoose = require('mongoose');
const User = require('./user.model').User;
const bcrypt = require('bcrypt');

const server = '127.0.0.1:27017';
const database = 'nodeJS-Chat-App';

exports.updatePassword = async (filter,NewPassword,cureentpassword) =>{
    try {
        await mongoose.connect(`mongodb://${server}/${database}`);
        user = await User.findOne(filter);
        const isValid = await bcrypt.compare(cureentpassword,user.password);
        if(!isValid){
            mongoose.disconnect();
            return 'current password is incorrect';
        }

        const update = {password: await bcrypt.hash(NewPassword,10)};
        await User.findOneAndUpdate(filter,update);
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        return error;
    }
}