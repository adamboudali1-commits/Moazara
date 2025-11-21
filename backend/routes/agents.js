const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

// Récupérer tous les agents
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, email FROM agents');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ajouter un agent avec mot de passe fourni
router.post('/', async (req, res) => {
  const { email, mot_de_passe } = req.body;
  if (!email || !mot_de_passe) return res.status(400).json({ error: 'Email et mot de passe requis' });

  try {
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const [result] = await pool.query('INSERT INTO agents (email, mot_de_passe) VALUES (?, ?)', [email, hashedPassword]);
    res.status(201).json({ id: result.insertId, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Modifier un agent
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, mot_de_passe } = req.body;
  if (!email || !mot_de_passe) return res.status(400).json({ error: 'Email et mot de passe requis' });

  try {
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    await pool.query('UPDATE agents SET email = ?, mot_de_passe = ? WHERE id = ?', [email, hashedPassword, id]);
    res.json({ id, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer un agent
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM agents WHERE id = ?', [req.params.id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
