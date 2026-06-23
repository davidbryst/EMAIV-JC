import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  admin?: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, admin }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Afficher un loader pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="min-h-dvh bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  // Rediriger vers la page de login si non authentifié
  if (!isAuthenticated) {
    if (admin) return <Navigate to="/adminlogin" state={{ from: location }} replace />;
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Afficher le contenu protégé si authentifié
  return <>{children}</>;
};

export default ProtectedRoute;
