/*const mysql = require('mysql2');
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'nodejs-ecommerce',
    password:'123456'
});
module.exports = pool.promise();*/
const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodejs-ecommerce','root','123456',{dialect:'mysql',host:'localhost'});

module.exports = sequelize;