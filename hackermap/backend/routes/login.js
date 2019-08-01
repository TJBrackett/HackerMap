const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../database/dbCon.js')
const jwt = require('jsonwebtoken')
const app = module.exports = express()


app.post('/login', async (req, res, next) => {
    const user = req.body.user
    const pw = req.body.pw

    return new Promise((resolve, reject) => {
        db.query('select password from login where user=?',
            [user], async (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    const hash = results[0].password
                    await bcrypt.compare(pw, hash, async (err, response) => {
                        if (err || !response) {
                            reject(err)
                        } else {
                            await jwt.sign({ user: user, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, process.env.JWT_KEY, (err, token) => {
                                if (err) {
                                    reject(err)
                                } else {
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
// const pw = await ''
// const user = await ''
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
