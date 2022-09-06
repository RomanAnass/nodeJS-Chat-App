const homeControler = require('../Controllers/home.controller');

const express = require('express');
const route = express.Router();
const authguard = require('./guards/auth.guard');

route.get('/',authguard.isAuth,homeControler.getHome);
route.get('/:id',authguard.isAuth,homeControler.getImage);

module.exports = route;