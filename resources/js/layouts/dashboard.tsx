import React, { useState } from 'react';
import DashboardMobileHeader from '../components/DashboardMobileHeader';
import Sidebar from '../components/Sidebar';
import { DashboardHeaderProvider, useDashboardHeaderState } from '../contexts/dashboardHeader';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardShell: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { header } = useDashboardHeaderState();

    return (
        <div className="bg-white">
            <div className="min-h-dvh bg-paper">
                <Sidebar
                    isCollapsed={sidebarCollapsed}
                    setIsCollapsed={setSidebarCollapsed}
                    isMobileOpen={mobileOpen}
                    setIsMobileOpen={setMobileOpen}
                />

                {/* Barre mobile structurée (titre à gauche, bouton menu à droite) */}
                <DashboardMobileHeader title={header.title} showBack={header.showBack} onOpenSidebar={() => setMobileOpen(true)} />

                {/* Main Content */}
                <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-48'} `}>
                    <div className="min-h-dvh">
                        {/* Page Content (pt-20 sur mobile pour dégager la barre fixe) */}
                        <div className="w-full p-2 pt-20 lg:pt-4">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => (
    <DashboardHeaderProvider>
        <DashboardShell>{children}</DashboardShell>
    </DashboardHeaderProvider>
);

export default DashboardLayout;
