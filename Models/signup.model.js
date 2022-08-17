const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const Schema = mongoose.Schema;

const server = '127.0.0.1:27017';
const database = 'nodeJS-Chat-App';

const UserSchema = new Schema({
   firstname: String,
   lastname: String,
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: (value) => {
      return validator.isEmail(value)
      }
   },
   password: String,
   phoneNumber : String,
   photo: { type: String, default: "default-user-image.png" },
   date_naissance : Date
})

const User = mongoose.model('Users', UserSchema);

exports.User = User;

exports.createNewUser = data => {
      return new Promise((resolve,reject)=> {
         mongoose.connect(`mongodb://${server}/${database}`)
         .then(()=>{
            return User.findOne({email: data.email})
         })
         .then(user =>{
            if(user){
               mongoose.disconnect();
               reject("email is used")
            }else{
               return bcrypt.hash(data.password,10) 
            }
          })
         .then((hashpassword)=>{
             console.log(data.day+ '-'+ data.month + '-'+ data.year);
            let user = new User({
               firstname: data.firstname,
               lastname: data.lastname,
               email:  data.email,
               password: hashpassword,
               phoneNumber: data.phoneNumber,
               date_naissance: data.day+ '-'+ data.month + '-'+ data.year 
            });
            return user.save(); 

         })
         .then(()=>{
            mongoose.disconnect();
            resolve("usr is created"); 
         }) 
         .catch(err =>{
            console.log(err)
            mongoose.disconnect();
            reject(err);
         })
      })
}
