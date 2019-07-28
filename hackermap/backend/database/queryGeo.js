const db = require('./dbCon.js')

module.exports = queryGeo = (lat, long, city, region, country, flag) => {
    return new Promise((resolve, reject) => {
        db.query('select * from geo where geoCity=?', [city], (err, results) => {
            if (err) {
                reject(err)
            } else if (results === undefined || results.length == 0) {
                db.query('insert into geo (geoLat, geoLong, geoCity, geoRegion, geoCountry, geoFlag) values (?,?,?,?,?,?)',
                    [lat, long, city, region, country, flag],
                    (err, result) => {
                        if (err) {
                            reject(err)
                        } else {
                            console.log(result.insertId)
                            resolve(result.insertId)
                        }
                    })
            } else {
                console.log(results[0].PK_geo)
                resolve(results[0].PK_geo)
            }
        })
    })
}
