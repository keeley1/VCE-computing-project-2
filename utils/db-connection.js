//initialise mysql
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'virtual_chat_extension'
});

module.exports = connection;