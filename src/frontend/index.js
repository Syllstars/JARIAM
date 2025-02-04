import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';                    // Importation de Tailwind CSS
import components from './components';   // Composant principale de l'application

// Rendu de l'application React dans la balise #root
ReactDOM.render(
  <React.StrictMode>
    <components />
  </React.StrictMode>,
  document.getElementById('root')
);
