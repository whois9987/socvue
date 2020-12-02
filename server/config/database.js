const mysql = require('mysql');
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "socvue",
});

connection.connect(function(error) {
    if (error) throw error;
});

module.exports = connection;