// Installations required for the app
const showBanner = require('node-banner');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

(async () => {
    await showBanner("Employee\nManager", '----------------------------------------');
    init();
})();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employee_tracker'
});
// prompts 
const prompts = [
    {
        name: 'View All Departments',
        value: 'departments'
    },
    {
        name: 'View All roles',
        value: 'roles'
    },
    {
        name: 'View All Employees',
        value: 'employees'
    },
    {
        name: 'Add Department',
        value: 'addDepartment'
    },
    {
        name: 'Add Role',
        value: 'addRole'
    },
    {
        name: 'Add Employee',
        value: 'addEmployee'
    },
    {
        name: 'Update Employee',
        value: 'updateEmployee'
    },
    {
        name: 'Quit',
        value: 'quit'
    }
];
// inquirer function
function init() {
    inquirer
        .prompt({
            type: 'list',
            name: 'todo',
            message: 'What would you like to do?',
            choices: prompts
        })
        .then((answers) => {
            if (answers.todo === "departments") {
                show_departments();
            } else if (answers.todo === "roles") {
                show_roles();
            } else if (answers.todo === "employees") {
                show_employees();
            } else if (answers.todo === "addDepartment") {
                add_department();
            } else if (answers.todo === "addRole") {
                add_role();
            } else if (answers.todo === "addEmployee") {
                add_employee();
            } else if (answers.todo === "updateEmployee") {
                update_employee();
            } else if (answers.todo === "quit") {
                process.exit();
            }
        })
        .catch((error) => {
            if (error.isTtyError) {
                // if Prompt couldn't be rendered in the current environment
                console.log(error);
            } else {
                console.log("Something else went wrong");
                console.log(error);
            }
        });
}
function show_departments() {
    connection.query(
        'SELECT * FROM `departments` ORDER BY name',
        function (err, results, fields) {
            console.table(results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
            process.exit();
        }
    )
}
function show_roles() {
    connection.query(
        'SELECT * FROM `roles` ORDER BY title',
        function (err, results, fields) {
            console.table(results); // results contains rows returned by server
            // console.log(fields); // fields contains extra meta data about results, if available
            process.exit();
        }
    )
}
function show_employees() {
    connection.query(
        `
            SELECT
                employees.id,
                employees.first_name,
                employees.last_name,
                roles.title,
                departments.name AS department,
                roles.salary,
                CONCAT(M.first_name, ' ', M.last_name) AS manager
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
function add_department() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the new department',
            }
        ]).then((answers) => {
            connection.query(
                `INSERT INTO departments (name) VALUE ('${answers.name}')`,
                function (err, results, fields) {
                    if (err) {
                        console.log(err);
                    }
                    if (results) {
                        console.log(`Added ${answers.name} to the departments`);
                    }
                    process.exit();
                }
            );
        });
}
function add_role() {
    connection.query(
        `SELECT name, id AS value FROM departments`,
        function (err, results, fields) {
            if (err) {
                console.log(err);
                process.exit();
            }
            if (results) {
                let departments = results;
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'title',
                            message: 'What is the name of the new role'
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'What is the salary for this role'
                        },
                        {
                            type: 'list',
                            name: 'department',
                            message: 'Which department does the role belong to',
                            choices: departments
                        }
                    ]).then((answers) => {
                        connection.query(
                            `INSERT INTO roles (title, salary, department_id) VALUE ('${answers.title}', '${answers.salary}', '${answers.department}')`,
                            function (err, results, fields) {
                                if (err) {
                                    console.log(err);
                                }
                                if (results) {
                                    console.log(`Added ${answers.title} to the roles`);
                                }
                                process.exit();
                            }
                        );
                    });
            }
        }
    );
}
function add_employee() {
    // To do get roles from the database via query
    const roles = [
        { name: 'Sale Person', value: 1 },
        { name: 'Lead Engineer', value: 2 },
        { name: 'Software Engineer', value: 3 },
        { name: 'Account Manager', value: 4 },
        { name: 'Accountant', value: 5},
        { name: 'Legal Team Lead', value: 6},
        { name: 'Lawyer', value: 7}
    
    ];
    const managers = [
        { name: 'Ashley Rodriguez', value: 1 },
        { name: 'Kunal Singh', value: 2 },
        { name: 'Sarah Lourd', value: 3 },
    ];
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the employees first name?',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the employees last name?'
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'What is the employees role?',
                choices: roles,
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Who is the employees manager',
                choices: managers,
            }
        ]).then((answers) => {
            connection.query(
                `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUE ('${answers.first_name}','${answers.last_name}', ${answers.role_id}, ${answers.manager_id})`,
                function (err, results, fields) {
                    if (err) {
                        console.log(err);
                    }
                    if (results) {
                        console.log(`Added ${answers.first_name} to the Employees`);
                    }
                    process.exit();
                }
            );
        });
}
function update_employee() {
    // To do get roles from the database via query
    const employees = [
        { name: 'Ashely Rodriguez', value: 1 },
        { name: 'Kunal Singh', value: 2 },
        { name: 'Sarah Lourd', value: 3 },
        { name: 'Tom Allen', value: 4 },
        { name: 'Malia Brown', value: 5},
        { name: 'Kevin Tupik', value: 6},
        { name: 'Mike Chan', value: 7},
        { name: 'John Doe', value: 8}
    ];
    const roles = [
        { name: 'Sale Person', value: 1 },
        { name: 'Lead Engineer', value: 2 },
        { name: 'Software Engineer', value: 3 },
        { name: 'Account Manager', value: 4 },
        { name: 'Accountant', value: 5},
        { name: 'Legal Team Lead', value: 6},
        { name: 'Lawyer', value: 7}
    
    ];
    inquirer
        .prompt([
            {
                type: 'number',
                name: 'id',
                message: 'What is the id of the imployee?',
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'What is the employees new role?',
                choices: roles,
            },
            
        ]).then((answers) => {
            connection.query(
                `INSERT INTO employees (id, role_id) VALUE (${answers.id},'${answers.role_id}')`,
                function (err, results, fields) {
                    if (err) {
                        console.log(err);
                    }
                    if (results) {
                        console.log(`Added ${answers.id} to the Employees`);
                    }
                    process.exit();
                }
            );
        });
}