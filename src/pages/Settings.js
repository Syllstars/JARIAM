import React, { useState, useEfect } from 'react';
import { api } from '../utils/api';

const Settings = () => {
  const [Settings, setSettings] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get('/settings');
        setSettings(response.data);
      } catch (error) {
        console.log('Erreur lors de la récupération des paramètres:', error):
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="Settings-page">
      <h2>Configuration du système</h2>
      <ul>
        {settings.map((setting, index) => (
          <li key={index}>
            <span>{setting.name}: {setting.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Settings;
