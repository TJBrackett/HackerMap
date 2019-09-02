const express = require('express')
const request = require('request')
const queryIp = require('../database/postIp.js')
const queryGeo = require('../database/postGeo.js')
const queryReq = require('../database/postReq.js')
const querySite = require('../database/postSite.js')
const queryVisits = require('../database/postVisits.js')
const getAll = require('../database/getAll.js')
const events = require('events')
const em = new events.EventEmitter()
em.setMaxListeners(0)

//Allows for the logs module (everything in this file) to be called in app.js

const app = module.exports = express()

//Called when a post request is made to http://localhost:PORT/logs

app.post('/logs', async (req, res, next) => {
    const date = new Date()
    const reqDate = date.toLocaleDateString();
    const reqTime = date.toLocaleTimeString('en-us', { hour12: false });

    //Parse incoming json data
    //Req = request, body = the json object, ipAddr (etc) = the targeted field

    const postInfo = {
        ipAddr: req.body.ipAddr,
        reqType: req.body.reqType,
        reqItem: req.body.reqItem,
        reqStatus: req.body.reqStatus,
        reqUrl: req.body.reqUrl
    }

    //URL for ip geolocation lookup (Switching to Google Maps) 

    const geoApi = `http://api.ipstack.com/${postInfo.ipAddr}?access_key=${process.env.GEO_IP}&format=1`

    //Calls the geolocation API

    request(geoApi, { json: true }, async (err, res, body) => {
        if (err) {
            throw err
        } else {
            //Incoming data from ipstack api
            let locationInfo = {
                lat: body.latitude,
                long: body.longitude,
                city: body.city,
                region: body.region_name,
                country: body.country_name,
                flag: body.location.country_flag_emoji_unicode
            }

            //Each of these consts calls a query from the db and sets the data to the variable, then the variables are used as foreign keys
            const pk_geo = await queryGeo(locationInfo.lat, locationInfo.long, locationInfo.city, locationInfo.region, locationInfo.country, locationInfo.flag)
            const pk_ip = await queryIp(pk_geo, postInfo.ipAddr)
            const pk_site = await querySite(postInfo.reqUrl)
            const pk_visits = await queryVisits(pk_geo, pk_ip, pk_site, reqDate, reqTime)
            const pk_req = await queryReq(pk_site, pk_ip, postInfo.reqStatus, postInfo.reqItem, postInfo.reqType)
            //Setup the data to send to the front
            const resJson = await {
                postInfo: postInfo,
                locationInfo: locationInfo
            }
            await em.emit("locationData", app.set("geoData", JSON.stringify(locationInfo))) //Stringify data being sent due to it having to be sent over text/event-stream
        }
    })

    //Emits an event trigger whenever data is received to the post route
    await em.emit("postData", app.set("sendData", JSON.stringify(postInfo))) //Stringify data being sent due to it having to be sent over text/event-stream
    res.end()
})

//Called when a get request is made to http://localhost:PORT/logs
app.get('/logs', async (req, res) => {
    if (req.headers.accept == 'text/event-stream') {
        //On a status 200(everythings ok), sets header to keep connection alive, don't cache, and the content type to text/eventstream
        res.status(200).set({
            "connection": "keep-alive", //Required
            "cache-control": "no-cache", //Not required, but is a really good idea
            "content-Type": "text/event-stream" //Required
        })

        //Once the postData event it triggered, send data
        await em.on("postData", async () => {
            let sendData = await app.get("sendData")

            if (sendData !== undefined && sendData !== "") {
                // Write keeps the connection open, where send or end would kill the connection to the front
                await res.write(`id: ${Date.now()}\ndata: ${sendData}\n\n`)
                // em.removeListener("postData", app.set("sendData", ""))
                sendData = ""
                em.removeAllListeners()
            }
        })
    } else {
        res.end("Your browser does not support event-streams.")
    }
})