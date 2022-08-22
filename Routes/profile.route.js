const express = require('express');
const route = express.Router();
const profileController = require('../Controllers/profile.controller');
const authguard = require('./guards/auth.guard');

route.get('/',authguard.isAuth,profileController.getProfile);

route.get('/:id',authguard.isAuth,profileController.getProfile);

module.exports = route;