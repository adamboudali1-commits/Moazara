const Joi = require('joi');

const schema = Joi.object({
  // Slide 1 : Informations générales
  forme_juridique: Joi.string().valid('Association', 'Réseau associatif', 'Coopérative').required(),
  denomination_officielle: Joi.string().min(2).max(255).required(),
  nom_fr: Joi.string().min(2).max(255).required(),
  date_creation: Joi.date().required(),
  adresse_siege: Joi.string().min(5).required(),
  region_province: Joi.string().min(2).max(255).required(),
  statut_siege: Joi.string().min(2).max(255).required(),
  nif: Joi.string().min(3).max(100).required(),

  president_nom: Joi.string().min(2).max(255).required(),
  president_cin: Joi.string().min(3).max(100).required(),
  president_telephone: Joi.string().pattern(/^[0-9+\s\-]{6,20}$/).required(),
  president_email: Joi.string().email().required(),

  // Slide 2 : Ressources humaines
  membres_executif_total: Joi.number().integer().min(0).required(),
  membres_executif_femmes: Joi.number().integer().min(0).required(),
  membres_executif_hommes: Joi.number().integer().min(0).required(),
  membres_organisation_total: Joi.number().integer().min(0).required(),
  membres_organisation_femmes: Joi.number().integer().min(0).required(),
  membres_organisation_hommes: Joi.number().integer().min(0).required(),
  employes_permanents_total: Joi.number().integer().min(0).required(),
  employes_permanents_femmes: Joi.number().integer().min(0).required(),
  employes_permanents_hommes: Joi.number().integer().min(0).required(),

  // Slide 3 : Champ d'intervention
  champ_intervention: Joi.string().min(2).max(255).required(),
  champ_zone: Joi.string().valid(
    'Urbain', 'Rural', 'Semi-urbain',
    'urbain', 'rural', 'semi-urbain'
  ).insensitive().required(),

  // Slide 4 : Description du projet
  nom_projet: Joi.string().min(2).max(255).required(),
  objectif_general: Joi.string().min(5).required(),
  objectifs_specifiques: Joi.string().min(5).required(),
  resultats_attendus: Joi.string().min(5).required(),
  probleme_social: Joi.string().min(5).required(),
  responsable_nom: Joi.string().min(2).max(255).required(),
  responsable_fonction: Joi.string().min(2).max(100).required(),
  responsable_niveau_etudes: Joi.string().valid(
    'Licence +5', 'Licence', 'Master', 'Doctorat', 'Bac +2', 'Autre'
  ).required(),
  experience_gestion_projets: Joi.string().allow('', null),

  // Slide 5 : Viabilité du projet
  couverture_couts: Joi.string().valid(
    'Oui, avec un excédent', 'Oui, sans excédent', 'Non'
  ).required(),
  augmentation_revenus: Joi.string().valid(
    'Moins de 10 %', 'Entre 10 % et 30 %', 'Plus de 30 %'
  ).required(),
  besoin_soutien: Joi.string().valid(
    'Oui', 'Quelque chose', 'Non'
  ).required(),
  durabilite_projet: Joi.string().valid(
    'Court terme', 'Moyen terme', 'Long terme'
  ).required(),
  impact_environnemental: Joi.string().valid('Oui', 'Non').required()
});

// Middleware de validation
module.exports = (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map(err => ({
      field: err.path[0],
      message: err.message.replace(/"/g, '')
    }));
    return res.status(400).json({ errors });
  }

  next();
};
