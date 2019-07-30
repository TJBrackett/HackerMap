const express = require('express')
const request = require('request')
const db = require('../database/dbCon.js')
const queryGeo = require('../database/queryGeo.js')
const queryReq = require('../database/queryReq.js')
const queryIp = require('../database/queryIp.js')
const querySite = require('../database/querySite.js')
const queryVisits = require('../database/queryVisits.js')

const app = module.exports = express()

app.post('/logs', (req, res, next) => {
    const date = new Date()
    const reqDate = date.toLocaleDateString();
    const reqTime = date.toLocaleTimeString('en-us', {hour12: false});
    const postInfo = {
        ipAddr: req.body.ipAddr,
        reqType: req.body.reqType,
        reqItem: req.body.reqItem,
        reqStatus: req.body.reqStatus,
        reqUrl: req.body.reqUrl
    }
    //URL for ip geolocation lookup (Switching to Google Maps) 
    const geoApi = "http://api.ipstack.com/" + postInfo.ipAddr + "?access_key=" + process.env.GEO_IP + "&format=1"
  
    //Calls the geolocation API
    request(geoApi, { json: true }, async (err, res, body) => {
        if (err) {
            throw err
        } else {
            let locationInfo = {
                lat: body.latitude,
                long: body.longitude,
                city: body.city,
                region: body.region_name,
                country: body.country_name,
                flag: body.location.country_flag_emoji_unicode
            }
            
            const pk_geo = await queryGeo(locationInfo.lat, locationInfo.long, locationInfo.city, locationInfo.region, locationInfo.country, locationInfo.flag)
            const pk_ip = await queryIp(pk_geo, postInfo.ipAddr)
            const pk_site = await querySite(postInfo.reqUrl)
            const pk_visits = await queryVisits(pk_geo, pk_ip, pk_site, reqDate, reqTime)
            const pk_req = await queryReq(pk_site, pk_ip, postInfo.reqStatus, postInfo.reqItem, postInfo.reqType)

            // const sendData = await request({
            //     url: "http://localhost:3000",
            //     method: "POST",
            //     body: {hello: "world"},
            //     json: true
            // })
            // console.log(sendData)
        }
    })

    res.end("That's all folks! Que Loonie Toons music?")
})