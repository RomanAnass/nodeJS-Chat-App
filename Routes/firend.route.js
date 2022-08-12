const express = require('express');
const route = express.Router();
const friendController = require('../Controllers/friend.controller');

route.get('/',friendController.getfriend);

module.exports = route;