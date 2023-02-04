const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require(".");

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
        {
          host: 'localhost',
          // MySQL username,
          user: 'root',
          // TODO: Add MySQL password here
          password: 'Rootsql',
          database: 'employee_db'
        },
        console.log(`Connected to the employee_db database.`)
      );

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});