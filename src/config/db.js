const mysql = require("mysql2/promise");
require("dotenv").config();
console.log(process.env.MYSQL_PUBLIC_URL);
const pool = mysql.createPool(process.env.MYSQL_PUBLIC_URL);

module.exports = pool;