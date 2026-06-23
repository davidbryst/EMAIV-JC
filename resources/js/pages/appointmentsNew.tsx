import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '@/hooks/useAppointments';
import { useTimeSlots } from '@/hooks/useTimeSlots';
import { useSendEmail } from '@/hooks/useSendEmail';
import { Member, Appointment } from '../types';
import { UtilityController } from '@/controllers';


interface TimeSlot {
    heure: string;
    disponible: boolean;
    sequence_ok: boolean;
    occupation: number;
}

interface FormErrors {
    [key: string]: string;
}

const AppointmentsNew: React.FC = () => {
    const navigate = useNavigate();

    // Utiliser les hooks
    const {
        createAppointment
    } = useAppointments();

    const {
        availableSlots,
        fetchAvailableSlots
    } = useTimeSlots();

    const { sendEmails: sendEmailsFromHook } = useSendEmail();

    // État principal
    const [step, setStep] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [slotsLoad, setSlotsLoad] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [showMobileForm, setShowMobileForm] = useState<boolean>(false);

    // Données du formulaire
    const [visaType, setVisaType] = useState<string>('');
    const [targetCountry, setTargetCountry] = useState<string>('');
    const [members, setMembers] = useState<Member[]>([
        // {
        //   id: 1,
        //   nom: 'Koné',
        //   prenom: 'Aminata',
        //   nationalite: 'Ivoirienne',
        //   motif: 'Tourisme',
        //   dates: '2025-08-15',
        //   passeport: 'CI123456789',
        //   email: 'aminata.kone@email.com',
        //   prefixe: '+225',
        //   telephone: '0123456789',
        //   avatar: 'https://ui-avatars.com/api/?name=Aminata+Koné&background=f59e0b&color=ffffff'
        // },
        // {
        //   id: 2,
        //   nom: 'Diallo',
        //   prenom: 'Moussa',
        //   nationalite: 'Malienne',
        //   motif: 'Affaires',
        //   dates: '2025-09-01',
        //   passeport: 'ML987654321',
        //   email: 'moussa.diallo@email.com',
        //   prefixe: '+223',
        //   telephone: '0987654321',
        //   avatar: 'https://ui-avatars.com/api/?name=Moussa+Diallo&background=f59e0b&color=ffffff'
        // },
        // {
        //   id: 3,
        //   nom: 'Ouédraogo',
        //   prenom: 'Fatoumata',
        //   nationalite: 'Burkinabé',
        //   motif: 'Études',
        //   dates: '2025-08-30',
        //   passeport: 'BF456789123',
        //   email: 'fatoumata.ouedraogo@email.com',
        //   prefixe: '+226',
        //   telephone: '0456789123',
        //   avatar: 'https://ui-avatars.com/api/?name=Fatoumata+Ouédraogo&background=f59e0b&color=ffffff'
        // }
    ]);
    const [appointmentDate, setAppointmentDate] = useState<string>('');
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
    const [format, setFormat] = useState<string>('');
    const [paymentMode, setPaymentMode] = useState<string>('');
    const [payment, setPayment] = useState<string>('');

    // Nouveau membre en cours d'édition
    const [newMember, setNewMember] = useState<Member>({
        nom: '',
        prenom: '',
        nationalite: '',
        motif: '',
        dates: '',
        passeport: '',
        email: '',
        prefixe: '',
        telephone: '',
        avatar: ''
    });

    // Données pour les options
    const [errors, setErrors] = useState<FormErrors>({});

    // Options statiques
    const visaTypes = UtilityController.getVisaTypes();
    const targetCountries = UtilityController.getTargetCountries();
    const nationalities = UtilityController.getNationalities();
    const paymentMethods = UtilityController.getPaymentMethods();
    const paymentModes = UtilityController.getPaymentModes();
    const onsitePaymentMethod = UtilityController.getOnsitePaymentMethod();
    const appointmentFormats = UtilityController.getAppointmentFormats();
    const appointmentFee = UtilityController.getAppointmentFee();

    // Pays cibles disponibles


    // Dates limites
    const today = new Date();
    const minDate = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Demain
    const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 30 jours

    useEffect(() => {
        if (appointmentDate) {
            (async () => {
                setSlotsLoad(true);
                await fetchAvailableSlots(appointmentDate);
                setSlotsLoad(false);
            })();
        }
    }, [appointmentDate]);



    const nextStep = (): void => {
        if (validateCurrentStep()) {
            setLoading(true);
            setTimeout(() => {
                setStep(prev => Math.min(prev + 1, 4));
                setLoading(false);
            }, 500);
        }
    };

    const prevStep = (): void => {
        setLoading(true);
        setTimeout(() => {
            setStep(prev => Math.max(prev - 1, 1));
            setLoading(false);
        }, 300);
    };

    const validateCurrentStep = (): boolean => {
        const newErrors: FormErrors = {};

        switch (step) {
            case 1:
                if (!visaType) {
                    newErrors.visaType = 'Veuillez sélectionner un type de visa';
                }
                if (!targetCountry) {
                    newErrors.targetCountry = 'Veuillez sélectionner un pays de destination';
                }
                break;
            case 2:
                if (members.length === 0) {
                    newErrors.members = 'Veuillez ajouter au moins un membre';
                }
                break;
            case 3:
                if (!appointmentDate) {
                    newErrors.appointmentDate = 'Veuillez sélectionner une date';
                }
                if (selectedSlots.length === 0) {
                    newErrors.selectedSlots = 'Veuillez sélectionner un créneau horaire';
                } else if (selectedSlots.length !== members.length) {
                    newErrors.selectedSlots = `Veuillez sélectionner exactement ${members.length} créneau(x) consécutif(s)`;
                }
                break;
            case 4:
                if (!format) {
                    newErrors.format = 'Veuillez choisir le format de l\'entretien (en ligne ou présentiel)';
                }
                if (!paymentMode) {
                    newErrors.paymentMode = 'Veuillez choisir un mode de paiement (en ligne ou sur place)';
                } else if (paymentMode === 'En ligne' && !payment) {
                    newErrors.payment = 'Veuillez sélectionner un moyen de paiement en ligne';
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateMember = (member: Member): FormErrors => {
        const memberErrors: FormErrors = {};

        if (!member.nom) memberErrors['newMember.nom'] = 'Le nom est requis';
        if (!member.prenom) memberErrors['newMember.prenom'] = 'Le prénom est requis';
        if (!member.nationalite) memberErrors['newMember.nationalite'] = 'La nationalité est requise';
        if (!member.motif) memberErrors['newMember.motif'] = 'Le motif est requis';
        if (!member.email) memberErrors['newMember.email'] = 'L\'email est requis';
        if (!member.prefixe) memberErrors['newMember.prefixe'] = 'Le préfixe téléphone est requis';
        if (!member.telephone) memberErrors['newMember.telephone'] = 'Le téléphone est requis';

        return memberErrors;
    };

    const saveNewMember = (e: React.FormEvent): void => {
        e.preventDefault();
        const memberErrors = validateMember(newMember);

        if (Object.keys(memberErrors).length > 0) {
            setErrors({ ...errors, ...memberErrors });
            return;
        }

        const member: Member = {
            ...newMember,
            id: Date.now(),
            avatar: `https://ui-avatars.com/api/?name=${newMember.prenom}+${newMember.nom}&background=f59e0b&color=ffffff`
        };

        setMembers([...members, member]);
        resetNewMember();
        setErrors({});
    };

    const updateMember = (e: React.FormEvent): void => {
        e.preventDefault();
        const memberErrors = validateMember(newMember);

        if (Object.keys(memberErrors).length > 0) {
            setErrors({ ...errors, ...memberErrors });
            return;
        }

        setMembers(members.map(m => m.id === newMember.id ? { ...newMember } : m));
        resetNewMember();
        setErrors({});
    };

    const editUser = (userId: number): void => {
        const member = members.find(m => m.id === userId);
        if (member) {
            setNewMember({ ...member });
        }
    };

    const removeMember = (userId: number): void => {
        if (confirm('Supprimer ce membre ?')) {
            setMembers(members.filter(m => m.id !== userId));
        }
    };

    const resetNewMember = (): void => {
        setNewMember({
            nom: '',
            prenom: '',
            nationalite: '',
            motif: '',
            dates: '',
            passeport: '',
            email: '',
            prefixe: '',
            telephone: '',
            avatar: ''
        });
    };

    // Fonction pour vérifier si un créneau peut faire partie d'une séquence valide
    const canFormConsecutiveSequence = (targetIndex: number, requiredSlots: number): boolean => {
        if (requiredSlots <= 0 || targetIndex < 0 || targetIndex >= availableSlots.length) return false;

        // Fonction pour vérifier la consécutivité entre deux créneaux
        const areConsecutive = (index1: number, index2: number): boolean => {
            if (Math.abs(index1 - index2) !== 1) return false;

            const slot1 = availableSlots[Math.min(index1, index2)];
            const slot2 = availableSlots[Math.max(index1, index2)];

            const time1 = slot1.heure.split(':').map(Number);
            const time2 = slot2.heure.split(':').map(Number);

            const minutes1 = time1[0] * 60 + time1[1];
            const minutes2 = time2[0] * 60 + time2[1];

            return minutes2 - minutes1 === 30;
        };

        // Tester toutes les positions possibles où le créneau cible peut être inclus
        for (let startPos = Math.max(0, targetIndex - requiredSlots + 1);
            startPos <= Math.min(targetIndex, availableSlots.length - requiredSlots);
            startPos++) {

            let isValidSequence = true;

            // Vérifier si cette séquence est valide
            for (let i = startPos; i < startPos + requiredSlots; i++) {
                const currentSlot = availableSlots[i];

                // Vérifier la disponibilité
                if (!currentSlot.disponible || !currentSlot.sequence_ok) {
                    isValidSequence = false;
                    break;
                }

                // Vérifier la consécutivité avec le créneau suivant
                if (i > startPos && !areConsecutive(i - 1, i)) {
                    isValidSequence = false;
                    break;
                }
            }

            // Si une séquence valide est trouvée et inclut notre créneau cible
            if (isValidSequence && startPos <= targetIndex && targetIndex < startPos + requiredSlots) {
                return true;
            }
        }

        return false;
    };

    const selectSlot = (time: string): void => {
        const slot = availableSlots.find((s: any) => s.heure === time);
        if (!slot || !slot.disponible || !slot.sequence_ok) return;

        const requiredSlots = members.length;
        const startIndex = availableSlots.findIndex((s: any) => s.heure === time);

        if (startIndex === -1) return;

        // Si le créneau est déjà sélectionné, désélectionner tous les créneaux
        if (selectedSlots.includes(time)) {
            setSelectedSlots([]);
            return;
        }

        // Fonction pour vérifier la consécutivité entre deux créneaux
        const areConsecutive = (index1: number, index2: number): boolean => {
            if (Math.abs(index1 - index2) !== 1) return false;

            const slot1 = availableSlots[Math.min(index1, index2)];
            const slot2 = availableSlots[Math.max(index1, index2)];

            const time1 = slot1.heure.split(':').map(Number);
            const time2 = slot2.heure.split(':').map(Number);

            const minutes1 = time1[0] * 60 + time1[1];
            const minutes2 = time2[0] * 60 + time2[1];

            return minutes2 - minutes1 === 30;
        };

        // Trouver la meilleure séquence possible incluant le créneau sélectionné
        const findBestSequence = (): string[] | null => {
            // Tester toutes les positions possibles où le créneau sélectionné peut être inclus
            for (let startPos = Math.max(0, startIndex - requiredSlots + 1);
                startPos <= Math.min(startIndex, availableSlots.length - requiredSlots);
                startPos++) {

                let isValidSequence = true;
                const sequence: string[] = [];

                // Construire et vérifier cette séquence
                for (let i = startPos; i < startPos + requiredSlots; i++) {
                    const currentSlot = availableSlots[i];

                    // Vérifier la disponibilité
                    if (!currentSlot.disponible || !currentSlot.sequence_ok) {
                        isValidSequence = false;
                        break;
                    }

                    // Vérifier la consécutivité avec le créneau suivant
                    if (i > startPos && !areConsecutive(i - 1, i)) {
                        isValidSequence = false;
                        break;
                    }

                    sequence.push(currentSlot.heure);
                }

                // Si cette séquence est valide et inclut notre créneau sélectionné
                if (isValidSequence && sequence.includes(time)) {
                    return sequence;
                }
            }

            return null;
        };

        const bestSequence = findBestSequence();
        if (bestSequence) {
            setSelectedSlots(bestSequence);
        }
    };

    // Fonction pour sauvegarder les données localement en cas d'échec
    const saveAppointmentLocally = (appointmentData: any): void => {
        try {
            const existingAppointments = JSON.parse(localStorage.getItem('pendingAppointments') || '[]');
            const newAppointment = {
                ...appointmentData,
                id: Date.now(),
                status: 'pending',
                localSave: true,
                savedAt: new Date().toISOString()
            };
            existingAppointments.push(newAppointment);
            localStorage.setItem('pendingAppointments', JSON.stringify(existingAppointments));
            console.log('Rendez-vous sauvegardé localement:', newAppointment);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde locale:', error);
        }
    };

    // Envoie d'e-mails aux participants et à l'entreprise via l'API
    const sendEmails = async (appointmentData: Appointment): Promise<boolean> => {
        try {
            const participantEmails = members.map(m => m.email).filter(Boolean);

            const payload = {
                appointment: appointmentData,
                participantEmails,
            };

            return await sendEmailsFromHook(payload);
        } catch (error) {
            console.error('Erreur lors de l\'envoi des e-mails:', error);
            return false;
        }
    };

    const submit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (!validateCurrentStep()) return;

        setLoading(true);

        const appointmentData: Appointment = {
            id: Date.now(),
            visa_type: visaType,
            target_country: targetCountry,
            members: members,
            date: appointmentDate,
            appointment_date: appointmentDate,
            selected_slots: selectedSlots,
            telephone: members[0].telephone,
            notes: '',
            format: format,
            payment_method: payment,
            statut: 'confirmed', // pending, confirmed, cancelled, completed
            created_at: new Date().toISOString(),
        };

        try {
            // Appel API pour créer le rendez-vous
            await createAppointment(appointmentData);


            // Tenter d'envoyer les e-mails aux participants et à l'entreprise
            const emailsSent = await sendEmails(appointmentData);

            if (!emailsSent) {
                // Si l'envoi des e-mails a échoué, sauvegarder localement comme mesure de secours
                // saveAppointmentLocally({ ...appointmentData, serverResult: null });
                setErrors({ submit: 'Le rendez-vous a été créé, mais l\'envoi des e-mails a échoué. Les données ont été sauvegardées localement.' });
            } else {
                setErrors({});
            }

            setSubmitted(true);

            // Redirection après succès (même si les e-mails ont échoué on redirige après avoir sauvegardé localement)
            setTimeout(() => {
                navigate('/appointments');
            }, 3000);

        } catch (error) {

            let errorMessage = 'Erreur lors de l\'envoi de la demande';
            let shouldSaveLocally = false;

            if (error instanceof Error) {
                if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
                    errorMessage = 'Erreur de connexion. Le rendez-vous a été sauvegardé localement et sera envoyé automatiquement lors de la prochaine connexion.';
                    shouldSaveLocally = true;
                } else if (error.message.includes('422')) {
                    errorMessage = 'Données invalides. Veuillez vérifier vos informations.';
                } else if (error.message.includes('401')) {
                    errorMessage = 'Session expirée. Veuillez vous reconnecter.';
                } else if (error.message.includes('500')) {
                    errorMessage = 'Erreur serveur. Le rendez-vous a été sauvegardé localement.';
                    shouldSaveLocally = true;
                } else {
                    errorMessage = error.message;
                }
            }

            // Sauvegarder localement en cas d'erreur réseau ou serveur
            if (shouldSaveLocally) {
                saveAppointmentLocally(appointmentData);
                setSubmitted(true);
                setTimeout(() => {
                    navigate('/appointments');
                }, 3000);
            } else {
                setErrors({ submit: errorMessage });
            }
        } finally {
            setLoading(false);
        }
    };





    const steps = [
        { num: 1, label: 'Visa' },
        { num: 2, label: 'Membres' },
        { num: 3, label: 'Créneau' },
        { num: 4, label: 'Paiement' },
    ];

    const renderStepIndicator = () => (
        <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2 sm:gap-3">
                {steps.map((s, i) => (
                    <React.Fragment key={s.num}>
                        <div className="flex flex-col items-center gap-1">
                            <span
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s.num ? 'bg-amber-500 text-white shadow' : 'bg-gray-200 text-gray-500'}`}
                            >
                                {step > s.num ? <i className="fas fa-check text-xs"></i> : s.num}
                            </span>
                            <span className={`text-[11px] sm:text-xs font-medium ${step >= s.num ? 'text-amber-600' : 'text-gray-400'}`}>
                                {s.label}
                            </span>
                        </div>
                        {i < steps.length - 1 && (
                            <span className={`h-0.5 w-6 sm:w-12 rounded mb-5 transition-all ${step > s.num ? 'bg-amber-500' : 'bg-gray-200'}`}></span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );

    const renderLoadingOverlay = () => (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <i className="fas fa-spinner text-amber-600 text-xl animate-pulse"></i>
                </div>
            </div>
            <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-amber-700 mb-2">Chargement en cours...</h3>
                <p className="text-amber-600">Veuillez patienter pendant le traitement</p>
            </div>
        </div>
    );

    const renderStep1 = () => (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 sm:flex gap-5 justify-center items-start">
                <span className="inline-flex items-center justify-center w-12 h-12 bg-ink rounded-2xl ">
                    <i className="fas fa-passport text-xl text-white "></i>
                </span>
                <div className='flex flex-col sm:items-start'>
                    <h2 className="text-xl font-extrabold text-gray-800">Informations sur votre visa</h2>
                    <p className="text-gray-600">Sélectionnez le type de visa et le pays de destination</p>
                </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="visaType" className="block text-sm font-semibold text-gray-700">
                        <i className="fas fa-file-alt text-amber-500 mr-2"></i>
                        Type de visa souhaité
                    </label>
                    <div className="relative">
                        <select
                            id="visaType"
                            value={visaType}
                            onChange={(e) => setVisaType(e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-200 bg-white appearance-none cursor-pointer"
                        >
                            <option value="">Sélectionnez un type de visa</option>
                            {visaTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <i className="fas fa-chevron-down text-gray-400"></i>
                        </div>
                    </div>
                    {errors.visaType && (
                        <div className="flex items-center text-red-500 text-sm mt-1">
                            <i className="fas fa-exclamation-circle mr-2"></i>
                            {errors.visaType}
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="targetCountry" className="block text-sm font-semibold text-gray-700">
                        <i className="fas fa-globe text-amber-500 mr-2"></i>
                        Pays de destination
                    </label>
                    <div className="relative">
                        <select
                            id="targetCountry"
                            value={targetCountry}
                            onChange={(e) => setTargetCountry(e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-200 bg-white appearance-none cursor-pointer"
                        >
                            <option value="">Sélectionnez un pays de destination</option>
                            {targetCountries.map(country => (
                                <option key={country.value} value={country.value}>{country.value}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <i className="fas fa-chevron-down text-gray-400"></i>
                        </div>
                    </div>
                    {errors.targetCountry && (
                        <div className="flex items-center text-red-500 text-sm mt-1">
                            <i className="fas fa-exclamation-circle mr-2"></i>
                            {errors.targetCountry}
                        </div>
                    )}
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="btn-primary w-full"
                        >
                        <span>Continuer</span>
                        <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </form>
        </div>
    );

    const renderStep2 = () => (
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-4 sm:flex justify-center items-start gap-5">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-ink rounded-2xl">
                    <i className="fas fa-users text-xl text-white"></i>
                </div>
                <div className='flex flex-col sm:items-start'>
                    <h2 className="text-xl font-extrabold text-gray-800">Gestion des membres</h2>
                    <p className="text-gray-600">Ajoutez les personnes qui voyageront avec vous</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 relative">
                {/* Section des utilisateurs enregistrés */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 w-full sm:w-64 lg:w-72 sm:flex-shrink-0 p-3 rounded-2xl border border-amber-200 shadow-lg">

                    <button
                        type="button"
                        onClick={() => setShowMobileForm(true)}
                        className="bg-amber-100  sm:hidden mb-3 w-full border-2 border-amber-700/60 text-amber-700 font-semibold py-3 px-4 rounded-lg hover:bg-amber-200 transition-all duration-200 flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        <i className="fas fa-user-plus mr-3 text-lg"></i>
                        <span>Ajouter un membre</span>
                        {/* <i className="fas fa-undo ml-2 text-xs"></i> */}
                    </button>
                    {members.length > 0 ? (
                        <div className="flex flex-col ">
                            {members.map((user, index) => (
                                <div key={user.id}>
                                    <div
                                        className="bg-white p-2 rounded-lg border w-full border-amber-200 hover:shadow-md hover:border-amber-300 transition-all duration-200 relative group cursor-pointer"
                                        onClick={() => {editUser(user.id!);setShowMobileForm(true)}}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <div className="relative">
                                                <img
                                                    src={user.avatar}
                                                    alt={`${user.prenom} ${user.nom}`}
                                                    className="w-8 h-8 rounded-full border border-amber-200"
                                                />
                                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></div>
                                            </div>
                                            <div className="">
                                                <h3 className="font-semibold text-gray-900 text-xs mb-0.5">{user.prenom} {user.nom}</h3>
                                                <p className="text-[10px] text-gray-600 mb-1 flex items-center">
                                                    <i className="fas fa-phone text-amber-500 mr-1 text-[10px]"></i>
                                                    {user.prefixe}{user.telephone}
                                                </p>
                                                <span className="inline-block mx-auro px-2 py-0.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-[10px] rounded-full font-medium">
                                                    {user.nationalite}
                                                </span>
                                            </div>
                                            <div className='flex-1'></div>
                                            <div className="flex flex-col gap-1">
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); editUser(user.id!);setShowMobileForm(true) }}
                                                    className="w-6 h-6 bg-amber-100 text-amber-600 rounded-md hover:bg-amber-200 transition-colors flex items-center justify-center"
                                                    title="Modifier"
                                                >
                                                    <i className="fas fa-edit text-[10px]"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); removeMember(user.id!); }}
                                                    className="w-6 h-6 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors flex items-center justify-center"
                                                    title="Supprimer"
                                                >
                                                    <i className="fas fa-trash text-[10px]"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {index < members.length - 1 && (
                                        <div className="flex justify-center py-1 my-0.5">
                                            <div className="w-1 h-1 bg-amber-200 rounded-full flex items-center justify-center">
                                                <i className="fas fa-plus text-amber-600 text-[10px]"></i>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-user-plus text-2xl text-amber-600"></i>
                            </div>
                            <p className="text-amber-700 font-medium mb-2">Aucun membre ajouté</p>
                            <p className="text-amber-600 text-sm">Les membres seront affichés ici</p>
                        </div>
                    )}
                </div>

                {/* Section du formulaire principal */}
                <div className="hidden sm:block flex-1 min-w-0 bg-white p-4 rounded-2xl border border-slate-200 shadow-lg">


                    <form
                        onSubmit={newMember.id ? updateMember : saveNewMember}
                        className="flex flex-col w-full gap-5 rounded-xl"
                    >
                    <div className="flex flex-wrap gap-2 items-center bg-gray-100 border border-gray-200 rounded-xl p-2 pl-5 ">
                        <div className="mx-1 ">
                            <h3 className="text-sm md:text-sm font-semibold text-gray-800 mb-1 flex items-center">
                                <i className="fas fa-user-plus mr-2 text-amber-600 text-[10px]"></i>
                                {newMember.id ? 'Modifier le membre' : 'Ajouter un membre'}
                            </h3>

                {errors.members && <div className="text-red-500 text-xs">{errors.members}</div>}
                            {/* <p className="text-gray-600 text-xs hidden md:block">
                                Veuillez renseigner soigneusement les informations du voyageur ci-dessous.
                            </p> */}
                        </div>
                        <div className='flex-1'></div>
                        <button
                            type="submit"
                            className="inline-flex bg-ink text-paper font-semibold py-3 px-4 rounded-lg hover:bg-ink-2 transition-all duration-200 shadow items-center text-sm focus:outline-none focus:ring-2 focus:ring-amber/40"
                        >
                            <i className="fas fa-save mr-3 text-lg"></i>
                            {newMember.id ? (
                                <>
                                    <span className='text-nowrap'>Mettre à jour</span>
                                    {/* <i className="fas fa-sync-alt ml-2 text-xs"></i> */}
                                </>
                            ) : (
                                <>
                                    <span>Ajouter</span>
                                    {/* <i className="fas fa-user-plus ml-2 text-xs"></i> */}
                                </>
                            )}
                        </button>
                        {newMember.id && (
                            <button
                                type="button"
                                onClick={resetNewMember}
                                className="bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                <i className="fas fa-times mr-3 text-lg"></i>
                                <span>Annuler</span>
                                {/* <i className="fas fa-undo ml-2 text-xs"></i> */}
                            </button>
                        )}

                    </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <i className="fas fa-user text-amber-500 mr-2"></i>
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    value={newMember.nom}
                                    onChange={(e) => setNewMember({ ...newMember, nom: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-white text-base"
                                    placeholder="Nom de famille"
                                />
                                {errors['newMember.nom'] && (
                                    <div className="flex items-center text-red-500 text-sm">
                                        <i className="fas fa-exclamation-circle mr-2"></i>
                                        {errors['newMember.nom']}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <i className="fas fa-user text-amber-500 mr-2"></i>
                                    Prénom(s)
                                </label>
                                <input
                                    type="text"
                                    value={newMember.prenom}
                                    onChange={(e) => setNewMember({ ...newMember, prenom: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-white text-base"
                                    placeholder="Prénom(s)"
                                />
                                {errors['newMember.prenom'] && (
                                    <div className="flex items-center text-red-500 text-sm">
                                        <i className="fas fa-exclamation-circle mr-2"></i>
                                        {errors['newMember.prenom']}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <i className="fas fa-flag text-amber-500 mr-2"></i>
                                    Nationalité
                                </label>
                                <div className="relative">
                                    <select
                                        value={newMember.nationalite}
                                        onChange={(e) => setNewMember({ ...newMember, nationalite: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-white appearance-none cursor-pointer text-base"
                                    >
                                        <option value="">Nationalité</option>
                                        {nationalities.map(nat => (
                                            <option key={nat} value={nat}>{nat}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <i className="fas fa-chevron-down text-gray-400 text-base"></i>
                                    </div>
                                </div>
                                {errors['newMember.nationalite'] && (
                                    <div className="flex items-center text-red-500 text-sm">
                                        <i className="fas fa-exclamation-circle mr-2"></i>
                                        {errors['newMember.nationalite']}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <i className="fas fa-plane text-amber-500 mr-2"></i>
                                    Motif du voyage
                                </label>
                                <input
                                    type="text"
                                    value={newMember.motif}
                                    onChange={(e) => setNewMember({ ...newMember, motif: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-white text-base"
                                    placeholder="Tourisme, Affaires, Études..."
                                />
                                {errors['newMember.motif'] && (
                                    <div className="flex items-center text-red-500 text-sm">
                                        <i className="fas fa-exclamation-circle mr-2"></i>
                                        {errors['newMember.motif']}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <i className="fas fa-calendar text-amber-500 mr-2"></i>
                                    Date de voyage
                                </label>
                                <input
                                    type="date"
                                    value={newMember.dates || ''}
                                    onChange={(e) => setNewMember({ ...newMember, dates: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-white text-base"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <i className="fas fa-passport text-amber-500 mr-2"></i>
                                    Passeport (optionnel)
                                </label>
                                <input
                                    type="text"
                                    value={newMember.passeport || ''}
                                    onChange={(e) => setNewMember({ ...newMember, passeport: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-white text-base"
                                    placeholder="N° passeport"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <i className="fas fa-envelope text-amber-500 mr-2"></i>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={newMember.email}
                                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-white text-base"
                                    placeholder="exemple@email.com"
                                />
                                {errors['newMember.email'] && (
                                    <div className="flex items-center text-red-500 text-sm">
                                        <i className="fas fa-exclamation-circle mr-2"></i>
                                        {errors['newMember.email']}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <i className="fas fa-phone text-amber-500 mr-2"></i>
                                    Téléphone
                                </label>
                                <div className="flex gap-2">
                                    <div className="relative w-1/2">
                                        <select
                                            value={newMember.prefixe}
                                            onChange={(e) => setNewMember({ ...newMember, prefixe: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-gray-50 appearance-none cursor-pointer text-base"
                                        >
                                            <option value="">Code</option>
                                            <option value="+225">+225 (CI)</option>
                                            <option value="+223">+223 (ML)</option>
                                            <option value="+226">+226 (BF)</option>
                                            <option value="+221">+221 (SN)</option>
                                            <option value="+233">+233 (GH)</option>
                                            <option value="+227">+227 (NE)</option>
                                            <option value="+228">+228 (TG)</option>
                                            <option value="+229">+229 (BJ)</option>
                                            <option value="+224">+224 (GN)</option>
                                            <option value="+33">+33 (FR)</option>
                                            <option value="+1">+1 (US/CA)</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <i className="fas fa-chevron-down text-gray-400 text-base"></i>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        value={newMember.telephone}
                                        onChange={(e) => setNewMember({ ...newMember, telephone: e.target.value })}
                                        required
                                        className="px-4 py-3 border w-1/2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-white text-base"
                                        placeholder="0123456789"
                                    />
                                </div>
                                {errors['newMember.telephone'] && (
                                    <div className="flex items-center text-red-500 text-sm">
                                        <i className="fas fa-exclamation-circle mr-2"></i>
                                        {errors['newMember.telephone']}
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Bouton flottant pour mobile */}
                {/* <div className="sm:hidden fixed bottom-4 right-4 z-50">
                    <button
                        type="button"
                        onClick={() => setShowMobileForm(true)}
                        className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                    >
                        <i className="fas fa-user-plus text-xl"></i>
                    </button>
                </div> */}

                {/* Modal flottant pour mobile */}
                {showMobileForm && (
                    <div className="sm:hidden fixed inset-0 bg-black/0 bg-opacity-50 z-50 flex items-start">
                        <div className="bg-white rounded-3xl w-full h-full p-4 overflow-y-auto animate-slide-up">
                            {/* <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                    <i className="fas fa-user-plus mr-2 text-amber-600"></i>
                                    {newMember.id ? 'Modifier le membre' : 'Ajouter un membre'}
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setShowMobileForm(false)}
                                    className="text-gray-500 hover:text-gray-700 p-2"
                                >
                                    <i className="fas fa-times text-xl"></i>
                                </button>
                            </div> */}

                            <form
                                onSubmit={(e) => {
                                    if (newMember.id) {
                                        updateMember(e);
                                    } else {
                                        saveNewMember(e);
                                    }
                                    setShowMobileForm(false);
                                }}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                                            <i className="fas fa-user text-amber-500 mr-2"></i>
                                            Nom
                                        </label>
                                        <input
                                            type="text"
                                            value={newMember.nom}
                                            onChange={(e) => setNewMember({ ...newMember, nom: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-white text-base"
                                            placeholder="Nom de famille"
                                        />
                                        {errors['newMember.nom'] && (
                                            <div className="flex items-center text-red-500 text-sm">
                                                <i className="fas fa-exclamation-circle mr-2"></i>
                                                {errors['newMember.nom']}
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                                            <i className="fas fa-user text-amber-500 mr-2"></i>
                                            Prénom(s)
                                        </label>
                                        <input
                                            type="text"
                                            value={newMember.prenom}
                                            onChange={(e) => setNewMember({ ...newMember, prenom: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-white text-base"
                                            placeholder="Prénom(s)"
                                        />
                                        {errors['newMember.prenom'] && (
                                            <div className="flex items-center text-red-500 text-sm">
                                                <i className="fas fa-exclamation-circle mr-2"></i>
                                                {errors['newMember.prenom']}
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                                            <i className="fas fa-flag text-amber-500 mr-2"></i>
                                            Nationalité
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={newMember.nationalite}
                                                onChange={(e) => setNewMember({ ...newMember, nationalite: e.target.value })}
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-white appearance-none cursor-pointer text-base"
                                            >
                                                <option value="">Nationalité</option>
                                                {nationalities.map(nat => (
                                                    <option key={nat} value={nat}>{nat}</option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <i className="fas fa-chevron-down text-gray-400 text-base"></i>
                                            </div>
                                        </div>
                                        {errors['newMember.nationalite'] && (
                                            <div className="flex items-center text-red-500 text-sm">
                                                <i className="fas fa-exclamation-circle mr-2"></i>
                                                {errors['newMember.nationalite']}
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                                            <i className="fas fa-calendar text-amber-500 mr-2"></i>
                                            Date de voyage
                                        </label>
                                        <input
                                            type="date"
                                            value={newMember.dates || ''}
                                            onChange={(e) => setNewMember({ ...newMember, dates: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-white text-base"
                                        />
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                                            <i className="fas fa-plane text-amber-500 mr-2"></i>
                                            Motif du voyage
                                        </label>
                                        <input
                                            type="text"
                                            value={newMember.motif}
                                            onChange={(e) => setNewMember({ ...newMember, motif: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-white text-base"
                                            placeholder="Tourisme, Affaires, Études..."
                                        />
                                        {errors['newMember.motif'] && (
                                            <div className="flex items-center text-red-500 text-sm">
                                                <i className="fas fa-exclamation-circle mr-2"></i>
                                                {errors['newMember.motif']}
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                                            <i className="fas fa-passport text-amber-500 mr-2"></i>
                                            Passeport (optionnel)
                                        </label>
                                        <input
                                            type="text"
                                            value={newMember.passeport || ''}
                                            onChange={(e) => setNewMember({ ...newMember, passeport: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-white text-base"
                                            placeholder="N° passeport"
                                        />
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                                            <i className="fas fa-envelope text-amber-500 mr-2"></i>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={newMember.email}
                                            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-white text-base"
                                            placeholder="exemple@email.com"
                                        />
                                        {errors['newMember.email'] && (
                                            <div className="flex items-center text-red-500 text-sm">
                                                <i className="fas fa-exclamation-circle mr-2"></i>
                                                {errors['newMember.email']}
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                                            <i className="fas fa-phone text-amber-500 mr-2"></i>
                                            Téléphone
                                        </label>
                                        <div className="flex gap-2">
                                            <div className="relative w-1/2">
                                                <select
                                                    value={newMember.prefixe}
                                                    onChange={(e) => setNewMember({ ...newMember, prefixe: e.target.value })}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-gray-50 appearance-none cursor-pointer text-base"
                                                >
                                                    <option value="">Code</option>
                                                    <option value="+225">+225 (CI)</option>
                                                    <option value="+223">+223 (ML)</option>
                                                    <option value="+226">+226 (BF)</option>
                                                    <option value="+221">+221 (SN)</option>
                                                    <option value="+233">+233 (GH)</option>
                                                    <option value="+227">+227 (NE)</option>
                                                    <option value="+228">+228 (TG)</option>
                                                    <option value="+229">+229 (BJ)</option>
                                                    <option value="+224">+224 (GN)</option>
                                                    <option value="+33">+33 (FR)</option>
                                                    <option value="+1">+1 (US/CA)</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    <i className="fas fa-chevron-down text-gray-400 text-base"></i>
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                value={newMember.telephone}
                                                onChange={(e) => setNewMember({ ...newMember, telephone: e.target.value })}
                                                required
                                                className="px-4 py-3 border w-1/2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 bg-white text-base"
                                                placeholder="0123456789"
                                            />
                                        </div>
                                        {errors['newMember.telephone'] && (
                                            <div className="flex items-center text-red-500 text-sm">
                                                <i className="fas fa-exclamation-circle mr-2"></i>
                                                {errors['newMember.telephone']}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => {setShowMobileForm(false); resetNewMember()}}
                                        className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center justify-center text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    >
                                        <i className="fas fa-times mr-2"></i>
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-ink text-paper font-semibold py-3 px-4 rounded-lg hover:bg-ink-2 transition-all duration-200 shadow flex items-center justify-center text-sm focus:outline-none focus:ring-2 focus:ring-amber/40"
                                    >
                                        <i className="fas fa-save mr-2"></i>
                                        {newMember.id ? 'Mettre à jour' : 'Ajouter'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
                {/* {errors.members && <div className="text-red-500 text-sm mt-2">{errors.members}</div>} */}
            <div className="flex flex-col sm:flex-row w-full justify-between gap-1 sm:gap-5 my-4">
                <button
                    type="button"
                    onClick={prevStep}
                    className="btn-ghost w-full"
                >
                    <i className="fas fa-arrow-left mr-2"></i>Retour
                </button>
                <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary w-full"
                >
                    <span>Suivant</span>
                    <i className="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="max-w-2xl mx-auto">

            {/* Header */}
            <div className="text-center mb-6 sm:flex justify-center items-start gap-5">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-ink rounded-2xl ">
                    <i className="fas fa-clock text-xl text-white"></i>
                </div>
                <div className="flex flex-col sm:items-start">
                    <h2 className="text-xl font-extrabold text-gray-800 ">Sélection des créneaux</h2>
                    <p className="text-gray-600 text-xs">Choisissez la date et l'heure de votre rendez-vous</p>
                </div>
            </div>

            {/* Date Picker */}
            <div className="mx-auto ">
                <label className="text-xs sm:text-md font-semibold text-amber-700 flex items-center mb-2">
                    <i className="fas fa-calendar mr-2"></i>
                    Date souhaitée <span className="ml-2 text-[10px] sm:text-sm text-gray-500">({appointmentDate ? UtilityController.formatDate(appointmentDate) : 'Non sélectionnée'})</span>
                </label>
                <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => {
                        setAppointmentDate(e.target.value);
                        setSelectedSlots([]); // Réinitialiser les créneaux sélectionnés
                    }}
                    min={minDate}
                    max={maxDate}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-200 bg-white"
                />
            </div>

            {/* Slots */}
            <div className="mt-4">
                {slotsLoad ? (
                    renderLoadingOverlay()
                ) : (
                    <div className="space-y-4">

                        {/* Créneaux du matin */}
                        <div>
                            <div className="mb-2 text-xs sm:text-md font-semibold text-amber-700 flex items-center">
                                <i className="fas fa-sun mr-2"></i>
                                Créneaux du matin <span className="ml-2 text-[10px] sm:text-sm text-gray-500">(9h00 - 12h30)</span>
                            </div>
                            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 shadow-md">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                    {availableSlots.filter((slot: any) => {
                                        const hour = parseInt(slot.heure.split(':')[0]);
                                        return hour >= 9 && hour < 13;
                                    }).map((slot: any) => {
                                        const originalIndex = availableSlots.findIndex((s: any) => s.heure === slot.heure);
                                        const isTaken = !slot.disponible;
                                        const requiredSlots = members.length;

                                        const canSelectConsecutive = !isTaken && slot.sequence_ok &&
                                            canFormConsecutiveSequence(originalIndex, requiredSlots);

                                        const isSelected = selectedSlots.includes(slot.heure);
                                        const isPartOfSelection = selectedSlots.length > 0 && selectedSlots.includes(slot.heure);

                                        return (
                                            <button
                                                key={slot.heure}
                                                type="button"
                                                onClick={() => selectSlot(slot.heure)}
                                                disabled={!canSelectConsecutive}
                                                className={`p-2 border rounded-lg transition-all duration-300 transform hover:scale-105 text-xs ${
                                                    isPartOfSelection
                                                        ? 'bg-amber-500 text-white border-amber-600 shadow-xl'
                                                        : canSelectConsecutive
                                                            ? 'bg-white hover:bg-amber-100 border-gray-300 hover:border-amber-400 hover:shadow-lg'
                                                            : 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'
                                                }`}
                                            >
                                                <div className="text-center">
                                                    <div className="font-bold text-xs mb-1">
                                                        {slot.heure} - {UtilityController.addMinutes(slot.heure, 30)}
                                                    </div>
                                                    <div className="text-[10px]">
                                                        {isTaken ? (
                                                            <span className="inline-block px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium">
                                                                <i className="fas fa-times mr-1"></i>Complet ({slot.occupation}/5)
                                                            </span>
                                                        ) : !slot.sequence_ok ? (
                                                            <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                                                <i className="fas fa-exclamation-triangle mr-1"></i>Séquence insuffisante
                                                            </span>
                                                        ) : !canSelectConsecutive ? (
                                                            <span className="inline-block px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full font-medium">
                                                                <i className="fas fa-ban mr-1"></i>Aucune succession possible
                                                            </span>
                                                        ) : (
                                                            <span className={`inline-block px-2 py-0.5 rounded-full font-medium ${
                                                                isPartOfSelection
                                                                    ? 'bg-amber-300 text-amber-800'
                                                                    : 'bg-green-100 text-green-700'
                                                            }`}>
                                                                <i className="fas fa-check mr-1"></i>Disponible ({slot.occupation}/5)
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Créneaux de l'après-midi */}
                        <div>
                            <div className="mb-2 text-xs sm:text-md font-semibold text-orange-700 flex items-center">
                                <i className="fas fa-cloud-sun mr-2"></i>
                                Créneaux de l'après-midi <span className="ml-2 text-[10px] sm:text-sm text-gray-500">(14h30 - 16h30)</span>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 shadow-md">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                    {availableSlots.filter((slot: any) => {
                                        const hour = parseInt(slot.heure.split(':')[0]);
                                        return hour >= 14;
                                    }).map((slot: any) => {
                                        const originalIndex = availableSlots.findIndex((s: any) => s.heure === slot.heure);
                                        const isTaken = !slot.disponible;
                                        const requiredSlots = members.length;

                                        const canSelectConsecutive = !isTaken && slot.sequence_ok &&
                                            canFormConsecutiveSequence(originalIndex, requiredSlots);

                                        const isSelected = selectedSlots.includes(slot.heure);
                                        const isPartOfSelection = selectedSlots.length > 0 && selectedSlots.includes(slot.heure);

                                        return (
                                            <button
                                                key={slot.heure}
                                                type="button"
                                                onClick={() => selectSlot(slot.heure)}
                                                disabled={!canSelectConsecutive}
                                                className={`p-2 border rounded-lg transition-all duration-300 transform hover:scale-105 text-xs ${
                                                    isPartOfSelection
                                                        ? 'bg-orange-500 text-white border-orange-600 shadow-xl'
                                                        : canSelectConsecutive
                                                            ? 'bg-white hover:bg-orange-100 border-gray-300 hover:border-orange-400 hover:shadow-lg'
                                                            : 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'
                                                }`}
                                            >
                                                <div className="text-center">
                                                    <div className="font-bold text-xs mb-1">
                                                        {slot.heure} - {UtilityController.addMinutes(slot.heure, 30)}
                                                    </div>
                                                    <div className="text-[10px]">
                                                        {isTaken ? (
                                                            <span className="inline-block px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium">
                                                                <i className="fas fa-times mr-1"></i>Complet ({slot.occupation}/5)
                                                            </span>
                                                        ) : !slot.sequence_ok ? (
                                                            <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                                                <i className="fas fa-exclamation-triangle mr-1"></i>Séquence insuffisante
                                                            </span>
                                                        ) : !canSelectConsecutive ? (
                                                            <span className="inline-block px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full font-medium">
                                                                <i className="fas fa-ban mr-1"></i>Aucune succession possible
                                                            </span>
                                                        ) : (
                                                            <span className={`inline-block px-2 py-0.5 rounded-full font-medium ${
                                                                isPartOfSelection
                                                                    ? 'bg-amber-300 text-amber-800'
                                                                    : 'bg-green-100 text-green-700'
                                                            }`}>
                                                                <i className="fas fa-check mr-1"></i>Disponible ({slot.occupation}/5)
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>


            {/* Navigation Buttons */}

            {errors.selectedSlots && <div className="text-red-500 text-sm mt-2">{errors.selectedSlots}</div>}
            <div className="flex flex-col sm:flex-row w-full justify-between gap-1 sm:gap-5 my-4">
                <button
                    type="button"
                    onClick={prevStep}
                    className="btn-ghost w-full"
                >
                    <i className="fas fa-arrow-left mr-2"></i>Retour
                </button>
                <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary w-full"
                >
                    <span>Suivant</span>
                    <i className="fas fa-arrow-right ml-2"></i>
                </button>
            </div>

            {/* Légende des créneaux */}
            <div className="mt-4 p-3 bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl border border-slate-200 shadow-lg">
                <h3 className="text-base font-bold text-gray-800 mb-2 ml-2 flex items-center">
                    <i className="fas fa-info-circle text-amber-600 mr-3"></i>
                    Légende des créneaux
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
                    <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-green-200">
                        <div className="w-5 h-5 bg-green-100 border-2 border-green-300 rounded-full flex items-center justify-center">
                            <i className="fas fa-check text-green-600 text-xs"></i>
                        </div>
                        <span className="text-xs font-medium text-gray-700">Créneau disponible</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-amber-200">
                        <div className="w-5 h-5 bg-ink rounded-2xl flex items-center justify-center">
                            <i className="fas fa-check text-white text-xs"></i>
                        </div>
                        <span className="text-xs font-medium text-gray-700">Créneau sélectionné</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-red-200">
                        <div className="w-5 h-5 bg-red-100 border-2 border-red-300 rounded-full flex items-center justify-center">
                            <i className="fas fa-times text-red-600 text-xs"></i>
                        </div>
                        <span className="text-xs font-medium text-gray-700">Créneau complet</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-orange-200">
                        <div className="w-5 h-5 bg-orange-100 border-2 border-orange-300 rounded-full flex items-center justify-center">
                            <i className="fas fa-ban text-orange-600 text-xs"></i>
                        </div>
                        <span className="text-xs font-medium text-gray-700">Aucune succession possible</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl border border-blue-200">
                        <i className="fas fa-info-circle text-blue-600 mt-1 text-xs"></i>
                        <div>
                            <p className="text-xs font-medium text-blue-800 mb-1">Information importante</p>
                            <p className="text-xs text-blue-700">
                                Sélectionnez un créneau pour réserver automatiquement <span className="font-semibold">{members.length}</span> créneau(x) successif(s) de 30 minutes chacun pour <span className="font-semibold">{members.length}</span> membre(s).
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
                        <i className="fas fa-arrows-alt text-amber-600 mt-1 text-xs"></i>
                        <div>
                            <p className="text-xs font-medium text-amber-800 mb-1">Organisation des créneaux</p>
                            <p className="text-xs text-amber-700">
                                Les créneaux peuvent être organisés : vers l'avant, vers l'arrière, ou centrés autour du créneau sélectionné.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 bg-green-50 rounded-xl border border-green-200">
                        <i className="fas fa-lightbulb text-green-600 mt-1 text-xs"></i>
                        <div>
                            <p className="text-xs font-medium text-green-800 mb-1">Exemple pour 3 membres</p>
                            <p className="text-xs text-green-700">
                                10h00→10h30→11h00 ou 09h30→10h00→10h30 ou 10h00→10h30→11h00
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-ink rounded-2xl mb-4">
                    <i className="fas fa-credit-card text-xl text-white"></i>
                </div>
                <h2 className="text-xl font-extrabold text-gray-800 mb-2">Format & paiement</h2>
                <p className="text-gray-600 text-xs">Choisissez le format de l'entretien et votre mode de paiement (en ligne ou sur place)</p>
            </div>

            {/* Montant des frais — tarif unique et obligatoire */}
            <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-white">
                        <i className="fas fa-receipt"></i>
                    </span>
                    <div>
                        <p className="text-xs font-medium text-amber-700">Frais d'entretien (tarif unique et obligatoire)</p>
                        <p className="text-2xl font-extrabold text-ink">{UtilityController.formatFcfa(appointmentFee)}</p>
                    </div>
                </div>
                <span className="hidden sm:inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                    Durée min. 30 min
                </span>
            </div>

            <form onSubmit={submit} className="space-y-6">
                {/* Format de l'entretien : au choix du candidat */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        <i className="fas fa-video text-amber-500 mr-2"></i>
                        Format de l'entretien
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {appointmentFormats.map((opt) => {
                            const active = format === opt;
                            return (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setFormat(opt)}
                                    className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${active ? 'border-amber-500 bg-amber-50 shadow' : 'border-gray-200 bg-white hover:border-amber-300'}`}
                                >
                                    <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${active ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <i className={`fas ${opt === 'En ligne' ? 'fa-laptop' : 'fa-building'}`}></i>
                                    </span>
                                    <span className="font-semibold text-gray-800">{opt}</span>
                                    {active && <i className="fas fa-check-circle ml-auto text-amber-500"></i>}
                                </button>
                            );
                        })}
                    </div>
                    {errors.format && (
                        <div className="flex items-center text-red-500 text-sm mt-1">
                            <i className="fas fa-exclamation-circle mr-2"></i>
                            {errors.format}
                        </div>
                    )}
                </div>

                {/* Mode de paiement : en ligne ou sur place (au choix du candidat) */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        <i className="fas fa-wallet text-amber-500 mr-2"></i>
                        Mode de paiement
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {paymentModes.map((mode) => {
                            const active = paymentMode === mode.value;
                            return (
                                <button
                                    key={mode.value}
                                    type="button"
                                    onClick={() => {
                                        setPaymentMode(mode.value);
                                        // En présentiel, le moyen est fixé ; en ligne, on laisse choisir.
                                        setPayment(mode.value === 'Sur place' ? onsitePaymentMethod : '');
                                    }}
                                    className={`flex items-start gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${active ? 'border-amber-500 bg-amber-50 shadow' : 'border-gray-200 bg-white hover:border-amber-300'}`}
                                >
                                    <span className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${active ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <i className={`fas ${mode.icon}`}></i>
                                    </span>
                                    <span className="flex flex-col">
                                        <span className="font-semibold text-gray-800">{mode.label}</span>
                                        <span className="text-xs text-gray-500">{mode.description}</span>
                                    </span>
                                    {active && <i className="fas fa-check-circle ml-auto text-amber-500"></i>}
                                </button>
                            );
                        })}
                    </div>
                    {errors.paymentMode && (
                        <div className="flex items-center text-red-500 text-sm mt-1">
                            <i className="fas fa-exclamation-circle mr-2"></i>
                            {errors.paymentMode}
                        </div>
                    )}
                </div>

                {/* Paiement en ligne : choix du moyen */}
                {paymentMode === 'En ligne' && (
                    <div className="space-y-2">
                        <label htmlFor="payment" className="block text-sm font-semibold text-gray-700">
                            <i className="fas fa-credit-card text-amber-500 mr-2"></i>
                            Moyen de paiement en ligne
                        </label>
                        <div className="relative">
                            <select
                                id="payment"
                                value={payment}
                                onChange={(e) => setPayment(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-200 bg-white appearance-none cursor-pointer"
                            >
                                <option value="">Sélectionnez un moyen de paiement</option>
                                {paymentMethods.map(method => (
                                    <option key={method} value={method}>{method}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <i className="fas fa-chevron-down text-gray-400"></i>
                            </div>
                        </div>
                        {errors.payment && (
                            <div className="flex items-center text-red-500 text-sm mt-1">
                                <i className="fas fa-exclamation-circle mr-2"></i>
                                {errors.payment}
                            </div>
                        )}
                    </div>
                )}

                {/* Mentions obligatoires (modalités de paiement) */}
                <div className="space-y-2">
                    {paymentMode === 'Sur place' ? (
                        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
                            <i className="fas fa-store mt-0.5 text-amber-600 text-xs"></i>
                            <p className="text-xs text-amber-800">
                                Le règlement se fait <span className="font-semibold">en espèces à l'agence</span>, avant le début de l'entretien. Votre rendez-vous n'est définitivement confirmé qu'une fois le paiement effectué.
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-start gap-2 rounded-xl border border-blue-200 bg-blue-50 p-3">
                            <i className="fas fa-shield-halved mt-0.5 text-blue-600 text-xs"></i>
                            <p className="text-xs text-blue-800">
                                Le paiement en ligne s'effectue <span className="font-semibold">au préalable</span>, de manière 100 % sécurisée.
                            </p>
                        </div>
                    )}
                    <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3">
                        <i className="fas fa-circle-exclamation mt-0.5 text-red-600 text-xs"></i>
                        <p className="text-xs text-red-800">
                            Les frais d'entretien <span className="font-semibold">ne sont pas remboursables</span>.
                        </p>
                    </div>
                </div>
                {errors.submit && <div className="text-red-500 text-sm mt-2">{errors.submit}</div>}
                <div className="flex flex-col sm:flex-row w-full justify-between gap-1 sm:gap-5 my-4">
                    <button
                        type="button"
                        onClick={prevStep}
                        className="btn-ghost w-full"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>Retour
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full"
                    >
                    {loading ? (
                        <>
                            <i className="fas fa-spinner animate-spin mr-2"></i>
                            <span>Envoi en cours...</span>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-paper-plane mr-2"></i>
                            <span>Envoyer la demande</span>
                        </>
                    )}
                    </button>
                </div>
            </form>
        </div>
    );

    const renderSuccessMessage = () => (
        <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6 shadow-lg">
                <i className="fas fa-check text-3xl text-white"></i>
            </div>
            <h2 className="text-3xl font-bold text-green-600 mb-4">Demande envoyée avec succès !</h2>
            <p className="text-lg text-gray-600 mb-6">Votre rendez-vous a été enregistré et vous recevrez une confirmation par email.</p>
            <div className="flex items-center justify-center text-amber-600">
                <i className="fas fa-spinner animate-spin mr-2"></i>
                <span className="text-sm">Redirection vers la liste des rendez-vous...</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-dvh w-full">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 flex flex-col items-center justify-start pb-12 sm:pb-16">
                {/* Header avec design moderne */}
                <div className="text-center hidden mb-8">
                    {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-ink rounded-2xl mb-6 shadow-lg">
            <i className="fas fa-calendar-check text-3xl text-white"></i>
          </div> */}
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent mb-1 ">
                        Prise de rendez-vous
                    </h1>
                    <p className="text-xl text-gray-600 font-medium">Demande de visa</p>
                </div>

                {renderStepIndicator()}

                {loading ? renderLoadingOverlay() : (
                    <div className="card-warm w-full p-5 sm:p-7">
                        {submitted ? renderSuccessMessage() : (
                            <>
                                {step === 1 && renderStep1()}
                                {step === 2 && renderStep2()}
                                {step === 3 && renderStep3()}
                                {step === 4 && renderStep4()}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentsNew;
