const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/logs', (req, res) => {
    let testPost = JSON.stringify(req.body)
    console.log(testPost)
})

app.listen(8080)