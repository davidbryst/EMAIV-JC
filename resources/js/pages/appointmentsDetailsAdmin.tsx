import AppointmentDetailsContent from '@/components/AppointmentDetailsContent';
import AppointmentEditModal from '@/components/AppointmentEditModal';
import { useDashboardHeader } from '@/contexts/dashboardHeader';
import { useAppointments } from '@/hooks/useAppointments';
import { toast } from '@/stores/useToastStore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface EditForm {
    statut: string;
    visa_type: string;
    notes: string;
}

const AppointmentsDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    useDashboardHeader('Détails du rendez-vous', true);

    const {
        appointmentsAll,
        selectedAppointment,
        setSelectedAppointment,
        fetchAppointmentById,
        updateAppointment: updateAppointmentFromStore,
        deleteAppointment: deleteAppointmentFromStore,
    } = useAppointments();

    const [formattedDate, setFormattedDate] = useState<string>('');
    const [formattedSlots, setFormattedSlots] = useState<string[]>([]);
    const [createdAt, setCreatedAt] = useState<string>('');
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [editForm, setEditForm] = useState<EditForm>({
        statut: '',
        visa_type: '',
        notes: '',
    });

    const statutOptions = ['En attente', 'Confirmé', 'Terminé', 'Annulé'];
    const visaTypeOptions = ['Touriste', 'Affaires', 'Étudiant', 'Transit', 'Famille'];

    useEffect(() => {
        if (id) {
            fetchAppointment(id);
        } else {
            setMessageState('ID du rendez-vous introuvable.', 'bg-red-100 border border-red-400 text-red-700', 'fas fa-exclamation-circle');
        }
    }, [id]);

    const fetchAppointment = async (id: string): Promise<void> => {
        setIsLoading(true);
        try {
            const appointment = appointmentsAll.find((appointment) => appointment.id === parseInt(id));

            if (appointment) {
                setSelectedAppointment(appointment);
                setMessageState('Rendez-vous chargé avec succès.', 'bg-green-100 border border-green-400 text-green-700', 'fas fa-check-circle');
            } else {
                await fetchAppointmentById(id);
            }

            if (selectedAppointment) {
                setEditForm({
                    statut: selectedAppointment.statut,
                    visa_type: selectedAppointment.visa_type,
                    notes: selectedAppointment.notes || '',
                });
                //   setFormattedDate(formatDate(selectedAppointment.date));
                //   setFormattedSlots(formatSlots(selectedAppointment.selected_slots));
                //   setCreatedAt(formatDateTime(selectedAppointment.created_at));
                setMessageState('Rendez-vous chargé avec succès.', 'bg-green-100 border border-green-400 text-green-700', 'fas fa-check-circle');
            }
        } catch (error) {
            setMessageState(
                'Erreur lors de la récupération du rendez-vous.',
                'bg-red-100 border border-red-400 text-red-700',
                'fas fa-exclamation-circle',
            );
        } finally {
            setIsLoading(false);
        }
    };

    const openEditModal = (): void => {
        setShowEditModal(true);
    };

    const closeEditModal = (): void => {
        setShowEditModal(false);
        if (selectedAppointment) {
            setEditForm({
                statut: selectedAppointment.statut,
                visa_type: selectedAppointment.visa_type,
                notes: selectedAppointment.notes || '',
            });
        }
    };

    const updateAppointment = async (id: string): Promise<void> => {
        setIsLoading(true);

        if (!selectedAppointment) return;

        try {
            await updateAppointmentFromStore(selectedAppointment.id, editForm);
            setMessageState('Rendez-vous mis à jour avec succès.', 'bg-green-100 border border-green-400 text-green-700', 'fas fa-check-circle');
            selectedAppointment.statut = editForm.statut;
            selectedAppointment.visa_type = editForm.visa_type;
            selectedAppointment.notes = editForm.notes;
            setSelectedAppointment(selectedAppointment);
            closeEditModal();
        } catch (error) {
            setMessageState(
                'Erreur lors de la mise à jour du rendez-vous.',
                'bg-red-100 border border-red-400 text-red-700',
                'fas fa-exclamation-circle',
            );
        } finally {
            setIsLoading(false);
        }
    };

    const deleteAppointment = async (): Promise<void> => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) return;
        if (!selectedAppointment) return;

        try {
            await deleteAppointmentFromStore(selectedAppointment.id);
            setMessageState('Rendez-vous supprimé avec succès.', 'bg-green-100 border border-green-400 text-green-700', 'fas fa-check-circle');
            setTimeout(() => {
                navigate('/appointments/all');
            }, 1200);
        } catch (error) {
            setMessageState(
                'Erreur lors de la suppression du rendez-vous.',
                'bg-red-100 border border-red-400 text-red-700',
                'fas fa-exclamation-circle',
            );
        }
    };

    // Affiche un toast flottant ; le type est déduit de la classe CSS passée par l'appelant.
    const setMessageState = (msg: string, cls: string, _icon?: string): void => {
        if (cls.includes('green')) toast.success(msg);
        else toast.error(msg);
    };

    const handleNavigateBack = (): void => {
        navigate(-1);
        // navigate('/appointments/all');
    };

    // Envoi d'e-mails aux participants et à l'entreprise depuis la page détails

    // Générer une fenêtre imprimable pour exporter le résumé du rendez-vous (version enrichie + couleurs)

    return (
        <div className="mx-auto max-w-[90rem] p-4 sm:p-6 lg:p-8">
            <div className="rounded-2xl bg-white p-2 shadow-lg ring-1 ring-gray-100 sm:p-4">
                <button
                    onClick={handleNavigateBack}
                    className="mb-5 hidden items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-ink ring-1 ring-sand transition-colors hover:bg-paper-2 lg:inline-flex"
                >
                    <i className="fas fa-arrow-left"></i>
                    Retour
                </button>

                {isLoading ? (
                    <div className="py-20 text-center text-gray-500">
                        <i className="fas fa-spinner fa-spin mb-4 text-4xl text-amber-500"></i>
                        <p className="mb-2 text-lg font-medium">Chargement des détails...</p>
                        <p>Veuillez patienter pendant que nous récupérons les informations du rendez-vous.</p>
                    </div>
                ) : (
                    <>
                        {/* En-tête avec navigation */}
                        {/* <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={handleNavigateBack} className="text-gray-500 hover:text-gray-700 mr-4">
              <i className="fas fa-arrow-left text-xl"></i>
            </button>
            <h1 className="text-lg font-bold text-gray-800">
              <i className="fas fa-calendar-check text-amber-500 mr-2"></i>
              Détails du rendez-vous
              Détails du rendez-vous #{appointment.id}
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={openEditModal}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
            >
              <i className="fas fa-edit mr-1"></i>
              Modifier
            </button>
            <button
              onClick={deleteAppointment}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              <i className="fas fa-trash mr-1"></i>
              Supprimer
            </button>
          </div>
        </div>
      </div> */}

                        <AppointmentDetailsContent
                            setMessageState={setMessageState}
                            selectedAppointment={selectedAppointment}
                            openEditModal={openEditModal}
                        />

                        <AppointmentEditModal
                            show={showEditModal}
                            onClose={closeEditModal}
                            onSubmit={() => updateAppointment(id || '')}
                            editForm={editForm}
                            setEditForm={setEditForm}
                            statutOptions={statutOptions}
                            visaTypeOptions={visaTypeOptions}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default AppointmentsDetails;
