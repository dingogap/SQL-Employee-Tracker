const questions = [
    {
        name: "task",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "View All Employees By Manager",
            "View All Employees By Department",
            "Quit"
        ]
    }
];

module.exports = questions;