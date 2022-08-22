const express = require('express');
const route = express.Router();

const bodyParser = require('body-parser');
const constactController = require('../Controllers/constact.controller');
const authguard = require('./guards/auth.guard');

route.get('/',authguard.isAuth,constactController.getConstact);

route.post('/',authguard.isAuth,bodyParser.urlencoded({extended : true}),constactController.postConstact)

module.exports = route;