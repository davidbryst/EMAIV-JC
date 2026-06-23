import AppointmentCard from '@/components/AppointmentCard';
import { useDashboardHeader } from '@/contexts/dashboardHeader';
import { useAppointments } from '@/hooks/useAppointments';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UtilityController } from '../controllers';
import { toast } from '../stores/useToastStore';
import { Member } from '../types';

const AppointmentsAll: React.FC = () => {
    const navigate = useNavigate();
    useDashboardHeader('Tous les rendez-vous');

    // Utiliser les données du store Zustand
    const {
        appointmentsAll,
        appointmentsAllError,
        searchQuery,
        filterStatut,
        filterVisaType,
        filterTargetCountry,
        filterDateFrom,
        filterDateTo,
        filteredAppointments,
        fetchAllAppointments,
        setSearchQuery,
        setFilterStatut,
        setFilterVisaType,
        setFilterTargetCountry,
        setFilterDateFrom,
        setFilterDateTo,
        resetFilters,
        deleteAppointment,
    } = useAppointments();

    const [showMembersPopup, setShowMembersPopup] = useState<boolean>(false);
    const [selectedAppointmentMembers, setSelectedAppointmentMembers] = useState<Member[] | null>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const statutOptions = UtilityController.getStatusOptions();
    const visaTypeOptions = UtilityController.getVisaTypes();
    const targetCountrieOptions = UtilityController.getTargetCountries();

    useEffect(() => {
        if (appointmentsAll.length === 0) {
            fetchAppointments();
        }
    }, []);

    //   useEffect(() => {
    //     filteredAppointmentsHook();
    //   }, [searchQuery, filterStatut, filterVisaType, filterDateFrom, filterDateTo]);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            await fetchAllAppointments();
            toast.success('Rendez-vous récupérés avec succès');
        } catch (error) {
            toast.error('Erreur lors du chargement des rendez-vous.');
        }
        setLoading(false);
    };
    //   const filteredAppointmentsHook = async () => {
    //     setLoading(true);
    //     try {
    //       await fetchAllAppointments();
    //       setMessage('Rendez-vous récupérés avec succès');
    //       setMessageType('success');
    //     } catch (error) {
    //         setMessage('Erreur lors du chargement des rendez-vous.');
    //         setMessageType('error');
    //     }
    //     setLoading(false);
    //   };

    const clearFilters = (): void => {
        resetFilters();
    };

    const showMembersModal = (appointmentId: number): void => {
        const appointment = appointmentsAll.find((app) => app.id === appointmentId);
        if (appointment) {
            setSelectedAppointmentMembers(appointment.members);
            setShowMembersPopup(true);
        }
    };

    const closeMembersModal = (): void => {
        setShowMembersPopup(false);
        setSelectedAppointmentMembers([]);
    };

    const editAppointment = (appointmentId: number): void => {
        navigate(`/appointments/details/${appointmentId}`);
    };

    const deleteAppointmentFromStore = async (appointmentId: number): Promise<void> => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) return;

        try {
            await deleteAppointment(appointmentId);
            toast.success('Rendez-vous supprimé avec succès.');
        } catch (error) {
            toast.error('Erreur lors de la suppression du rendez-vous.');
        }
    };

    const navigateToDetails = (appointmentId: number): void => {
        navigate(`/dashboard.tuxedos.host/${appointmentId}`);
    };

    const navigateToNew = (): void => {
        navigate('/appointments/new');
    };

    const getStatisticsCount = (status: string): number => {
        // Le statut est stocké en minuscules en base ("confirmé", "en attente"...)
        // alors que les libellés passés ici sont capitalisés : comparaison insensible à la casse.
        const target = status.trim().toLowerCase();
        return filteredAppointments.filter((app) => (app.statut || '').trim().toLowerCase() === target).length;
    };

    return (
        <div className="w-10xl mx-auto flex min-h-[97dvh] flex-col p-2">
            {/* Indicateur de chargement */}
            {/* {loading && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-center">
            <i className="fas fa-spinner animate-spin text-amber-500 text-2xl mr-3"></i>
            <span className="text-gray-600 text-lg">Chargement des rendez-vous...</span>
          </div>
        </div>
      )} */}

            {/* Barre de recherche globale et filtres */}
            <div className="sticky top-[4.7rem] z-20 mb-6 rounded-2xl bg-white/95 p-2 shadow-lg ring-1 ring-gray-100 backdrop-blur-sm transition sm:p-4 lg:top-5">
                <div className="mb-2 flex flex-wrap items-start justify-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <h2 className="mr-2 font-semibold tracking-tight sm:text-lg">Recherche</h2>
                    {/* <h2 className="sm:text-lg font-semibold tracking-tight">Recherche et filtres</h2> */}
                    {[
                        {
                            label: 'Total',
                            value: filteredAppointments.length,
                            icon: 'fas fa-layer-group',
                            className: ' bg-blue-50 text-blue-700 ring-blue-200',
                        },
                        {
                            label: 'En attente',
                            value: getStatisticsCount('En attente'),
                            icon: 'fas fa-hourglass-half',
                            className: ' bg-yellow-50 text-yellow-700 ring-yellow-200',
                        },
                        {
                            label: 'Confirmé',
                            value: getStatisticsCount('Confirmé'),
                            icon: 'fas fa-check-circle',
                            className: ' bg-green-50 text-green-700 ring-green-200',
                        },
                        {
                            label: 'Terminé',
                            value: getStatisticsCount('Terminé'),
                            icon: 'fas fa-flag-checkered',
                            className: ' bg-gray-50 text-gray-700 ring-gray-200',
                        },
                    ].map((stat, idx) => (
                        <span
                            key={stat.label}
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold ring-1 ${stat.className}`}
                        >
                            <i className={stat.icon}></i>
                            {stat.label} {stat.value}
                        </span>
                    ))}
                </div>

                <span className="mb-2 block text-xs text-gray-500">
                    <i className="fas fa-info-circle mr-1"></i>
                    Vous pouvez rechercher par nom, email, téléphone, type de visa...
                </span>

                <div className="flex flex-col items-stretch gap-1.5 lg:items-end xl:flex-row">
                    {/* Recherche globale + bouton Filtres (mobile) */}
                    <div className="flex w-full flex-1 items-center gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Rechercher par nom, email, téléphone, type de visa..."
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 pl-10 text-xs transition-colors duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                            />
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <i className="fas fa-search text-xs text-gray-400"></i>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowFilters((v) => !v)}
                            aria-expanded={showFilters}
                            className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-medium text-gray-700 ring-1 ring-gray-200 transition-colors hover:bg-gray-50 lg:hidden"
                        >
                            <i className="fas fa-sliders-h"></i>
                            Filtres
                            <i className={`fas fa-chevron-down text-[10px] transition-transform ${showFilters ? 'rotate-180' : ''}`}></i>
                        </button>
                    </div>

                    {/* Filtres */}
                    <div
                        className={`${showFilters ? 'grid' : 'hidden'} w-full flex-3 grid-cols-2 gap-2 sm:grid-cols-2 lg:grid lg:w-full lg:grid-cols-6`}
                    >
                        {/* Filtre par statut */}
                        <div>
                            <label className="mb-0.5 block text-[10px] font-medium text-gray-700">Statut</label>
                            <select
                                value={filterStatut}
                                onChange={(e) => setFilterStatut(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                            >
                                <option value="">Tous les statuts</option>
                                {statutOptions.map((statut) => (
                                    <option key={statut} value={statut}>
                                        {statut}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filtre par type de visa */}
                        <div>
                            <label className="mb-0.5 block text-[10px] font-medium text-gray-700">Type de visa</label>
                            <select
                                value={filterVisaType}
                                onChange={(e) => setFilterVisaType(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                            >
                                <option value="">Tous les types</option>
                                {visaTypeOptions.map((visaType) => (
                                    <option key={visaType} value={visaType}>
                                        {visaType}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filtre par type de visa */}
                        <div>
                            <label className="mb-0.5 block text-[10px] font-medium text-gray-700">Pays cible</label>
                            <select
                                value={filterTargetCountry}
                                onChange={(e) => setFilterTargetCountry(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                            >
                                <option value="">Tous les types</option>
                                {targetCountrieOptions.map((targetCountrie) => (
                                    <option key={targetCountrie.value} value={targetCountrie.value}>
                                        {targetCountrie.value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filtre par date de début */}
                        <div>
                            <label className="mb-0.5 block text-[10px] font-medium text-gray-700">Date de début</label>
                            <input
                                type="date"
                                value={filterDateFrom}
                                onChange={(e) => setFilterDateFrom(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                            />
                        </div>

                        {/* Filtre par date de fin */}
                        <div>
                            <label className="mb-0.5 block text-[10px] font-medium text-gray-700">Date de fin</label>
                            <input
                                type="date"
                                value={filterDateTo}
                                onChange={(e) => setFilterDateTo(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                        <div className="mt-1 flex flex-col justify-end">
                            {/* <div className="flex col-span-2 lg:col-span-1 flex-col justify-end mt-1"> */}
                            <button
                                onClick={clearFilters}
                                className="rounded-xl bg-white px-3 py-1.5 text-[11px] font-medium text-gray-700 ring-1 ring-gray-200 transition-colors hover:bg-gray-50 sm:py-2.5"
                            >
                                <i className="fas fa-times mr-1"></i>
                                {/* Effacer les filtres */}
                                Effacer
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistiques rapides */}
            {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      </div> */}
            <div className="flex-1 rounded-2xl bg-white p-2 shadow-lg ring-1 ring-gray-100 sm:p-4">
                {/* <div className=""> */}
                {loading ? (
                    <div className="py-20 text-center text-gray-500">
                        <i className="fas fa-spinner fa-spin mb-4 text-4xl text-amber-500"></i>
                        <p className="mb-2 text-lg font-medium">Chargement des détails...</p>
                        <p>Veuillez patienter pendant que nous récupérons les informations du rendez-vous.</p>
                    </div>
                ) : (
                    <>
                        {filteredAppointments.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                                {filteredAppointments.map((rdv, index) => {
                                    const member = rdv.members[0];
                                    const memberCount = rdv.members.length;

                                    return (
                                        <AppointmentCard
                                            selectedMembers={selectedAppointmentMembers}
                                            setSelectedMembers={setSelectedAppointmentMembers}
                                            type="A"
                                            appointment={rdv}
                                            key={index}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-10 text-center text-gray-500">
                                <i className="fas fa-search mb-2 text-4xl"></i>
                                <p className="mb-2 text-lg font-medium">Aucun rendez-vous trouvé</p>
                                <p>Aucun rendez-vous ne correspond aux critères de recherche.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AppointmentsAll;
