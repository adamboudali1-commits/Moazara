// routes/authuser.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// POST /api/user/login-user
router.post('/login-user', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email requis' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM utilisateurs WHERE email = ? LIMIT 1', [email]);
    const user = rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Email non trouvé' });
    }

    // Créer un token JWT pour l'utilisateur (role 'user')
    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'user' },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.json({ token });
  } catch (err) {
    console.error('Erreur login utilisateur:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
