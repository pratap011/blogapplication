var sql = require('mysql')

var connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blogapp',
    port: '3306'
})

connection.connect((error) => {
    if (error) {
        console.log(error)
    }
    else {
        console.log('connected to the database')
    }
})

module.exports = connection;
