require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: process.env.DB_PORT,
  user: 'dylanwilliams',
  password: '',
  database: 'qanda',
});

pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database!!');
  })
  .catch((err) => {
    console.error('UNABLE TO CONNECT', err);
  });

module.exports = pool;
