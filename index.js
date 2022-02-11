const cookieParser = require('cookie-parser');
const express  = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

// extract styles and scripts from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(expressLayouts);



// set up the view engine 
app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
    name: 'bsocial',
    secret:"sometingcool",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router 
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log('error running the server');
    }
    console.log(`server is up and running at port ${port}`);
})