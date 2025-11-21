const express = require('express');
const router = express.Router();
const pool = require('../db'); // ta connexion MySQL

// GET /api/v1/statuts
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, libelle FROM statuts');
    res.json(rows);
  } catch (err) {
    console.error('Erreur lors de la récupération des statuts:', err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
