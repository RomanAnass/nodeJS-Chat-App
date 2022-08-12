const signupModel = require('../Models/signup.model');
const passport = require("passport");
const dotenv =  require("dotenv");
const strategy = require("passport-facebook");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const FacebookStrategy = strategy.Strategy;

dotenv.config();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

exports.getSignup = (req,res,next)=>{
   res.render('signup',{
    pageTitle : 'SignUp'
   }) 
}

passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields:['id', 'displayName', 'photos', 'email']
      },
      function(accessToken, refreshToken, profile, done) {
        console.log(profile._json);
        const {id, name, picture } = profile._json;
        const userData =
        {id,
          name,
          picture};

        //new userModel(userData).save();
        signupModel.createNewUser(userData);
        done(null, profile);
      }
));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.callbackURL
},
function(accessToken, refreshToken, profile, done) {
    userProfile=profile;
    signupModel.createNewUser(userProfile);
    return done(null, userProfile);
}
));



exports.postSignup = (req,res,next) =>{
    signupModel.createNewUser({
        firstname : req.body.firstName,
        lastname : req.body.lastName,
        email : req.body.emailAddress,
        phone : req.body.phoneNumber,
        day : req.body.day,
        month : req.body.month,
        year : req.body.year,
        password : req.body.password,
        confirmPassword : req.body.confirmPassword
    });
    
    res.redirect('/signin')
}