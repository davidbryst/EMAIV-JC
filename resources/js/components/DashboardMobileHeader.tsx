import { ArrowLeft, Menu } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DashboardMobileHeaderProps {
    title: string;
    /** Affiche le bouton « Retour » à gauche (sous-pages affiliées). */
    showBack?: boolean;
    /** Ouvre la sidebar mobile (bouton menu à droite). */
    onOpenSidebar: () => void;
}

/**
 * Barre mobile structurée du dashboard (masquée dès `lg`).
 * Gauche : bouton retour optionnel + titre de la page.
 * Droite : bouton d'ouverture de la sidebar.
 */
const DashboardMobileHeader: React.FC<DashboardMobileHeaderProps> = ({ title, showBack = false, onOpenSidebar }) => {
    const navigate = useNavigate();

    return (
        <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-sand bg-paper/95 px-4 backdrop-blur-sm lg:hidden">
            <div className="flex min-w-0 items-center gap-2.5">
                {showBack && (
                    <button
                        onClick={() => navigate(-1)}
                        aria-label="Retour"
                        className="inline-flex h-10 flex-shrink-0 items-center gap-1.5 rounded-xl bg-cream px-3.5 text-sm font-semibold text-ink ring-1 ring-sand transition-colors hover:bg-paper-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Retour
                    </button>
                )}
                <h1 className="truncate font-display text-lg font-semibold text-ink">{title}</h1>
            </div>

            <button
                onClick={onOpenSidebar}
                aria-label="Ouvrir le menu"
                className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-ink text-paper shadow-lg transition-colors hover:bg-ink-2"
            >
                <Menu className="h-5 w-5" />
            </button>
        </header>
    );
};

export default DashboardMobileHeader;
