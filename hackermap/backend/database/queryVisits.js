//Tables: FK_geo, FK_ip, FK_site, FK_login, date, time. All FK column allow null so login should be alone when logging in and be null the rest of the time
const db = require('./dbCon.js')

module.exports = queryReq = (geo, ip, site, date, time) => {
    return new Promise((resolve, reject) => {
        db.query('insert into requests (FK_geo, FK_ip, FK_site, date, time) values (?,?,?,?,?)',
        [geo, ip, site, date, time],
        (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results.insertId)
            }
        })
    })
}