const inquirer = require("inquirer");
    //Build a command-line application that at a minimum allows the user to:

    // Add departments, roles, employees
    //add department
    //add role
    //add employee

    // View departments, roles, employees
    //view all departments 
    //view all roles
    //view all employees
    
    // Update employee roles  

    //what would you like to do?
    //view all employees
    //add employee
    //add department
    //view all departments
   
    
const questions = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "choices",
        choices: ["view all employees", "add employee", "add role", "add department","view all departments", "view all roles", "update employee role", "exit"],
        default: "ex: view all employees",
    },
    // {
    //     type: "input",
    //     name: "name",
    //     message: "What is your Employee's name?",
    //     default: "Employee Name",
        
    // },
   
    // {
    //     type: "input",
    //     name: "id",
    //     message: "What is your Employee's ID?",
    //     default: "0",
    // },
    // {
    //     type: "input",
    //     name: "email",
    //     message: "What is your Employee's email?",
    //     validate:  function(email)
    //     {if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email)){
    //         return true;
    //         }
    //         else {
    //         return "enter a valid email";
    //         }
    //     }
    // },
    // {
    //     type: "input",
    //     name: "github",
    //     when: function (employee){
    //         return employee.role === "Engineer";},
    //     message: 'What is Engineer GitHub user name?',
    //     default: "GitHub",   
    // },
    // {
    //     type: "input",
    //     name: "officeNumber",
    //     when: function (employee){
    //         return employee.role === "Manager";},
    //     message: "What is your Manager's office number?",
    //     default: "0",
        
    // },
    // {
    //     type: "input",
    //     name: "school",
    //     when: function (employee){
    //         return employee.role === "Intern";},
    //     message: "What is the Inter's school?",
    //     default: "School",

    // },
    // {
    //     type: "confirm",
    //     name: "addAnother",
    //     message:"Do you want to add another team member?",
    //     default: true,
        
    // },
    
            ];
module.exports = questions;