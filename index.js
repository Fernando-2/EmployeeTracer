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
const addDepartments = () => {
	inquirer.prompt([
		{
			name: "departmentName",
			type: "input",
			message: "Enter the name of the department you would like to add:"
		},
	]).then(postDepartment => {
		connection.query("INSERT INTO department(name) VALUES(?)", [postDepartment.departmentName], function (err, postData) {
			if (err)
				throw err;

			// console.log(postData.insertId);
			console.log("department has successfully been created!");

			displayCO();
		});
	});
}
const addRole = () => {
	connection.query("SELECT * FROM department", function (err, res) {
	  if (err) throw err
  
	  return inquirer.prompt([
  
		{
		  type: "input",
		  name: "title",
		  message: "Enter the title of the role you would like to add:",
  
		},
		{
		  type: "input",
		  name: "salary",
		  //this is a joke
		  message: "How much does this roll make before tax:"
		},
		{
		  type: "list",
		  name: "department",
		  message: "What department will this role be in?",
		  choices: () => {
			let departmentArray = [];
			for (let i = 0; i < res.length; i++) {
			  departmentArray.push(res[i].name + " | " + res[i].id);
			}
			return departmentArray;
		  }
		}
	  ]).then((postRole) => {
		let deptID = postRole.department.split("|")[1];
  
		connection.query(
			"INSERT INTO role(title, salary, department_id) VALUES (?,?,?)",[postRole.title,postRole.salary,deptID], function (err, postData) {
			if (err) throw err;
			console.log("role added successfully");
			// Returns to the first screen to select options
			displayCO();
		  }
		)
	  })
	})
  }


const addEmployee = () => {
	inquirer.prompt([
		{
			name: "employeeName",
			type: "input",
			message: "Enter the name of the department you would like to add:"
		},
	]).then(postDepartment => {
		connection.query("INSERT INTO department(name) VALUES(?)", [postDepartment.departmentName], function (err, postData) {
			if (err)
				throw err;

			// console.log(postData.insertId);
			console.log("Product has successfully been created!");

			displayMenu();
		});
	});
}

