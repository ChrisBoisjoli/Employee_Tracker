const inquirer = require('inquirer');
const questions = require("./questions");
const Roles = require("./lib/roles");
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

// connection.connect(function(err){
//     if (err) throw err;
//     console.log("connected to " + connection.threadId);
//     // showEmployee();
//     // showDepartment();
//     // showRole();
//     // showRoster();
//     connection.end();
// });
// 
const start = () => {
inquirer
.prompt({
    name: "choices",
    type: "list",
    message: "What would you like to do?",
    choices: ["view all employees", "add employee", "add role", "add department","view all departments", "view all roles", "update employee role", "exit"]
})
.then((answer) => {
  // based on their answer, either call the bid or the post functions
  if (answer.choices === 'view all employees') {
    showRoster();
  } 
  else if (answer.choices === 'add employee'){

  }
  else if (answer.choices === 'add role'){}
  else if (answer.choices === 'add department'){}
  else if (answer.choices === 'view all departments'){
    showDepartment();
  }
  else if (answer.choices === 'view all roles'){
    showRole();
  }
  else if (answer.choices === 'update employee role'){}
  else if (answer.choices === 'exit'){console.log("connection ended")
  connection.end();}
    else {
    connection.end();
  }
});
};



function showRoster(){
    //Name then Role then department
    let sql = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id  FROM employee INNER JOIN role ON role.role_id = employee.role_id INNER JOIN department ON role.department_id = department.department_id ORDER BY employee.id";
    connection.query(sql, function(err, res){
        if (err) throw err;
        console.table(res);
    
    });
    start();
};

function showDepartment(){
    let sql = "SELECT * FROM department";
    connection.query(sql, function(err, res){
        if (err) throw err;
        console.table(res);
    });
    start();
};
function showRole(){
    let sql = "SELECT * FROM role";
    connection.query(sql, function(err, res){
        if (err) throw err;
        console.table(res);
    });
    start();
};

connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
  
// function init(){
//  inquirer.prompt(questions).then((response) => 
//  {if (response.choices === 'view all roles')
// {showRole();}
// else connection.end();})
// };
// init()