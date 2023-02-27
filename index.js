//import express and create express server
const express = require('express');
const app = express();
const server = require('http').createServer(app);

const connection = require("./utils/db-connection");
console.log('yes');

//direct express where to pick up the files
app.use(express.static(__dirname));

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database successfully!');
});

