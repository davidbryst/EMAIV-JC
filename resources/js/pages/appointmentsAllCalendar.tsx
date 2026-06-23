import { AppointmentController, UtilityController } from '@/controllers';
import { useAppointments } from '@/hooks/useAppointments';
import { useAppStore } from '@/stores/useAppStore';
import { toast } from '@/stores/useToastStore';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AppointmentsAll: React.FC = () => {
  const navigate = useNavigate();
  const {
    appointmentsAll,
    appointmentsAllError,
    searchQuery,
    filterStatut,
    filterVisaType,
    filterDateFrom,
    filterDateTo,
    filteredAppointments,
    fetchAllAppointments,
    setSearchQuery,
    setFilterStatut,
    setFilterVisaType,
    setFilterDateFrom,
    setFilterDateTo,
    deleteAppointment,
    resetFilters
  } = useAppointments();
//   const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [showMembersPopup, setShowMembersPopup] = useState<boolean>(false);
  const [selectedAppointmentMembers, setSelectedAppointmentMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const statutOptions = ['En attente', 'Confirmé', 'Terminé', 'Annulé'];
  const visaTypeOptions = ['Touriste', 'Affaires', 'Étudiant', 'Transit', 'Famille'];

  useEffect(() => {
    if (appointmentsAll.length === 0) {
      fetchAppointments();
    }
  }, []);

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



  const clearFilters = (): void => {
    resetFilters();
  };

  const showMembersModal = (appointmentId: number): void => {
    const appointment = appointmentsAll.find(app => app.id === appointmentId);
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
    return filteredAppointments.filter(app => app.statut === status).length;
  };

  return (
    <div className="w-10xl mx-auto p-2">
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
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-start items-center mb-4 gap-4">
            <h2 className="text-lg font-semibold ">Recherche et filtres</h2>
            <span className="inline-block border-l-4 border-blue-500 bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded-full">Total - {filteredAppointments.length}</span>
            <span className="inline-block border-l-4 border-yellow-500 bg-yellow-100 text-yellow-800 text-sm font-semibold px-2 py-1 rounded-full">En attente - {getStatisticsCount('En attente')}</span>
            <span className="inline-block border-l-4 border-green-500 bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded-full">Confirmé - {getStatisticsCount('Confirmé')}</span>
            <span className="inline-block border-l-4 border-gray-500 bg-gray-100 text-gray-800 text-sm font-semibold px-2 py-1 rounded-full">Terminé - {getStatisticsCount('Terminé')}</span>
        </div>

        <span className="text-sm text-gray-500">
          <i className="fas fa-info-circle mr-1"></i>
          Vous pouvez rechercher par nom, email, téléphone, type de visa...
        </span>

        {/* Recherche globale */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par nom, email, téléphone, type de visa..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 pl-10"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filtre par statut */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">Tous les statuts</option>
              {statutOptions.map(statut => (
                <option key={statut} value={statut}>{statut}</option>
              ))}
            </select>
          </div>

          {/* Filtre par type de visa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type de visa</label>
            <select
              value={filterVisaType}
              onChange={(e) => setFilterVisaType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">Tous les types</option>
              {visaTypeOptions.map(visaType => (
                <option key={visaType} value={visaType}>{visaType}</option>
              ))}
            </select>
          </div>

          {/* Filtre par date de début */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
            <input
              type="date"
              value={filterDateFrom}
              onChange={(e) => setFilterDateFrom(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          {/* Filtre par date de fin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
            <input
              type="date"
              value={filterDateTo}
              onChange={(e) => setFilterDateTo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            {filteredAppointments.length} rendez-vous trouvé(s)
          </div>
          <div className="flex gap-2">
            <button
              onClick={clearFilters}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              <i className="fas fa-times mr-1"></i>
              Effacer les filtres
            </button>
            <button
              onClick={fetchAllAppointments}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className={`fas ${loading ? 'fa-spinner animate-spin' : 'fa-sync-alt'} mr-1`}></i>
              {loading ? 'Chargement...' : 'Actualiser'}
            </button>
            <button
              onClick={navigateToNew}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              <i className="fas fa-plus mr-1"></i>
              Nouveau rendez-vous
            </button>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      </div> */}
      {loading ? (
        <div className="text-center text-gray-500 py-20">
          <i className="fas fa-spinner fa-spin text-4xl mb-4 text-amber-500"></i>
          <p className="text-lg font-medium mb-2">Chargement des détails...</p>
          <p>Veuillez patienter pendant que nous récupérons les informations du rendez-vous.</p>
        </div>
      ) : (
        <>
          {filteredAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map((rdv) => {
            const member = rdv.members[0];
            const memberCount = rdv.members.length;

            return (
              <div key={rdv.id} className="bg-white border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center cursor-pointer" onClick={() => showMembersModal(rdv.id)}>
                    <img
                      src={member?.avatar}
                      alt={`${member?.prenom} ${member?.nom}`}
                      className="w-8 h-8 mr-2 rounded-full border-2 border-amber-200 hover:border-amber-400 transition-colors"
                    />
                    <div className="text-sm text-gray-600">
                      <div className="font-medium">{member?.prenom} {member?.nom}</div>
                      <div className="text-xs text-gray-500">
                        {member?.telephone}
                        {memberCount > 1 && (
                          <span className="ml-1 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                            +{memberCount - 1} autre(s)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {rdv.statut === 'Confirmé' ? (
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                        Confirmé
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">
                        {rdv.statut}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <i className="fas fa-calendar-day w-5 text-amber-500 mr-3"></i>
                    <span className="font-semibold">{UtilityController.formatDate(rdv.date)}</span>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <i className="fas fa-passport w-5 text-amber-500 mr-3"></i>
                    <span>{rdv.visa_type}</span>
                  </div>

                  <div className="flex items-start text-gray-700">
                    <i className="fas fa-clock w-5 text-amber-500 mr-3"></i>
                    <div className="flex flex-wrap items-center gap-2">
                    {rdv.selected_slots && Array.isArray(rdv.selected_slots) && rdv.selected_slots.length > 3 ? (
                        <>
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                            {rdv.selected_slots[0]} - {UtilityController.addMinutes(rdv.selected_slots[0], 30)}
                          </span>
                          <span className="relative group">
                            <button
                              type="button"
                              className="inline-block bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
                            >
                              +{rdv.selected_slots.length - 3} créneaux
                            </button>
                            <div className="absolute left-0 mt-2 z-50 hidden group-hover:block bg-white border rounded-lg shadow-lg p-3 w-64">
                              <h2 className="text-base font-semibold mb-2">Tous les créneaux</h2>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {rdv.selected_slots.map((badge: string, index: number) => (
                                  <span
                                    key={index}
                                    className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full"
                                  >
                                    {badge} - {UtilityController.addMinutes(badge, 30)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </span>
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                            {rdv.selected_slots[rdv.selected_slots.length - 1]} - {UtilityController.addMinutes(rdv.selected_slots[rdv.selected_slots.length - 1], 30)}
                          </span>
                        </>
                      ) : rdv.selected_slots && Array.isArray(rdv.selected_slots) ? (
                        rdv.selected_slots.map((badge: string, index: number) => (
                          <span
                            key={index}
                            className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full"
                          >
                            {badge} - {UtilityController.addMinutes(badge, 30)}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 italic">Aucun créneau</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigateToDetails(rdv.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
                      >
                        <i className="fas fa-eye mr-1"></i>
                        Voir détails
                      </button>
                      <button
                        // onClick={() => editAppointment(rdv.id)}
                        className="text-amber-600 hover:text-amber-800 text-sm font-medium transition-colors duration-200"
                      >
                        <i className="fas fa-edit mr-1"></i>
                        Modifier
                      </button>
                    </div>
                    <button
                    //   onClick={() => deleteAppointment(rdv.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-200"
                    >
                      <i className="fas fa-trash mr-1"></i>
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10">
          <i className="fas fa-search text-4xl mb-2"></i>
          <p className="text-lg font-medium mb-2">Aucun rendez-vous trouvé</p>
          <p>Aucun rendez-vous ne correspond aux critères de recherche.</p>
        </div>
      )}
        </>
      )}

      {/* Modal des membres */}
      {showMembersPopup && (
        <div className="fixed inset-0  overflow-y-auto" onClick={closeMembersModal}>
          <div className="flex items-center justify-center min-h-dvh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0  bg-[#6a72828c]">
                <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      <i className="fas fa-users mr-2 text-amber-500"></i>
                      Membres du rendez-vous
                    </h3>

                    {selectedAppointmentMembers.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {selectedAppointmentMembers.map((member) => (
                          <div key={member.id} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex items-center mb-3">
                              <img
                                src={member.avatar}
                                alt={`${member.prenom} ${member.nom}`}
                                className="w-12 h-12 rounded-full mr-3"
                              />
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {member.prenom} {member.nom}
                                </h4>
                                <p className="text-sm text-gray-600">{member.nationalite}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="font-medium text-gray-700">Téléphone:</span>
                                <p className="text-gray-600">{member.telephone}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Email:</span>
                                <p className="text-gray-600">{member.email}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Passeport:</span>
                                <p className="text-gray-600">{member.passeport}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Motif:</span>
                                <p className="text-gray-600">{member.motif}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={closeMembersModal}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Fermer
                </button>
              </div>
            </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsAll;
