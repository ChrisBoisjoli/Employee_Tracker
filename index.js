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
    addEmployee();
  }
  else if (answer.choices === 'add role'){
    addRole();
  }
  else if (answer.choices === 'add department'){
    addDepartment();
  }
  else if (answer.choices === 'view all departments'){
    showDepartment();
  }
  else if (answer.choices === 'view all roles'){
    showRole();
  }
  else if (answer.choices === 'update employee role'){
      updateRole();
  }
  else if (answer.choices === 'exit'){console.log("Updates Complete!")
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

const addRole = () =>{
inquirer
.prompt([
    {
        name:'title',
        type:'input',
        message: 'What is the title of the role?',
    },
    {
        name:'salary',
        type:'input',
        message: 'What is the roles salary?',
    },
    {
        name:'department_id',
        type:'input',
        message: 'What is the department ID?',
        validate(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          },
    },
])
.then((answer) => {
connection.query(
    'INSERT INTO role SET ?',
    {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.department_id || 0,
    },
    (err) =>{
        if (err) throw err,
        console.log('Your role was added');
        start();
    }
);
});
};

const addEmployee = () =>{
    inquirer
    .prompt([
        {
            name:'first_name',
            type:'input',
            message: 'What is the first name?',
        },
        {
            name:'last_name',
            type:'input',
            message: 'What is the last name?',
        },
        {
            name:'role_id',
            type:'input',
            message: 'What is the role ID?',
            validate(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              },
        },
    ])
    .then((answer) => {
    connection.query(
        'INSERT INTO employee SET ?',
        {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id || 0,
        },
        (err) =>{
            if (err) throw err,
            console.log('Your employee was added');
            start();
        }
    );
    });
    };

    const addDepartment = () =>{
        inquirer
        .prompt([
            {
                name:'name',
                type:'input',
                message: 'What is the Department name?',
            },    
        ])
        .then((answer) => {
        connection.query(
            'INSERT INTO department SET ?',
            {
                name: answer.name,
            },
            (err) =>{
                if (err) throw err,
                console.log('Your department was added');
                start();
            }
        );
        });
        };
const updateRole = () => {
    connection.query('SELECT id, first_name FROM employee', (err, employeeTableRes) => {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'choice',
                type: 'rawlist',
                choices(){
                    const choiceArray = [];
                    employeeTableRes.forEach(( {first_name}) => {
                        choiceArray.push(first_name);
                    });
                    return choiceArray;
                },
                message: 'Which employee role do you want to update?',
            },
            {
                name:'role_id',
                type:'input',
                message: 'What is the role ID?',
                validate(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  },
            }
        ])
        .then((roleIdAnswer) => {
            let employeeIdChoice;
            employeeTableRes.forEach((name) => {

                if (name.first_name === roleIdAnswer.choice){
                    let employeeNameChoice = name.first_name;
                     employeeIdChoice = name.id;

                    console.log("Chosen Employee", name);

                }
            });

            connection.query(
                'UPDATE employee SET ? WHERE ?',
                [{
                    role_id: roleIdAnswer.role_id || 0,
                    
                },
                {
                    id: employeeIdChoice,
                }
            ],
                (err) => {
                    if (err) throw err;
                    console.log("role was updated");
                    start();
                },
            )
        }).catch(function(err){
            console.log(err);
        })
    })
}


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