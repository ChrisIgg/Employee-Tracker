const inquirer = require("inquirer");
const mysql = require("mysql2");

require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  root: "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function init() {
  prompt();
}
function prompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "view",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
        ],
      },
    ])
    .then((response) => {
      switch (response.view) {
        case "View All Departments":
          allDepartments();
          break;
        case "View All Roles":
          allRoles();
          break;
        case "View All Employees":
          allEmployees();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updatePosition();
          break;
        case "Add Employee":
          addEmployee();
          break;
      }

      // console.info("Answer:", response.view);
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Please put in the employee's first name: ",
      },
      {
        type: "input",
        name: "lastName",
        message: "Please put in the employee's last name: ",
      },
      {
        type: "input",
        name: "positionsID",
        message: "Please put in the ID of the employee's position: ",
      },
    ])
    .then((response) => {
      db.query(
        `INSERT INTO employees (first_name, last_name, positions_id) VALUES ("${response.firstName}", "${response.lastName}", ${response.positionsID})`,
        function (err, results) {
          console.log("error", err);
          console.log("results", results);
          init();
        }
      );
    });
}

function updatePosition() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeID",
        message:
          "Please put in the ID of the employee who's role you'd like to change: ",
      },
      {
        type: "input",
        name: "newID",
        message: "Please put in the ID of the new position for this employee: ",
      },
    ])
    .then((response) => {
      db.query(
        `UPDATE employees SET positions_id = ${response.newID} WHERE id = ${response.employeeID}`,
        function (err, results) {
          console.log("error", err);
          console.log("results", results);
          init();
        }
      );
    });
}

function allDepartments() {
  console.log("function runs");
  db.query("SELECT * FROM departments", function (err, results) {
    console.log(err);
    // console.table(results)
    console.log(results);
    init();
  });
}

function allRoles() {
  db.query("SELECT * FROM positions", function (err, results) {
    console.log(err);
    console.log(results);
    init();
  });
}

function allEmployees() {
  db.query(
    "SELECT employees.first_name, employees.last_name, positions.title, positions.salary FROM employees JOIN positions ON employees.positions_id=positions.id",
    function (err, results) {
      console.log("error", err);
      console.log("results", results);
      init();
    }
  );
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "What department would you like to add?",
      },
    ])
    .then((response) => {
      console.log("response", response);
      console.log("response.deptName", response.deptName);
      db.query(
        `INSERT INTO departments (name) VALUES ('${response.deptName}')`,
        function (err, results) {
          console.log("error", err);
          console.log("results", results);
          init();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "positionName",
        message: "What would position would you like to add?",
      },
      {
        type: "input",
        name: "departmentID",
        message: "What is the ID of the department this would be entered into?",
      },
      {
        type: "input",
        name: "dayRate",
        message: "What is their day rate?",
      },
    ])
    .then((response) => {
      console.log("response", response);
      console.log("response.positionName", response.positionName);
      db.query(
        `INSERT INTO positions (title, departments_id, salary) VALUES ('${response.positionName}', '${response.departmentID}', '${response.dayRate}')`,
        function (err, results) {
          console.log("error", err);
          console.log("results", results);
          init();
        }
      );
    });
}

init();
