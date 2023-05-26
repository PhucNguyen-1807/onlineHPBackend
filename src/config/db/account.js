// var mysql = require("mysql2/promise");
// require("dotenv").config();

// const pool = mysql.createPool({
//   database: wdt,
//   username: ati8n8u0rd97yu2pglmg,
//   host: aws.connect.psdb.cloud,
//   password:pscale_pw_7VlDChMOymukRwmw3TZU5q7MQgrrZJ5v2OQsp3TdCqh,

// })
// console.log("Creating connection pool...");
// module.exports = pool;

require('dotenv').config();
const mysql = require('mysql2/promise');
const connection = mysql.createPool(process.env.DATABASE_URL);
console.log('Connected to PlanetScale!');
module.exports = connection;