import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Les importations d'icônes externes ont été supprimées

// Composant notification
const Toast = ({ message, type, onClose }) => {
  if (!message) return null;
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-xl flex items-center justify-between z-50 animate-fade-in`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-lg font-bold">
        {/* Remplacement de FaTimes par un X simple */}
        X 
      </button>
    </div>
  );
};

export default function UserList({ onLogout }) {
  const [users, setUsers] = useState([]);
  // Le champ mot_de_passe a été réintroduit dans formData
  const [formData, setFormData] = useState({ nom: '', email: '', mot_de_passe: '', role: 'utilisateur' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [showUserListModal, setShowUserListModal] = useState(false);

  const navigate = useNavigate();
  // Assurez-vous que cette URL correspond à votre backend
  const API_URL = 'http://localhost:5000/api/utilisateurs'; 
  const API_URL_AG = 'http://localhost:5000/api/utilisateurs/agents'; 

  const showNotification = useCallback((msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  }, []);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      console.error('Erreur de chargement des utilisateurs:', err);
      showNotification('Erreur lors du chargement des utilisateurs.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    // Réinitialiser le formulaire, y compris le champ mot_de_passe
    setFormData({ nom: '', email: '', mot_de_passe: '', role: 'utilisateur' });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Lors de la modification, exclure le mot de passe s'il n'est pas fourni (il est vide dans formData)
        const { mot_de_passe, ...dataToSend } = formData; 
        await axios.put(`${API_URL}/${editingId}`, dataToSend);
        showNotification('Utilisateur modifié avec succès.', 'success');
      } else {
        console.log(formData);
        // En mode ajout, envoyer les données avec le mot de passe
        await axios.post(API_URL_AG, formData);
        showNotification('Nouvel utilisateur ajouté avec succès !', 'success');
      }
      resetForm();
      fetchUsers();
    } catch (err) {
      console.error('Erreur lors de la soumission du formulaire:', err);
      showNotification('Erreur lors de l’enregistrement de l’utilisateur.', 'error');
    }
  };

  const handleEdit = (user) => {
    // Pré-remplir le formulaire d'édition, mais laisser le champ mot_de_passe vide pour ne pas exposer l'ancien
    setFormData({ nom: user.nom, email: user.email, mot_de_passe: '', role: user.role });
    setIsEditing(true);
    setEditingId(user.id);
    setShowUserListModal(false);
  };

  const handleDelete = async (id) => {
    // Utiliser une modal personnalisée pour la confirmation au lieu de window.confirm
    // (conformément aux instructions du guide pour les iframes)
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return; // TODO: Remplacer par une modal custom
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
      showNotification('Utilisateur supprimé avec succès.', 'success');
    } catch (err) {
      console.error('Erreur lors de la suppression de l’utilisateur:', err);
      showNotification('Erreur lors de la suppression de l’utilisateur.', 'error');
    }
  };

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    navigate('/login');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-4xl font-extrabold text-gray-900">Gestion des Utilisateurs</h2>
        <button
          onClick={handleLogoutClick}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-colors"
        >
          {/* Remplacement de FaSignOutAlt par un texte simple ou une icône SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span>Déconnexion</span>
        </button>
      </header>

      <section className="bg-white p-8 rounded-xl shadow-lg mb-8">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">{isEditing ? 'Modifier un utilisateur' : 'Ajouter un nouvel utilisateur'}</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom de l'utilisateur"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Adresse email"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {/* Le champ mot de passe est de nouveau ici, visible seulement pour l'ajout */}
            {!isEditing && (
              <input
                type="password"
                name="mot_de_passe"
                value={formData.mot_de_passe}
                onChange={handleChange}
                placeholder="Mot de passe"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            )}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="utilisateur">Utilisateur</option>
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors"
              >
                Annuler
              </button>
            )}
            <button
              type="submit"
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors"
            >
              {isEditing ? (
                // Remplacement de FaEdit par une icône SVG simple
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              ) : (
                // Remplacement de FaPlus par une icône SVG simple
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              )}
              <span>{isEditing ? 'Modifier l\'utilisateur' : 'Ajouter l\'utilisateur'}</span>
            </button>
          </div>
        </form>
      </section>

      {/* Bouton pour afficher la liste des utilisateurs */}
      <div className="text-center my-8">
        <button
          onClick={() => setShowUserListModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors transform hover:scale-105"
        >
          Afficher la liste complète des utilisateurs
        </button>
      </div>

      {/* Modal liste utilisateurs */}
      {showUserListModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col relative">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-3xl font-bold text-gray-800">Liste des utilisateurs</h3>
              <button
                onClick={() => setShowUserListModal(false)}
                className="text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="Fermer"
              >
                {/* Remplacement de FaTimes par un X simple */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
              {isLoading ? (
                <div className="text-center py-10">
                  <p className="text-gray-500 text-lg">Chargement des utilisateurs...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal font-semibold">
                        <th className="py-3 px-6 text-left">Nom</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-center">Rôle</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-800 text-sm font-normal">
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6 text-left whitespace-nowrap">{user.nom}</td>
                          <td className="py-4 px-6 text-left">{user.email}</td>
                          <td className="py-4 px-6 text-center">
                            <span className={`py-1 px-3 rounded-full text-xs font-bold ${
                              user.role === 'admin' ? 'bg-purple-200 text-purple-600' :
                              user.role === 'agent' ? 'bg-blue-200 text-blue-600' :
                              'bg-gray-200 text-gray-600'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center space-x-2">
                            <button
                              onClick={() => handleEdit(user)}
                              className="text-yellow-600 hover:text-yellow-800 transition-colors"
                              title="Modifier"
                            >
                              {/* Remplacement de FaEdit par une icône SVG simple */}
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                              title="Supprimer"
                            >
                              {/* Remplacement de FaTrash par une icône SVG simple */}
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Toast message={message} type={messageType} onClose={() => setMessage('')} />
    </div>
  );
}
