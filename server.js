var mysql = require("mysql");
const cTable = require('console.table');
require('dotenv').config();

var connection = mysql.createConnection(
    
    {
    host: "localhost",
    dialect: 'mysql',
    port: 3306,   
    
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected to " + connection.threadId);
    // showEmployee();
    // showDepartment();
    // showRole();
    showRoster();
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

function showRoster(){
    //Name then Role then department
    let sql = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id  FROM employee INNER JOIN role ON role.role_id = employee.role_id INNER JOIN department ON role.department_id = department.department_id ORDER BY employee.id";
    connection.query(sql, function(err, res){
        if (err) throw err;
        console.table(res);
    });
};