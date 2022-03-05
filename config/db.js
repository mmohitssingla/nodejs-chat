const mysql = require('mysql');

let connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});

connection.connect(function(err){
    if(err){
        console.log("Error on connecting to database.");
    }
    else{
        console.log("Connected to database successfully.");
    }
});

module.exports = connection;
