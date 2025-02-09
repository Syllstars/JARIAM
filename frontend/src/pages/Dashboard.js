import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupérer les projets de l'utilisateur connecté
    axios.get('http://localhost:3001/api/projects', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => setProjects(response.data))
      .catch(error => console.error('Erreur lors de la récupération des projets:', error));

    // Récupérer les infos de l'utilisateur
    axios.get('http://localhost:3001/api/users/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => setUser(response.data))
      .catch(error => console.error('Erreur lors de la récupération des infos utilisateur:', error));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="navbar">
        <div className="logo">JARIAM</div>
        <div className="user-info">
          {user && (
            <span className="user-details">{user.firstName} {user.lastName} ({user.role})</span>
          )}
        </div>
      </div>

      <div className="dashboard-content">
        <div className="project-list">
          {projects.map(project => (
            <div
              key={project.id}
              className={`project-item ${selectedProject?.id === project.id ? 'active' : ''}`}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-header">
                <span className="project-name">{project.name}</span>
                <span className={`status ${project.status.replace(' ', '-')}`}>{project.status}</span>
              </div>
              <div className="project-date">Fin prévue : {new Date(project.endDate).toLocaleDateString()}</div>
              <div className="project-description">{project.description}</div>
            </div>
          ))}
        </div>

        <div className="project-details">
          {selectedProject ? (
            <div className="project-info">
              <h2 className="project-title">{selectedProject.name}</h2>
              <p className="project-text">{selectedProject.description}</p>
              <p className="project-text"><strong>Début :</strong> {new Date(selectedProject.startDate).toLocaleDateString()}</p>
              <p className="project-text"><strong>Fin prévue :</strong> {new Date(selectedProject.endDate).toLocaleDateString()}</p>
              <p className="project-text"><strong>Statut :</strong> <span className={`status ${selectedProject.status.replace(' ', '-')}`}>{selectedProject.status}</span></p>
            </div>
          ) : (
            <div className="select-project-message">Sélectionnez un projet pour voir les détails</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
