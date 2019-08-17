const db = require('./dbCon.js')

module.exports = getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from geo;' ,(err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}