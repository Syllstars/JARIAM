import React, { useState } from "react";
import "../styles/styles.css"; // Assure-toi que le fichier CSS est bien importé

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      // Extraction de la réponse en JSON pour récupérer le token
      const data = await response.json();
    
      // Stockage du token dans le localStorage
      localStorage.setItem('token', data.token);
       
      window.location.href = "/dashboard"; // Redirection après connexion réussie
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  
  return (
    <div className="login-container">

      {/* Conteneur du formulaire */}
      <div className="login-box">
        <h2 className="login-title">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Username" 
            className="input-field" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="input-field" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="button">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
