import React from "react";
import "../styles/styles.css"; // Assure-toi que le fichier CSS est bien importé

const LoginPage = () => {
  return (
    <div className="login-container">
      {/* Barre de navigation */}
      <nav className="navbar">
        <h1 className="logo">JARIAM</h1>
        <div className="nav-links">
          <a href="#">Download</a>
          <a href="#">About Us</a>
          <button className="nav-button">Sign In</button>
        </div>
      </nav>

      {/* Conteneur du formulaire */}
      <div className="login-box">
        <h2 className="login-title">Sign In</h2>
        <input type="text" placeholder="Identifiant" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />
        <button className="button">Sign In</button>
      </div>
    </div>
  );
};

export default LoginPage;