const express = require('express');
const route = express.Router();

const aboutController = require('../Controllers/about.constroller');

route.get('/',aboutController.getAbout);



module.exports = route;