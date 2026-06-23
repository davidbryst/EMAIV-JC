import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppointments } from '@/hooks/useAppointments';
import { useSendEmail } from '@/hooks/useSendEmail';
import { useGeneratePdf } from '@/hooks/useGeneratePdf';
import { Appointment, Member } from '../types';
import { AppointmentController, UtilityController } from '@/controllers';
import AppointmentDetailsContent from '@/components/AppointmentDetailsContent';
import AppointmentEditModal from '@/components/AppointmentEditModal';
import { toast } from '../stores/useToastStore';



interface EditForm {
  statut: string;
  visa_type: string;
  notes: string;
}

const AppointmentsDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

//   const [appointment, setAppointment] = useState<Appointment>({
//     id: 0,
//     members: [],
//     selected_slots: [],
//     visa_type: '',
//     statut: '',
//     telephone: '',
//     notes: '',
//     date: '',
//     payment_method: '',
//     created_at: ''
//   });
  const {
    appointments,
    selectedAppointment,
    setSelectedAppointment,
    fetchAppointmentById,
    updateAppointment: updateAppointmentFromStore,
    deleteAppointment: deleteAppointmentFromStore
  } = useAppointments();

  const [formattedDate, setFormattedDate] = useState<string>('');
  const [formattedSlots, setFormattedSlots] = useState<string[]>([]);
  const [createdAt, setCreatedAt] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<EditForm>({
    statut: '',
    visa_type: '',
    notes: ''
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

        const appointment = appointments.find(appointment => appointment.id === parseInt(id));

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
                notes: selectedAppointment.notes || ''
            });
            //   setFormattedDate(formatDate(selectedAppointment.date));
            //   setFormattedSlots(formatSlots(selectedAppointment.selected_slots));
            //   setCreatedAt(formatDateTime(selectedAppointment.created_at));
            setMessageState('Rendez-vous chargé avec succès.', 'bg-green-100 border border-green-400 text-green-700', 'fas fa-check-circle');
        }
    } catch (error) {
      setMessageState('Erreur lors de la récupération du rendez-vous.', 'bg-red-100 border border-red-400 text-red-700', 'fas fa-exclamation-circle');
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
        notes: selectedAppointment.notes || ''
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
      setMessageState('Erreur lors de la mise à jour du rendez-vous.', 'bg-red-100 border border-red-400 text-red-700', 'fas fa-exclamation-circle');
    }
    finally {
      setIsLoading(false);
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

  return (
    // <div className="max-w-7xl mx-auto p-6 mt-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
      <button
        onClick={handleNavigateBack}
        className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full text-sm font-semibold text-ink bg-cream ring-1 ring-sand hover:bg-paper-2 transition-colors"
      >
        <i className="fas fa-arrow-left"></i>
        Retour
      </button>

      {isLoading || !selectedAppointment ? (
        <div className="text-center text-gray-500 py-20">
          <i className="fas fa-spinner fa-spin text-4xl mb-4 text-amber-500"></i>
          <p className="text-lg font-medium mb-2">Chargement des détails...</p>
          <p>Veuillez patienter pendant que nous récupérons les informations du rendez-vous.</p>
        </div>
      ) : (
        <>
          {/* En-tête avec navigation */}


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
  );
};

export default AppointmentsDetails;
