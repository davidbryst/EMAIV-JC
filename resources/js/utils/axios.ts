import axios from 'axios';

const appBase = (typeof window !== 'undefined'
  ? document.querySelector('meta[name="app-base"]')?.getAttribute('content')
  : '') || '';

// Configuration de base d'axios
const api = axios.create({
  baseURL: appBase ? new URL('/api', appBase).toString() : '/api',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  // CSRF COMPLÈTEMENT DÉSACTIVÉ
  // xsrfCookieName: 'XSRF-TOKEN', // CSRF désactivé
  // xsrfHeaderName: 'X-XSRF-TOKEN' // CSRF désactivé
});

// Intercepteur pour les requêtes (CSRF COMPLÈTEMENT DÉSACTIVÉ)
api.interceptors.request.use(
  (config) => {
    // CSRF COMPLÈTEMENT DÉSACTIVÉ - Plus besoin de gérer les tokens CSRF
    return config;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Déconnecter l'utilisateur si non autorisé
      window.location.href = '/adminLogin';
    }
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gestion des erreurs communes
    if (error.response) {
      // Erreur de réponse du serveur
      console.error('Erreur API:', error.response.data);

      // Si l'erreur est 401, rediriger vers la page de connexion
      if (error.response.status === 401) {
        window.location.href = '/adminLogin';
      }
    } else if (error.request) {
      // Erreur de réseau
      console.error('Erreur réseau:', error.request);
    } else {
      // Autre erreur
      console.error('Erreur:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
