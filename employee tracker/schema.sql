-- mysql -u root employee_tracker < schema.sql
-- dropped existing tables and recreate them


DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(30)
) ENGINE = InnoDB;

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title varchar(30) UNIQUE, 
    salary decimal,
    department_id integer REFERENCES departments(id)
) ENGINE = InnoDB;

CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name varchar(30),
    last_name varchar(30),
    role_id integer REFERENCES roles(id), 
    manager_id integer REFERENCES employees(id)
) ENGINE = InnoDB;
