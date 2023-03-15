CREATE DATABASE IF NOT EXISTS companydb;

use companydb;

create table employee(
    id  INT (11) NOT NULL AUTO_INCREMENT,
    name varchar (45) DEFAULT NULL,
    salary INT (5) DEFAULT NULL,
    PRIMARY KEY (ID)
);


INSERT INTO employee VALUES (1,'Joe',4000),
(2,'Ana',3222),
(3,'Emma',5000),
(4,'Juan',10000),
(5,'Max',1000);