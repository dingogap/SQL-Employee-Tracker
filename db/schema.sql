-- Initialise the Human Resources Information System Database

-- Delete hris database if it exists
DROP DATABASE IF EXISTS hris_db;

-- Create new hris database --
CREATE DATABASE hris_db;

-- Use the hris database
USE hris_db;

-- Create department, role & employee Tables
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id) 
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY(role_id)
  REFERENCES role(id),
  FOREIGN KEY(manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);

'SELECT a.id, a.first_name, a.last_name, role.title, role.salary, department.name, (b.first_name, b.last_name FROM employee as b where a.manager_id= b.id) as INNER JOIN employee ON employee.manager_id = employee.id as employee.manager INNER JOIN role on employee.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY role.salary desc', function (err, results) {



  SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name
    -> FROM employee
    -> INNER JOIN role
    -> on employee.role_id = role.id
    -> INNER JOIN department
    -> ON role.department_id = department.id
    -> ORDER BY role.salary;


    SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, (SELECT manager.first_namefrom employee as manager where employee.manager_id=manager.id) as manager.first_name
    
    FROM employee 

    INNER JOIN role
    on employee.role_id = role.id
    INNER JOIN department
    ON role.department_id = department.id
    ORDER BY role.salary;