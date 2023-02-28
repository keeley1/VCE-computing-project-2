//initialise mysql
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'test_user',
  password : 'password',
  database : 'virtual_chat_extension'
});

module.exports = connection;