const express = require('express');
const route = express.Router();

const bodyParser = require('body-parser');
const loginController = require('../Controllers/login.controller');


route.get('/',loginController.getLogin);

route.post('/',bodyParser.urlencoded({extended : true}),loginController.postLogin);

module.exports = route;