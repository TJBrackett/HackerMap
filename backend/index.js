const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.route('/logs')
    .post((req, res, next) => {
        res.setHeader('Content-Type', 'application/json')
        testPost = JSON.stringify(req.body)
        console.log('Posted:\n' + testPost)
        res.end(testPost)
    })

app.listen(8080)