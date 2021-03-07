var mysql = require("mysql");
const cTable = require('console.table');

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
    showEmployee();
    connection.end();
});

function showEmployee(){
    let sql = "SELECT * FROM employee";
    connection.query(sql, function(err, res){
        if (err) throw err;
        console.table(res);
        res.forEach(field => {
            console.table(field.name);
        })
    });
}