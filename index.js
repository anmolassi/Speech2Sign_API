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
app.use('/',require('./routes'));//it will move to routes/index.js for furthur 
var ip = require('ip');
var geoip = require('geoip-lite');
// app.get('/',function(req,res){
//     // var clientIp = requestIp.getClientIp(req)
//     // var clientIp=ip.address();
//     var clientIp=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//     clientIp=clientIp.split(',');
//     res.send(`Your IP Address is ${clientIp[0]}.`);
//     console.log(geoip.lookup(clientIp[0]));
// })
app.use(express.urlencoded({extended:false}));
app.listen(port,function(err){
    if(err)
    {
        console.log('Error: ',err);
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});