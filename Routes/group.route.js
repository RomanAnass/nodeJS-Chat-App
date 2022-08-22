const express = require('express');
const route = express.Router();
const groupControlller = require('../Controllers/groupe.controller');
const authguard = require('./guards/auth.guard');

route.get('/',authguard.isAuth,groupControlller.getgroups);

module.exports= route;