import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupérer les projets de l'utilisateur connecté : http://localhost:3001/api/home/user-projects
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/home/user-projects', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Erreur lors de la récupération des projets');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };
  
    // Récupérer les infos de l'utilisateur : http://localhost:3001/api/users
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Erreur lors de la récupération de l\'utilisateur');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchProjects();
    fetchUser();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Barre de navigation */}
      <nav className="navbar">
        <h1 className="logo">JARIAM</h1>
        <div className="nav-links">
          <button className="nav-button">Logout</button>
        </div>
      </nav>

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
              <div className="project-date">Fin prévue : {new Date(project.end_date).toLocaleDateString()}</div>
              <div className="project-description">{project.description}</div>
            </div>
          ))}
        </div>

        <div className="project-details">
          {selectedProject ? (
            <div className="project-info">
              <h2 className="project-title">{selectedProject.name}</h2>
              <p className="project-text">{selectedProject.description}</p>
              <p className="project-text"><strong>Début :</strong> {new Date(selectedProject.start_date).toLocaleDateString()}</p>
              <p className="project-text"><strong>Fin prévue :</strong> {new Date(selectedProject.end_date).toLocaleDateString()}</p>
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
