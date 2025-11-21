import React, { useState, useEffect, useRef } from 'react';

export default function SubmitForm({ demandeToEdit = null, onSuccess, token, role }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [trackingCode, setTrackingCode] = useState(null);

  const [formData, setFormData] = useState({
    forme_juridique: '',
    denomination_officielle: '',
    nom_fr: '',
    date_creation: '',
    adresse_siege: '',
    region_province: '',
    statut_siege: '',
    nif: '',
    president_nom: '',
    president_cin: '',
    president_telephone: '',
    president_email: '',
    membres_executif_total: '',
    membres_executif_femmes: '',
    membres_executif_hommes: '',
    membres_organisation_total: '',
    membres_organisation_femmes: '',
    membres_organisation_hommes: '',
    employes_permanents_total: '',
    employes_permanents_femmes: '',
    employes_permanents_hommes: '',
    champ_intervention: '',
    champ_zone: '',
    nom_projet: '',
    objectif_general: '',
    objectifs_specifiques: '',
    resultats_attendus: '',
    probleme_social: '',
    responsable_nom: '',
    responsable_fonction: '',
    responsable_niveau_etudes: '',
    experience_gestion_projets: '',
    couverture_couts: '',
    augmentation_revenus: '',
    besoin_soutien: '',
    durabilite_projet: '',
    impact_environnemental: ''
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Animation state & ref
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef(null);

  const animationDuration = 300;

  useEffect(() => {
    if (demandeToEdit) {
      setFormData({
        forme_juridique: demandeToEdit.forme_juridique || '',
        denomination_officielle: demandeToEdit.denomination_officielle || '',
        nom_fr: demandeToEdit.nom_fr || '',
        date_creation: demandeToEdit.date_creation ? demandeToEdit.date_creation.slice(0, 10) : '',
        adresse_siege: demandeToEdit.adresse_siege || '',
        region_province: demandeToEdit.region_province || '',
        statut_siege: demandeToEdit.statut_siege || '',
        nif: demandeToEdit.nif || '',
        president_nom: demandeToEdit.president_nom || '',
        president_cin: demandeToEdit.president_cin || '',
        president_telephone: demandeToEdit.president_telephone || '',
        president_email: demandeToEdit.president_email || '',
        membres_executif_total: demandeToEdit.membres_executif_total || '',
        membres_executif_femmes: demandeToEdit.membres_executif_femmes || '',
        membres_executif_hommes: demandeToEdit.membres_executif_hommes || '',
        membres_organisation_total: demandeToEdit.membres_organisation_total || '',
        membres_organisation_femmes: demandeToEdit.membres_organisation_femmes || '',
        membres_organisation_hommes: demandeToEdit.membres_organisation_hommes || '',
        employes_permanents_total: demandeToEdit.employes_permanents_total || '',
        employes_permanents_femmes: demandeToEdit.employes_permanents_femmes || '',
        employes_permanents_hommes: demandeToEdit.employes_permanents_hommes || '',
        champ_intervention: demandeToEdit.champ_intervention || '',
        champ_zone: demandeToEdit.champ_zone || '',
        nom_projet: demandeToEdit.nom_projet || '',
        objectif_general: demandeToEdit.objectif_general || '',
        objectifs_specifiques: demandeToEdit.objectifs_specifiques || '',
        resultats_attendus: demandeToEdit.resultats_attendus || '',
        probleme_social: demandeToEdit.probleme_social || '',
        responsable_nom: demandeToEdit.responsable_nom || '',
        responsable_fonction: demandeToEdit.responsable_fonction || '',
        responsable_niveau_etudes: demandeToEdit.responsable_niveau_etudes || '',
        experience_gestion_projets: demandeToEdit.experience_gestion_projets || '',
        couverture_couts: demandeToEdit.couverture_couts || '',
        augmentation_revenus: demandeToEdit.augmentation_revenus || '',
        besoin_soutien: demandeToEdit.besoin_soutien || '',
        durabilite_projet: demandeToEdit.durabilite_projet || '',
        impact_environnemental: demandeToEdit.impact_environnemental || ''
      });
      setSuccess(false);
      setError(null);
    } else {
      setFormData(prev => {
        const cleared = {};
        for (const key in prev) cleared[key] = '';
        return cleared;
      });
      setSuccess(false);
      setError(null);
    }
  }, [demandeToEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = (step) => {
    const stepFields = {
      1: ['forme_juridique', 'denomination_officielle', 'nom_fr', 'date_creation', 'adresse_siege'],
      2: ['region_province', 'statut_siege', 'nif', 'president_nom', 'president_cin'],
      3: ['president_telephone', 'president_email', 'membres_executif_total', 'membres_executif_femmes', 'membres_executif_hommes'],
      4: ['membres_organisation_total', 'membres_organisation_femmes', 'membres_organisation_hommes', 'employes_permanents_total', 'employes_permanents_femmes', 'employes_permanents_hommes'],
      5: ['champ_intervention', 'champ_zone', 'nom_projet', 'objectif_general', 'objectifs_specifiques', 'resultats_attendus', 'probleme_social', 'responsable_nom', 'responsable_fonction', 'responsable_niveau_etudes', 'experience_gestion_projets', 'couverture_couts', 'augmentation_revenus', 'besoin_soutien', 'durabilite_projet', 'impact_environnemental']
    };

    for (const field of stepFields[step]) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        setError(`Le champ "${field.replace(/_/g, ' ')}" est obligatoire.`);
        return false;
      }
    }
    setError(null);
    return true;
  };

  const handleSubmit = async e => {
  e.preventDefault();

  if (role === 'admin' && !demandeToEdit) {
    setError("L'administrateur ne peut pas créer de nouvelles demandes.");
    return;
  }

  if (!validateStep(currentStep)) return;

  try {
    const isEdit = Boolean(demandeToEdit);
    const requestUrl = isEdit
      ? `http://localhost:5000/api/v1/demandes/${demandeToEdit.id}`
      : 'http://localhost:5000/api/v1/demandes';

    const requestOptions = {
      method: isEdit ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    // Inclure le token uniquement si présent
    if (token) {
      requestOptions.headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(requestUrl, requestOptions);

    if (!res.ok) {
      let errText = await res.text();
      try {
        const errJson = JSON.parse(errText);
        errText = errJson.error || JSON.stringify(errJson);
      } catch {
        // leave errText as is
      }
      throw new Error(`Erreur serveur : ${errText}`);
    }

    const data = await res.json();

    setSuccess(true);
    setError(null);

    if (!demandeToEdit) {
      setFormData(prev => {
        const cleared = {};
        for (const key in prev) cleared[key] = '';
        return cleared;
      });
      setCurrentStep(1);

      // Stocker et afficher le code de suivi reçu
      if (data.tracking_code) {
        setTrackingCode(data.tracking_code);
      }
    }

    if (onSuccess) onSuccess();

  } catch (err) {
    setError(err.message || 'Erreur inconnue lors de la soumission');
    setSuccess(false);
  }
};

  // Gestion animation transition d'étape
  const goToStep = (step) => {
    if (animating || step === currentStep) return;
    if (!validateStep(currentStep)) return;

    setAnimating(true);
    containerRef.current.classList.add('fade-out');

    setTimeout(() => {
      setCurrentStep(step);
      containerRef.current.classList.remove('fade-out');
      containerRef.current.classList.add('fade-in');

      setTimeout(() => {
        containerRef.current.classList.remove('fade-in');
        setAnimating(false);
      }, animationDuration);
    }, animationDuration);
  };

  const nextStep = () => goToStep(currentStep + 1);
  const prevStep = () => goToStep(currentStep - 1);

  // Styles généraux
  const containerStyle = {
    maxWidth: 700,
    margin: 'auto',
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 6,
    boxShadow: '0 2px 8px rgb(0 0 0 / 0.1)',
    backgroundColor: '#fff',
  };

  const inputStyle = {
    width: '100%',
    padding: 8,
    fontSize: '1rem',
    borderRadius: 4,
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: 6,
    fontWeight: '600',
    color: '#333',
  };

  const progressBarContainerStyle = {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 20,
    overflow: 'hidden',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
  };

  const progressBarStyle = {
    height: '100%',
    width: `${(currentStep / 5) * 100}%`,
    backgroundColor: '#007bff',
    transition: 'width 0.4s ease-in-out',
    borderRadius: 4,
  };

  const btnPrevStyle = {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: animating ? 'not-allowed' : 'pointer',
    opacity: animating ? 0.6 : 1,
  };

  const btnNextStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: animating ? 'not-allowed' : 'pointer',
    opacity: animating ? 0.6 : 1,
  };

  const btnSubmitStyle = {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: animating ? 'not-allowed' : 'pointer',
    opacity: animating ? 0.6 : 1,
  };

  const errorStyle = {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: 4,
  };

  const successStyle = {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: 4,
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div>
              <label style={labelStyle}>Forme Juridique <span style={{color:'red'}}>*</span></label>
             <div className="mb-6">
  <label htmlFor="forme_juridique" className="block text-sm font-medium text-gray-800 mb-2">
    Forme juridique<span className="text-red-500 ml-1">*</span>
  </label>
  <select
    name="forme_juridique"
    id="forme_juridique"
    value={formData.forme_juridique}
    onChange={handleChange}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a8742c] bg-white"
  >
    <option value="Association">Association</option>
    <option value="Réseau associatif">Réseau associatif</option>
    <option value="Coopérative">Coopérative</option>
  </select>
</div>


            </div>
            <div>
              <label style={labelStyle}>Dénomination Officielle <span style={{color:'red'}}>*</span></label>
              <input
                name="denomination_officielle"
                value={formData.denomination_officielle}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Nom en Français <span style={{color:'red'}}>*</span></label>
              <input
                name="nom_fr"
                value={formData.nom_fr}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Date de Création <span style={{color:'red'}}>*</span></label>
              <input
                type="date"
                name="date_creation"
                value={formData.date_creation}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Adresse du Siège <span style={{color:'red'}}>*</span></label>
              <textarea
                name="adresse_siege"
                value={formData.adresse_siege}
                onChange={handleChange}
                rows={3}
                style={textareaStyle}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <label style={labelStyle}>Région / Province <span style={{color:'red'}}>*</span></label>
              <input
                name="region_province"
                value={formData.region_province}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Statut Siège <span style={{color:'red'}}>*</span></label>
              <input
                name="statut_siege"
                value={formData.statut_siege}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>NIF <span style={{color:'red'}}>*</span></label>
              <input
                name="nif"
                value={formData.nif}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Nom du Président <span style={{color:'red'}}>*</span></label>
              <input
                name="president_nom"
                value={formData.president_nom}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>CIN du Président <span style={{color:'red'}}>*</span></label>
              <input
                name="president_cin"
                value={formData.president_cin}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div>
              <label style={labelStyle}>Téléphone du Président <span style={{color:'red'}}>*</span></label>
              <input
                name="president_telephone"
                value={formData.president_telephone}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Email du Président <span style={{color:'red'}}>*</span></label>
              <input
                type="email"
                name="president_email"
                value={formData.president_email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Membres exécutif total <span style={{color:'red'}}>*</span></label>
              <input
                name="membres_executif_total"
                type="number"
                min="0"
                value={formData.membres_executif_total}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Membres exécutif femmes <span style={{color:'red'}}>*</span></label>
              <input
                name="membres_executif_femmes"
                type="number"
                min="0"
                value={formData.membres_executif_femmes}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Membres exécutif hommes <span style={{color:'red'}}>*</span></label>
              <input
                name="membres_executif_hommes"
                type="number"
                min="0"
                value={formData.membres_executif_hommes}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div>
              <label style={labelStyle}>Membres organisation total <span style={{color:'red'}}>*</span></label>
              <input
                name="membres_organisation_total"
                type="number"
                min="0"
                value={formData.membres_organisation_total}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Membres organisation femmes <span style={{color:'red'}}>*</span></label>
              <input
                name="membres_organisation_femmes"
                type="number"
                min="0"
                value={formData.membres_organisation_femmes}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Membres organisation hommes <span style={{color:'red'}}>*</span></label>
              <input
                name="membres_organisation_hommes"
                type="number"
                min="0"
                value={formData.membres_organisation_hommes}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Employés permanents total <span style={{color:'red'}}>*</span></label>
              <input
                name="employes_permanents_total"
                type="number"
                min="0"
                value={formData.employes_permanents_total}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Employés permanents femmes <span style={{color:'red'}}>*</span></label>
              <input
                name="employes_permanents_femmes"
                type="number"
                min="0"
                value={formData.employes_permanents_femmes}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Employés permanents hommes <span style={{color:'red'}}>*</span></label>
              <input
                name="employes_permanents_hommes"
                type="number"
                min="0"
                value={formData.employes_permanents_hommes}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </>
        );
      case 5:
        return (
          <>
            <div>
              <label style={labelStyle}>Champ d'intervention <span style={{color:'red'}}>*</span></label>
              <input
                name="champ_intervention"
                value={formData.champ_intervention}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div className="mb-6">
  <label htmlFor="champ_zone" className="block text-sm font-medium text-gray-800 mb-2">
    Zone d'intervention<span className="text-red-500 ml-1">*</span>
  </label>
  <select
    name="champ_zone"
    id="champ_zone"
    value={formData.champ_zone}
    onChange={handleChange}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a8742c] bg-white"
  >
    
    <option value="Urbain">Urbain</option>
    <option value="Rural">Rural</option>
    <option value="Semi-urbain">Semi-urbain</option>
  </select>
</div>

            <div>
              <label style={labelStyle}>Nom du projet <span style={{color:'red'}}>*</span></label>
              <input
                name="nom_projet"
                value={formData.nom_projet}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Objectif général <span style={{color:'red'}}>*</span></label>
              <textarea
                name="objectif_general"
                value={formData.objectif_general}
                onChange={handleChange}
                rows={3}
                style={textareaStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Objectifs spécifiques <span style={{color:'red'}}>*</span></label>
              <textarea
                name="objectifs_specifiques"
                value={formData.objectifs_specifiques}
                onChange={handleChange}
                rows={3}
                style={textareaStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Résultats attendus <span style={{color:'red'}}>*</span></label>
              <textarea
                name="resultats_attendus"
                value={formData.resultats_attendus}
                onChange={handleChange}
                rows={3}
                style={textareaStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Problème social <span style={{color:'red'}}>*</span></label>
              <textarea
                name="probleme_social"
                value={formData.probleme_social}
                onChange={handleChange}
                rows={3}
                style={textareaStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Nom du responsable <span style={{color:'red'}}>*</span></label>
              <input
                name="responsable_nom"
                value={formData.responsable_nom}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Fonction du responsable <span style={{color:'red'}}>*</span></label>
              <input
                name="responsable_fonction"
                value={formData.responsable_fonction}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div className="mb-6">
  <label htmlFor="responsable_niveau_etudes" className="block text-sm font-medium text-gray-800 mb-2">
    Niveau d’études du responsable<span className="text-red-500 ml-1">*</span>
  </label>
  <select
    name="responsable_niveau_etudes"
    id="responsable_niveau_etudes"
    value={formData.responsable_niveau_etudes}
    onChange={handleChange}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a8742c] bg-white"
  >
    <option value="">Sélectionnez un niveau</option>
    <option value="Licence +5">Licence +5</option>
    <option value="Licence">Licence</option>
    <option value="Master">Master</option>
    <option value="Doctorat">Doctorat</option>
    <option value="Bac +2">Bac +2</option>
    <option value="Autre">Autre</option>
  </select>
</div>

            <div>
              <label style={labelStyle}>Expérience en gestion de projets <span style={{color:'red'}}>*</span></label>
              <textarea
                name="experience_gestion_projets"
                value={formData.experience_gestion_projets}
                onChange={handleChange}
                rows={3}
                style={textareaStyle}
              />
            </div>
            <div className="mb-6">
  <label htmlFor="couverture_couts" className="block text-sm font-medium text-gray-800 mb-2">
    Couverture des coûts<span className="text-red-500 ml-1">*</span>
  </label>
  <select
    name="couverture_couts"
    id="couverture_couts"
    value={formData.couverture_couts}
    onChange={handleChange}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a8742c] bg-white"
  >
    <option value="Oui, avec un excédent">Oui, avec un excédent</option>
    <option value="Oui, sans excédent">Oui, sans excédent</option>
    <option value="Non">Non</option>
  </select>
</div>

            <div className="mb-6">
  <label htmlFor="augmentation_revenus" className="block text-sm font-medium text-gray-800 mb-2">
    Augmentation des revenus prévue<span className="text-red-500 ml-1">*</span>
  </label>
  <select
    name="augmentation_revenus"
    id="augmentation_revenus"
    value={formData.augmentation_revenus}
    onChange={handleChange}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a8742c] bg-white"
  >
    
    <option value="Moins de 10 %">Moins de 10 %</option>
    <option value="Entre 10 % et 30 %">Entre 10 % et 30 %</option>
    <option value="Plus de 30 %">Plus de 30 %</option>
  </select>
</div>

            <div className="mb-6">
  <label htmlFor="besoin_soutien" className="block text-sm font-medium text-gray-800 mb-2">
    Besoin de soutien<span className="text-red-500 ml-1">*</span>
  </label>
  <select
    name="besoin_soutien"
    id="besoin_soutien"
    value={formData.besoin_soutien}
    onChange={handleChange}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a8742c] bg-white"
  >
    
    <option value="Oui">Oui</option>
    <option value="Quelque chose">Quelque chose</option>
    <option value="Non">Non</option>
  </select>
</div>

            <div className="mb-6">
  <label htmlFor="durabilite_projet" className="block text-sm font-medium text-gray-800 mb-2">
    Durabilité du projet<span className="text-red-500 ml-1">*</span>
  </label>
  <select
    name="durabilite_projet"
    id="durabilite_projet"
    value={formData.durabilite_projet}
    onChange={handleChange}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a8742c] bg-white"
  >
    <option value="Court terme">Court terme</option>
    <option value="Moyen terme">Moyen terme</option>
    <option value="Long terme">Long terme</option>
  </select>
</div>

            <div className="mb-6">
  <label htmlFor="impact_environnemental" className="block text-sm font-medium text-gray-800 mb-2">
    Le projet a-t-il un impact environnemental ?<span className="text-red-500 ml-1">*</span>
  </label>
  <select
    name="impact_environnemental"
    id="impact_environnemental"
    value={formData.impact_environnemental}
    onChange={handleChange}
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a8742c] bg-white"
  >
    
    <option value="Oui">Oui</option>
    <option value="Non">Non</option>
  </select>
</div>

          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Style animations */}
      <style>{`
        .fade-in {
          animation: fadeIn ${animationDuration}ms forwards;
        }
        .fade-out {
          animation: fadeOut ${animationDuration}ms forwards;
        }
        @keyframes fadeIn {
          from {opacity: 0; transform: translateX(20px);}
          to {opacity: 1; transform: translateX(0);}
        }
        @keyframes fadeOut {
          from {opacity: 1; transform: translateX(0);}
          to {opacity: 0; transform: translateX(-20px);}
        }
      `}</style>

      <form onSubmit={handleSubmit} style={containerStyle}>
        {/* Barre de progression */}
        <div style={progressBarContainerStyle}>
          <div style={progressBarStyle} />
        </div>

        <h2 style={{ marginBottom: 15 }}>Étape {currentStep} sur 5</h2>

        {error && <div style={errorStyle}>{error}</div>}
        {success && <div style={successStyle}>Formulaire soumis avec succès !</div>}

        <div ref={containerRef}>
          {renderStep()}
        </div>
        {success && trackingCode && (
  <div style={{ marginBottom: 20, padding: 10, backgroundColor: '#e0f7fa', color: '#00796b', borderRadius: 4 }}>
    <strong>Votre code de suivi : </strong> {trackingCode} <br />
    <small>Conservez ce code pour suivre l’avancement de votre demande.</small>
  </div>
)}


        <div style={{ marginTop: 25, display: 'flex', justifyContent: 'space-between' }}>
          {currentStep > 1 && (
            <button type="button" onClick={prevStep} style={btnPrevStyle} disabled={animating}>
              Précédent
            </button>
          )}

          {currentStep < 5 && (
            <button
              type="button"
              onClick={nextStep}
              style={btnNextStyle}
              disabled={animating}
            >
              Suivant
            </button>
          )}

          {currentStep === 5 && (
            <button type="submit" style={btnSubmitStyle} disabled={animating}>
              Soumettre
            </button>
          )}
        </div>
      </form>
    </>
  );
}
