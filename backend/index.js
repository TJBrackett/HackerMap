const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.route('/logs')
    .all((req, res, next) => {
        res.setHeader('Content-Type', 'application/json')
        console.log('Posted:\n' + JSON.stringify(req.body))
        res.end(JSON.stringify(req.body))
    }).post((req, res, next) =>{
        testPost = JSON.parse(req.body)
        console.log("POST: " + testPost)
    })

app.listen(8080)