const db = require('./dbCon.js')

module.exports = queryIp = (geo, ipAddr) => {
    db.query('select * from ip where ipAddr=?', [ipAddr], (err, results) => {
        return new Promise((resolve, reject) => {
            if (err) {
                reject(err)
            } else if (results === undefined || results.length == 0) {
                db.query('insert into ip (FK_geo, ipAddr, ipCounter, ipBanned) values (?,?,?,?)',
                    [geo, ipAddr, 1, 0], (err, result) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(result.insertId)
                        }
                    })
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