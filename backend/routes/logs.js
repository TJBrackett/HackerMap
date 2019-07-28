var express = require('express')
var app = module.exports = express()
const request = require('request')
const db = require('../database/dbCon.js')

const reqDate = new Date();

app.post('/logs', (req, res, next) => {
    //Save incoming info into a JSON object
    let postInfo = {
        ipAddr: req.body.ipAddr,
        reqType: req.body.reqType,
        reqItem: req.body.reqItem,
        reqStatus: req.body.reqStatus,
        reqUrl: req.body.reqUrl,
        date: reqDate
    }

    db.query('insert into site (siteURL, siteStatus, siteReqType, siteReqItem, siteCounter) values(?,?,?,?,?)',
        [postInfo.reqUrl, postInfo.reqStatus, postInfo.reqType, postInfo.reqItem, 1], (err) => {
            if (err) {
                throw err
            }
        })

    //URL for ip geolocation lookup (Switching to Google Maps) 
    const geoApi = "http://api.ipstack.com/" + postInfo.ipAddr + "?access_key=" + process.env.GEO_IP + "&format=1"

    //Calls the geolocation API
    request(geoApi, { json: true }, (err, res, body) => {
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
            db.query('select * from geo where geoCity=?',[locationInfo.city], (err, results) => {
                if (err) {
                    throw err
                } else if (results > 0) {
                    console.log(results)
                } 
        
            })
            db.query('insert into geo (geoLat, geoLong, geoCity, geoRegion, geoCountry, geoFlag) values (?,?,?,?,?,?)',
                [locationInfo.lat, locationInfo.long, locationInfo.city, locationInfo.region, locationInfo.country, locationInfo.flag], (err) => {
                    if (err) {
                        throw err
                    }
                })
        }
    })
    res.end("That's all folks!")
})