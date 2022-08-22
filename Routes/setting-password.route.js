const express = require('express');
const route = express.Router();
const settingPasswordController = require('../Controllers/setting-password.controller');
const bodyParser = require('body-parser');
const authguard = require('./guards/auth.guard');

route.get('/',authguard.isAuth,settingPasswordController.getSettingPassword);

route.post('/',authguard.isAuth,bodyParser.urlencoded({extended: true}),settingPasswordController.postSettingPassword);

module.exports = route;