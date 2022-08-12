const express = require('express');
const route = express.Router();
const settingController = require('../Controllers/setting.controller');


route.get('/',settingController.getsetting);

module.exports = route;