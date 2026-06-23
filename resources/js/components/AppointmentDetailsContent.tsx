import React from 'react';
import { Appointment } from '@/types';
import { UtilityController } from '@/controllers';
import { useGeneratePdf } from '@/hooks/useGeneratePdf';
import { useNavigate } from 'react-router-dom';
import { useSendEmail } from '@/hooks/useSendEmail';
import MemberCard from './MemberCard';
import { title } from 'process';

interface Props {
    selectedAppointment: Appointment | null | undefined;
    setMessageState: (msg: string, cls: string, icon: string) => void;
    openEditModal?: () => void;
}

const AppointmentDetailsContent: React.FC<Props> = ({
    selectedAppointment,
    setMessageState,
    openEditModal,
}) => {
    const { generatePdf: generatePdfFromHook, isLoading: isPdfLoading, error: pdfError } = useGeneratePdf();
    const { sendEmails: sendEmailsFromHook, isLoading: sendLoading, error: sendError } = useSendEmail();
    const navigate = useNavigate();
    const handleNavigateToNew = (): void => {
        navigate('/appointments/new');
    };
    const sendEmails = async (): Promise<void> => {
        if (!selectedAppointment || !selectedAppointment.members || selectedAppointment.members.length === 0) {
            setMessageState('Aucun participant à notifier.', 'bg-red-100 border border-red-400 text-red-700', 'fas fa-exclamation-circle');
            return;
        }
        const participantEmails = selectedAppointment.members.map((m: Member) => m.email).filter(Boolean);
        if (participantEmails.length === 0) {
            setMessageState('Aucun email participant valide trouvé.', 'bg-red-100 border border-red-400 text-red-700', 'fas fa-exclamation-circle');
            return;
        }
        const payload = {
            participantEmails,
            appointment: selectedAppointment
        };
        const success = await sendEmailsFromHook(payload);
        if (success) {
            setMessageState('E-mails envoyés avec succès aux participants et à l\'entreprise.', 'bg-green-100 border border-green-400 text-green-700', 'fas fa-check-circle');
        } else {
            setMessageState(sendError || 'Erreur lors de l\'envoi des e-mails.', 'bg-red-100 border border-red-400 text-red-700', 'fas fa-exclamation-circle');
        }
    };
    const renderStatusBadge = (status: string) => {
        switch (status) {
            case 'Confirmé':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                        <i className="fas fa-check-circle mr-1.5"></i>
                        {status}
                    </span>
                );
            case 'En attente':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-50 text-amber-700 ring-1 ring-amber-200">
                        <i className="fas fa-clock mr-1.5"></i>
                        {status}
                    </span>
                );
            case 'Terminé':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-200">
                        <i className="fas fa-flag-checkered mr-1.5"></i>
                        {status}
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-50 text-gray-700 ring-1 ring-gray-200">
                        <i className="fas fa-times-circle mr-1.5"></i>
                        {status}
                    </span>
                );
        }
    };
    // Générer une fenêtre imprimable pour exporter le résumé du rendez-vous (version enrichie + couleurs)
    const generatePdf = async (): Promise<void> => {
        if (!selectedAppointment) {
            setMessageState('Aucun rendez-vous à exporter.', 'bg-red-100 border border-red-400 text-red-700', 'fas fa-exclamation-circle');
            return;
        }

        const success = await generatePdfFromHook(selectedAppointment);

        if (success) {
            setMessageState('PDF généré avec succès.', 'bg-green-100 border border-green-400 text-green-700', 'fas fa-check-circle');
        } else {
            setMessageState(pdfError || 'Erreur lors de la génération du PDF.', 'bg-red-100 border border-red-400 text-red-700', 'fas fa-exclamation-circle');
        }
    };
    return (
        <div className=" flex flex-col lg:grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-6">
            <div className="card-warm lg:col-span-3 p-5 sm:p-7">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    <i className="fas fa-info-circle text-amber-500 mr-2"></i>
                    Rendez-vous
                    {/* Informations du rendez-vous */}

                    <span className="ml-4">
                        {renderStatusBadge(selectedAppointment?.statut || '')}
                    </span>
                </h2>

                <div className="flex flex-col gap-6">
                    <div className='flex flex-col sm:grid grid-cols-2 gap-3 md:gap-6'>
                        {[
                            {
                                title: 'Type de visa',
                                icon: 'passport',
                                value: selectedAppointment?.visa_type,
                            },
                            {
                                title: 'Date',
                                icon: 'calendar-day',
                                value: UtilityController.formatDate(selectedAppointment?.date || ''),
                            },
                            {
                                title: 'Pays cible',
                                icon: 'globe',
                                value: selectedAppointment?.target_country,
                            },
                            {
                                title: 'Date de création',
                                icon: 'clock',
                                value: UtilityController.formatDateTime(selectedAppointment?.created_at || ''),
                            },
                            {
                                title: 'Téléphone principal',
                                icon: 'phone',
                                value: selectedAppointment?.telephone,
                            },
                            {
                                title: 'Créneaux horaires',
                                icon: 'timeline',
                                value: (
                                    <>
                                        {selectedAppointment?.selected_slots && selectedAppointment.selected_slots.length > 0 ? (
                                            selectedAppointment.selected_slots.length > 3 ? (
                                                <>
                                                    <span className="inline-block bg-blue-50 text-blue-700 ring-1 ring-blue-200 text-[10px] font-semibold px-2 py-1 rounded-full">
                                                        {UtilityController.formatSlots(selectedAppointment.selected_slots)[0]}
                                                    </span>
                                                    <span className="relative group">
                                                        <button
                                                            type="button"
                                                            className="inline-block bg-blue-50 text-blue-700 ring-1 ring-blue-200 text-[10px] font-semibold px-2 py-1 rounded-full"
                                                        >
                                                            +{selectedAppointment.selected_slots.length - 2} créneaux
                                                        </button>
                                                        <div className="absolute left-0 mt-2 z-50 hidden group-hover:block bg-white border rounded-lg shadow-lg p-2 xs:p-3 w-40 xs:w-48 sm:w-64">
                                                            <h2 className="text-[10px] xs:text-sm sm:text-base font-semibold mb-2">Tous les créneaux</h2>
                                                            <div className="flex flex-wrap gap-1 mb-2">
                                                                {UtilityController.formatSlots(selectedAppointment.selected_slots).map((badge: string, index: number) => (
                                                                    <span key={index} className="inline-block bg-blue-50 text-blue-700 ring-1 ring-blue-200 text-[10px] font-semibold px-2 py-1 rounded-full">
                                                                        {badge}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span className="inline-block bg-blue-50 text-blue-700 ring-1 ring-blue-200 text-[10px] font-semibold px-2 py-1 rounded-full">
                                                        {UtilityController.formatSlots(selectedAppointment.selected_slots)[selectedAppointment.selected_slots.length - 1]}
                                                    </span>
                                                </>
                                            ) : (
                                                UtilityController.formatSlots(selectedAppointment.selected_slots).map((badge: string, index: number) => (
                                                    <span key={index} className="inline-block bg-blue-50 text-blue-700 ring-1 ring-blue-200 text-[10px] font-semibold px-2 py-1 rounded-full">
                                                        {badge}
                                                    </span>
                                                ))
                                            )
                                        ) : (
                                            <span className="text-gray-400 italic text-[10px]">Aucun créneau</span>
                                        )}
                                    </>
                                ),
                            },
                        ].map(({ title, icon, value }, index) => (
                            <div className={index === 10 ? 'col-span-2' : ''} key={index}>
                                <div className="flex items-center mb-3">
                                    <i className={`fas fa-${icon} text-amber-500 mr-2`}></i>
                                    <span className="text-xs font-medium text-gray-700">{title}</span>
                                    <div className="flex-1"></div>
                                    {index === 5 && (
                                        <span className="text-xs font-medium text-gray-700">
                                            {selectedAppointment?.selected_slots?.length ? selectedAppointment.selected_slots.length * 30 : 0} min
                                        </span>
                                    )}
                                </div>
                                <div className="text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50 p-1.5 md:p-2 rounded-lg ring-1 ring-gray-100 flex flex-warp gap-2">{value}</div>
                            </div>
                        ))}
                    </div>
                    <div className='col-span-2'>
                        <label className="block text-sm font-medium text-gray-700 mb-1 w-full">Action</label>
                        <div className="bg-gray-50 p-3 rounded-lg ring-1 ring-gray-100">
                            <div className="flex flex-wrap gap-2">
                                {openEditModal && <button
                                    onClick={openEditModal}
                                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center justify-center shadow-sm transition-colors"
                                >
                                    <i className="fas fa-edit mr-2"></i>
                                    Modifier le rendez-vous
                                </button>}
                                <button
                                    onClick={sendEmails}
                                    disabled={sendLoading}
                                    className={`px-4 py-2 rounded-lg flex items-center justify-center ring-1 transition-colors ${sendLoading ? 'bg-gray-100 text-gray-400 ring-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 ring-gray-300 hover:bg-gray-50'}`}
                                >
                                    <i className={`fas fa-envelope mr-2 text-amber-500 ${sendLoading ? 'animate-pulse' : ''}`}></i>
                                    {sendLoading ? 'Envoi en cours...' : 'Envoyer e-mails'}
                                </button>
                                <button
                                    onClick={generatePdf}
                                    disabled={isPdfLoading}
                                    className={`px-4 py-2 rounded-lg flex items-center justify-center ring-1 transition-colors ${isPdfLoading ? 'bg-gray-100 text-gray-400 ring-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 ring-gray-300 hover:bg-gray-50'}`}
                                >
                                    <i className={`fas fa-file-pdf mr-2 text-amber-500 ${isPdfLoading ? 'animate-pulse' : ''}`}></i>
                                    {isPdfLoading ? 'Génération en cours...' : 'Générer PDF'}
                                </button>

                                <button
                                    onClick={handleNavigateToNew}
                                    className="bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
                                >
                                    <i className="fas fa-plus mr-2 text-amber-500"></i>
                                    Nouveau rendez-vous
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {selectedAppointment?.notes && (
                    <div className="mt-6 ">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <i className="fas fa-sticky-note text-amber-500 mr-2"></i>
                            <span>{selectedAppointment.notes}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Liste des membres */}
            <div className="card-warm p-5 col-span-2">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    <i className="fas fa-users text-amber-500 mr-2"></i>
                    Membres du rendez-vous ({selectedAppointment?.members.length})
                </h2>

                <div className="flex flex-wrap gap-3">
                    {selectedAppointment?.members.map((member, index) => (
                        <MemberCard key={Date() + index} member={member} />

                    ))}
                </div>
            </div>

        </div>
    );
};

export default AppointmentDetailsContent;


