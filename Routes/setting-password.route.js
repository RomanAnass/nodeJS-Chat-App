const express = require('express');
const route = express.Router();
const settingPasswordController = require('../Controllers/setting-password.controller');
const bodyParser = require('body-parser');

route.get('/',settingPasswordController.getSettingPassword);

route.post('/',bodyParser.urlencoded({extended: true}),settingPasswordController.postSettingPassword);

module.exports = route;