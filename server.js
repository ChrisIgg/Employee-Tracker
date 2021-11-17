const inquirer = require("inquirer");

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
