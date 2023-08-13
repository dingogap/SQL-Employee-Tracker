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
    let qryString = 'SELECT e.id AS "Employee Id", CONCAT(e.first_name," ",e.last_name) AS "Employee Name", r.title AS Role, r.salary AS Salary, d.name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM EMPLOYEE AS E LEFT JOIN ROLE AS R ON e.role_id = r.id LEFT JOIN DEPARTMENT AS D ON r.department_id = d.id LEFT JOIN EMPLOYEE AS M ON e.manager_id = m.id'
    db.query(qryString, function (err, results) {
        if (err) {
            console.log(err);
        }
        const table = cTable.getTable(results);
        console.log(table);
    });

    db.end();
});