USE hris_db;

INSERT INTO department (id, name)
VALUES (1, "Executive"),
(2,"Administration"),
(3, "Customer Services"),
(4, "Operations"),
(5, "Networks"),
(6, "Software"),
(7, "Projects");

INSERT INTO role (title, salary, department_id)
VALUES ("General Manager", 200000, 1),
("Customer Services Manager", 150000, 3),
("Operations Manager", 150000, 4),
("Software Manager", 150000, 6),
("Networks Manager", 150000, 5),
("Administrative Officer", 75000, 2),
("Personal Assistant", 65000, 1),
("Project Manager", 150000, 7),
("Help Desk Manager", 90000, 3),
("Help Desk Analyst", 75000, 3),
("Database Manager", 90000, 6),
("Senior Programmer/Analyst", 90000, 6),
("Programmer/Analyst", 75000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dylan", "Robinson" ,1 , NULL ),
("Ari", "Walker", 7, 1),
("Imogen", "Anderson",2,1),
("Zachary", "Parker",3,1),
("Freya", "Robertson",4,1),
("Lucas", "Moore",5,1),
("Aiden", "Mitchell",6,1),
("Arthur", "White",8,1),
("Aurora", "Ryan",9,3),
("Oliver", "Hill",10,9),
("Harriet", "Cook",10,9),
("Jack", "Murphy",10,9),
("Bonnie", "Smith",11,5),
("Adam", "Scott",12,5),
("Phoebe", "O'Brien",12,5),
("Levi", "Hewson",13,5),
("Joshua", "Fern",13,5);