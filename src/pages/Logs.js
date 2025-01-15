import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get('/log');
        setLogs(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des logs:', error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="logs-page">
      <h2>Journaux d'activité</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <span>{log.timestamp} - {log.action} - {log.user}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;
