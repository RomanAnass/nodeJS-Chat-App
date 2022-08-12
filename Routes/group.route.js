const express = require('express');
const route = express.Router();
const groupControlller = require('../Controllers/groupe.controller');

route.get('/',groupControlller.getgroups);

module.exports= route;