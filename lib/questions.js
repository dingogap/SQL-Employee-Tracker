const inquirer = require("inquirer");
const questions = [
    {
        name: "task",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "View Employees By Manager",
            "View Employees By Department",
            "View Employees For Manager",
            "View Employees In Department",
            "Add New Department",
            "Add New Role",
            "Add New Employee",
            "Update Employee Role",
            "Delete Employee", 
            "Quit"   
        ],
        loop: false,
        pageSize: 15
    }
];

module.exports = questions;







