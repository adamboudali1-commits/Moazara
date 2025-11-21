const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    try {
      // 1. Récupérer le token dans l'en-tête Authorization (format : "Bearer <token>")
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token manquant ou mal formaté' });
      }

      const token = authHeader.split(' ')[1];

      // 2. Vérifier et décoder le token
      const decoded = jwt.verify(token, JWT_SECRET);

      // 3. Vérifier le rôle dans le token
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Accès refusé : rôle non autorisé' });
      }

      // 4. Ajouter les infos utilisateur à la requête pour usage ultérieur
      req.user = decoded;

      // 5. Continuer vers la route suivante
      next();

    } catch (err) {
      return res.status(401).json({ error: 'Token invalide ou expiré' });
    }
  };
}

module.exports = authorizeRoles;
