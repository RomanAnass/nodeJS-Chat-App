const loginModel = require('../Models/home.model');
const fs = require("fs");
const path = require('path');

exports.getHome = (req,res,next) => {
    res.render('home',{
       pageTitle : 'Home',
       IsUser: req.session.userId,
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 210d3e7 (share new post)
       firstname: req.session.firstname,
       lastname: req.session.lastname,
       friendRequests: req.friendRequests,
       date_naissance: req.session.date_naissance,
       photo: req.session.photo,
       email: req.session.email 
<<<<<<< HEAD
=======
=======
       notifications: req.notifications,
       photo: req.session.photo,
       username: req.session.username
>>>>>>> 39751f9 (share new post)
>>>>>>> 210d3e7 (share new post)
      })
}


exports.getImage = (req, res) => {
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