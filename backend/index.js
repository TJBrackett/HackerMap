//Imports private data such as API keys
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')
const app = express();

const reqDate = new Date();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Always called when the api is hit. Will use for logging.
app.use((req, res, next) => {
    next()
})
//When address:port/logs is hit, execute.
app.post('/logs', (req, res, next) => {
//Save incoming info into a JSON object
    let postInfo = {
        ipAddr: req.body.ipAddr,
        reqType: req.body.reqType,
        reqItem: req.body.reqItem,
        reqStatus: req.body.reqStatus,
        reqUrl: req.body.reqUrl
    }
//URL for ip geolocation lookup (Switching to Google Maps) 
    const geoApi = "http://api.ipstack.com/" + postInfo.ipAddr + "?access_key=cb18c83bb4439722743b882ff7ac329d&format=1"
//Calls the geolocation API
    request(geoApi, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body.latitude)
        console.log(body.longitude);
        console.log(body.city);
        console.log(body.region_name);
        console.log(body.country_name);
    });
//Closes connection and sends final message.
    res.end(postInfo.ipAddr)
})

app.listen(8080)