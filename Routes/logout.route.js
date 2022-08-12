const express = require('express');
const route = express.Router();

route.get('/',(req,res)=>{
    res.redirect('/signin');
});

module.exports = route;