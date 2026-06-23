import { useAuth } from '@/hooks/useAuth';
import { ArrowUpRight, Bell, Calendar, ChevronDown, Home, List, LogOut, Menu, Plus, User, Users, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authRepository from '../repositories/repositoriesAuth';

interface SidebarItem {
    icon: React.ReactNode;
    label: string;
    path: string;
    badge?: number;
    target?: string;
}

const Sidebar: React.FC<{
    isCollapsed: boolean;
    setIsCollapsed: (isCollapsed: boolean) => void;
    isMobileOpen: boolean;
    setIsMobileOpen: (isMobileOpen: boolean) => void;
}> = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const sidebarItems: SidebarItem[] = [
        { icon: <Home className="h-5 w-5" />, label: 'Tableau de bord', path: '/dashboard.tuxedos.host' },
        { icon: <Calendar className="h-5 w-5" />, label: 'Rendez-vous', path: '#' },
        { icon: <Plus className="h-5 w-5" />, label: 'Nouveau RDV', path: '#' },
        { icon: <List className="h-5 w-5" />, label: 'Tous les RDV', path: '#' },
        { icon: <Calendar className="h-5 w-5" />, label: 'Calendrier', path: '/dashboard.tuxedos.host/calendar' },
        { icon: <Users className="h-5 w-5" />, label: 'Membres', path: '#' },
        { icon: <ArrowUpRight className="h-5 w-5" />, label: 'Emaiv-jc.ci', path: '/', target: '_blank' },
    ];

    const isActive = (path: string): boolean => location.pathname === path;

    const handleLogout = (): void => {
        authRepository.logout();
        logout();
        navigate('/adminlogin');
    };

    return (
        <>
            {isMobileOpen && <div className="fixed inset-0 z-40 bg-ink/50 lg:hidden" onClick={() => setIsMobileOpen(false)} />}

            <div
                className={`fixed top-0 left-0 z-50 flex h-full flex-col border-r border-white/10 bg-ink text-paper transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-48'} ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} `}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 p-4">
                    {!isCollapsed && <img src="/assets/logoW.png" alt="Emaiv-JC" className="h-9 w-auto" />}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden rounded-lg p-1.5 transition-colors hover:bg-white/10 lg:flex"
                        >
                            <Menu className="h-5 w-5 text-paper/70" />
                        </button>
                        <button onClick={() => setIsMobileOpen(false)} className="rounded-lg p-1.5 transition-colors hover:bg-white/10 lg:hidden">
                            <X className="h-5 w-5 text-paper/70" />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                    {sidebarItems.map((item, index) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={index}
                                to={item.path}
                                target={item.target}
                                onClick={() => setIsMobileOpen(false)}
                                className={`relative flex items-center gap-3 ${isCollapsed ? 'justify-center px-2.5' : 'px-3.5'} group rounded-xl py-2.5 transition-all duration-200 ${
                                    active ? 'bg-white/10 text-paper' : 'text-paper/65 hover:bg-white/5 hover:text-paper'
                                }`}
                                title={isCollapsed ? item.label : undefined}
                            >
                                {active && <span className="absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full bg-amber" />}
                                <span className={active ? 'text-amber-2' : 'text-paper/55 group-hover:text-paper'}>{item.icon}</span>
                                {!isCollapsed && (
                                    <div className="flex flex-1 items-center justify-between">
                                        <span className="text-sm font-medium">{item.label}</span>
                                        {item.badge && <span className="rounded-full bg-amber px-2 py-0.5 text-xs text-white">{item.badge}</span>}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Profil */}
                <div className="border-t border-white/10 p-3">
                    {!isCollapsed ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex w-full items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/5"
                            >
                                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber">
                                    <User className="h-4 w-4 text-white" />
                                </div>
                                <div className="min-w-0 flex-1 text-left">
                                    <p className="truncate text-sm font-semibold text-paper">{user?.name || 'Admin'}</p>
                                    <p className="truncate text-xs text-paper/55">{user?.email || 'contact@emaiv-jc.ci'}</p>
                                </div>
                                <ChevronDown className={`h-4 w-4 text-paper/55 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 bottom-full left-0 mb-2 rounded-xl border border-white/10 bg-ink-2 p-2 shadow-2xl">
                                    <Link
                                        to="#"
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-paper/80 transition-colors hover:bg-white/5"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <User className="h-4 w-4" /> Mon profil
                                    </Link>
                                    <Link
                                        to="#"
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-paper/80 transition-colors hover:bg-white/5"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <Bell className="h-4 w-4" /> Notifications
                                    </Link>
                                    <hr className="my-1 border-white/10" />
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-amber-2 transition-colors hover:bg-white/5"
                                    >
                                        <LogOut className="h-4 w-4" /> Déconnexion
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber">
                                <User className="h-4 w-4 text-white" />
                            </div>
                            <button onClick={handleLogout} className="rounded-lg p-1.5 transition-colors hover:bg-white/10" title="Déconnexion">
                                <LogOut className="h-4 w-4 text-paper/70" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
