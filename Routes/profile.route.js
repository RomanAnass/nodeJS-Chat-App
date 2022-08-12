const express = require('express');
const route = express.Router();
const profileController = require('../Controllers/profile.controller');

route.get('/',profileController.getProfile);

module.exports = route;