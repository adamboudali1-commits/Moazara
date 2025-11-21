import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import DemandesManager from './components/DemandesManager';
import Login from './components/Login';
import Home from './pages/Home';
import UserList from './pages/UserList';
import ContactPage from './components/ContactPage';
import SubmitForm from './components/SubmitForm';
import Presentation from './components/Presentation';
import SuiviDemande from './components/SuiviDemande';
import FAQPage from './components/FAQPage';
import UserGuide from './components/UserGuide';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);

  const handleLogin = (newToken, newRole) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole);
    setToken(newToken);
    setRole(newRole);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
  };

  const PrivateRoute = ({ children }) => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? children : <Navigate to="/login" replace />;
  };

  const AdminRoute = ({ children }) => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    return storedToken && storedRole === 'admin' ? children : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Accueil public */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        {/* Connexion */}
        <Route
          path="/login"
          element={
            <Layout>
              <Login onLogin={handleLogin} />
            </Layout>
          }
        />

        {/* Contact */}
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />

        {/* Présentation */}
        <Route
          path="/presentation"
          element={
            <Layout>
              <Presentation />
            </Layout>
          }
        />

        {/* FAQ */}
        <Route
          path="/faq"
          element={
            <Layout>
              <FAQPage />
            </Layout>
          }
        />

        {/* Guide utilisateur */}
        <Route
          path="/guide"
          element={
            <Layout>
              <UserGuide />
            </Layout>
          }
        />

        {/* Suivi de demande public */}
        <Route
          path="/suivi"
          element={
            <Layout>
              <SuiviDemande />
            </Layout>
          }
        />

        {/* Formulaire public de soumission */}
        <Route
          path="/submit-form"
          element={
            <Layout>
              <SubmitForm />
            </Layout>
          }
        />

        {/* Dashboard demandes accessible par user, agent, admin */}
        <Route
          path="/demandes/*"
          element={
            <PrivateRoute>
              <Layout>
                <DemandesManager token={token} role={role} onLogout={handleLogout} />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Dashboard agent */}
        <Route
          path="/agent/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <DemandesManager token={token} role={role} onLogout={handleLogout} />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Espace admin */}
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <Layout>
                <UserList onLogout={handleLogout} />
              </Layout>
            </AdminRoute>
          }
        />

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
