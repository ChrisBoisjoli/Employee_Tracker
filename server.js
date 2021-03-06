var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",
    password: "",
    database: "employee_trackerDB",

});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected to " + connection.threadId);
    connection.end();
});