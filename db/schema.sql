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

