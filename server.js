const mysql = require("mysql2");

require('dotenv').config()

var figlet = require("figlet");

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME

    },
    console.log(`Connected to the hris_db database.`)
);

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

db.end();