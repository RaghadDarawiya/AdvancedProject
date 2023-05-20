/*const mysql = require ('mysql2');
module.exports = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '123raghad',
database:'linkedin',

});*/
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123raghad',
  database: 'linkedin',
});

module.exports = connection;
