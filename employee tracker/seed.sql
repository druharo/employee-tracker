-- seed files
-- mysql -u root employee_tracker < seed.sql

INSERT INTO departments (name) VALUES ('Sales');
INSERT INTO departments (name) VALUES ('Legal');
INSERT INTO departments (name) VALUES ('Finance');
INSERT INTO departments (name) VALUES ('Engineering');

INSERT INTO roles (title,salary,department_id) VALUES ('Sales Lead', 100000, 1);
INSERT INTO roles (title,salary,department_id) VALUES ('Salesperson', 80000, 1);
INSERT INTO roles (title,salary,department_id) VALUES ('Lead Engineer', 150000, 4);
INSERT INTO roles (title,salary,department_id) VALUES ('Software Engineer', 120000, 4);
INSERT INTO roles (title,salary,department_id) VALUES ('Account Manager', 160000,3);
INSERT INTO roles (title,salary,department_id) VALUES ('Accountant', 125000,3);
INSERT INTO roles (title,salary,department_id) VALUES ('Legal Team Lead', 250000,2);
INSERT INTO roles (title,salary,department_id) VALUES ('Lawyer', 190000,2);

INSERT INTO employees (first_name,last_name,role_id, manager_id) VALUES ('John', 'Doe', 1, null);
INSERT INTO employees (first_name,last_name,role_id, manager_id) VALUES ('Mike', 'Chan', 2, 1);
INSERT INTO employees (first_name,last_name,role_id, manager_id) VALUES ('Ashely', 'Rodrigez', 3, null);
INSERT INTO employees (first_name,last_name,role_id, manager_id) VALUES ('Kevin', 'Tupik', 4, 3);
INSERT INTO employees (first_name,last_name,role_id, manager_id) VALUES ('Kunal', 'Singh', 5, null);
INSERT INTO employees (first_name,last_name,role_id, manager_id) VALUES ('Malia', 'Brown', 6, 5);
INSERT INTO employees (first_name,last_name,role_id, manager_id) VALUES ('Sarah', 'Lourd', 7, null);
INSERT INTO employees (first_name,last_name,role_id, manager_id) VALUES ('Tom', 'Allen', 8, 7);

-- https://blog.devart.com/mysql-joins-tutorial-with-examples.html
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