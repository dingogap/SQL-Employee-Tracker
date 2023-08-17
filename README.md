#  Employee Tracker

[![License Badge](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

The Employee Tracker is a CMS application that allows a small business owner to manage their staff.

Employee Data is stored in a MySQL database running on the server. The programs allows the busines owner to perform the following functions:
  * View All Departments
  * View All Roles
  * View All Employees
  * View Employees By Manager
  * View Employees By Department
  * View Employees For Manager
  * View Employees In Department
  * Add New Department
  * Add New Role
  * Add New Employee
  * Update Employee Role
  * Delete Employee

  ## Table of Contents
* [Video Demonstration](#video-demonstration)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Video Demonstration
Click the link to view the [Demonstration Video][def1]

## Installation
The Employee Tracker requires node.js, Inquirer v8.2.4, console.table, dotenv, figlet and mySql2 v2.2.5 to be installed. MySQL must be installed and running on the server.

You can clone the package from the GitHub Repository. The dependencies can be installed by running `npm install` from the CLI.

## Usage

The Employee Tracker needs a MySQL database. You can create the databasde from the MySQL Monitor command line by running `SOURCE db/schema.sql;`. The database can be entered manually or it can be seeded using the seeds.sql file in the db folder. A sample seeds.sql file is provided. The database can be loaded by running `SOURCE db/seeds.sql;` once you have added your data.

The Employee Tracker application is started by running `npm start` from the CLI.  Once the program has connected tothe MySQL database it will display a text menu. Most entries are data driven using information from the database. If you add a new Department, Role or Employee you will be prompted to enter the data manually.

## License
REAME Generator is available under the MIT License license. See the [LICENSE](https://opensource.org/licenses/MIT) file for more info.

## Contributing
Contributors are welcome. Feel free to clone or fork the project. Please let me know how you get on.

## Tests
No automated tests are provided. Automated testing is not provided for this application. You can confirm functionality by creating, viewing and deleting Employee Tracker entries.

## Questions
  
If you have questions about this project or would like more information you can [contact me by email](mailto:peter.medbury@dingogap.net.au).
  
You can see more of my work in my [Github Repository](https://github.com/dingogap).


## Resources Used
1. Bootcamp Materials - Lesson Material from Weeks 1 - 12
2. Prior knowledge and experience
3. [Inquirer.js][def2] Documentation
4. [console.table][def3] Documentation
5. [MySql][def4] Docmentation
6. [mysql2][def5] Documentation



[def1]: https://vimeo.com/855373546
[def2]: https://www.npmjs.com/package/inquirer
[def3]: https://www.npmjs.com/package/console.table
[def4]: https://www.mysql.com/
[def5]: https://www.npmjs.com/package/mysql2

