const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Le message est requis' });

    const response = await axios.post(
      'https://api.chatbase.com/v1/query',
      { message },
      {
        headers: {
          'Authorization': `Bearer ${process.env.CHATBASE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ reply: response.data.reply || 'Pas de réponse disponible' });
  } catch (err) {
    console.error('[CHATBOT ERROR]', err.response ? err.response.data : err.message);
    res.status(500).json({ error: 'Erreur serveur chatbot' });
  }
});

module.exports = router;
