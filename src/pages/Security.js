import React, {useState, useEffect } from 'react';
import { api } from '../utils/api';

const Security = () => {
  const [securitySettings, setSecuritySettings] = useState([]);

  useEffect(() => {
    const fetchSecuritySettings = async () => {
      try {
        const response = await api.get('/security');
        setSecuritySettings(response.data);
      } catch(error) {
        console.error('Erreur lors de la récupération des paramètres de sécurité:', error);
      }
    };
    fetchSecuritySettings();
  }, []);

  return (
    <div className="security-page">
      <h2>Paramètres de sécurité</h2>
      <ul>
        {securitySettings.map((setting, index) => (
          <li key={index}>
            <span>{setting.name}: {setting.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Security;
