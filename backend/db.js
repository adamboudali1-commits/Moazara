const mysql = require('mysql2/promise');
require('dotenv').config();

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'moazara',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+00:00'
};

const pool = mysql.createPool(config);

// Test de connexion au démarrage
pool.getConnection()
  .then((conn) => {
    console.log('✅ Connecté à la base de données MySQL');
    conn.release();
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion DB:', err.message);
    process.exit(1);
  });

module.exports = pool;