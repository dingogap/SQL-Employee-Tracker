require("dotenv").config();
const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
const figlet = require("figlet-promised");
const questions = require("./lib/questions.js");

const allDepartments = 'SELECT d.name as "Department", d.id as "Department_Id" FROM department AS d';
const allManagers = "SELECT DISTINCT m.id, m.first_name,  m.last_name FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN employee AS m ON e.manager_id = m.id  WHERE m.id IS NOT NULL";
const allEmployeesByManager = 'SELECT e.id AS "Employee Id", CONCAT(e.first_name," ",e.last_name) AS "Employee Name", r.title AS Role, r.salary AS Salary, d.name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id';
const allEmployeesByDepartment = 'SELECT e.id AS "Employee Id", CONCAT(e.first_name," ",e.last_name) AS "Employee Name", r.title AS Role, r.salary AS Salary, d.name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id  ORDER BY d.name, e.last_name';
const allRoles = 'SELECT r.title as Title, r.id as "RoleId", d.name as Department, r.salary as Salary FROM Role as r LEFT JOIN department as d ON r.department_id= d.id';
const allEmployees = 'SELECT e.id AS "Employee Id", CONCAT(e.first_name," ",e.last_name) AS "Employee Name", r.title AS Role, r.salary AS Salary, d.name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id ORDER BY e.last_name';
const allEmpAlt = 'SELECT e.id AS "Employee_Id", CONCAT(e.first_name," ",e.last_name) AS "Employee_Name", r.title AS Role, r.salary AS Salary, d.name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id ORDER BY e.last_name';
const addDepartment = `INSERT INTO department (name) VALUES (?)`;
const addRole = `INSERT role (title, salary, department_id) VALUES (?,?,?)`;
const addEmployee = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;

