const inquirer = require("inquirer");

    //Please Build your Team
    //Setting prompts to dry up code
const questions = [
    {
        type: "input",
        name: "name",
        message: "What is your Employee's name?",
        default: "Employee Name",
        
    },
    {
        type: "list",
        message: "What is your Employee's role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"],
        default: "ex: Manager",
    },
    {
        type: "input",
        name: "id",
        message: "What is your Employee's ID?",
        default: "0",
    },
    {
        type: "input",
        name: "email",
        message: "What is your Employee's email?",
        validate:  function(email)
        {if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email)){
            return true;
            }
            else {
            return "enter a valid email";
            }
        }
    },
    {
        type: "input",
        name: "github",
        when: function (employee){
            return employee.role === "Engineer";},
        message: 'What is Engineer GitHub user name?',
        default: "GitHub",   
    },
    {
        type: "input",
        name: "officeNumber",
        when: function (employee){
            return employee.role === "Manager";},
        message: "What is your Manager's office number?",
        default: "0",
        
    },
    {
        type: "input",
        name: "school",
        when: function (employee){
            return employee.role === "Intern";},
        message: "What is the Inter's school?",
        default: "School",

    },
    {
        type: "confirm",
        name: "addAnother",
        message:"Do you want to add another team member?",
        default: true,
        
    },
    
            ];
module.exports = questions;