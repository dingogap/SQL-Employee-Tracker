const mysql = require("mysql2");
const cTable = require('console.table');

require('dotenv').config()

var figlet = require("figlet");

// Connect to the mysql database using data abstracted to the .env file
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
);

// Check if the dtabase connection was made successfully
db.connect(function (err) {

    if (err) {
        return console.error('Error: ' + err.message);
    }

    console.log('Connected to the MySQL Server.');

    // Display Banner at start of CLI App
    figlet(
        `H R I S`,
        {
            horizontalLayout: "fitted",
            verticalLayout: "default",
            whitespaceBreak: true,
        },
        function (err, data) {
            if (err) {
                console.log("Unexpected Error");
                console.dir(err);
                return;
            }
            console.log(data);
        }
    );
    let viewAllEmployees = 'SELECT e.id AS "Employee Id", CONCAT(e.first_name," ",e.last_name) AS "Employee Name", r.title AS Role, r.salary AS Salary, d.name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id ORDER BY e.last_name'
    let viewAllDepartments = 'SELECT d.name as "Department", d.id as "Department Id" FROM department AS d'
    let viewAllRoles='SELECT r.title as Title, r.id as "Role Id", d.name as Department, r.salary as Salary FROM Role as r LEFT JOIN department as d ON r.department_id= d.id'
    db.query(viewAllRoles, function (err, results) {
        if (err) {
            console.log(err);
        }
        const table = cTable.getTable(results);
        console.log(table);
    });

    db.end();
});