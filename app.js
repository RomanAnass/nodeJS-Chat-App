// Les modules installés
const express = require('express');
// Les modules préinstallé
const path = require('path');
const session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);

// propre modules
const signin = require('./Routes/login.route');
const signup = require('./Routes/signup.route');
const home = require('./Routes/home.route');
const about = require('./Routes/about.route');
const logout = require('./Routes/logout.route');
const messages = require('./Routes/message.route');
const friend = require('./Routes/firend.route');
const profile = require('./Routes/profile.route');
const groups = require('./Routes/group.route');
const constact = require('./Routes/constact.route');
const settings = require('./Routes/setting.route');
const passport = require("passport");
const settingsPassword = require('./Routes/setting-password.route');
const app = express();
const bodyParser = require('body-parser');
const { Server } = require('http');
const server = require('http').createServer(app); 
const io = require('socket.io')(server);

const getFriendRequest = require('./Models/user.model').getFriendRequests;


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname,'Assets')));

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/nodeJS-Chat-App',
    collection: 'Sessions'
  });

app.use(session({
    secret: 'somethingsecretgoeshere',
    resave: false,
    saveUninitialized: true,
    store: store
 }));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

require('./sockets/init')(io);
require('./sockets/friend')(io);
require('./sockets/updateProfile')(io);

app.use((req,res,next)=>{
    if(req.session.userId){
 
        getFriendRequest(req.session.userId).then(requests =>{
         
            req.friendRequests = requests
            next()

        }).catch(error => res.redirect('/error'));

    }else{

        next();
    }
})

app.use('/',home);
app.use('/messages',messages);
app.use('/friends',friend);
app.use('/settings',settings);
app.use('/settings-password',settingsPassword);
app.use('/settings-contact',constact);
app.use('/groups',groups);
app.use('/profile',profile);
app.use('/signin',signin);
app.use('/signup',signup);
app.use('/about',about);
app.use('/logout',logout);


app.use((req,res,next)=>{
    res.render('error',{pageTitle : 'error'})
})

const port = '3000'
const  hostname = 'localhost'

server.listen(port,()=>{
    console.log(`http://${hostname}:${port}`);
})


