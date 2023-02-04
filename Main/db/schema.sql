DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
    id  INT NOT NULL AUTO_INCREMENT,
    name  VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id  INTO NOT NULL AUTO_INCREMENT,
    title  VARCHAR(30) NOT NULL,
    salary  DECIMAL(10,2) NOT NULL,
    department_id  INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
    ON DELETE SET NULL
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id  INT NOT NULL AUTO_INCREMENT,
    first_name  VARCHAR(30) NOT NULL,
    last_name  VARCHAR(30) NOT NULL,
    role_id  INTO NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
    FOREIGN KEY (role_id) REFERENCES role(id)
    ON DELETE SET NULL
    PRIMARY KEY (id)
);