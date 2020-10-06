require('dotenv').config();
const inquirer = require("inquirer");
const ListPrompt = require('inquirer/lib/prompts/list');
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: process.env.MYSQL_PASS,
	database: "company_db"
});
connection.connect(err => {
	if (err)
		throw err;

	displayCO();
});

const displayCO = () => {
	inquirer.prompt([
		{
			name: "companyChoice",
			type: "list",
			choices: ["Add departments, roles, employees", "View departments, roles, employees", "Update employee roles"],
			message: "What would you like to do:"
		}
	]).then(({ companyChoice }) => {
		switch (companyChoice) {
			case "Add departments, roles, employees":
				addTo();
				break;
			case "View departments, roles, employees":
				viewEmployee();
				break;
			case "Update employee roles":
				updateEmployee();
				break;
		}
	});
};
const addTo = () => {
	inquirer.prompt([
		{
			name: "addChoice",
			type: "list",
			choices: ["Add departments", "Add role", "Add Employee "],
			message: "What would you like to do:"
		},
	]).then(({ addChoice }) => {
		switch (addChoice) {
         case "Add departments":
			 addDepartments();
			 break;
		case "Add role":
			addRole();
			break;
		case "Add Employee":
			addEmployee();
			break;
		}

	});
}
const addDepartments = ()=>{
	inquirer.prompt([
		{
			name: "departmentName",
			type: "input",
			message: "Enter the name of the department you would like to add:"
		},
	])}

const addRole = ()=>{
	inquirer.prompt([
		{
			name: "roleName",
			type: "input",
			message: "Enter the name of the department you would like to add:"
		},
	])}


const addEmployee = ()=>{
	inquirer.prompt([
		{
			name: "employeeName",
			type: "input",
			message: "Enter the name of the department you would like to add:"
		},
	])}

