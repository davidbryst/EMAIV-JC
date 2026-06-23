import authRepository from '../repositories/repositoriesAuth';
import { LoginForm, LoginResponse, User } from '../types';

export class AuthController {
  // Connexion utilisateur
  static async login(loginData: LoginForm): Promise<LoginResponse> {
    try {
      // Validation des données
      const validationErrors = this.validateLoginForm(loginData);
      if (Object.keys(validationErrors).length > 0) {
        throw new Error(Object.values(validationErrors).join(', '));
      }

      return await authRepository.login(loginData);
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  }

  // Déconnexion utilisateur
  static async logout(): Promise<void> {
    try {
      await authRepository.logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw error;
    }
  }

  // Vérifier l'authentification avec token
//   static async checkAuth(token: string): Promise<User> {
//     try {
//       if (!token) {
//         throw new Error('Token d\'authentification requis.');
//       }

//       return await authRepository.checkAuth(token);
//     } catch (error) {
//       console.error('Erreur lors de la vérification de l\'authentification:', error);
//       throw error;
//     }
//   }

  // Vérifier l'authentification via session
  static async checkAuthSession(): Promise<User> {
    try {
      return await authRepository.checkAuthSession();
    } catch (error) {
      console.error('Erreur lors de la vérification de la session:', error);
      throw error;
    }
  }

  // Valider le formulaire de connexion
  static validateLoginForm(form: LoginForm): Partial<LoginForm> {
    const errors: Partial<LoginForm> = {};

    if (!form.email) {
      errors.email = 'L\'email est requis';
    } else if (!this.isValidEmail(form.email)) {
      errors.email = 'L\'email n\'est pas valide';
    }

    if (!form.password) {
      errors.password = 'Le mot de passe est requis';
    } else if (form.password.length < 6) {
      errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    return errors;
  }

  // Valider un email
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Sauvegarder les données d'authentification dans localStorage
//   static saveAuthData(token: string, user: User): void {
//     try {
//       localStorage.setItem('auth_token', token);
//       localStorage.setItem('auth_user', JSON.stringify(user));
//     } catch (error) {
//       console.error('Erreur lors de la sauvegarde des données d\'authentification:', error);
//     }
//   }

//   // Récupérer les données d'authentification depuis localStorage
//   static getAuthData(): { token: string | null; user: User | null } {
//     try {
//       const token = localStorage.getItem('auth_token');
//       const userStr = localStorage.getItem('auth_user');
//       const user = userStr ? JSON.parse(userStr) : null;

//       return { token, user };
//     } catch (error) {
//       console.error('Erreur lors de la récupération des données d\'authentification:', error);
//       return { token: null, user: null };
//     }
//   }

  // Supprimer les données d'authentification
//   static clearAuthData(): void {
//     try {
//       localStorage.removeItem('auth_token');
//       localStorage.removeItem('auth_user');
//     } catch (error) {
//       console.error('Erreur lors de la suppression des données d\'authentification:', error);
//     }
//   }

  // Vérifier si l'utilisateur est connecté
//   static isAuthenticated(): boolean {
//     const { token, user } = this.getAuthData();
//     return !!(token && user);
//   }

//   // Obtenir l'utilisateur connecté
//   static getCurrentUser(): User | null {
//     const { user } = this.getAuthData();
//     return user;
//   }

//   // Obtenir le token d'authentification
//   static getAuthToken(): string | null {
//     const { token } = this.getAuthData();
//     return token;
//   }
}

