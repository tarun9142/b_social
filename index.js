const express  = require('express');
const app = express();
port = 8000;

app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log('error running the server');
    }
    console.log(`server is up and running at port ${port}`);
})