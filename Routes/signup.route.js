const express = require('express');
const passport = require('passport');

const route = express.Router();

const signupController = require('../Controllers/signup.controller');
const bodyParser = require('body-parser');

route.get('/',signupController.getSignup);

route.post('/',bodyParser.urlencoded({extended : true}),signupController.postSignup);

route.get("/auth/facebook", passport.authenticate("facebook"));

route.get("/auth/facebook/callback",passport.authenticate("facebook", {successRedirect: "/",failureRedirect: "/error"}));
      
route.get('/auth/google',passport.authenticate('google', { scope : ['profile', 'email'] }));

route.get('/auth/google/callback', 
        passport.authenticate('google', { failureRedirect: '/error' }),
        function(req, res) {
        // Successful authentication, redirect success.
        res.redirect('/');
    });

module.exports = route;