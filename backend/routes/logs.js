const express = require('express')
const request = require('request')
const db = require('../database/dbCon.js')

const app = module.exports = express()

//TODO - Make entire structure promise based.
//       Make queries for ip/geo/site check for duplicates and then modify visit
app.post('/logs', (req, res, next) => {
    const date = new Date()
    const reqDate = date.toLocaleDateString();
    const reqTime = date.toLocaleTimeString('en-us', {hour12: false});
    console.log(reqDate)
    console.log(reqTime)
    //Save incoming info into a JSON object
    let postInfo = {
        ipAddr: req.body.ipAddr,
        reqType: req.body.reqType,
        reqItem: req.body.reqItem,
        reqStatus: req.body.reqStatus,
        reqUrl: req.body.reqUrl,
        date: reqDate,
        time: reqTime
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

            //Checks if city entry already exists to prevent duplicates
            db.query('select * from geo where geoCity=?',[locationInfo.city], (err, results) => {
                if (err) {
                    throw err
                } else if (results === undefined || results.length == 0) {
                    db.query('insert into geo (geoLat, geoLong, geoCity, geoRegion, geoCountry, geoFlag) values (?,?,?,?,?,?)',
                            [locationInfo.lat, locationInfo.long, locationInfo.city, locationInfo.region, locationInfo.country, locationInfo.flag], 
                            (err, results) => {
                        if (err) {
                            throw err
                        } else {
                            console.log("insert " + results[0])
                        }
                    })
                } else {
                    console.log("else " + results[0].PK_geo)
                }
            })
        }
    })
    res.end("That's all folks!")
})