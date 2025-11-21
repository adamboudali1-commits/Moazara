import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitForm from './SubmitForm';
import { FaSignOutAlt, FaSyncAlt, FaEdit, FaTrashAlt, FaInfoCircle, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';

export default function DemandesManager({ token, onLogout, role }) {
  const [demandes, setDemandes] = useState([]);
  const [statuts, setStatuts] = useState([]);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchDemandes = useCallback(async () => {
    setLoading(true);
    setError(null);
    setDemandes([]);

    try {
      const response = await fetch('http://localhost:5000/api/v1/demandes', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401 || response.status === 403) {
        onLogout();
        navigate('/login');
        return;
      }

      if (!response.ok) throw new Error('Erreur lors du chargement des demandes.');

      const data = await response.json();
      setDemandes(data);
    } catch (err) {
      setError(err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [token, onLogout, navigate]);

  const fetchStatuts = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/statuts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erreur lors du chargement des statuts.');
      const data = await res.json();
      setStatuts(data);
    } catch (err) {
      console.error('Erreur fetchStatuts:', err);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    if (role === 'admin') {
      navigate('/utilisateurs');
      return;
    }

    fetchDemandes();
    fetchStatuts();
  }, [token, role, navigate, fetchDemandes, fetchStatuts]);

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette demande ?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/v1/demandes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401 || res.status === 403) {
        onLogout();
        navigate('/login');
        return;
      }

      if (!res.ok) throw new Error('Erreur lors de la suppression.');

      setDemandes(demandes.filter(d => d.id !== id));
      if (selectedDemande?.id === id) setSelectedDemande(null);
    } catch (err) {
      alert(err.message || 'Erreur lors de la suppression.');
    }
  };

  const handleEdit = (demande) => {
    setSelectedDemande(demande);
  };

  const handleSuccess = () => {
    fetchDemandes();
    setSelectedDemande(null);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  const handleStatutChange = async (id, newStatutId) => {
    try {
      const statutObj = statuts.find((s) => s.id === newStatutId);
      if (!statutObj) throw new Error('Statut invalide sélectionné.');

      const res = await fetch(`http://localhost:5000/api/v1/demandes/${id}/statut`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ statut: statutObj.libelle }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erreur lors de la mise à jour du statut.');
      }

      setDemandes((prev) =>
        prev.map((demande) =>
          demande.id === id
            ? { ...demande, statut_id: newStatutId, statut: statutObj.libelle }
            : demande
        )
      );
    } catch (err) {
      alert(err.message || 'Erreur lors de la mise à jour du statut.');
    }
  };

  const getStatutColor = (libelle) => {
    switch (libelle.toLowerCase()) {
      case 'en attente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'approuvé':
      case 'accepté':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'rejeté':
      case 'refusé':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'en cours':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatutIcon = (libelle) => {
    switch (libelle.toLowerCase()) {
      case 'en attente':
        return <FaHourglassHalf className="text-yellow-500" />;
      case 'approuvé':
      case 'accepté':
        return <FaCheckCircle className="text-green-500" />;
      case 'rejeté':
      case 'refusé':
        return <FaTimesCircle className="text-red-500" />;
      case 'en cours':
        return <FaSyncAlt className="text-blue-500 animate-spin-slow" />;
      default:
        return <FaInfoCircle className="text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8 bg-gray-50 min-h-screen font-sans">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 sm:mb-0">Tableau de bord des demandes</h1>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-md"
          onClick={handleLogoutClick}
        >
          <FaSignOutAlt />
          <span>Déconnexion</span>
        </button>
      </header>
      
      {role === 'agent' && (
        <div className="mb-4 text-right">
          <button
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 shadow-md"
            onClick={fetchDemandes}
          >
            <FaSyncAlt className="mr-2" /> Rafraîchir
          </button>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center my-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg border border-red-300 mb-6 flex items-center space-x-2">
          <FaTimesCircle className="text-red-500 text-xl" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {!loading && demandes.length === 0 && !error && (
        <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
          <p className="text-lg">Aucune demande disponible pour le moment. ✨</p>
        </div>
      )}

      <div className="space-y-4">
        {!loading &&
          demandes.map((demande, index) => (
            <div
              key={demande.id}
              className="p-4 bg-white shadow-lg rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center transition-transform transform hover:scale-[1.01] duration-200"
            >
              <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                  {demande.nom_projet || `Demande #${index + 1}`}
                </h3>
                <div className={`inline-flex items-center space-x-1 px-3 py-1 mt-2 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatutColor(demande.statut)} border`}>
                  {getStatutIcon(demande.statut)}
                  <span>{demande.statut}</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
                <select
                  className="w-full md:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={demande.statut_id}
                  onChange={(e) => handleStatutChange(demande.id, parseInt(e.target.value))}
                >
                  {statuts.map((statut) => (
                    <option key={statut.id} value={statut.id}>
                      {statut.libelle}
                    </option>
                  ))}
                </select>
                <button
                  className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  onClick={() => handleEdit(demande)}
                >
                  <FaEdit className="md:mr-2" /> <span className="hidden md:inline">Consulter</span>
                </button>
                <button
                  className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                  onClick={() => handleDelete(demande.id)}
                >
                  <FaTrashAlt className="md:mr-2" /> <span className="hidden md:inline">Supprimer</span>
                </button>
              </div>
            </div>
          ))}
      </div>

      {(selectedDemande || (role === 'user' && !selectedDemande)) && (
        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {selectedDemande ? 'Détails de la demande' : 'Soumettre une nouvelle demande'}
          </h2>
          <SubmitForm
            demandeToEdit={selectedDemande}
            onSuccess={handleSuccess}
            token={token}
            role={role}
          />
        </div>
      )}

      {role !== 'admin' && role !== 'agent' && role !== 'user' && (
        <div className="mt-8 p-6 bg-red-100 rounded-lg shadow-md text-center text-red-800">
          <p className="text-lg font-medium">Rôle non reconnu. Accès refusé.</p>
        </div>
      )}
    </div>
  );
}