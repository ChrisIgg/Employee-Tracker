const inquirer = require("inquirer");
// const express = require("express");
// // const path = require("path");
// const { env } = require("process");
// // const { clog } = require("./middlewares/clog");
// // const api = require("./routes/index.js");
const mysql = require("mysql2");
// const { all } = require("sequelize/dist/lib/operators");
// const sequelize = require("./config/connection");
require("dotenv").config();

// const app = express();
// const PORT = process.env.port || 3001;

// app.use(express.json());
// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));
// app.use(clog);
// app.use("/api", api);

// const db = mysql.createConnection({
//   host: "",
// });

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  root: "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

init();

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
      }

      // console.info("Answer:", response.view);
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

// sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => console.log("Now listening"));
// });
