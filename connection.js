const { Sequelize } = require("sequelize");
const connection = new Sequelize(process.env.MYSQL,{
    dialect: 'mysql'});

connection.authenticate();
console.log("connection is working fine");

module.exports = connection;

