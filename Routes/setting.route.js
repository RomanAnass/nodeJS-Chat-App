const express = require('express');
const route = express.Router();
const settingController = require('../Controllers/setting.controller');
const bodyParser = require('body-parser');

route.get('/',settingController.getsetting);

route.post('/',bodyParser.urlencoded({extended: true}),settingController.postSetting);

module.exports = route;