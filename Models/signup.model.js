const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

exports.createNewUser_google = data => {
   return new Promise((resolve,reject)=> {
      mongoose.connect(`mongodb://${server}/${database}`)
      .then(()=>{
         return User.findOne({google: data.google})
      })
      .then(user =>{
         if(user){
            console.log(1);
            mongoose.disconnect();
            resolve(user)
         }else{
            let user = new User({
               firstname: data.firstname,
               lastname: data.lastname,
               username: data.fullname,
               email:  data.email,
               photo: data.image,
               google: data.google
            });
            return user.save();
         }
       }) 
       .then(user =>{
         mongoose.disconnect();
         resolve(user);  
       })
      .catch(err =>{
         console.log(err)
         mongoose.disconnect();
         reject(false);
      })
   })
}

exports.createNewUser_facebook = data => {
   return new Promise((resolve,reject)=> {
      mongoose.connect(`mongodb://${server}/${database}`)
      .then(()=>{
         return User.findOne({facebook: data.facebook})
      })
      .then(user =>{
         if(user){
            mongoose.disconnect();
            reject("facebook is used")
         }else{
               //   console.log(data.day+ '-'+ data.month + '-'+ data.year);
            console.log(data)
            let user = new User({
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.fullname,
            email:  data.email,
            photo: data.image,
            facebook: data.facebook
            });
         
            return user.save(); 
         }
       })
      .then((user)=>{
         mongoose.disconnect();
         resolve(user);  
      })
      .catch(err =>{
         console.log(err)
         mongoose.disconnect();
         reject(err);
      })
   })
}