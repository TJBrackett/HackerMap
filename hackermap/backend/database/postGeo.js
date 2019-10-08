const db = require('./dbCon.js')

module.exports = queryGeo = (lat, long, city, region, country, flag) => {
    return new Promise((resolve, reject) => {
        //Checks for duplicate entry
        db.query('select * from geo where geoCity=?', [city], (err, results) => {
            if (err) {
                reject(err)

            //If no duplicate is found, insert
            } else if (results === undefined || results.length == 0) {
                db.query('insert into geo (geoLat, geoLong, geoCity, geoRegion, geoCountry, geoFlag) values (?,?,?,?,?,?)',
                    [lat, long, city, region, country, flag],
                    (err, result) => {
                        if (err) {
                            reject(err)
                        } else {
                            // Return PK of entry
                            resolve(result.insertId)
                        }
                    })

            //If duplicate found, return PK of entry
            } else {
                resolve(results[0].PK_geo)
            }
        })
    })
}
