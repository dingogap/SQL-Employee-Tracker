USE hris_db;

INSERT INTO department (id, name)
VALUES (1, "Executive"),
(2,"Sales"),
(3, "Customer Services"),
(4, "Operations"),
(5, "Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("General Manager", 200000, 1),
("Sales Manager", 150000, 2),
("Customer Services Manager", 150000, 3),
("Operations Manager", 150000, 4),
("Accountant", 150000, 5),
("Accounts Payable",65000, 5),
("Accounts Receivable Clerk", 65000, 5),
("Project Manager", 100000, 4),
("Help Desk Manager", 90000, 3),
("Help Desk Analyst", 75000, 3),
("Sales", 90000, 2),
("Technical Support Manager", 90000, 4),
("Technical Support Analyst", 75000, 4),
("Personal Assistant", 90000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dylan", "Robinson" ,1 , NULL ),
("Ari", "Walker", 2, 1),
("Imogen", "Anderson",3,1),
("Zachary", "Parker",4,1),
("Freya", "Robertson",5,1),
("Lucas", "Moore",6,5),
("Aiden", "Mitchell",7,5),
("Arthur", "White",8,4),
("Aurora", "Ryan",9,3),
("Oliver", "Hill",10,3),
("Harriet", "Cook",10,3),
("Jack", "Murphy",11,2),
("Bonnie", "Smith",11,2),
("Adam", "Scott",12,4),
("Phoebe", "O'Brien",13,4),
("Levi", "Hewson",13,4),
("Joshua", "Fern",14,1);