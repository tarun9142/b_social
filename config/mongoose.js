const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/b_social_database');

const db = mongoose.connection;

db.on('error', console.error.bind(console,'error connecting to mongodb'));

db.once('open',function(){
    console.log('successfully connected to mongodb');
});

module.exports = db;

