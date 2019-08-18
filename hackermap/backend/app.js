//Imports private data such as API keys and passwords
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const logs = require('./routes/logs')
const login = require('./routes/login')
const http = require('http')
const app = express()

//CORS

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//Parse incoming data

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes

app.use(logs) //./routes/logs
app.use(login) //./routes/login

//Starts the server at the designated port and console logs when it's running

http.createServer(app).listen(process.env.HTTP_PORT, () => {
    console.log(`Http server started on port ${process.env.HTTP_PORT}`);
});

// https.createServer(app).listen(process.env.HTTPS_PORT, () => {
//     console.log(`Http server started on port ${process.env.HTTPS_PORT}`);
// });