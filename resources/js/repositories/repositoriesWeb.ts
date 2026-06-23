import api from '../utils/axios';
import { LoginForm, LoginResponse, RegisterForm, RegisterResponse } from '../types';

class WebRepository {
  // Connexion utilisateur (route web)
  async login(loginData: LoginForm): Promise<LoginResponse> {
    const response = await api.post('/login', loginData, {
      baseURL: '' // Utiliser l'URL de base sans /api
    });
    return response.data;
  }

  // Déconnexion utilisateur (route web)
  async logout(): Promise<void> {
    await api.post('/logout', {}, {
      baseURL: '' // Utiliser l'URL de base sans /api
    });
  }

  // Inscription utilisateur (route web)
  async register(registerData: any): Promise<any> {
    const response = await api.post('/register', registerData, {
      baseURL: '' // Utiliser l'URL de base sans /api
    });
    return response.data;
  }

  // Réinitialisation du mot de passe (route web)
  async forgotPassword(email: string): Promise<any> {
    const response = await api.post('/forgot-password', { email }, {
      baseURL: '' // Utiliser l'URL de base sans /api
    });
    return response.data;
  }

  // Réinitialisation du mot de passe avec token (route web)
  async resetPassword(token: string, password: string, passwordConfirmation: string): Promise<any> {
    const response = await api.post('/reset-password', {
      token,
      password,
      password_confirmation: passwordConfirmation
    }, {
      baseURL: '' // Utiliser l'URL de base sans /api
    });
    return response.data;
  }
}

export default new WebRepository();
