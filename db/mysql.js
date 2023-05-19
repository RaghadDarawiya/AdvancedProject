const Sequelize =require('sequelize');
const myenv = process.env;
const sequelize = new Sequelize('mysql://root:@127.0.0.1:3306/linkedin');
module.exports = sequelize;

/*const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('linkedin', 'root', '123raghad', {
  host: 'localhost',
  dialect: 'mysql',
});

this.sequelize = sequelize; // Assign the Sequelize instance to the property*/
  