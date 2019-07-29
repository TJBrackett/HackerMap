const db = require('./dbCon.js')

module.exports = querySite = (siteUrl) => {
    return new Promise((resolve, reject) => {
        db.query('select * from site where siteURL=?',
            [siteUrl], (err, results) => {
            if (err) {
                reject(err)
            }
            else if (results === undefined || results.length == 0) {
                db.query('insert into site(siteURL, siteCounter) values(?,?)', 
                    [siteUrl, 1], (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(result.insertId)
                    }
                })
            } else {
                const counter = results[0].siteCounter
                const pk_site = results[0].PK_site

                db.query('update site set siteCounter=? where PK_site=?',
                    [counter + 1, pk_site], (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(pk_site)
                    }
                })
            }
        })
    })
}
