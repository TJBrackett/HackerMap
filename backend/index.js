const express = require('express');
const bodyParser = require('body-parser');
//const access_key = require('info.env')
const app = express();
const reqDate = new Date();
const http = require('http')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use((req, res, next) => {
    next()
})

app.post('/logs', (req, res, next) => {
    let postInfo = {
        ipAddr: req.body.ipAddr,
        reqType: req.body.reqType,
        reqItem: req.body.reqItem,
        reqStatus: req.body.reqStatus,
        reqUrl: req.body.reqUrl
    }
    
    const geoApi = "http://api.ipstack.com/" + postInfo.ipAddr + "?access_key=dc6b650b1595b16e1f0027954af5c1bd"

    http.get(geoApi, (err, res) => {
        let geoInfo = res

        console.log(err)
        console.log(geoInfo)
    })
    console.log('Posted:\n' + reqDate)
    res.end("Post recieved successfully")
})

app.listen(8080)