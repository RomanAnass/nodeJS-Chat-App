const express = require('express');
const route = express.Router();
const settingController = require('../Controllers/setting.controller');
const bodyParser = require('body-parser');
const authguard = require('./guards/auth.guard');

route.get('/',authguard.isAuth,settingController.getsetting);

route.post('/',authguard.isAuth,bodyParser.urlencoded({extended: true}),settingController.postSetting);

module.exports = route;