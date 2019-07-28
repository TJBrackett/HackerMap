var mysql = require('mysql')

var dbCon = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: "hackermap"
})

dbCon.connect((err) =>{
    if (err) throw err;
})


module.exports = dbCon
