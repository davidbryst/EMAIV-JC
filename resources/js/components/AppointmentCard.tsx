import { UtilityController } from '@/controllers';
import { Appointment } from '@/types';
import { CalendarDays, CheckCircle2, Clock, Globe, IdCard, Users } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberCard from './MemberCard';

interface AppointmentCardProps {
    type: 'A' | 'U';
    appointment: Appointment;
    selectedMembers: Member[] | null;
    setSelectedMembers: (member: Member[] | null) => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ type, appointment, selectedMembers, setSelectedMembers }) => {
    const [showMembersPopup, setShowMembersPopup] = useState<boolean>(false);
    const navigate = useNavigate();
    const closeMembersModal = (): void => {
        setShowMembersPopup(false);
        setSelectedMembers(null);
    };
    const showMembersModal = (rdv: Appointment): void => {
        setSelectedMembers(rdv.members);
        setShowMembersPopup(true);
    };
    const onViewDetailsU = (appointment: Appointment): void => {
        // localStorage.setItem('appointment_details_state', JSON.stringify({
        //   appointment: appointment,
        // }));
        navigate(`/appointments/details/${appointment.id}`);
    };
    const onViewDetails = (appointment: Appointment): void => {
        // localStorage.setItem('appointment_details_state', JSON.stringify({
        //   appointment: appointment,
        // }));
        navigate(`/dashboard.tuxedos.host/${appointment.id}`);
    };
    const onEdit = (appointmentId: number): void => {
        // localStorage.setItem('appointment_details_state', JSON.stringify({
        //   appointment: appointment,
        // }));
        // navigate(`/appointments/details/${appointment.id}`);
    };
    const onDelete = (appointmentId: number): void => {
        // localStorage.setItem('appointment_details_state', JSON.stringify({
        //   appointment: appointment,
        // }));
        // navigate(`/appointments/details/${appointment.id}`);
    };
    return (
        <>
            <div className="card flex h-full flex-col p-3 transition-shadow duration-300 hover:shadow-lg xs:p-4 sm:p-6">
                <div className="mb-2 flex items-start justify-between xs:mb-3 sm:mb-4">
                    <div className="flex min-w-0 flex-1 cursor-pointer items-center" onClick={() => showMembersModal(appointment)}>
                        <img
                            src={appointment.members[0]?.avatar}
                            alt={`${appointment.members[0]?.prenom} ${appointment.members[0]?.nom}`}
                            className="mr-2 h-5 w-5 flex-shrink-0 rounded-full border-2 border-amber-200 transition-colors hover:border-amber-400 xs:h-6 xs:w-6 sm:h-8 sm:w-8"
                        />
                        <div className="min-w-0 flex-1 text-xs text-gray-600 xs:text-xs sm:text-sm">
                            <div className="truncate font-medium">{`${appointment.members[0]?.prenom} ${appointment.members[0]?.nom}`}</div>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="block truncate">
                                    {appointment.members[0]?.prefixe} {appointment.members[0]?.telephone}
                                </span>
                                {appointment.members.length > 1 && (
                                    <span className="mt-1 inline-block rounded-full bg-blue-100 px-1 py-0.5 text-xs text-nowrap text-blue-800 xs:px-1.5">
                                        +{appointment.members.length - 1} autre(s)
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* <div className="text-right flex-shrink-0 ml-2">
                    {appointment.statut === 'confirmé' ? (
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Confirmé
                        </span>
                    ) : (
                        <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full">
                        {appointment.statut.charAt(0).toUpperCase() + appointment.statut.slice(1)}
                        </span>
                    )}
                    </div> */}
                </div>
                <div className="grid grid-cols-5 space-y-1.5 xs:space-y-2 sm:space-y-3">
                    <div className="col-span-2 flex items-center text-gray-700">
                        {!(appointment.statut === 'confirmé') ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-green-800 xs:px-2 xs:py-1">
                                <CheckCircle2 className="h-3 w-3" />
                                Confirmé
                            </span>
                        ) : (
                            <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-xs font-semibold text-gray-800 xs:px-2 xs:py-1">
                                {appointment.statut.charAt(0).toUpperCase() + appointment.statut.slice(1)}
                            </span>
                        )}
                    </div>
                    <div className="col-span-3 flex items-center text-gray-700">
                        <CalendarDays className="mr-1.5 w-4 text-amber-500 xs:mr-2 xs:w-4 sm:mr-3 sm:w-5" />
                        <span className="text-xs font-medium sm:text-sm">{UtilityController.formatDate(appointment.date)}</span>
                    </div>
                    <div className="col-span-2 flex items-center text-gray-700">
                        <IdCard className="mr-1.5 w-4 text-amber-500 xs:mr-2 xs:w-4 sm:mr-3 sm:w-5" />
                        <span className="text-xs font-medium sm:text-sm">{appointment.visa_type}</span>
                    </div>
                    <div className="col-span-3 flex items-center text-gray-700">
                        <Globe className="mr-1.5 w-4 text-amber-500 xs:mr-2 xs:w-4 sm:mr-3 sm:w-5" />
                        <span className="text-xs font-medium sm:text-sm">{appointment.target_country}</span>
                    </div>
                    {/* {appointment.selected_slots = [...appointment.selected_slots, '12:00']} */}
                    <div className="col-span-5 flex items-start text-gray-700">
                        <Clock className="mt-0.5 mr-1.5 w-4 text-amber-500 xs:mr-2 xs:w-4 sm:mr-3 sm:w-5" />
                        <div className="flex flex-wrap items-center gap-3 sm:gap-2">
                            {appointment.selected_slots.length > 3 ? (
                                <>
                                    <span className="inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
                                        {UtilityController.formatSlots(appointment.selected_slots)[0]}
                                    </span>
                                    <span className="group relative">
                                        <button
                                            type="button"
                                            className="inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200"
                                        >
                                            +{appointment.selected_slots.length - 2} créneaux
                                        </button>
                                        <div className="absolute left-0 z-50 mt-2 hidden w-40 rounded-lg border bg-white p-2 shadow-lg group-hover:block xs:w-48 xs:p-3 sm:w-64">
                                            <h2 className="mb-2 text-xs font-semibold xs:text-sm sm:text-base">Tous les créneaux</h2>
                                            <div className="mb-2 flex flex-wrap gap-1">
                                                {UtilityController.formatSlots(['12:00']).map((badge: string, index: number) => (
                                                    <span
                                                        key={index}
                                                        className="inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200"
                                                    >
                                                        {badge}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </span>
                                    <span className="inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
                                        {UtilityController.formatSlots(appointment.selected_slots)[appointment.selected_slots.length - 1]}
                                    </span>
                                </>
                            ) : (
                                UtilityController.formatSlots(appointment.selected_slots).map((badge: string, index: number) => (
                                    <span
                                        key={index}
                                        className="inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200"
                                    >
                                        {badge}
                                    </span>
                                ))
                            )}
                            {/* {appointment.selected_slots && Array.isArray(appointment.selected_slots) && appointment.selected_slots.length > 3 ? (
                            <>
                                        <span className="inline-block bg-blue-50 text-blue-700 ring-1 ring-blue-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                                        {appointment.selected_slots[0]} - {UtilityController.addMinutes(appointment.selected_slots[0], 30)}
                                </span>
                                <span className="relative group">
                                <button
                                    type="button"
                                    className="inline-block bg-blue-50 text-blue-700 ring-1 ring-blue-200 text-xs font-semibold px-2.5 py-1 rounded-full"
                                >
                                    +{appointment.selected_slots.length - 3} créneaux
                                </button>
                                <div className="absolute left-0 mt-2 z-50 hidden group-hover:block bg-white border rounded-lg shadow-lg p-2 xs:p-3 w-40 xs:w-48 sm:w-64">
                                    <h2 className="text-xs xs:text-sm sm:text-base font-semibold mb-2">Tous les créneaux</h2>
                                    <div className="flex flex-wrap gap-1 mb-2">
                                    {UtilityController.formatSlots(['12:00']).map((badge: string, index: number) => (
                                        <span key={index} className="inline-block bg-blue-50 text-blue-700 ring-1 ring-blue-200 text-xs font-semibold px-2.5 py-1 rounded-full">

                                        {badge}
                                        </span>
                                    ))}
                                    </div>
                                </div>
                                </span>
                                <span className="inline-block bg-blue-50 text-blue-700 ring-1 ring-blue-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                                {appointment.selected_slots[appointment.selected_slots.length - 1]} - {UtilityController.addMinutes(appointment.selected_slots[appointment.selected_slots.length - 1], 30)}
                                </span>
                            </>
                            ) : appointment.selected_slots && Array.isArray(appointment.selected_slots) ? (
                            appointment.selected_slots.map((badge: string, index: number) => (
                                <span key={index} className="inline-block bg-blue-50 text-blue-700 ring-1 ring-blue-200 text-xs font-semibold px-2.5 py-1 rounded-full">

                                {badge} - {UtilityController.addMinutes(badge, 30)}
                                </span>
                            ))
                            ) : (
                            <span className="text-gray-400 italic text-xs">Aucun créneau</span>
                            )} */}
                        </div>
                    </div>
                </div>
                <div className="my-2"></div>
                <div className="mt-auto border-t border-gray-200 pt-2 xs:pt-3 sm:pt-4">
                    {type === 'A' ? (
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onViewDetails(appointment)}
                                    className="text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
                                >
                                    <i className="fas fa-eye mr-1"></i>
                                    Voir détails
                                </button>
                                <button
                                    onClick={() => onEdit(appointment.id)}
                                    className="text-sm font-medium text-amber-600 transition-colors duration-200 hover:text-amber-800"
                                >
                                    <i className="fas fa-edit mr-1"></i>
                                    Modifier
                                </button>
                            </div>
                            <button
                                onClick={() => onDelete(appointment.id)}
                                className="text-sm font-medium text-red-600 transition-colors duration-200 hover:text-red-800"
                            >
                                <i className="fas fa-trash mr-1"></i>
                                Supprimer
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onViewDetailsU(appointment)}
                                    className="text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
                                >
                                    <i className="fas fa-eye mr-1"></i>
                                    Voir détails
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Modal des membres */}
            {showMembersPopup && (
                <div className="fixed inset-0 z-50 overflow-y-auto" onClick={closeMembersModal}>
                    <div className="flex min-h-dvh items-center justify-center px-2 pt-4 pb-20 text-center xs:px-4 sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-[#6a72828c]">
                                <div
                                    className="z-50 mx-2 my-8 inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom align-middle shadow-xl transition-all xs:mx-4 md:w-3xl xl:w-7xl"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="bg-white px-3 pt-4 pb-3 xs:px-4 xs:pt-5 xs:pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                                                <h3 className="mb-3 text-sm leading-6 font-medium text-gray-900 xs:mb-4 xs:text-base sm:text-lg">
                                                    <Users className="mr-2 inline h-4 w-4 text-amber-500" />
                                                    Membres du rendez-vous
                                                </h3>
                                                {selectedMembers && (
                                                    <div className="grid gap-2 xs:gap-2 sm:gap-3 md:grid-cols-2 xl:grid-cols-3">
                                                        {selectedMembers.map((member, index) => (
                                                            <MemberCard key={Date() + index} member={member} />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-3 py-2 xs:px-4 xs:py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            onClick={closeMembersModal}
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-amber-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none xs:px-4 xs:text-base sm:ml-3 sm:w-auto"
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
        </>
    );
};

export default AppointmentCard;
