const mongoose = require('mongoose');
const User = require('./user.model').User;
const bcrypt = require('bcrypt');

const server = '127.0.0.1:27017'; 
const database = 'nodeJS-Chat-App';

exports.login = (data)=>{  
    
    return new Promise((resolve,reject)=>{
        mongoose.connect(`mongodb://${server}/${database}`)
        .then(()=>{
            return User.findOne({email: data.email})
        })
        .then((user)=>{
            if(!user){
                mongoose.disconnect();
                reject("user is not exist");
            }
            
             bcrypt.compare(data.password,user.password).then((result)=>{
                if(!result){
                   mongoose.disconnect();
                   reject("password is incorrect");
                }
                mongoose.disconnect()
                resolve(user)
           })
        })
        .catch((err)=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.loginGoogle = (data)=>{  
    
    return new Promise((resolve,reject)=>{
        mongoose.connect(`mongodb://${server}/${database}`)
        .then(()=>{
            return User.findOne({google: data.google})
        })
        .then((user)=>{
            if(!user){
                mongoose.disconnect();
                reject("user is not exist");
            }
            
            mongoose.disconnect()
            resolve(user)
           
        })
        .catch((err)=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}