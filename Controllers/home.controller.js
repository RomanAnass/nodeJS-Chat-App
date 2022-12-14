const loginModel = require('../Models/home.model');
const UserModal = require('../Models/user.model');
const fs = require("fs");
const path = require('path');

exports.getHome = (req,res,next) => {
    UserModal.getPosts(req.session.userId)
    .then(posts =>{
        console.log(posts);
        res.render('home',{
            pageTitle : 'Home',
            IsUser: req.session.userId,
            firstname: req.session.firstname,
            lastname: req.session.lastname,
            friendRequests: req.friendRequests,
            date_naissance: req.session.date_naissance,
            myphoto: req.session.photo,
            email: req.session.email, 
            notifications: req.notifications,
            username: req.session.username,
            posts : posts  
           })

    })
    .catch(err =>{
        console.log(err);
    })
    

     // console.log(req.posts);
}


exports.getImage = (req, res) => {
    console.log(333)
    fs.readFile(
        path.join(__dirname,'..','Assets','images','users',req.params.id),

        function (err, image) {
            if (err) {
                throw err;
            }
           // console.log(image);
           
            res.setHeader('Content-Type', 'image/jpg');
            res.setHeader('Content-Length', ''); // Image size here
            res.setHeader('Access-Control-Allow-Origin', '*'); // If needs to be public
            res.send(image);
        }
    );

}

exports.getpostImage = (req, res) => {
    fs.readFile(
        path.join(__dirname,'..','Assets','images','posts',req.params.id),

        function (err, image) {
            if (err) {
                throw err;
            }
           // console.log(image);
           
            res.setHeader('Content-Type', 'image/jpg');
            res.setHeader('Content-Length', ''); // Image size here
            res.setHeader('Access-Control-Allow-Origin', '*'); // If needs to be public
            res.send(image);
        }
    );

}

exports.getpostVideo = (req, res) => {
    fs.readFile(
        path.join(__dirname,'..','Assets','videos','posts',req.params.id),

        function (err, image) {
            if (err) {
                throw err;
            }
           // console.log(image);
           
            res.setHeader('Content-Type', 'video/mp4');
            res.setHeader('Content-Length', ''); // Image size here
            res.setHeader('Access-Control-Allow-Origin', '*'); // If needs to be public
            res.send(image);
        }
    );

}

exports.getuserImage = (req, res) => {
    console.log(333)
    fs.readFile(
        path.join(__dirname,'..','Assets','images','users',req.params.id),

        function (err, image) {
            if (err) {
                throw err;
            }
           // console.log(image);
           
            res.setHeader('Content-Type', 'image/jpg');
            res.setHeader('Content-Length', ''); // Image size here
            res.setHeader('Access-Control-Allow-Origin', '*'); // If needs to be public
            res.send(image);
        }
    );

}