const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db');

inquirer
    .prompt([
        // Leave empty for now, this is where the quesions go
    ])
    .then((answers) => {
        //Use what they say to do stuff
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered
        } else {
            //Something went wrong
        }
    });

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rootsql',
    database: 'test'
});

console.table([
    {
        name: 'foo',
        age: 10
    }, {
        name: 'bar',
        age: 20
    }
]);