<h1 align="center" style="margin-top: 0;">JARIAM</h1>
<h2 align="center" style="margin-top:0;">Just a Rather Intelligence Application in Management</h2>

[![Node.js
version](https://img.shields.io/badge/Node.js-v18.17.1-green.svg)](https://nodejs.org/)
[![npm
version](https://img.shields.io/badge/npm-v9.6.7-blue.svg)](https://www.npmjs.com/)
[![PostgreSQL
version](https://img.shields.io/badge/PostgreSQL-latest-blue.svg)](https://www.postgresql.org/)
[![License :
MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**JARIAM** est une application complète de gestion et de visualisation de données industrielles. Elle permet de centraliser, analyser et afficher des informations en temps réel, avec une interface intuitive et performante.

---

## Table des Matières
- [Aperçu du Projet](#aperçu-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Contribution](#contribution)
- [Roadmap](#roadmap)
- [License](#license)

## Aperçu du Projet

**JARIAM** est une application web axée sur la gestion intelligente des projets. Elle permet aux utilisateurs de centraliser, organiser et suivre les informations clés d'un projet, avec une interface intuitive et dse outils personnalisables.

## **Fonctionnalités**
- **Gestion des utilisateurs :** Créer, modifier et supprimez des utilisateurs avec des rôles spécifiques.
- **Visualisation des données :** Affichage dynamique des données collectées depuis des sources externes.
- **Authentification sécurisée :** Login avec mot de passe hashés.
- **API REST :** Exposition des données via une API REST pour une intégration facile avec d'autres outils
- Stockage de données :** Base de données relationnelle PostgreSQL

## **Technologies utilisées**
- **Backend :** Node.JS (Express.js)
- **Base de données :** PostregreSQL (ORM Sequelize)
- **Frontend :** Javascript (Vue.js/react.js)
- **Autre :** docker, Github Action pour CI/CD.

---

## **Installation**
### **Prérequis**
1. Node.js (version 16 ou supérieure)
2. PostgreSQL
3. Git

### **Etape d'installation**
1. Clonez ce dépôt:
   ```bash
   git clone https://github.com/Syllstars/jariam.git
   ```
3. Installer les dépendances
   ```bash
   npm install
   ```
5. Configurer votre fichier .env
   ```Env
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=<your password>
   DB_NAME=jariam_db
   ```
7. Démarrer l'application
   ```bash
   npm run dev
   ```

## **Utilisation**
Pour démarrer l'application, exécutez la commande suivante :
  ```bash
  npm start
  ```
L'application sera accessible à l'adresse suivante : http://localhost:3000

## **Structure du Projet**
```plaintext
JARIAM/
├── src/                # Code source principal
│   ├── middleware/     # Logique métier
│   ├── models/         # Modèles de données Sequelize
│   ├── routes/         # Définition des routes API
│   ├── services/       # Services réutilisables (authentifications, etc.)
│   ├── components/     # Composants utilisé par les pages Web
│   ├── pages/          # Gestion des Pages Web
│   ├── utils/          # Utilitaire pour gérer les appels API
│   ├── App.js          # Configurer les routes
│   ├── index.css       # Fichier CSS global
│   ├── index.js        # Point d'entrée de l'application
├── db_setup/           # Fichier d'initialisation de la base de données
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── SECURITY.md
├── package.json
├── server.js
```

---

## **Contribution**
1. Forkez ce dépôt.
2. Créer une branche pour vos modifications:
   ```bash
   git checkout -b feature/<nouvele-fonctionnalite>
   ```
3. Faites vos modifications, puis validez-les :
   ```bash
   git commit -m "Ajout de la fonctionnalité <nom-fonctionnalite>"
   ```
5. Poussez votre branche :
   ```bash
   git push origin <nom-fonctionnalite>
   ```
7. Soumettre une Pull request vers la branche develop.

## **Roadmap**
### **Version prévues :**
- v1.0 : Mise en place des fonctionnalité de base (utilisateurs, visualisation des données, backend et frontend).
- v2.0 : Intégration des API externes et amélioration des performances.

## **License**
Ce projet est sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.
