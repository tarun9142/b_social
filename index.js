const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddlewares = require('./config/middlewares');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

// make uploads path available for the borwser
app.use('/uploads', express.static(__dirname+'/uploads'));

// extract styles and scripts from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(expressLayouts);



// set up the view engine 
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db 
app.use(session({
    name: 'bsocial',
    secret: "sometingcool",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: ('mongodb://localhost/b_social_database'),
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect-mongo setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddlewares.setFlash);
// use express router 
app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log('error running the server');
    }
    console.log(`server is up and running at port ${port}`);
})