const homeControler = require('../Controllers/home.controller');

const express = require('express');
const route = express.Router();
const authguard = require('./guards/auth.guard');

route.get('/',authguard.isAuth,homeControler.getHome);
route.get('/image/:id',authguard.isAuth,homeControler.getImage);
route.get('/postImage/:id',authguard.isAuth,homeControler.getpostImage);
route.get('/postVideo/:id',authguard.isAuth,homeControler.getpostVideo);
route.get('/userImage/images/users/:id',authguard.isAuth,homeControler.getuserImage);

module.exports = route;