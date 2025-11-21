import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Bookmark, MapPin, FileText } from 'react-feather';

const STATUTS = {
  1: { libelle: 'En cours', icon: Clock, color: 'bg-yellow-100 text-yellow-800', borderColor: '#F59E0B' },
  2: { libelle: 'Acceptée', icon: CheckCircle, color: 'bg-green-100 text-green-800', borderColor: '#10B981' },
  3: { libelle: 'Refusée', icon: XCircle, color: 'bg-red-100 text-red-800', borderColor: '#EF4444' }
};

const Demandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [statutFilter, setStatutFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const url = statutFilter === 'all' 
          ? '/api/v1/demandes' 
          : `/api/v1/demandes?statut_id=${statutFilter}`;
        const response = await fetch(url);
        const data = await response.json();
        setDemandes(data);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDemandes();
  }, [statutFilter]);

  if (isLoading) {
    return <div className="mx-auto p-4 max-w-7xl"><p>Chargement en cours...</p></div>;
  }

  return (
    <div className="mx-auto p-4 max-w-7xl">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Bookmark size={24} className="text-blue-500" />
        Liste des demandes
      </h2>

      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filtrer par statut :</label>
        <select
          onChange={(e) => setStatutFilter(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          value={statutFilter}
        >
          <option value="all">Toutes les demandes</option>
          {Object.entries(STATUTS).map(([id, { libelle }]) => (
            <option key={id} value={id}>{libelle}</option>
          ))}
        </select>
      </div>

      {demandes.length > 0 ? (
        <div className="space-y-4">
          {demandes.map(demande => {
            const StatutIcon = STATUTS[demande.statut_id]?.icon || Clock;
            const statutStyle = STATUTS[demande.statut_id] || {};

            return (
              <div
                key={demande.id}
                className="bg-white p-6 rounded-lg shadow-md border-l-4"
                style={{ borderLeftColor: statutStyle.borderColor || '#ccc' }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {demande.forme_juridique} - {demande.denomination_officielle}
                  </h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statutStyle.color || 'bg-gray-100 text-gray-800'}`}>
                    <StatutIcon size={14} className="mr-1" />
                    {statutStyle.libelle || 'Inconnu'}
                  </span>
                </div>

                <div className="space-y-3 text-gray-700">
                  <p><strong>Date de création :</strong> {new Date(demande.date_creation).toLocaleDateString()}</p>

                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    <span><strong>Région / Province :</strong> {demande.region_province}</span>
                  </div>

                  <p><strong>Nom du projet :</strong> {demande.nom_projet}</p>
                </div>

                <div className="text-xs text-gray-400 mt-2">
                  Soumis le: {new Date(demande.date_soumission).toLocaleString('fr-FR')}
                </div>

                <button
                  onClick={async () => {
                    if (window.confirm('Voulez-vous vraiment supprimer cette demande ?')) {
                      try {
                        const res = await fetch(`/api/v1/demandes/${demande.id}`, { method: 'DELETE' });
                        if (!res.ok) throw new Error('Erreur suppression');
                        setDemandes(demandes.filter(d => d.id !== demande.id));
                      } catch (e) {
                        alert('Erreur lors de la suppression');
                      }
                    }
                  }}
                  className="mt-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Aucune demande disponible</p>
          {statutFilter !== 'all' && (
            <button 
              onClick={() => setStatutFilter('all')}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Voir toutes les demandes
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Demandes;
