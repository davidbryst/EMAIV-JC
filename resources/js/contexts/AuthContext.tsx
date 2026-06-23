import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authRepository from '../repositories/repositoriesAuth';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = !!user;

  // Vérifier l'authentification au chargement
  useEffect(() => {
    checkAuth();
  }, []);

  // Rediriger vers le dashboard si déjà connecté
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const currentPath = window.location.pathname;
      if (currentPath === '/login') {
    //   if (currentPath === '/login' || currentPath === '/') {
        window.location.href = '/dashboard.tuxedos.host';
      }
    }
  }, [isAuthenticated, isLoading]);

  const checkAuth = async (): Promise<boolean> => {
    try {
    //   const token = localStorage.getItem('auth_token');
    //   const userData = localStorage.getItem('user');

    //   if (!token || !userData) {
    //     setIsLoading(false);
    //     return false;
    //   }

      // Vérifier la validité du token avec le serveur
      const user = await authRepository.checkAuthSession();

      setUser(user);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
    //   localStorage.removeItem('auth_token');
    //   localStorage.removeItem('user');
      setUser(null);
      setIsLoading(false);
      return false;
    }
  };

  const login = (userData: User): void => {
    // localStorage.setItem('auth_token', token);
    // localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = (): void => {
    // localStorage.removeItem('auth_token');
    // localStorage.removeItem('user');
    setUser(null);

    // Appeler l'API de déconnexion
    // fetch('/logout', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    // CSRF DÉSACTIVÉ : Plus besoin du token CSRF dans les headers
    //     'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
    //   }
    // }).catch(error => {
    //   console.error('Erreur lors de la déconnexion:', error);
    // });
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
