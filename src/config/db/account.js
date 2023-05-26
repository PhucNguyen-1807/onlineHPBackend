require('dotenv').config();
const mysql = require('mysql2/promise');
const connection = mysql.createPool(process.env.DATABASE_URL);
console.log('Connected to PlanetScale!');
module.exports = connection;