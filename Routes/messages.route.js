const express = require('express');
const route = express.Router();
const messageController = require('../Controllers/messages.controller')
const authguard = require('./guards/auth.guard');

route.get('/:chatId',authguard.isAuth,messageController.getMessage);

module.exports = route;