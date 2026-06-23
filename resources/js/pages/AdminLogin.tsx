import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import authRepository from '../repositories/repositoriesAuth';

import { LoginForm, LoginResponse } from '../types';
import { AuthController } from '@/controllers';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '../stores/useToastStore';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
    remember: false
  });

  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/dashboard.tuxedos.host';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const validateForm = (): boolean => {
    const errors = AuthController.validateLoginForm(form);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await login(form);

      toast.success('Connexion réussie ! Redirection...');

      // Rediriger vers la page demandée ou par défaut
      setTimeout(() => {
        const from = (location.state as any)?.from?.pathname || '/dashboard.tuxedos.host';
        navigate(from, { replace: true });
      }, 1500);
    } catch (error: any) {
      // Gestion spécifique des erreurs
      if (error.response?.status === 419) {
        toast.error('Erreur de sécurité. Veuillez rafraîchir la page et réessayer.');
      } else if (error.response?.status === 401) {
        toast.error('Email ou mot de passe incorrect.');
      } else if (error.response?.status === 422) {
        toast.error('Données invalides. Veuillez vérifier vos informations.');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Erreur réseau. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Effacer l'erreur du champ modifié
    if (errors[name as keyof LoginForm]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="min-h-dvh bg-gradient-to-br from-paper to-paper-2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 grain">
      <div className="max-w-md w-full space-y-8 relative">
        {/* Logo et titre */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-ink rounded-2xl flex items-center justify-center mb-5 shadow-lg">
            <i className="fas fa-passport text-amber-2 text-2xl"></i>
          </div>
          <span className="kicker justify-center">Espace gestion</span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-ink">
            Connexion
          </h2>
          <p className="mt-2 text-ink-soft">
            Accédez à votre espace de gestion des rendez-vous
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-cream border border-sand rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-envelope text-amber-500 mr-2"></i>
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-lock text-amber-500 mr-2"></i>
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={form.remember}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>

              {/* <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-amber-600 hover:text-amber-500 transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div> */}
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white transition-colors ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
              }`}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Connexion en cours...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Se connecter
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2024 Emaiv JC. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
