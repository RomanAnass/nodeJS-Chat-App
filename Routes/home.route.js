const homeControler = require('../Controllers/home.controller');

const express = require('express');
const route = express.Router();
const authguard = require('./guards/auth.guard');

route.get('/',authguard.isAuth,homeControler.getHome);

module.exports = route;