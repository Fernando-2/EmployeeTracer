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
	// let object = {};
	// let departmentEmpty = [];
	connection.query('SELECT department.name ,department.id FROM department', function (err, res) {
		if (err)
			throw err;
			console.log(res)
		  let departmentID = res
	// 	for (i = 0; i < res.length; i++) {
	// 		object[i] = { id: res[i].id, name: res[i].departmentName }
	// 		departmentEmpty.push(object[i]);
	// 	};

		inquirer.prompt([
			{
				name: "title",
				type: "input",
				message: "Enter the title of the role you would like to add:"
			},
			{
				name: "salary",
				type: "input",
				//this is a joke
				message: "How much does this roll make before tax:"
			},
			{
				name: "roleDepartment",
				type: "list",
				choices:departmentID,
				message: "Select the department for this role:"
			},
		]).then(postRole => {
			// let departmentID = "";
			// for(i =0;i<departmentEmpty.length;i++){
			// 	if(postRole.roleDepartment == departmentEmpty[i].name){
			// 		departmentID = departmentEmpty[i].id;
			// 	}
			// }
			connection.query("INSERT INTO role(title, salary, department_id) VALUES(?,?)", [postRole.title,postRole.salary,postRole.departmentID], function (err, postData) {
				if (err)
					throw err;

				// console.log(postData.insertId);
				console.log("Product has successfully been created!");
				//displays options from beginning after action is done
				displayCO();
			});
		});
	});
};


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

