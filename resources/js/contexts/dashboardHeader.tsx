import React, { createContext, useContext, useEffect, useState } from 'react';

interface HeaderState {
    title: string;
    /** Affiche le bouton « Retour » dans la barre mobile (sous-pages affiliées). */
    showBack: boolean;
}

interface DashboardHeaderContextValue {
    header: HeaderState;
    setHeader: React.Dispatch<React.SetStateAction<HeaderState>>;
}

const DashboardHeaderContext = createContext<DashboardHeaderContextValue | undefined>(undefined);

export const DashboardHeaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [header, setHeader] = useState<HeaderState>({ title: '', showBack: false });
    return <DashboardHeaderContext.Provider value={{ header, setHeader }}>{children}</DashboardHeaderContext.Provider>;
};

export const useDashboardHeaderState = (): DashboardHeaderContextValue => {
    const ctx = useContext(DashboardHeaderContext);
    if (!ctx) throw new Error('useDashboardHeaderState doit être utilisé à l’intérieur de DashboardHeaderProvider');
    return ctx;
};

/**
 * Hook appelé par chaque page du dashboard pour renseigner le titre (et le bouton retour)
 * de la barre mobile structurée rendue par le layout.
 */
export const useDashboardHeader = (title: string, showBack = false): void => {
    const { setHeader } = useDashboardHeaderState();
    useEffect(() => {
        setHeader({ title, showBack });
    }, [title, showBack, setHeader]);
};
