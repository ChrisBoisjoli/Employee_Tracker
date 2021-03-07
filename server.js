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
    showDepartment();
    showRole();
    connection.end();
});

function showEmployee(){
    let sql = "SELECT * FROM employee";
    connection.query(sql, function(err, res){
        if (err) throw err;
        console.table(res);
    });
};

function showDepartment(){
    let sql = "SELECT * FROM department";
    connection.query(sql, function(err, res){
        if (err) throw err;
        console.table(res);
    });
};
function showRole(){
    let sql = "SELECT * FROM role";
    connection.query(sql, function(err, res){
        if (err) throw err;
        console.table(res);
    });
};