// Connect to the mysql database using data abstracted to the .env file
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Check if the database connection was made successfully
db.connect(function (err) {
    if (err) {
        return console.error("Error: " + err.message);
    }
    // Connected sucessfully - continue
    console.clear()
    console.log("Connected to the HRIS Database");

    // Display Banner at start of CLI App
    async function runFiglet() {
        console.log(`
        `);
        const result = await figlet(`H R I S`);
        console.log(result);
        console.log(` Human Resource Information System
        

        `);
        startWork();
    }
    runFiglet();

    function startWork() {
        inquirer
            .prompt(questions)
            .then((answers) => {
                queryHris(answers.task);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function queryHris(action) {
        switch (action) {
            case "View All Departments":
                runJob(action, allDepartments);
                startWork();
                break;
            case "View All Roles":
                runJob(action, allRoles);
                startWork();
                break;
            case "View All Employees":
                runJob(action, allEmployees);
                startWork();
                break;
            case "View Employees By Manager":
                runJob(action, allEmployeesByManager);
                startWork();
                break;
            case "View Employees By Department":
                runJob(action, allEmployeesByDepartment);
                startWork();
                break;
            case "View Employees For Manager":
                readManagerData(allManagers);
                break;
            case "View Employees In Department":
                readDepartmentData(allDepartments);
                break;
            case "Add New Department":
                addNewDepartment(addDepartment);
                break;
            case "Add New Role":
                addNewRole(allDepartments, addRole);
                break;
            case "Add New Employee":
                addNewEmployee(allRoles, addEmployee);
                break;
            case "Update Employee Role":
                updateEmployeeRole(allEmpAlt, allRoles, updateEmployeeRole);
                break;
                case "Delete Employee":
                    deleteEmployee(allEmpAlt);
                    break;
            default:
                finishJob();
        }
    }

    function readManagerData(query, callback) {
        db.query(query, function (err, results) {
            if (err) {
                console.log(err);
            }
            // Sort Managers by Last Name
            results.sort((p1, p2) =>
                p1.last_name > p2.last_name ? 1 : p1.last_name < p2.last_name ? -1 : 0
            );

            choices = results.map((data) => ({
                name: data.first_name + " " + data.last_name,
                value: data.id,
            }));

            chooseManager(choices);
        });
    }

    function chooseManager(choices) {
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "Manager_Id",
                    message: "Which Manager?",
                    choices: choices,
                },
            ])
            .then((answer) => {
                manager = choices.find((item) => item.value === answer.Manager_Id);
                runJob(
                    "View All Employees Managed By: " + manager.name,
                    'SELECT e.id AS "Employee Id", CONCAT(e.first_name," ",e.last_name) AS "Employee Name", r.title AS Role, r.salary AS Salary, d.name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id WHERE e.manager_id=' +
                    answer.Manager_Id
                );
                startWork();
            });
    }

    function readDepartmentData(query, callback) {
        db.query(query, function (err, results) {
            if (err) {
                console.log(err);
            }
            choices = results.map((data) => ({
                name: data.Department,
                value: data.Department_Id,
            }));
            chooseDepartment(choices);
        });
    }

    function chooseDepartment(choices) {
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "Department_Id",
                    message: "Which Department?",
                    choices: choices,
                },
            ])
            .then((answer) => {
                runJob(
                    "View All Employees in Department: " +
                    choices[answer.Department_Id - 1].name,
                    'SELECT e.id AS "Employee Id", CONCAT(e.first_name," ",e.last_name) AS "Employee Name", r.title AS Role, r.salary AS Salary, d.name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id WHERE d.id=' +
                    answer.Department_Id
                );
                startWork();
            });
    }

    // Add new Department
    function addNewDepartment(query, callback) {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "deptName",
                    message: "What is the name of the new Department?",
                    validate: (answers) => {
                        if (answers.length === 0) {
                            return console.log(
                                "Please enter the name of the new Department:"
                            );
                        } else {
                            return true;
                        }
                    },
                },
            ])
            .then((answer) => {
                db.query(query, answer.deptName, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("\n\n\nAdded " + answer.deptName + " to Departments!");
                });
                runJob("View All Departments", 'SELECT d.name as "Department", d.id as "Department_Id" FROM department AS d');
                startWork();
            });
    }

    // Add new Employee 
    function addNewEmployee(allRolessQry, addRoleQry) {
        db.query(allRolessQry, function (err, results) {
            if (err) {
                console.log(err);
            }

            choices = results.map((data) => ({
                name: data.Title,
                value: data.RoleId,
            }))
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "employeeFirstName",
                        message: "What is the Employees First Name?",
                        validate: (answers) => {
                            if (answers.length === 0) {
                                return console.log(
                                    "Please enter the First Name:"
                                );
                            } else {
                                return true;
                            }
                        },
                    },
                    {
                        type: "input",
                        name: "employeeLastName",
                        message: "What is the Employees Last Name?",
                        validate: (answers) => {
                            if (answers.length === 0) {
                                return console.log(
                                    "Please enter the Last Name:"
                                );
                            } else {
                                return true;
                            }
                        },
                    },
                    {
                        type: "list",
                        name: "roleId",
                        message: "What will be the Employee's Role?",
                        choices: choices,
                        loop: false,
                        pageSize: 12
                    }
                ])
                .then((answer) => {

                    db.query(allManagers, function (err, results) {
                        if (err) {
                            console.log(err);
                        }
                        results.sort((p1, p2) =>
                            p1.last_name > p2.last_name ? 1 : p1.last_name < p2.last_name ? -1 : 0
                        );

                        choices = results.map((data) => ({
                            name: data.first_name + " " + data.last_name,
                            value: data.id,
                        }))
                        inquirer
                            .prompt([
                                {
                                    type: "list",
                                    name: "managerId",
                                    message: "Who will be the Employee's Manager?",
                                    choices: choices,
                                    loop: false,
                                    pageSize: 8
                                }

                            ])
                            .then((answerManager) => {

                                db.query(addEmployee, [answer.employeeFirstName, answer.employeeLastName, answer.roleId, answerManager.managerId], function (err, result) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    console.log("\n\n\nAdded " + answer.employeeFirstName + " " + answer.employeeLastName + " to Employees!");
                                });
                                runJob("View All Employees", allEmployees)
                                startWork();
                            })
                    })


                })
        })
    }

    // Update the Employees Role
    function updateEmployeeRole(allEmpAlt, allRoles) {
        db.query(allEmpAlt, function (err, results) {
            if (err) {
                console.log(err);
            }
            choices = results.map((data) => ({
                name: data.Employee_Name + " - " + data.Role,
                value: data.Employee_Id,
            }))
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employeeId",
                        message: "Which Employee's Role will be updated?",
                        choices: choices,
                        loop: false,
                        pageSize: 15
                    }
                ])
                .then((answer) => {
                    console.log(answer)
                    db.query(allRoles, function (err, results) {
                        if (err) {
                            console.log(err);
                        }
                        results.sort((p1, p2) =>
                            p1.last_name > p2.last_name ? 1 : p1.last_name < p2.last_name ? -1 : 0
                        );

                        choices = results.map((data) => ({
                            name: data.Title,
                            value: data.RoleId,
                        }))
                        inquirer
                            .prompt([
                                {
                                    type: "list",
                                    name: "roleId",
                                    message: "What will be the Employee's New Role?",
                                    choices: choices,
                                    loop: false,
                                    pageSize: 8
                                }
                            ])
                            .then((answerRole) => {

                                db.query('UPDATE employee SET role_id = ' + answerRole.roleId + ' WHERE id = ' + answer.employeeId, function (err, result) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    console.log("\n\n\nUpdated " + answer.EmployeeName + "'s Role!");
                                });
                                runJob("View All Employees", allEmployees)
                                startWork();
                            })
                    })
                })
        })

    }

    // Delete an Employee
    function deleteEmployee(allEmpAlt) {
        db.query(allEmpAlt, function (err, results) {
            if (err) {
                console.log(err);
            }
            choices = results.map((data) => ({
                name: data.Employee_Name + " - " + data.Role,
                value: data.Employee_Id,
            }))
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employeeId",
                        message: "Which Employee will be deleted?",
                        choices: choices,
                        loop: false,
                        pageSize: 15
                    }
                ])
                .then((answer) => {
                    db.query('DELETE FROM employee WHERE id = ' + answer.employeeId, function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        
                        let deleted = choices.find(({ value }) => value === answer.employeeId)
                        console.log("\n\n\nDeleted " + deleted.name + " from Employees");
                    });
                    runJob("View All Employees", allEmployees)
                    startWork();

                })
        })

    }

    // Add new role
    function addNewRole(allDeptsQry, addRoleQry) {
        db.query(allDeptsQry, function (err, results) {
            if (err) {
                console.log(err);
            }
            choices = results.map((data) => ({
                name: data.Department,
                value: data.Department_Id,

            }));
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "roleName",
                        message: "What is the title of the new Role?",
                        validate: (answers) => {
                            if (answers.length === 0) {
                                return console.log(
                                    "Please enter the Title:"
                                );
                            } else {
                                return true;
                            }
                        },
                    },
                    {
                        type: "input",
                        name: "roleSalary",
                        message: "what is the Salary?",
                        validate: (answers) => {
                            if (answers.length === 0) {
                                return console.log(
                                    "Please enter the Salary for this Role:"
                                );
                            } else {
                                return true;
                            }
                        },
                    },
                    {
                        type: "list",
                        name: "Department_Id",
                        message: "Which Department?",
                        choices: choices,
                    }
                ])
                .then((answer) => {
                    db.query(addRole, [answer.roleName, answer.roleSalary, answer.Department_Id], function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        console.log("\n\n\nAdded " + answer.roleName + " to Roles!");
                    });
                    runJob("View All Roles", 'SELECT r.title as Title, r.id as "Role Id", d.name as Department, r.salary as Salary FROM Role as r LEFT JOIN department as d ON r.department_id= d.id')
                    startWork();
                });
        });

    }


    // Run the standard SQL Queries & display the results in a formatted table
    function runJob(action, query) {
        db.query(query, function (err, results) {
            if (err) {
                console.log(err);
            }
            const table = cTable.getTable(results);
            // Apply spacing before & after the table
            console.log(
                "\n\n" +
                `

` +
                action +
                "\n\n" +
                table +
                "\n\n\n\n\n\n\n\n\n\n\n\n"
            );
        });
    }

    // Tidy up when finished
    function finishJob() {
        // Close mysql connection
        db.end();
    }
});
