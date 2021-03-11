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

connection.connect(function(err){
    if (err) throw err;
    console.log("connected to " + connection.threadId);
    // showEmployee();
    // showDepartment();
    // showRole();
    // showRoster();
    connection.end();
});
// 
// const start = ()






// function init(){
//  inquirer.prompt(questions).then((response) => 
//  {if (response.choices === 'view all roles')
// {showRole();}
// else connection.end();})
// };
// init()