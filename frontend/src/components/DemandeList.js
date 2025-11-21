import React, { useState, useEffect } from 'react';

export default function DemandeList() {
  const [demandes, setDemandes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDemandes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/demandes');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setDemandes(data);
    } catch (error) {
      console.error('Erreur de récupération:', error);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette demande ?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/v1/demandes/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`Erreur lors de la suppression: ${response.status}`);
      setDemandes(demandes.filter(d => d.id !== id));
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression");
    }
  };

  // Filtrer selon forme_juridique, denomination_officielle ou nom_projet
  const filteredDemandes = demandes.filter(demande => {
    const search = searchTerm.toLowerCase();
    return (
      (demande.forme_juridique && demande.forme_juridique.toLowerCase().includes(search)) ||
      (demande.denomination_officielle && demande.denomination_officielle.toLowerCase().includes(search)) ||
      (demande.nom_projet && demande.nom_projet.toLowerCase().includes(search))
    );
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>Liste des demandes</h2>

      <input
        type="text"
        placeholder="Rechercher par forme juridique, dénomination ou projet..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginBottom: 15, padding: 8, width: '100%', maxWidth: 400 }}
      />

      {filteredDemandes.length === 0 ? (
        <p>Aucune demande trouvée pour cette recherche.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 0 10px #ccc' }}>
          <thead style={{ backgroundColor: '#007bff', color: '#fff' }}>
            <tr>
              <th style={{ padding: 10, border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: 10, border: '1px solid #ddd' }}>Forme juridique</th>
              <th style={{ padding: 10, border: '1px solid #ddd' }}>Dénomination officielle</th>
              <th style={{ padding: 10, border: '1px solid #ddd' }}>Date de création</th>
              <th style={{ padding: 10, border: '1px solid #ddd' }}>Région / Province</th>
              <th style={{ padding: 10, border: '1px solid #ddd' }}>Nom du projet</th>
              <th style={{ padding: 10, border: '1px solid #ddd' }}>Statut</th>
              <th style={{ padding: 10, border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDemandes.map(demande => (
              <tr key={demande.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{demande.id}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{demande.forme_juridique}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{demande.denomination_officielle}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>
                  {new Date(demande.date_creation).toLocaleDateString()}
                </td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{demande.region_province}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{demande.nom_projet}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{demande.statut}</td>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>
                  <button
                    onClick={() => handleDelete(demande.id)}
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer',
                      borderRadius: 4,
                    }}
                    title="Supprimer"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
