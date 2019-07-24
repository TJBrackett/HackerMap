const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.route('/logs')
    .all((req, res, next) => {
        res.setHeader('Content-Type', 'application/json')
        testPost = JSON.stringify(req.body)
        console.log('Posted:\n' + testPost)
    }).post((req, res, next) =>{
        console.log("POST: " + testPost)
        res.end(testPost)
    })

app.listen(8080)