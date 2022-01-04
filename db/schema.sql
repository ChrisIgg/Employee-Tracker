DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE positions (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    departments_id INT,
    FOREIGN KEY (departments_id)
    REFERENCES departments(id)
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    positions_id INT,
    FOREIGN KEY (positions_id)
    REFERENCES positions(id)
    -- ,
    -- manager_id INT,
    -- FOREIGN KEY (manager_id)
    -- REFERENCES employees(id)
);


