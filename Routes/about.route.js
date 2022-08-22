const express = require('express');
const route = express.Router();

const aboutController = require('../Controllers/about.constroller');
const authguard = require('./guards/auth.guard');

route.get('/',authguard.isAuth,aboutController.getAbout);



module.exports = route;