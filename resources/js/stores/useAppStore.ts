import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Appointment, Member, User, TimeSlot, LoginForm } from '../types';
import { AppointmentController } from '../controllers/AppointmentController';
import { AuthController } from '../controllers/AuthController';

// Types pour l'état global
interface AppState {
  // État d'authentification
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // État des rendez-vous
  appointments: Appointment[];
  appointmentsAll: Appointment[];
  selectedAppointment: Appointment | null;
  appointmentsError: string | null;
  appointmentsAllError: string | null;

  // État des créneaux horaires
  availableSlots: TimeSlot[];
  slotsError: string | null;

  // État des filtres et recherche
  searchQuery: string;
  filterStatut: string;
  filterVisaType: string;
  filterTargetCountry: string;
  filterDateFrom: string;
  filterDateTo: string;

  // État de recherche par téléphone
  searchPhone: string;
  searchPrefixe: string;


  // Actions d'authentification
  login: (form: LoginForm) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;

  // Actions des rendez-vous
  fetchAllAppointments: () => Promise<void>;
  fetchAppointmentsByPhone: (prefixe: string, phone: string) => Promise<void>;
  fetchAppointmentById: (id: string) => Promise<void>;
  createAppointment: (data: any) => Promise<void>;
  updateAppointment: (id: number, data: any) => Promise<void>;
  deleteAppointment: (id: number) => Promise<void>;

  // Actions des créneaux
  fetchAvailableSlots: (date: string) => Promise<void>;

  // Actions des filtres
  setSearchQuery: (query: string) => void;
  setFilterStatut: (statut: string) => void;
  setFilterTargetCountry: (targetCountry: string) => void;
  setFilterVisaType: (visaType: string) => void;
  setFilterDateFrom: (date: string) => void;
  setFilterDateTo: (date: string) => void;

  // Actions de recherche
  setSearchPhone: (phone: string) => void;
  setSearchPrefixe: (prefixe: string) => void;

  // Actions des messages

  // Actions utilitaires
  clearAppointments: () => void;
  setSelectedAppointment: (appointment: Appointment | null) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // État initial
        user: null,
        isAuthenticated: false,
        isLoading: false,

        appointments: [],
        appointmentsAll: [],
        selectedAppointment: null,
        appointmentsError: null,
        appointmentsAllError: null,

        availableSlots: [],
        slotsError: null,

        searchQuery: '',
        filterStatut: '',
        filterVisaType: '',
        filterTargetCountry: '',
        filterDateFrom: '',
        filterDateTo: '',

        searchPhone: '',
        searchPrefixe: '',

        message: '',
        messageType: 'info',
        showMessage: false,

        // Actions d'authentification
        login: async (form: LoginForm) => {
          try {
            const response = await AuthController.login(form);
            set({
              user: response.user,
              isAuthenticated: true,
            });
          } catch (error) {
            throw error;
          }
        },

        logout: async () => {
          try {
            await AuthController.logout();
            set({
              user: null,
              isAuthenticated: false,
              appointments: [],
              selectedAppointment: null
            });
          } catch (error) {
            throw error;
          }
        },

        checkAuth: async () => {
            set({ isLoading: true });
          try {
            const user = await AuthController.checkAuthSession();
            set({
              user,
              isAuthenticated: true,
            });
          } catch (error) {
            set({
              user: null,
              isAuthenticated: false,
            });
          } finally {
            set({ isLoading: false });
          }
        },

        // Actions des rendez-vous
        fetchAllAppointments: async () => {
          set({ appointmentsAllError: null });
          try {
            const appointmentsAll = await AppointmentController.getAllAppointments();
            set({
              appointmentsAll: appointmentsAll,
                          });
          } catch (error) {
            set({
              appointmentsAllError: error instanceof Error ? error.message : 'Erreur lors du chargement',
                          });
          }
        },

