# ![Moazara Logo](https://your-logo-url.com/logo.png) Moazara

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Frontend](https://img.shields.io/badge/Frontend-React.js-blue)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Express.js-green)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-MySQL-red)](https://www.mysql.com/)

---

## 🌟 Présentation

**Moazara** est une application web destinée à faciliter la gestion des demandes de financement dans le cadre du programme **MOAZARA**, pour les associations et coopératives.  

Elle permet :
- La création, la consultation et le suivi des demandes.
- La gestion des utilisateurs et des agents avec différents niveaux d’accès.
- Une interface claire et moderne grâce à **React.js et Tailwind CSS**.

---

## 🖥️ Fonctionnalités

### Gestion des demandes
- Création d’une demande en 5 étapes : Informations générales, Ressources humaines, Champ d'intervention, Description du projet, Viabilité du projet.
- Navigation fluide entre les étapes.
- Soumission unique avec validation complète.

### Gestion des utilisateurs
- Rôles : Admin et Agents.
- L’Admin gère les utilisateurs et les agents.
- Les Agents peuvent consulter et gérer les demandes.

### Interface utilisateur
- Design moderne avec **Tailwind CSS**.
- Responsive et mobile-friendly.
- Tableaux et formulaires interactifs.

---

## 🛠️ Technologies utilisées

| Côté Client | Côté Serveur | Base de données |
|-------------|--------------|----------------|
| React.js + Tailwind CSS | Node.js + Express.js | MySQL |

---

## 🚀 Installation

1. **Cloner le projet :**
```bash
git clone https://github.com/username/moazara.git
cd moazara
Installer les dépendances frontend :

cd client
npm install


Installer les dépendances backend :

cd ../server
npm install


Configurer la base de données :

Créez une base moazara et importez le fichier database.sql.

Lancer l’application :

# Backend
cd server
npm start

# Frontend
cd ../client
npm start


L’application sera accessible sur : http://localhost:3000

📸 Captures d’écran


Page d'accueil de Moazara


Formulaire de demande en 5 étapes

🤝 Contribution

Les contributions sont les bienvenues !

Fork le projet

Crée une branche : git checkout -b feature/ma-fonctionnalité

Commit tes modifications : git commit -m "Ajout d'une nouvelle fonctionnalité"

Push sur la branche : git push origin feature/ma-fonctionnalité

Ouvre un Pull Request
