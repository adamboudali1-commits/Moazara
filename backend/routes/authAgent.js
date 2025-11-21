const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // adapte selon ta config de connexion
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey'; // à configurer dans .env

// Route pour enregistrer un nouvel agent
router.post('/register', async (req, res) => {
  const { nom, email, mot_de_passe } = req.body;

  if (!nom || !email || !mot_de_passe) {
    return res.status(400).json({ message: 'Champs requis manquants' });
  }

  try {
    // Vérifier si l’agent existe déjà
    const [rows] = await pool.query('SELECT * FROM agents WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(409).json({ message: 'Email déjà utilisé' });
    }

    // Hacher le mot de passe
    const hash = await bcrypt.hash(mot_de_passe, 10);

    // Insérer l’agent
    await pool.query(
      'INSERT INTO agents (nom, email, mot_de_passe) VALUES (?, ?, ?)',
      [nom, email, hash]
    );

    res.status(201).json({ message: 'Agent ajouté avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour connecter un agent (login)
router.post('/login', async (req, res) => {
  const { email, mot_de_passe } = req.body;

  if (!email || !mot_de_passe) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM utilisateurs WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const agent = rows[0];

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(mot_de_passe, agent.mot_de_passe);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: agent.id, email: agent.email, role: 'agent' },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({ token, agent: { id: agent.id, nom: agent.nom, email: agent.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
