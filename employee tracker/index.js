const showBanner = require('node-banner');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

(async () => {
    await showBanner("Employee\nManager", 'All your MySQL are Belong to US');
    init();
})();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employee_tracker'
});

function init() {
    inquirer
        .prompt({
            type: 'list',
            name: 'todo',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Departments',
                    value: 'departments'
                },
                {
                    name: 'View All roles',
                    value: 'roles'
                },
                {
                    name: 'View All employees',
                    value: 'employees'
                },
                {
                    name: 'Quit',
                    value: 'quit'
                }
            ]
        })
        .then((answers) => {
            if (answers.todo === "departments") {
                show_departments();
            } else if (answers.todo === "roles") {
                show_roles();
            } else if (answers.todo === "employees") {
                show_employees();  
            } else if (answers.todo === "quit") {
                process.exit();
            }
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
                console.log(error);
            } else {
                console.log("Something else went wrong");
            }
        });
}

function show_departments(createConnection) {
    connection.query(
        'SELECT * FROM `departments` ORDER BY name',
        function (err, results, fields) {
            console.table(results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
            process.exit();
        }
    )
}
function show_roles(createConnection) {
    connection.query(
        'SELECT * FROM `roles` ORDER BY title',
        function (err, results, fields) {
            console.table(results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
            process.exit();
        }
    )
}
function show_employees(createConnection) {
    connection.query(
        `SELECT 
    employees.id, 
    employees.first_name, 
    employees.last_name, 
    roles.title, 
    departments.name AS department,
    roles.salary,
    CONCAT (M.first_name, ' ', M.last_name) AS manager
FROM employees 
    INNER JOIN roles ON employees.role_id = roles.id
    INNER JOIN departments ON roles.department_id = departments.id
    LEFT OUTER JOIN employees M ON employees.manager_id = M.id
    ;
        `,
        function (err, results, fields) {
            console.table(results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
            process.exit();
        }
    )
}