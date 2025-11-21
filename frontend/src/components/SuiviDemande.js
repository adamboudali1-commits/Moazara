import React, { useState } from 'react';

export default function SuiviDemande() {
  const [code, setCode] = useState('');
  const [resultat, setResultat] = useState(null);
  const [erreur, setErreur] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecherche = async () => {
    if (!code.trim()) {
      setErreur('Veuillez entrer un code de suivi');
      setResultat(null);
      return;
    }

    setErreur('');
    setLoading(true);
    setResultat(null);

    try {
      const response = await fetch(`/api/v1/demandes/suivi/${code.trim()}`);

      if (!response.ok) {
        const errData = await response.json();
        setErreur(errData.error || 'Erreur lors de la recherche');
        setResultat(null);
      } else {
        const data = await response.json();
        setResultat(data);
      }
    } catch (err) {
      setErreur('Erreur de connexion au serveur');
      setResultat(null);
    } finally {
      setLoading(false);
    }
  };

  // Couleurs selon statut avec thème marron/artisanat
  const statutColors = {
    Accepté: 'text-green-700',
    Refusé: 'text-red-700',
    'En cours': 'text-yellow-800 font-semibold', // marron/orangé chaud
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 border border-yellow-300">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-yellow-900">
          Suivre votre demande
        </h2>

        <div className="mb-6">
          <label
            htmlFor="code"
            className="block text-sm font-semibold text-black mb-2"
          >
            Code de suivi :
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ex: MOZ-XYZ123"
            className="w-full border border-yellow-400 rounded-md px-4 py-3 focus:outline-none focus:ring-4 focus:ring-yellow-400"
          />
        </div>

        <button
          onClick={handleRecherche}
          className="w-full bg-yellow-700 text-white py-3 rounded-md hover:bg-yellow-800 transition font-semibold shadow-md"
          disabled={loading}
        >
          {loading ? 'Recherche...' : 'Vérifier le statut'}
        </button>

        {erreur && (
          <p className="text-red-700 text-sm mt-5 text-center font-semibold">{erreur}</p>
        )}

        {resultat && (
          <div className="mt-8 border-t border-yellow-300 pt-6 text-yellow-900 font-medium">
            <h3 className="text-xl font-bold mb-3 text-black">Informations :</h3>
            <p className="mb-1">
              <span className="font-semibold text-black">Projet :</span>{' '}
              <span>{resultat.nom_projet}</span>
            </p>
            <p className="mb-1">
              <span className="font-semibold text-black">Code :</span>{' '}
              <span>{resultat.tracking_code}</span>
            </p>
            <p className="mb-1">
              <span className="font-semibold text-black">Statut :</span>{' '}
              <span
                className={`font-bold ${
                  statutColors[resultat.statut] || 'text-yellow-800'
                }`}
              >
                {resultat.statut}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
