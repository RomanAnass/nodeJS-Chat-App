const homeControler = require('../Controllers/home.controller');

const express = require('express');
const route = express.Router();

route.get('/',homeControler.getHome);

module.exports = route;