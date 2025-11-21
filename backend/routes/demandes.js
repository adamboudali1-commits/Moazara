const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorizeRoles = require('../middlewares/authorizeRoles');
const validateDemande = require('../validators/demandeValidator');

// GET all demandes (admin & agent)
router.get('/', authorizeRoles('admin', 'agent'), async (req, res) => {
  try {
    const [demandes] = await pool.query(`
      SELECT d.*, s.libelle AS statut
      FROM demandes d
      LEFT JOIN statuts s ON d.statut_id = s.id
      ORDER BY d.date_creation DESC
    `);
    res.json(demandes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new demande (public)
router.post('/', validateDemande, async (req, res) => {
  try {
    let { statut, ...data } = req.body;

    if (!statut || statut.trim() === '') statut = 'En cours';

    // Récupère l'id du statut
    const [statutRows] = await pool.query('SELECT id FROM statuts WHERE libelle = ? LIMIT 1', [statut]);
    const statutId = statutRows[0]?.id;
    if (!statutId) return res.status(400).json({ error: 'Statut invalide' });

    const newData = { ...data, statut_id: statutId };

    if (newData.date_creation) newData.date_creation = new Date(newData.date_creation);

    const intFields = [
      'membres_executif_total', 'membres_executif_femmes', 'membres_executif_hommes',
      'membres_organisation_total', 'membres_organisation_femmes', 'membres_organisation_hommes',
      'employes_permanents_total', 'employes_permanents_femmes', 'employes_permanents_hommes'
    ];
    intFields.forEach(field => {
      if (newData[field] !== undefined) {
        newData[field] = parseInt(newData[field], 10) || 0;
      }
    });

    function generateTrackingCode(length = 6) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return `MOZ-${code}`;
    }

    let trackingCode, isUnique = false;
    while (!isUnique) {
      trackingCode = generateTrackingCode();
      const [existing] = await pool.query('SELECT id FROM demandes WHERE tracking_code = ?', [trackingCode]);
      if (existing.length === 0) isUnique = true;
    }
    newData.tracking_code = trackingCode;

    const [result] = await pool.query('INSERT INTO demandes SET ?', [newData]);

    res.status(201).json({ id: result.insertId, tracking_code: trackingCode });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update demande (agent only)
router.put('/:id', authorizeRoles('agent'), validateDemande, async (req, res) => {
  try {
    const { statut, ...data } = req.body;

    const [rows] = await pool.query('SELECT id FROM statuts WHERE libelle = ? LIMIT 1', [statut]);
    const statutId = rows[0]?.id;
    if (!statutId) return res.status(400).json({ error: 'Statut invalide' });

    const updatedData = { ...data, statut_id: statutId };

    if (updatedData.date_creation) updatedData.date_creation = new Date(updatedData.date_creation);

    const intFields = [
      'membres_executif_total', 'membres_executif_femmes', 'membres_executif_hommes',
      'membres_organisation_total', 'membres_organisation_femmes', 'membres_organisation_hommes',
      'employes_permanents_total', 'employes_permanents_femmes', 'employes_permanents_hommes'
    ];
    intFields.forEach(field => {
      if (updatedData[field] !== undefined) {
        updatedData[field] = parseInt(updatedData[field], 10) || 0;
      }
    });

    const [result] = await pool.query('UPDATE demandes SET ? WHERE id = ?', [updatedData, req.params.id]);

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Demande non trouvée' });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE demande (agent only)
router.delete('/:id', authorizeRoles('agent'), async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM demandes WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Demande non trouvée' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET suivi demande (public)
router.get('/suivi/:code', async (req, res) => {
  try {
    const trackingCode = req.params.code;

    const [rows] = await pool.query(`
      SELECT d.id, d.nom_projet, d.tracking_code, s.libelle AS statut
      FROM demandes d
      LEFT JOIN statuts s ON d.statut_id = s.id
      WHERE d.tracking_code = ?
      LIMIT 1
    `, [trackingCode]);

    if (rows.length === 0) return res.status(404).json({ error: 'Aucune demande trouvée avec ce code' });

    res.json(rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT update statut (agent only) avec id de statut (pas libellé)
router.put('/:id/statut', authorizeRoles('agent'), async (req, res) => {
  const { statut } = req.body;
  const { id } = req.params;

  console.log('Requête PUT statut reçue:', req.body); // debug

  if (!statut || typeof statut !== 'string') {
    return res.status(400).json({ error: 'Statut requis.' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id FROM statuts WHERE LOWER(libelle) = LOWER(?) LIMIT 1',
      [statut]
    );
    if (rows.length === 0) return res.status(400).json({ error: 'Statut invalide.' });

    const statutId = rows[0].id;

    const [result] = await pool.query('UPDATE demandes SET statut_id = ? WHERE id = ?', [statutId, id]);

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Demande non trouvée.' });

    res.json({ success: true, message: 'Statut mis à jour.' });
  } catch (err) {
    console.error('Erreur update statut:', err);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du statut.' });
  }
});


module.exports = router;
