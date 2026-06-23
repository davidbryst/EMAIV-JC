import { AppointmentCard } from '@/components/AppointmentCard';
import PrimaryButton from '@/components/PrimaryButton';
import { UtilityController } from '@/controllers';
import { Loader2, Phone as PhoneIcon, Plus, Search as SearchIcon, X as XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppointments } from '../hooks/useAppointments';
import { toast } from '../stores/useToastStore';

const Appointments: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        appointments,
        searchPhone,
        searchPrefixe,
        fetchAppointmentsByPhone,
        setSearchPhone,
        setSearchPrefixe,
        resetSearch,
    } = useAppointments();

    //   const { setMessage } = useAppStore();

    const [selectedAppointmentMembers, setSelectedAppointmentMembers] = useState<Member[] | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    useEffect(() => {
        if (searchPrefixe && searchPhone.length === 10) {
            fetchAppointments();
        }
    }, []);

    const fetchAppointments = async (): Promise<void> => {
        setIsLoading(true);
        try {
            await fetchAppointmentsByPhone(searchPrefixe, searchPhone);
            toast.success('Rendez-vous récupérés avec succès');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Erreur lors de la récupération des rendez-vous');
        }
        setHasSearched(true);
        setIsLoading(false);
    };

    const searchAppointments = async (): Promise<void> => {
        if (!searchPrefixe || !searchPhone || searchPhone.length !== 10) {
            toast.error('Veuillez saisir un préfixe et un numéro de téléphone complet (10 chiffres).');
            return;
        }

        await fetchAppointments();
    };

    // N'autoriser que les chiffres et limiter à 10 caractères dans le champ de recherche.
    const handlePhoneChange = (value: string): void => {
        const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
        setSearchPhone(digitsOnly);
    };

    const clearSearch = (): void => {
        resetSearch();
        setHasSearched(false);
    };

    const handleNewAppointment = (): void => {
        navigate('/appointments/new');
    };

    return (
        <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-8 sm:pb-16 lg:px-12 xl:px-16">
            <div className="mb-5 max-w-2xl sm:mb-8">
                <span className="kicker sm:inline-block">Espace rendez-vous</span>
                <h1 className="mt-2 font-display text-2xl leading-[1.1] font-semibold sm:text-5xl sm:leading-[1.05]">Suivez vos rendez-vous</h1>
                <p className="mt-3 hidden text-ink-soft sm:block">
                    Recherchez vos rendez-vous par numéro de téléphone, ou réservez un nouveau créneau.
                </p>
            </div>
            {/* Barre de recherche et bouton nouvelle réunion */}
            <div className="card mb-3 flex flex-col gap-2 p-3 xs:gap-3 xs:p-4 sm:mb-5 sm:gap-4 sm:p-6">
                <div className="flex w-full flex-col gap-2 xs:gap-2 sm:flex-row sm:gap-3">
                    <div className="flex w-full flex-col gap-2 xs:gap-2 sm:flex-row sm:gap-3">
                        <div className="flex w-full">
                            <select
                                value={searchPrefixe}
                                onChange={(e) => setSearchPrefixe(e.target.value)}
                                className="rounded-l-lg border border-gray-300 bg-gray-50 p-1.5 px-1 text-xs font-bold focus:border-amber-500 focus:ring-2 focus:ring-amber-500 xs:p-2"
                            >
                                {UtilityController.getPhonePrefixes().map((prefix) => (
                                    <option key={prefix.value} value={prefix.value}>
                                        {prefix.label}
                                    </option>
                                ))}
                            </select>
                            <div className="relative w-full flex-1">
                                <input
                                    type="tel"
                                    inputMode="numeric"
                                    maxLength={10}
                                    value={searchPhone}
                                    onChange={(e) => handlePhoneChange(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') searchAppointments(); }}
                                    placeholder="Rechercher par numéro..."
                                    className="w-full rounded-e-lg border border-gray-300 bg-white px-4 py-2 pl-6 text-xs focus:border-amber-500 focus:ring-2 focus:ring-amber-500 xs:pl-8 xs:text-sm sm:pl-10"
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1.5 xs:pl-2 sm:pl-3">
                                    <PhoneIcon className="h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                        </div>
                        {/* Amélioration de l'utilisation de PrimaryButton avec text pour plus de clarté */}
                        <PrimaryButton
                            onClick={searchAppointments}
                            disabled={isLoading}
                            icon={isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SearchIcon className="h-4 w-4" />}
                            text={isLoading ? 'Recherche...' : 'Rechercher'}
                            className="!bg-amber-500 hover:!bg-amber-600"
                        />
                        <PrimaryButton
                            onClick={clearSearch}
                            icon={<XIcon className="h-4 w-4" />}
                            text="Effacer"
                            className="!bg-gray-500 hover:!bg-gray-600"
                        />
                    </div>
                    <PrimaryButton
                        onClick={handleNewAppointment}
                        icon={<Plus className="h-4 w-4" />}
                        text="Nouveau"
                        className="!bg-amber-500 hover:!bg-amber-600"
                    />
                </div>
            </div>

            {/* Liste des rendez-vous */}
            {isLoading ? (
                <div className="py-8 text-center text-gray-500 xs:py-10 sm:py-20">
                    <Loader2 className="mb-3 inline h-7 w-7 animate-spin text-amber-500 xs:mb-4 xs:h-8 xs:w-8 sm:h-10 sm:w-10" />
                    <p className="mb-2 text-sm font-medium xs:text-base sm:text-lg">Recherche en cours...</p>
                    <p className="text-xs xs:text-sm sm:text-base">Veuillez patienter pendant que nous récupérons vos rendez-vous.</p>
                </div>
            ) : appointments.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 xs:gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {appointments.map((rdv) => (
                        <AppointmentCard
                            key={rdv.id}
                            type="U"
                            appointment={rdv}
                            selectedMembers={selectedAppointmentMembers}
                            setSelectedMembers={setSelectedAppointmentMembers}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center py-6 text-center text-gray-500 xs:py-8 sm:py-10">
                    <SearchIcon className="mb-2 h-6 w-6 text-gray-400 xs:h-8 xs:w-8 sm:h-10 sm:w-10" />
                    {hasSearched ? (
                        <>
                            <p className="mb-2 text-sm font-medium xs:text-base sm:text-lg">Aucun rendez-vous trouvé</p>
                            <p className="text-xs xs:text-sm sm:text-base">
                                Aucun rendez-vous n'est associé au numéro {searchPrefixe} {searchPhone}. Vérifiez le numéro saisi ou réservez un nouveau créneau.
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="mb-2 text-sm font-medium xs:text-base sm:text-lg">Recherche de rendez-vous</p>
                            <p className="text-xs xs:text-sm sm:text-base">Veuillez saisir un numéro de téléphone complet pour rechercher des rendez-vous.</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Appointments;
