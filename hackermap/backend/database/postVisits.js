const db = require('./dbCon.js')

module.exports = queryVisits = (geo, ip, site, date, time) => {
    return new Promise((resolve, reject) => {
        db.query('insert into visits (FK_geo, FK_ip, FK_site, date, time) values (?,?,?,?,?)',
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
