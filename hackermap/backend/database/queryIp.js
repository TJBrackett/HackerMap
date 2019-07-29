const db = require('./dbCon.js')

module.exports = queryIp = (geo, ipAddr) => {
    return new Promise((resolve, reject) => {
    //Checks for duplicate entry
    db.query('select * from ip where ipAddr=?', [ipAddr], (err, results) => {
            if (err) {
                reject(err)

            //If no duplicate is found, insert
            } else if (results === undefined || results.length == 0) {
                db.query('insert into ip (FK_geo, ipAddr, ipCounter, ipBanned) values (?,?,?,?)',
                    [geo, ipAddr, 1, 0], (err, result) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(result.insertId)
                        }
                    })
                    
            //If duplicate found, increment visit counter
            } else {
                const counter = results[0].ipCounter
                const pk_ip = results[0].PK_ip
                db.query('update ip set ipCounter=? where PK_ip=?', [counter + 1, pk_ip], (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(pk_ip)
                    }
                })
            }
        })

    })
}