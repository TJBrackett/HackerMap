const db = require('./dbCon.js')

module.exports = queryGeo = (lat, long, city, region, country, flag) => {
    db.query('select * from geo where geoCity=?', [city], (err, results) => {
        if (err) {
            throw err
        } else if (results === undefined || results.length == 0) {
            db.query('insert into geo (geoLat, geoLong, geoCity, geoRegion, geoCountry, geoFlag) values (?,?,?,?,?,?)',
                [lat, long, city, region, country, flag],
                (err, result) => {
                    if (err) {
                        throw err
                    } else {
                        return result.insertId
                    }
                })
        } else {
            return results[0].PK_geo
        }
    })
}
