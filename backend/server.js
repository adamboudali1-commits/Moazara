// Charger les variables d'environnement
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Import des routes
const chatRoute = require('./routes/chat');          // ChatBot
const demandeRoutes = require('./routes/demandes');  // Demandes
const authRoutes = require('./routes/auth');         // Admin
const authuserRoutes = require('./routes/authuser'); // Utilisateur
const statutsRoutes = require('./routes/statuts');   // Statuts
const utilisateursRoutes = require('./routes/utilisateurs'); // Gestion utilisateurs
const authAgentRoutes = require('./routes/authAgent'); // Agent

const app = express();

// Vérification clés API


if (!process.env.CHATBASE_API_KEY) {
  console.warn('⚠️ CHATBASE_API_KEY non définie dans .env, le chatbot ne fonctionnera pas');
}

// Sécurité & configuration
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json({ limit: '50kb' })); // augmenter si nécessaire

// Route de test
app.get('/', (req, res) =>
  res.status(200).json({ status: 'API MOAZARA opérationnelle' })
);

// Routes API
app.use('/api/chatbot', chatRoute);                  // ChatBot
app.use('/api/v1/demandes', demandeRoutes);         // Demandes
app.use('/api/v1/statuts', statutsRoutes);          // Statuts
app.use('/api', authRoutes);                        // /api/login admin
app.use('/api/user', authuserRoutes);               // /api/user/login-user
app.use('/api/utilisateurs', utilisateursRoutes);  // Gestion utilisateurs
app.use('/api/agent', authAgentRoutes);             // Agent login & register

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Erreur interne du serveur',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  });
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
