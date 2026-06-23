import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface BasicLayoutProps {
  children: React.ReactNode;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  // La page d'accueil a un hero plein écran qui passe volontairement sous le header.
  // Les autres pages doivent dégager la hauteur du header fixe pour ne pas être masquées.
  const isHome = pathname === '/';

  return (
    <>
      <Header />
      <div className={`min-h-dvh flex flex-col bg-gray-50 ${isHome ? '' : 'pt-24 md:pt-32'}`}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default BasicLayout;
