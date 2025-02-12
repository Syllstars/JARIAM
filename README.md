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

**JARIAM** est une application complète de gestion de projets qui permet d'attribuer automatiquement des ressources humaines en fonction de leurs compétences et de leurs disponibilité. En plus de la gestion des ressources humaines, l'application inclut un système de gestion des stocks pour suivre les matériels et ressources nécessaires aux projets.

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
### 1. Gestion des Projects
- **Création et gestion de projets** : Créez des projets avec des informations telles que la description, les dates de début et de fin, et le status du projet.
- **Suivi de l'avancement** : Suivez l'avancement de chaque projet avec une vue d'ensemble des tâches terminées, en cours et à venir.
- **Assignation de tâches** : Attribuez des tâches spécifiques aux projets et suivez leur progression.

### 2. Attribution des Ressources Humaines
- **Profils des utilisateurs** : Chaque utilisateurs a un profil détaillant ses compétences, ses disponibilités, et son historique de projet.
- **Attribution automatique des ressources** : L'application attribue des ressources aux projets en fonction des compétences des utilisateurs et de leur disponibilité.

### 3. Gestion des Stocks
- **Suivi des stocks** : Gérez l'inventaire des matériels et équipements nécessaires aux projets.
- **Alertes de réapprovisionnement** : Recevez des notifications lorsque le stock atteint un seuil critique.
- **Gestion des entrées et sorties** : Suivez l'utilisation des stocks pour chaque projet et assurez-vous que les besoins sont couverts en temps réel.

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

   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=<gmail address>
   SMTP_PASSWORD=<password>
   EMAIL_SECURE=true
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
├── frontend/               # Code frontend
│   ├── components/         # Composants utilisé par les pages Web
│   ├── pages/              # Gestion des Pages Web
│   ├── public/      
│   ├── package.json    
│   ├── src/     
│   │   ├── components/         
│   │   ├── App.js          # Configurer les routes
│   │   ├── index.js        # Point d'entrée de l'application     
├── backend/                # Code backend
│   ├── middleware/         # Logique métier
│   ├── models/             # Modèles de données Sequelize
│   ├── routes/             # Définition des routes API
│   ├── services/           # Services réutilisables (authentifications, etc.)
│   ├── utils/              # Utilitaire pour gérer les appels API
│   ├── db_setup.js         # Fichier d'initialisation de la base de données
│   ├── package.json
│   ├── server.js
│   ├── .env
│   ├── db_setup.js
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── SECURITY.md
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
- v1.0.0 : Mise en place des fonctionnalité de base (utilisateurs, visualisation des données, backend et frontend).
- v2.0.0 : Intégration des API externes et amélioration des performances.

## **License**
Ce projet est sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.
