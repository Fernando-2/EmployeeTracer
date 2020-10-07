require('dotenv').config();
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");

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
			choices: ["Add departments","Add role","Add Employee", "View departments", "View roles", "View employees", "Update employee roles"],
			message: "What would you like to do:"
		}
	]).then(({ companyChoice }) => {
		switch (companyChoice) {
			case "Add departments":
				addDepartments();
				break;
			case "Add role":
				addRole();
				break;
			case "Add Employee":
				addEmployee();
				break;
			case "View departments":
				viewDepartments();
				break;
			case "View roles":
				viewRoles();
				break;
			case "View employees":
				viewEmployees();
				break;
			case "Update employee roles":
				updateEmployee();
				break;
			default:
				connection.end();
		}
	});
};



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
					//creates empty array
					let departmentArray = [];
					//loops through all department names pushes them to array and adds | in between name and id
					for (let i = 0; i < res.length; i++) {
						departmentArray.push(res[i].name + " | " + res[i].id);
					}
					//returns array everything in array as a choice
					return departmentArray;
				}
			}
		]).then((postRole) => {
			//creates a let variable with the department id inside of alongside the id number 
			let deptID = postRole.department.split("|")[1];

			connection.query(
				"INSERT INTO role(title, salary, department_id) VALUES (?,?,?)", [postRole.title, postRole.salary, deptID], function (err, postData) {
					if (err) throw err;
					console.log("role added successfully");
					
					displayCO();
				}
			)
		})
	})
}
//dont know why it didnt work when i called it from the previous addto function
const addEmployee = () => {
	connection.query("SELECT * FROM role", (err, res) => {
		if (err) throw err

		return inquirer.prompt([

			{
				type: "input",
				name: "firstName",
				message: "Please enter the employee's first name:",

			},
			{
				type: "input",
				name: "lastName",
				message: "Please enter the employee's last name:"
			},
			{
				type: "list",
				name: "role",
				message: "What role is this employee filling?",
				choices: () => {
					let roleArray = [];
					for (let i = 0; i < res.length; i++) {
						roleArray.push(res[i].title + " | " + res[i].id);
					}
					return roleArray;
				}
			}
		]).then((employee) => {
			let roleID = employee.role.split("|")[1];
			connection.query("SELECT * FROM employee", (err, res) => {
				inquirer.prompt([
					{
						type: "list",
						name: "manager",
						message: "Who will this employee report to?",
						choices: () => {
							let managerArray = [];
							for (let i = 0; i < res.length; i++) {
								managerArray.push(res[i].first_name + res[i].last_name + " | " + res[i].id);
							}
							console.log()
							return managerArray;
						}
					}

				]).then((choice) => {
					let managerID = choice.manager.split("|")[1];
					connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${employee.firstName}", "${employee.lastName}", ${roleID}, ${managerID}) `, (err, res) => {
						if (err) throw err;
						// Log all results of the SELECT statement
						console.log(`${employee.firstName} ${employee.lastName}  has been hired`);
					})
					console.log("");
					displayCO();
				})
			})
		})
	})
}
const viewEmployees = () => {
	connection.query("SELECT * FROM employee", function (err, res) {
	  if (err) throw err;
	  // Log all results of the SELECT statement
	  console.table(res);
	  displayCO();
	});
  }
  
  const viewDepartments = () => {
	connection.query("SELECT * FROM department", function (err, res) {
	  if (err) throw err;
	  console.table(res);
	  displayCO();
	});
  }
  
  const viewRoles = () => {
	connection.query("SELECT * FROM role", function (err, res) {
	  if (err) throw err;
	  console.table(res);
	  displayCO();
	});
  }
