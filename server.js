require("dotenv").config();
const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
const figlet = require("figlet-promised");
const questions = require("./lib/questions.js");

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
        const allDepartments =
            'SELECT d.name as "Department", d.id as "Department_Id" FROM department AS d';
        const allManagers =
            'SELECT DISTINCT m.id, m.first_name,  m.last_name FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN employee AS m ON e.manager_id = m.id  WHERE m.id IS NOT NULL';
        const allEmployeesForManager =
            'SELECT e.id AS "Employee Id", CONCAT(e.first_name," ",e.last_name) AS "Employee Name", r.title AS Role, r.salary AS Salary, d.name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id WHERE e.manager_id=1';
        const allRoles =
            'SELECT r.title as Title, r.id as "Role Id", d.name as Department, r.salary as Salary FROM Role as r LEFT JOIN department as d ON r.department_id= d.id';

        const allEmployees =
            'SELECT e.id AS "Employee Id", CONCAT(e.first_name," ",e.last_name) AS "Employee Name", r.title AS Role, r.salary AS Salary, d.name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id ORDER BY e.last_name';
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
            case "View All Employees By Manager":
                readManagerData(allManagers)
                break;
            case "View All Employees By Department":
                readDepartmentData(allDepartments);
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
            results.sort((p1, p2) => (p1.last_name > p2.last_name) ? 1 : (p1.last_name < p2.last_name) ? -1 : 0);

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
                manager = choices.find(item => item.value === answer.Manager_Id)
                runJob(
                    "View All Employees Managed By: " +
                    manager.name,
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
            console.log(results);
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

    function runJob(action, query) {
        db.query(query, function (err, results) {
            if (err) {
                console.log(err);
            }
            const table = cTable.getTable(results);
            console.log(
                `


` +
                action +
                `

` +
                table +
                `




`
            );
        });
    }

    function finishJob() {
        // Close mysql connection
        db.end();
    }
});
