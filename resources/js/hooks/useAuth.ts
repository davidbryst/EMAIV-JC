import { useAppStore } from '../stores/useAppStore';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  } = useAppStore();

  // Vérifier si l'utilisateur a un rôle spécifique
  const hasRole = (role: string) => {
      return 'admin' === role;
    // return user?.roles?.includes(role);
    // return user?.role === role;
  };

  // Vérifier si l'utilisateur est admin
  const isAdmin = () => {
    return hasRole('admin');
  };

  // Vérifier si l'utilisateur est un utilisateur normal
  const isUser = () => {
    return hasRole('user');
  };

  // Obtenir le nom complet de l'utilisateur
  const getUserFullName = () => {
    if (!user) return '';
    return `${user.name || ''}`.trim();
    // return `${user.name || ''} ${user.surname || ''}`.trim();
  };

  // Obtenir les initiales de l'utilisateur
  const getUserInitials = () => {
    if (!user) return '';
    const name = user.name || '';
    // const surname = user.surname || '';
    // return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
    return `${name.charAt(0)}`.toUpperCase();
  };

  return {
    // État
    user,
    isAuthenticated,
    isLoading,
    // Actions
    login,
    logout,
    checkAuth,

    // Utilitaires
    hasRole,
    isAdmin,
    isUser,
    getUserFullName,
    getUserInitials,
  };
};

