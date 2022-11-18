CREATE TABLE departments (id serial, name text);
CREATE TABLE roles (id serial, title text, salary INT, department text);

INSERT INTO departments (name) VALUES ('Sales');
INSERT INTO departments (name) VALUES ('Legal');
INSERT INTO departments (name) VALUES ('Finance');
INSERT INTO departments (name) VALUES ('Engineering');

INSERT INTO roles (title,salary,department) VALUES ('Sales Lead', 100000,'Sales');
INSERT INTO roles (title,salary,department) VALUES ('Salesperson', 80000,'Sales');
INSERT INTO roles (title,salary,department) VALUES ('Lead Engineer', 150000,'Engineering');
INSERT INTO roles (title,salary,department) VALUES ('Software Engineer', 120000,'Engineering');
INSERT INTO roles (title,salary,department) VALUES ('Account Manager', 160000,'Finance');
INSERT INTO roles (title,salary,department) VALUES ('Accountant', 125000,'Finance');
INSERT INTO roles (title,salary,department) VALUES ('Legal Team Lead', 250000,'Legal');
INSERT INTO roles (title,salary,department) VALUES ('Lawyer', 190000,'Legal');