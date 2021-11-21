const inquirer = require("inquirer");
const express = require("express");
const path = require("path");
const { env } = require("process");
const { clog } = require("./middlewares/clog");
const api = require("./routes/index.js");
const mysql = require("mysql2");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(clog);
app.use("/api", api);

// const db = mysql.createConnection({
//   host: "",
// });

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
  .then((answers) => {
    console.info("Answer:", answers.view);
  });

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
