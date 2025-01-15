import axios from 'axios';

// Creation d'une instance axios configurée
const api = axios.create({
  baseURL: 'http://localhsot:3000/api',
  headers: {
    'Content-Type': 'JARIAM',
  },
});

// Mise en place d'un intercepteur pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Erreur de serveur:', error.response.data);
      alert(`Erreur: ${error.response.data.message}`);
    } else if (error.request) {
      console.error('Pas de réponse du serveur:', error.request);
      alert('Erreur: Impossible de se connecter au serveur.');
    } else {
      console.error('Erreur lors de la configuration de la requète:', error.message);
    }
    return Promise.reject(error);
  });

export default api;
