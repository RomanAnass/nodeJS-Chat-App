const express = require('express');
const route = express.Router();
const settingPasswordController = require('../Controllers/setting-password.controller');

route.get('/',settingPasswordController.getSettingPassword);

module.exports = route;