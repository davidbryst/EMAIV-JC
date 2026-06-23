import { useAppStore } from '../stores/useAppStore';
import { AppointmentController } from '../controllers/AppointmentController';
import { Appointment } from '../types';

export const useAppointments = () => {
  const {
    appointments,
    selectedAppointment,
    appointmentsError,
    appointmentsAll,
    appointmentsAllError,
    searchQuery,
    filterStatut,
    filterVisaType,
    filterTargetCountry,
    filterDateFrom,
    filterDateTo,
    searchPhone,
    searchPrefixe,
    fetchAllAppointments,
    fetchAppointmentsByPhone,
    fetchAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    setSearchQuery,
    setFilterStatut,
    setFilterVisaType,
    setFilterTargetCountry,
    setFilterDateFrom,
    setFilterDateTo,
    setSearchPhone,
    setSearchPrefixe,
    clearAppointments,
    setSelectedAppointment,
  } = useAppStore();

  // Filtrer les rendez-vous selon les critères actuels
  const filteredAppointments = () => {
    return AppointmentController.filterAppointments(
        appointmentsAll,
      searchQuery,
      filterStatut,
      filterVisaType,
      filterTargetCountry,
      filterDateFrom,
      filterDateTo
    );
  };

  // Obtenir les statistiques des rendez-vous
  const getStatistics = () => {
    return AppointmentController.getStatistics(appointments);
  };

  // Rechercher des rendez-vous avec validation
//   const searchAppointments = async () => {
//     if (!searchPrefixe || !searchPhone || searchPhone.length !== 10) {
//       throw new Error('Veuillez saisir un préfixe et un numéro de téléphone complet (10 chiffres).');
//     }

//     await fetchAppointmentsByPhone(searchPrefixe, searchPhone);
//   };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearchQuery('');
    setFilterStatut('');
    setFilterVisaType('');
    setFilterTargetCountry('');
    setFilterDateFrom('');
    setFilterDateTo('');
  };

  // Réinitialiser la recherche par téléphone
  const resetSearch = () => {
    setSearchPhone('');
    setSearchPrefixe('');
    clearAppointments();
  };

  return {
    // État
    appointments,
    appointmentsAll,
    appointmentsAllError,
    selectedAppointment,
    appointmentsError,
    searchQuery,
    filterStatut,
    filterVisaType,
    filterTargetCountry,
    filterDateFrom,
    filterDateTo,
    searchPhone,
    searchPrefixe,

    // Données calculées
    filteredAppointments: filteredAppointments(),
    statistics: getStatistics(),

    // filterAppointments,

    // Actions
    fetchAllAppointments,
    fetchAppointmentsByPhone,
    fetchAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    // searchAppointments,

    // Setters
    setSearchQuery,
    setFilterStatut,
    setFilterVisaType,
    setFilterTargetCountry,
    setFilterDateFrom,
    setFilterDateTo,
    setSearchPhone,
    setSearchPrefixe,
    setSelectedAppointment,

    // Utilitaires
    resetFilters,
    resetSearch,
    clearAppointments,
  };
};

