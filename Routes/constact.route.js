const express = require('express');
const route = express.Router();

const bodyParser = require('body-parser');
const constactController = require('../Controllers/constact.controller');

route.get('/',constactController.getConstact);

route.post('/',bodyParser.urlencoded({extended : true}),constactController.postConstact)

module.exports = route;