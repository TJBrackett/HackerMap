const mysql = require('mysql')

const dbCon = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: "hackermap"
})

dbCon.connect((err) =>{
    if (err) throw err;
})


module.exports = dbCon
