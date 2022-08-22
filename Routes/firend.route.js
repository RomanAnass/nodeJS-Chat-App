const express = require('express');
const route = express.Router();
const friendController = require('../Controllers/friend.controller');
const authguard = require('./guards/auth.guard');

route.get('/',authguard.isAuth,friendController.getfriend);

module.exports = route;