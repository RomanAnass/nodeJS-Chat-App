const mongoose = require('mongoose');

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
    adresse: String  
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
}