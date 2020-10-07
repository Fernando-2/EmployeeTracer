# EmployeeTracer
EmployeeTracer is a command line application using node.js and the Mysql
database. To start off the process I had to npm install all the packages such as
inquirer, mysql and console.table along with dotenv to hide my mysql password
and require all of them in const variables at the top. For the index.js to
connect to mysql I needed to make a const variable with the name connection
could've been any name but inside I have my password hidden in the dotenv file
and database name to use. Then I made  a connection to a function that displays
the initial inquirer prompts asking what you would like to do each of those
questions had a case with a function assigned to them. The add department
function was simple the add role and employee were difficult for role I had to
make a connection to the department table because the role goes into the
department same thing for employee but instead I made the connection to the role
table and then connected the employee table to get the manager id so the
employee can be assigned a role and a manager. Ill briefly describe how I made
it so I could select departments and roles when assigning roles to departments
and assigning roles to employees, I made a for loop in the inquirer prompt that
asked what department or role or manager and whatever your assigning it to but
before that I made a let variable that contained an empty array and in the for
loop I looped the response from the table then pushed it to the empty array
returned the array and in the .then function I made a connection to mysql to
insert the values giving by the user from the asked inquirer questions into the
mysql database and console logged some type of success comment.For all the view
statements I just established a connection to the database and put the response
in a console.table to make it appear as a table.