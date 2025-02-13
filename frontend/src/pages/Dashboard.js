import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

import '../styles/dashboard.css';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState({});
  const [skills, setSkills] = useState({});
  const [projectUsers, setProjectUsers] = useState({});

  const handleLogout = async () => {
    try {
      // Appel de la route logout côté backend
      const response = await fetch("http://localhost:3001/logout", { method: "POST" });
      console.log(response);
  
      if (!response.ok) {
        throw new Error("Erreur lors de la déconnexion");
      }
  
      // Supprime le token du localStorage après confirmation
      localStorage.removeItem("token");
  
      // Redirige l'utilisateur vers la page d'accueil
      window.location.href = "/";
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };
  
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Aucun token trouvé !");
      return;
    }

    let userId;
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id;
    } catch (error) {
      console.error("Erreur lors du décodage du token :", error);
      return;
    }
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
        const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
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

    // 📌 Récupérer les tâches de l'utilisateur regroupées par projet : http://localhost:3001/api/tasks/user/${userId}
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/tasks/user/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error("Erreur lors de la récupération des tâches");
        const data = await response.json();

        const groupedTasks = {};
        data.forEach(task => {
          if (!groupedTasks[task.project_id]) groupedTasks[task.project_id] = [];
          groupedTasks[task.project_id].push(task);
        });

        setTasks(groupedTasks);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };


    // 📌 Récupérer les compétences requises pour chaque projet : http://localhost:3001/api/skill/user/${userId}
    const fetchSkills = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/skill/user/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération des compétences");

        const data = await response.json();

        // Pas besoin de re-grouper les données, elles sont déjà au bon format
        setSkills(data);

      } catch (error) {
        console.error('Erreur:', error);
      }
    };


    // 📌 Récupérer les utilisateurs travaillant sur chaque projet : http://localhost:3001/api/home/user-projects/${userId}/users
    const fetchProjectUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/home/user-projects/${userId}/users`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs");
        const data = await response.json();

        const groupedUsers = {};

        data.forEach(project => {
          if (!groupedUsers[project.projectId]) groupedUsers[project.projectId] = [];
          groupedUsers[project.projectId] = project.users; // Assigner directement les users du projet
        });

        setProjectUsers(groupedUsers);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchProjects();
    fetchUser();
    fetchTasks();
    fetchSkills();
    fetchProjectUsers();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Barre de navigation */}
      <nav className="navbar">
        <h1 className="logo">JARIAM</h1>
        <div className="nav-links">
          {/* Affichage des informations utilisateur */}
          {user && (
            <div className="user-info">
              <span>{user.first_name} </span>
            </div>
          )}
          <button className="nav-button" onClick={handleLogout}>Logout</button>
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

        {selectedProject ? (
          <div className="project-details">
            <div className="project-info">
              <h2 className="project-title">{selectedProject.name}</h2>
              <p className="project-text">{selectedProject.description}</p>
              <p className="project-text"><strong>Début :</strong> {new Date(selectedProject.start_date).toLocaleDateString()}</p>
              <p className="project-text"><strong>Fin prévue :</strong> {new Date(selectedProject.end_date).toLocaleDateString()}</p>
              <p className="project-text"><strong>Statut :</strong> <span className={`status ${selectedProject.status.replace(' ', '-')}`}>{selectedProject.status}</span></p>
            </div>
            {/* 📌 Affichage des tâches */}
            <div className="task-list">
              <h3>Tâches</h3>
              {tasks[selectedProject?.id] && tasks[selectedProject.id].length > 0 ? (
                <table>
                  <tbody>
                    {tasks[selectedProject.id].map(task => (
                      <tr key={task.id} className="task-item">
                        <td className={`status ${task.status.replace(' ', '-')}`}>{task.status}</td>
                        <td>{task.title}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Aucune tâche assignée.</p>
              )}
            </div>


            {/* 📌 Affichage des compétences requises */}
            <div className="skill-list">
              <h3>Compétences requises</h3>
              {skills[selectedProject?.id] && skills[selectedProject.id].length > 0 ? (
                <table>
                  <tbody>
                    {skills[selectedProject.id].map(skill => (
                      <tr key={skill.id} className="skill-item">
                        <td>{skill.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Aucune compétence requise.</p>
              )}
            </div>


            {/* 📌 Affichage des utilisateurs travaillant sur ce projet */}
            <div className="user-list">
              <h3>Équipe du projet</h3>
              {projectUsers[selectedProject?.id] && projectUsers[selectedProject.id].length > 0 ? (
                <ul>
                  {projectUsers[selectedProject.id].map(user => (
                    <li key={user.id} className="user-item">{user.username}</li>
                  ))}
                </ul>
              ) : (
                <p>Aucun membre assigné.</p>
              )}
            </div>


          </div>
        ) : (
          <div className="select-project-message">Sélectionnez un projet pour voir les détails</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
