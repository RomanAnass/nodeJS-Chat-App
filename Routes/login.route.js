const express = require('express');
const route = express.Router();

const bodyParser = require('body-parser');
const loginController = require('../Controllers/login.controller');
const authguard = require('./guards/auth.guard');

route.get('/',authguard.noAuth,loginController.getLogin);

route.post('/',authguard.noAuth,bodyParser.urlencoded({extended : true}),loginController.postLogin);

module.exports = route;