        fetchAppointmentsByPhone: async (prefixe: string, phone: string) => {
          set({ appointmentsError: null });
          try {
            const appointments = await AppointmentController.searchAppointmentsByPhone(prefixe, phone);
            set({
              appointments,

              searchPrefixe: prefixe,
              searchPhone: phone,
            });
          } catch (error) {
            // En cas d'échec on vide les résultats et on relance l'erreur
            // pour que l'appelant (page Appointments) puisse l'afficher.
            set({
              appointments: [],
              appointmentsError: error instanceof Error ? error.message : 'Erreur lors de la recherche',
            });
            throw error;
          }
        },

        fetchAppointmentById: async (id: string) => {
          try {
            // Transmet le téléphone recherché : requis par le backend pour l'accès public.
            const appointment = await AppointmentController.getAppointmentById(
              id,
              get().searchPrefixe,
              get().searchPhone
            );
            set({
              selectedAppointment: appointment,
                          });
          } catch (error) {
            set({ });
          }
        },

        createAppointment: async (data: any) => {
          try {
            const result = await AppointmentController.createAppointment(data);
            // Recharger les rendez-vous après création
            await get().fetchAllAppointments();
            set({ });
            return result;
          } catch (error) {
            set({ });
            throw error;
          }
        },

        updateAppointment: async (id: number, data: any) => {
          try {
            const result = await AppointmentController.updateAppointment(id, data);
            // Mettre à jour la liste des rendez-vous
            const updatedAppointments = get().appointments.map(app =>
              app.id === id ? { ...app, ...data } : app
            );
            set({
              appointments: updatedAppointments,
              selectedAppointment: get().selectedAppointment?.id === id
                ? { ...get().selectedAppointment, ...data }
                : get().selectedAppointment,
                          });
            return result;
          } catch (error) {
            set({ });
            throw error;
          }
        },

        deleteAppointment: async (id: number) => {
          try {
            await AppointmentController.deleteAppointment(id);
            const filteredAppointments = get().appointments.filter(app => app.id !== id);
            set({
              appointments: filteredAppointments,
              selectedAppointment: get().selectedAppointment?.id === id ? null : get().selectedAppointment,
                          });
          } catch (error) {
            set({ });
            throw error;
          }
        },

        // Actions des créneaux
        fetchAvailableSlots: async (date: string) => {
          set({ slotsError: null });
          try {
            const slots = await AppointmentController.getAvailableSlots(date);
            set({
              availableSlots: slots,
            });
          } catch (error) {
            set({
              slotsError: error instanceof Error ? error.message : 'Erreur lors du chargement des créneaux',
            });
          }
        },

        // Actions des filtres
        setSearchQuery: (query: string) => set({ searchQuery: query }),
        setFilterStatut: (statut: string) => set({ filterStatut: statut }),
        setFilterVisaType: (visaType: string) => set({ filterVisaType: visaType }),
        setFilterTargetCountry: (targetCountry: string) => set({ filterTargetCountry: targetCountry }),
        setFilterDateFrom: (date: string) => set({ filterDateFrom: date }),
        setFilterDateTo: (date: string) => set({ filterDateTo: date }),

        // Actions de recherche
        setSearchPhone: (phone: string) => set({ searchPhone: phone }),
        setSearchPrefixe: (prefixe: string) => set({ searchPrefixe: prefixe }),

        // Actions des messages


        // Actions utilitaires
        clearAppointments: () => set({ appointments: [], selectedAppointment: null }),
        setSelectedAppointment: (appointment: Appointment | null) => set({ selectedAppointment: appointment }),
      }),
      {
        name: 'app-store',
        partialize: (state) => ({
          // Ne persister que certains états
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        //   appointmentsAll: state.appointmentsAll,
          searchQuery: state.searchQuery,
          filterStatut: state.filterStatut,
          filterVisaType: state.filterVisaType,
          filterTargetCountry: state.filterTargetCountry,
          filterDateFrom: state.filterDateFrom,
          filterDateTo: state.filterDateTo,
          searchPhone: state.searchPhone,
          searchPrefixe: state.searchPrefixe,
        }),
      }
    ),
    {
      name: 'app-store',
    }
  )
);

