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
    db.query(
        'SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role on employee.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY role.salary desc', function (err, results) {
            const table = cTable.getTable(results);
            console.log(table)
        }
    );
    db.end();
});