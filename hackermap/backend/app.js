//Imports private data such as API keys
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const logs = require('./routes/logs')
const login = require('./routes/login')
const http = require('http')
const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(logs)
app.use(login)


http.createServer(app).listen(process.env.HTTP_PORT, () => {
    console.log(`Http server started on port ${process.env.HTTP_PORT}`);
});

// https.createServer(app).listen(process.env.HTTPS_PORT, () => {
//     console.log(`Http server started on port ${process.env.HTTPS_PORT}`);
// });