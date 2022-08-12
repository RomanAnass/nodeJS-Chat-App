const express = require('express');
const route = express.Router();
const messageController = require('../Controllers/message.controller')

route.get('/',messageController.getMessage);

module.exports = route;