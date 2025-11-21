import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [role, setRole] = useState('admin'); // Initialisez le rôle par défaut
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let endpoint = '';
    let body = {};

    if (role === 'admin') {
      endpoint = '/api/login';
      body = { email, mot_de_passe: motDePasse };
    } else if (role === 'user') {
      endpoint = '/api/user/login-user';
      body = { email }; // L'email suffit pour la connexion user selon votre code
    } else if (role === 'agent') {
      endpoint = '/api/agent/login';
      body = { email, mot_de_passe: motDePasse };
    }

    try {
      // Simulation de l'appel API de connexion avec un délai
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Appel API réel (décommenté pour utiliser 'body' et éviter le warning ESLint)
      // Note: Dans un environnement de développement, vous devrez vous assurer que le serveur localhost:5000 est en cours d'exécution
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body), // 'body' est utilisé ici
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Erreur inconnue');
      }

      const data = await response.json();

      // Stockage du token et du rôle (simulés si l'API est mockée)
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', role);
      onLogin(data.token, role); // Appelle la fonction de rappel passée par le parent

      // Redirection selon le rôle
      if (role === 'admin') {
        navigate('/admin/users');
      } else if (role === 'user' || role === 'agent') {
        navigate('/demandes');
      }

    } catch (err) {
      setError(err.message || 'Erreur inconnue lors de la connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Script Tailwind CSS pour que le composant puisse être prévisualisé seul */}
      <script src="https://cdn.tailwindcss.com"></script>

      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
        style={{ backgroundImage: "url('/login-bg.jpg')" }} // Revert to original background image
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm transform hover:scale-105 transition duration-300 ease-in-out"
        >
          <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
             Connexion
          </h2>

          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
              Vous êtes :
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                // Réinitialiser les champs email/mot de passe lorsque le rôle change
                setEmail('');
                setMotDePasse('');
                setError(null);
              }}
              disabled={loading}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition duration-150 ease-in-out"
            >
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              autoFocus
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition duration-150 ease-in-out"
              placeholder={
                role === 'admin' ? 'admin@example.com' :
                role === 'agent' ? 'agent@example.com' :
                'user@example.com'
              }
            />
          </div>

          {(role === 'admin' || role === 'agent') && (
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
                disabled={loading}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition duration-150 ease-in-out"
                placeholder="••••••••"
              />
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-center text-sm mb-6" role="alert">
              <strong className="font-bold">Erreur! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-xl text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion...
              </span>
            ) : (
              'Se connecter'
            )}
          </button>
          <p className="mt-6 text-center text-gray-500 text-sm">
            Utilisez votre propre adresse et mot de passe pour se connecter.
          </p>
        </form>
      </div>
    </>
  );
}
