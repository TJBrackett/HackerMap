const db = require('./dbCon.js')

module.exports = queryVisits = (login, date, time) => {
    return new Promise((resolve, reject) => {
        db.query('insert into visits (FK_login, date, time) values (?,?,?)',
        [login, date, time],
        (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results.insertId)
            }
        })
    })
}