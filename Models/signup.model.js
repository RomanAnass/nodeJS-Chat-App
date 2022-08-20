const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('./user.model').User;

const server = '127.0.0.1:27017';
const database = 'nodeJS-Chat-App';


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
               username: data.firstname +' '+  data.lastname,
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
