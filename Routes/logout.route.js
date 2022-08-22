const express = require('express');
const route = express.Router();
const authguard = require('./guards/auth.guard');
const logout = require('../Controllers/logout.controller');

route.get('/',authguard.isAuth,logout.logout);

module.exports = route;