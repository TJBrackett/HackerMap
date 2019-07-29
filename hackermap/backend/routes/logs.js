const express = require('express')
const request = require('request')
const db = require('../database/dbCon.js')
const queryGeo = require('../database/queryGeo.js')
const queryIp = require('../database/queryIp.js')
const querySite = require('../database/querySite.js')
const queryVisits = require('../database/queryVisits.js')

const app = module.exports = express()

//TODO - Make entire structure promise based.
//       Make queries for ip/geo/site check for duplicates and then modify visit
app.post('/logs', (req, res, next) => {
    const date = new Date()
    const reqDate = date.toLocaleDateString();
    const reqTime = date.toLocaleTimeString('en-us', {hour12: false});
    //Save incoming info into a JSON object
    const postInfo = {
        ipAddr: req.body.ipAddr,
        reqType: req.body.reqType,
        reqItem: req.body.reqItem,
        reqStatus: req.body.reqStatus,
        reqUrl: req.body.reqUrl
    }
    //URL for ip geolocation lookup (Switching to Google Maps) 
    const geoApi = "http://api.ipstack.com/" + postInfo.ipAddr + "?access_key=" + process.env.GEO_IP + "&format=1"

    //Add FK_IP 
    // db.query('insert into site (siteURL, siteStatus, siteReqType, siteReqItem, siteCounter) values(?,?,?,?,?)',
    //     [postInfo.reqUrl, postInfo.reqStatus, postInfo.reqType, postInfo.reqItem, 1], (err) => {
    //         if (err) {
    //             throw err
    //         }
    //     })
  
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
            //Also works, but await looks better and allows for return to be stored in a variable
            // Promise.resolve(queryGeo(locationInfo.lat, locationInfo.long, locationInfo.city, locationInfo.region, locationInfo.country, locationInfo.flag))
            // .then((pk_geo) => {
            //     Promise.resolve(queryIp(pk_geo, postInfo.ipAddr))})
            // .catch(err => console.log(err))
            
            const pk_geo = await Promise.resolve(queryGeo(locationInfo.lat, locationInfo.long, locationInfo.city, locationInfo.region, locationInfo.country, locationInfo.flag))
            const pk_ip = await Promise.resolve(queryIp(pk_geo, postInfo.ipAddr))
            //const pk_site = await Promise.resolve(querySite(pk_ip, postInfo.reqStatus, postInfo.reqUrl, postInfo.reqType, postInfo.reqItem))
            //const pk_date = await Promise.resolve(queryVisits(fk_geo, fk_ip, fk_site, reqDate, reqTime))
        }
    })

    res.end("That's all folks!")
})