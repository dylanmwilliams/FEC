require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: process.env.PORT,
  user: 'root',
  password: '',
  database: 'QandA',

});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database!!');
  })
  .catch((err) => {
    console.error('UNABLE TO CONNECT', err);
  });

module.exports.client = client;
