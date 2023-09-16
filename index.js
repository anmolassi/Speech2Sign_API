require('dotenv').config();
const express = require('express');
const multer = require('multer');
// const mongodb = require('mongodb');
const app = express();
const port = 5000;;
// const db=require('./config/mongoose');
var path = require('path');
const requestIp = require('request-ip')
//make the upload path available to the browser 
app.use('/uploads',express.static(__dirname + '/uploads'));
//set up the view engine
app.set('view engine', 'ejs');
app.use(express.json());
app.set('views','./views');
// app.use('/',require('./routes'));//it will move to routes/index.js for furthur 
app.get('/',function(req,res){
    // var clientIp = requestIp.getClientIp(req)
    var clientIp=req.socket.remoteAddress;

  res.send(`Your IP Address is ${clientIp}.`)
})
app.use(express.urlencoded({extended:false}));
app.listen(port,function(err){
    if(err)
    {
        console.log('Error: ',err);
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});