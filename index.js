const inquirer = require("inquirer");
// const express = require("express");
// // const path = require("path");
// const { env } = require("process");
// // const { clog } = require("./middlewares/clog");
// // const api = require("./routes/index.js");
const mysql = require("mysql2");
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
          "View all Employees",
          "Add Employee",
          "Update Employee Role",
          "View all Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
        ],
      },
    ])
    .then((response) => {
      console.log(response);
      switch (response.view) {
        case "View All Departments":
          allDepartments();
          break;
      }
      // console.info("Answer:", response.view);
    });
}

function allDepartments() {
  db.query("SELECT * FROM deparments", function (err, results) {
    console.log(results);
    init();
  });
}

// sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => console.log("Now listening"));
// });
