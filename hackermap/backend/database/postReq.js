//Tables: FK_sites, FK_ip, reqStatus, reqItem, reqType
const db = require('./dbCon.js')

module.exports = queryReq = (site, ip, status, item, type) => {
    return new Promise((resolve, reject) => {
        db.query('insert into requests (FK_sites, FK_ip, reqStatus, reqItem, reqType) values (?,?,?,?,?)',
        [site, ip, status, item, type],
        (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results.insertId)
            }
        })
    })
}