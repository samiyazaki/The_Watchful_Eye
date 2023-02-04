const cTable = require("console.table");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const express = require("express");
const util = require("util");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Rootsql",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);
db.connect();
db.query = util.promisify(db.query);
openApp();

async function openApp() {
  let decision = await inquirer.prompt([
    {
      name: "choices",
      type: "list",
      message: "Select an option",
      choices: [
        "View employees",
        "View roles",
        "View departments",
        "View employees by department",
        "View department budget",
        "Update role",
        "Update Manager",
        "Add employee",
        "Add role",
        "Add department",
        "Remove employee",
        "Remove role",
        "Remove department",
        "Exit",
      ],
    },
  ]);
  switch (decision.decisions) {
    case "View  employees":
      selectEmployees();
      break;
    case "Add employee":
      addEmployee();
      break;
    case "Update employees":
      updateEmployee();
      break;
    case "View roles":
      selectRole();
      break;
    case "Add roles":
      addRole();
      break;
    case "Remove a role":
      removeRole();
      break;
    case "View departments":
      selectDepartment();
      break;
    case "Add departments":
      addDepartment();
      break;
  }
}
async function selectEmployees() {
  const employee = await db.query("SELECT * FROM employee");
  console.table(employee);
  openApp();
}
async function addEmployee() {
  let answer = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the first name of the employee?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the last name of the employee?",
    },
    {
      type: "input",
      name: "role_id",
      message:
        "What is the role of this employee? 1 for Branch, 2 for Operations and 3 for Outside sales.",
    },
    {
      type: "input",
      name: "manager_id",
      message:
        "Which manager do they report to? 1 for Branch, 2 for Operations.",
    },
  ]);
  await db.query(
    "INSERT INTO employee SET first_name=?, last_name=?, role_id=?, manager_id=?",
    [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]
  );
  console.table("employee has been added.");
  openApp();
}
async function updateEmployee() {
  let answer = await inquirer.prompt([
    {
      type: "list",
      name: "employee_id",
      message: "please choose the following employee from the list.",
      choices: async () => {
        const employees = await db.query("SELECT * FROM employee");
        const addEmployee = employees.map((employee) => {
          return {
            name: employee.first_name + " " + employee.last_name,
            value: employee.id,
          };
        });
        return addEmployee;
      },
    },
    {
      type: "list",
      name: "role_id",
      message: "Please choose the new role for the employee",
      choices: async () => {
        const roles = await db.query("SELECT * FROM role");
        const newRoles = roles.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        });

        return newRoles;
      },
    },
  ]);

  await db.query(
    "UPDATE employee SET role_id=? WHERE id=?",
    [answer.role_id, answer.employee_id],
    (err, results) => {
      if (err) throw err;
      openApp();
      console.log("Employee updated");
    }
  );
  openApp();
}
async function selectRole() {
  const role = await db.query("SELECT * FROM role");
  console.table(role);
  openApp();
}
async function addRole() {
  let answer = await inquirer.prompt([
    {
      type: "input",
      name: "role_title",
      message: "What is the title of the new role?",
    },
    {
      type: "input",
      name: "role_salary",
      message: "What is the salary for this role?",
    },
    {
      type: "input",
      name: "department_id",
      message: "Which department does this role belong to?",
    },
  ]);
  await db.query("INSERT INTO role SET title=?, salary=?, department_id=?", [
    answer.role_title,
    answer.role_salary,
    answer.department_id,
  ]);
  console.table("New role added");
  openApp();
}
async function removeRole() {
  let answer = await inquirer.prompt([
    {
      type: "list",
      name: "role_id",
      message: "please choose the following role from the list.",
      choices: async () => {
        const roles = await db.query("SELECT * FROM role");
        const removedRoles = roles.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        });
        return removedRoles;
      },
    },
  ]);
  await db.query(
    "DELETE FROM role WHERE id=?",
    [answer.role_id],
    (err, results) => {
      if (err) throw err;
      console.log(results);
      console.log(role_title, role_id);
      openApp();
    }
  );
  console.log("Role removed");
}
async function selectDepartment() {
  const department = await db.query("SELECT * FROM department");
  console.table(department);
  openApp();
}
async function addDepartment() {
  let answer = await inquirer.prompt([
    {
      type: "input",
      name: "department_name",
      message: "What is the name of the new department",
    },
  ]);
  await db.query("INSERT INTO department SET name=?", answer.department_name);
  const addDepartment = await db.wuery("SELECT * FROM department");
  console.table(addDepartment);
  openApp();
}
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
