// import { Appointment, Member } from '../types';

// class StateController {
// // export class StateController {
//   // Sauvegarder l'état des filtres de rendez-vous
//   static saveAppointmentsFiltersState(state: {
//     searchQuery: string;
//     filterStatut: string;
//     filterVisaType: string;
//     filterDateFrom: string;
//     filterDateTo: string;
//     showMembersPopup: boolean;
//     appointments: Appointment[];
//   }): void {
//     try {
//       localStorage.setItem('appointments_all_filters_state', JSON.stringify(state));
//     } catch (error) {
//       console.error('Erreur lors de la sauvegarde de l\'état des filtres:', error);
//     }
//   }

//   // Charger l'état des filtres de rendez-vous
//   static loadAppointmentsFiltersState(): {
//     searchQuery: string;
//     filterStatut: string;
//     filterVisaType: string;
//     filterDateFrom: string;
//     filterDateTo: string;
//     showMembersPopup: boolean;
//     appointments: Appointment[];
//   } {
//     try {
//       const state = localStorage.getItem('appointments_all_filters_state');
//       if (state) {
//         return JSON.parse(state);
//       }
//     } catch (error) {
//       console.error('Erreur lors du chargement de l\'état des filtres:', error);
//     }

//     return {
//       searchQuery: '',
//       filterStatut: '',
//       filterVisaType: '',
//       filterDateFrom: '',
//       filterDateTo: '',
//       showMembersPopup: false,
//       appointments: []
//     };
//   }

//   // Sauvegarder l'état de recherche par téléphone
//   static saveAppointmentsSearchState(state: {
//     prefixe: string;
//     searchPhone: string;
//     isSearchLocked: boolean;
//     appointments: Appointment[];
//   }): void {
//     try {
//       localStorage.setItem('appointments_state', JSON.stringify(state));
//     } catch (error) {
//       console.error('Erreur lors de la sauvegarde de l\'état de recherche:', error);
//     }
//   }

//   // Charger l'état de recherche par téléphone
//   static loadAppointmentsSearchState(): {
//     prefixe: string;
//     searchPhone: string;
//     isSearchLocked: boolean;
//     appointments: Appointment[];
//   } {
//     try {
//       const state = localStorage.getItem('appointments_state');
//       if (state) {
//         return JSON.parse(state);
//       }
//     } catch (error) {
//       console.error('Erreur lors du chargement de l\'état de recherche:', error);
//     }

//     return {
//       prefixe: '',
//       searchPhone: '',
//       isSearchLocked: false,
//       appointments: []
//     };
//   }

//   // Sauvegarder l'état des détails d'un rendez-vous
//   static saveAppointmentDetailsState(state: {
//     appointment: Appointment;
//     editForm: {
//       statut: string;
//       visa_type: string;
//       notes: string;
//     };
//     showEditModal: boolean;
//   }): void {
//     try {
//       localStorage.setItem('appointment_details_state', JSON.stringify(state));
//     } catch (error) {
//       console.error('Erreur lors de la sauvegarde de l\'état des détails:', error);
//     }
//   }

//   // Charger l'état des détails d'un rendez-vous
//   static loadAppointmentDetailsState(): {
//     appointment: Appointment | null;
//     editForm: {
//       statut: string;
//       visa_type: string;
//       notes: string;
//     };
//     showEditModal: boolean;
//   } {
//     try {
//       const state = localStorage.getItem('appointment_details_state');
//       if (state) {
//         return JSON.parse(state);
//       }
//     } catch (error) {
//       console.error('Erreur lors du chargement de l\'état des détails:', error);
//     }

//     return {
//       appointment: null,
//       editForm: {
//         statut: '',
//         visa_type: '',
//         notes: ''
//       },
//       showEditModal: false
//     };
//   }

//   // Sauvegarder les rendez-vous en attente
//   static savePendingAppointments(appointments: any[]): void {
//     try {
//       localStorage.setItem('pendingAppointments', JSON.stringify(appointments));
//     } catch (error) {
//       console.error('Erreur lors de la sauvegarde des rendez-vous en attente:', error);
//     }
//   }

//   // Charger les rendez-vous en attente
//   static loadPendingAppointments(): any[] {
//     try {
//       const appointments = localStorage.getItem('pendingAppointments');
//       if (appointments) {
//         return JSON.parse(appointments);
//       }
//     } catch (error) {
//       console.error('Erreur lors du chargement des rendez-vous en attente:', error);
//     }

//     return [];
//   }

//   // Ajouter un rendez-vous en attente
//   static addPendingAppointment(appointmentData: any): void {
//     try {
//       const existingAppointments = this.loadPendingAppointments();
//       const newAppointment = {
//         ...appointmentData,
//         id: Date.now(),
//         status: 'pending',
//         localSave: true,
//         savedAt: new Date().toISOString()
//       };
//       existingAppointments.push(newAppointment);
//       this.savePendingAppointments(existingAppointments);
//       console.log('Rendez-vous ajouté aux en attente:', newAppointment);
//     } catch (error) {
//       console.error('Erreur lors de l\'ajout du rendez-vous en attente:', error);
//     }
//   }

//   // Supprimer un rendez-vous en attente
//   static removePendingAppointment(id: number): void {
//     try {
//       const appointments = this.loadPendingAppointments();
//       const filteredAppointments = appointments.filter(app => app.id !== id);
//       this.savePendingAppointments(filteredAppointments);
//     } catch (error) {
//       console.error('Erreur lors de la suppression du rendez-vous en attente:', error);
//     }
//   }

//   // Vider tous les états locaux
//   static clearAllStates(): void {
//     try {
//       localStorage.removeItem('appointments_all_filters_state');
//       localStorage.removeItem('appointments_state');
//       localStorage.removeItem('appointment_details_state');
//       localStorage.removeItem('pendingAppointments');
//       console.log('Tous les états locaux ont été supprimés.');
//     } catch (error) {
//       console.error('Erreur lors de la suppression des états locaux:', error);
//     }
//   }

//   // Obtenir la taille du localStorage
//   static getLocalStorageSize(): number {
//     try {
//       let total = 0;
//       for (let key in localStorage) {
//         if (localStorage.hasOwnProperty(key)) {
//           total += localStorage[key].length + key.length;
//         }
//       }
//       return total;
//     } catch (error) {
//       console.error('Erreur lors du calcul de la taille du localStorage:', error);
//       return 0;
//     }
//   }

//   // Nettoyer le localStorage si nécessaire
//   static cleanupLocalStorage(maxSize: number = 5 * 1024 * 1024): void { // 5MB par défaut
//     try {
//       const currentSize = this.getLocalStorageSize();
//       if (currentSize > maxSize) {
//         console.warn(`LocalStorage trop volumineux (${currentSize} bytes), nettoyage en cours...`);
//         this.clearAllStates();
//       }
//     } catch (error) {
//       console.error('Erreur lors du nettoyage du localStorage:', error);
//     }
//   }
// }

