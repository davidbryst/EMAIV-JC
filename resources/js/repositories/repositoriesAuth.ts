import api from '../utils/axios';
import { LoginForm, LoginResponse, User } from '../types';

class AuthRepository {
  // Connexion utilisateur
  async login(loginData: LoginForm): Promise<LoginResponse> {
    const appBase = (typeof window !== 'undefined'
      ? document.querySelector('meta[name="app-base"]')?.getAttribute('content')
      : '') || window.location.origin;
    // CSRF DÉSACTIVÉ : Plus besoin de récupérer le cookie CSRF
    // await api.get(new URL('/sanctum/csrf-cookie', appBase).toString());
    const response = await api.post('/login', loginData);
    return response.data;
  }

  // Déconnexion utilisateur
  async logout(): Promise<void> {
    //   await api.get("/sanctum/csrf-cookie");

    // await api.post('/logout', {});
  }

  // Vérifier l'authentification via session (route API)
  async checkAuthSession(): Promise<User> {
    const appBase = (typeof window !== 'undefined'
      ? document.querySelector('meta[name="app-base"]')?.getAttribute('content')
      : '') || window.location.origin;
    // CSRF DÉSACTIVÉ : Plus besoin de récupérer le cookie CSRF
    // await api.get(new URL('/sanctum/csrf-cookie', appBase).toString());
    const response = await api.get('/user');
    return response.data;
  }
}

export default new AuthRepository();
