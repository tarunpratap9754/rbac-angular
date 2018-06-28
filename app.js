var express = require('express');
var mongoose = require('mongoose');
const cors = require('cors');
var bodyparser = require('body-parser');

var path = require('path');

var app = express();

const route = require('./route');
app.use(cors());

const port = 3000;

mongoose.connect('mongodb://tarunpratap:tarun%406068@ds237808.mlab.com:37808/userlist');
mongoose.connection.on('connected', function(){
    console.log("Connected to mongodb.");
});
mongoose.connection.on('error', function(err){
    console.log("Error in database connection " + err);
});


app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'dist/new-form')));

app.use('/api', route);

app.listen(3000, function(){
    console.log('App running on port : ' + port);
});