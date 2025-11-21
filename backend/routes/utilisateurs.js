const express = require('express');
const router = express.Router();
const pool = require('../db'); // connexion MySQL
const bcrypt = require('bcrypt');

// Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM utilisateurs');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ajouter un utilisateur
router.post('/', async (req, res) => {
  const { nom, email, role } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO utilisateurs (nom, email, role) VALUES (?, ?, ?)',
      [nom, email, role]
    );
    res.status(201).json({ id: result.insertId, nom, email, role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ajouter un utilisateur agent
router.post('/agents', async (req, res) => {
  const { nom, email,role, mot_de_passe } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const [result] = await pool.query(
      'INSERT INTO utilisateurs (nom, email, role, mot_de_passe) VALUES (?, ?, ?,?)',
      [nom, email, role, hashedPassword]
    );
    res.status(201).json({ id: result.insertId, nom, email, role, mot_de_passe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Modifier un utilisateur
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, email, role } = req.body;
  try {
    await pool.query(
      'UPDATE utilisateurs SET nom = ?, email = ?, role = ? WHERE id = ?',
      [nom, email, role, id]
    );
    res.json({ id, nom, email, role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM utilisateurs WHERE id = ?', [id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
