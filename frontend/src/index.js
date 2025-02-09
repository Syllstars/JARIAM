import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';                    // Importation de Tailwind CSS
import App from './App';

// Rendu de l'application React dans la balise #root
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
