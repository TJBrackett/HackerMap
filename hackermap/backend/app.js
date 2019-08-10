//Imports private data such as API keys
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const logs = require('./routes/logs')
const login = require('./routes/login')
const http = require('http')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(logs)
app.use(login)


http.createServer(app).listen(process.env.PORT, () => {
    console.log(`Http server started on port ${process.env.PORT}`);
});