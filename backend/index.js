const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use((req, res) =>{
    let test = JSON.parse(req.body)
    res.setHeader('Content-Type', 'application/json')
    console.log('Posted:\n' + test.test)
})

app.post('/logs', (req, res) => {
    console.log(req.body)
})

app.listen(8080)