const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../database/dbCon.js')
const jwt = require('jsonwebtoken')
const queryLogin = require('../database/postLogin.js')
const app = module.exports = express()


app.post('/login', async (req, res, next) => {
    const user = await req.body.user
    const pw = await req.body.pw
    const date =  new Date()
    const reqDate = date.toLocaleDateString();
    const reqTime = date.toLocaleTimeString('en-us', {hour12: false});

    return new Promise((resolve, reject) => {
        db.query('select * from login where user=?',
            [user], async (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    const hash = await results[0].password
                    const pk_login = await results[0].PK_login
                    await bcrypt.compare(pw, hash, async (err, response) => {
                        if (err || !response) {
                            reject(err)
                        } else {
                            await jwt.sign({ user: user, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, process.env.JWT_KEY, async (err, token) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    queryLogin(pk_login, reqDate, reqTime)
                                    resolve(res.json({
                                            token: token
                                    }))
                                }
                            })
                        }
                    })
                }
            })
    })
})




//Adds users to db

// const saltRounds = await 12
// const pw = await req.body.pw
// const user = await req.body.user
// console.log(req.body)
// await bcrypt.genSalt(saltRounds, async (err, salt) => {
//     if (err) {
//         throw err
//     } else {
//         await bcrypt.hash(pw, salt, async (err, hash) => {
//             if (err) {
//                 throw err
//             } else {
//                 return new Promise((resolve, reject) => {
//                     db.query('insert into login(user, password) values(?,?)',
//                         [user, hash], (err, results) => {
//                             if (err) {
//                                 reject(err)
//                             } else {
//                                 console.log(results[0].hash)
//                                 bcrypt.compare("test", hash, (err, res) =>{
//                                     console.log(res)
//                                 })
//                             }
//                         })
//                 })
//             }
//         })
//     }
// })
