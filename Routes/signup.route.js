const express = require('express');
const passport = require('passport');

const route = express.Router();

const signupController = require('../Controllers/signup.controller');
const bodyParser = require('body-parser');
const authguard = require('./guards/auth.guard');

route.get('/',authguard.noAuth,signupController.getSignup);

route.post('/',authguard.noAuth,bodyParser.urlencoded({extended : true}),signupController.postSignup);

route.get("/auth/facebook",authguard.noAuth,passport.authenticate("facebook"));

route.get("/auth/facebook/callback",authguard.noAuth,passport.authenticate("facebook", {successRedirect: "/",failureRedirect: "/error"}));
      
route.get('/auth/google',authguard.noAuth,passport.authenticate('google', { scope : ['profile', 'email'] }));

route.get('/auth/google/callback',authguard.noAuth, 
        passport.authenticate('google', { failureRedirect: '/error' }),
        function(req, res) {
        // Successful authentication, redirect success.
        res.redirect('/');
    });

module.exports = route;