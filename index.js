const inquirer = require('inquirer');

const questions = require("./questions");

function init(){
 inquirer.prompt(questions).then((response) => console.log(response))
};
init()