const express = require('express');
const route = express.Router();
const messageController = require('../Controllers/message.controller')
const authguard = require('./guards/auth.guard');

route.get('/',authguard.isAuth,messageController.getMessage);

module.exports = route;