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
    pageTitle : 'SignUp',
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
        const newUser = {
                facebook: profile.id,
                fullname: profile.displayName,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                email: profile.emails[0].value,
                image: `https://graph.facebook.com/${profile.id}/picture?type=large`
            }
        console.log(profile.id);
        signupModel.createNewUser_facebook(newUser).then(user =>{
          return done(null, profile);
        }).catch(err =>{
            res.redirect('/signin')
        });
       
      }
));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.callbackURL
},
function(accessToken, refreshToken, profile, done) {
    userProfile=profile;
    const newUser = {
                google: profile.id,
                fullname: profile.displayName,
                lastname: profile.name.familyName,
                firstname: profile.name.givenName,
                email: profile.emails[0].value,
                image: profile.photos[0].value
            }

console.log("email : ",newUser);
    signupModel.createNewUser_google(newUser).then(user =>{
        return done(null,user); 
    }).catch(err =>{
      res.redirect('/signin')
    })
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
        confirmPassword : req.body.confirmPassword,
        phoneNumber: req.body.phoneNumber
    })
    .then((result)=>{
      console.log(result)
      res.redirect('/signin')
    })
    .catch(err =>{
      console.log(err)
      res.redirect('/signup')
    })
   
}