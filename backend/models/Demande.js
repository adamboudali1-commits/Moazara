const pool = require('../db');

// Fonction utilitaire pour générer un code aléatoire
function generateTrackingCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `MOZ-${code}`;
}

const Demande = {
  async create(demandeData) {
    // Générer un code de suivi aléatoire
    let trackingCode;
    let isUnique = false;

    // Boucle pour garantir l’unicité du code
    while (!isUnique) {
      trackingCode = generateTrackingCode();
      const [existing] = await pool.execute(
        'SELECT id FROM demandes WHERE tracking_code = ?',
        [trackingCode]
      );
      if (existing.length === 0) {
        isUnique = true;
      }
    }

    // Ajouter le code dans l’objet à insérer
    demandeData.tracking_code = trackingCode;

    // Insertion dans la base
    const [result] = await pool.execute(
      `INSERT INTO demandes SET ?`,
      [demandeData]
    );

    // On retourne aussi le code de suivi pour l’afficher après soumission
    return {
      insertId: result.insertId,
      tracking_code: trackingCode,
    };
  },

  async findByStatut(statut_id = null) {
    let query = 'SELECT * FROM demandes';
    const params = [];
    
    if (statut_id) {
      query += ' WHERE statut_id = ?';
      params.push(statut_id);
    }

    const [rows] = await pool.execute(query, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM demandes WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0] || null;
  }
};

module.exports = Demande;
