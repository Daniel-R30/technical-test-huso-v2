// test-connection.js
require('dotenv').config();
const knex = require('knex');
const config = require('./knex/knexfile');

const db = knex(config.development);

db.raw('SELECT 1')
  .then(() => {
    console.log('✅ Conexión exitosa con PostgreSQL');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error de conexión:', err);
    process.exit(1);
  });