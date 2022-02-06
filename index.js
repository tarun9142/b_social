const cookieParser = require('cookie-parser');
const express  = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
port = 8000;

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

// extract styles and scripts from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(expressLayouts);

// use express router 
app.use('/',require('./routes'));

// set up the view engine 
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log('error running the server');
    }
    console.log(`server is up and running at port ${port}`);
})