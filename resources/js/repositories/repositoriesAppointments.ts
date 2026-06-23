import api from '../utils/axios';
import {
  Appointment,
  Member,
  CreateAppointmentData,
  UpdateAppointmentData,
  SendEmailsData,
  TimeSlot,
  ApiResponse,
  SendEmailsContactData
} from '../types';

class AppointmentsRepository {
  // Récupérer tous les rendez-vous
  async getAllAppointments() {
    const response = await api.get('/appointments/all');
    return response.data;
  }

  // Récupérer les rendez-vous par téléphone
  async getAppointmentsByPhone(prefixe: string, searchPhone: string) {
    const response = await api.get('/appointments', {
      params: { prefixe, searchPhone }
    });
    return response.data;
  }

  // Récupérer un rendez-vous par ID
  // Côté public, le backend exige le téléphone du dossier (anti-énumération).
  async getAppointmentById(id: string, prefixe?: string, searchPhone?: string) {
    const params: Record<string, string> = {};
    if (prefixe) params.prefixe = prefixe;
    if (searchPhone) params.searchPhone = searchPhone;
    const response = await api.get(`/appointments/${id}`, { params });
    return response.data;
  }

  // Créer un nouveau rendez-vous
  async createAppointment(appointmentData: CreateAppointmentData) {
    const appBase = (typeof window !== 'undefined'
      ? document.querySelector('meta[name="app-base"]')?.getAttribute('content')
      : '') || window.location.origin;
    // CSRF DÉSACTIVÉ : Plus besoin de récupérer le cookie CSRF
    // await api.get(new URL('/sanctum/csrf-cookie', appBase).toString());
    const response = await api.post('/appointments/new', appointmentData);
    return response.data;
  }

  // Mettre à jour un rendez-vous
  async updateAppointment(id: number, updateData: UpdateAppointmentData) {
    const appBase = (typeof window !== 'undefined'
      ? document.querySelector('meta[name="app-base"]')?.getAttribute('content')
      : '') || window.location.origin;
    // CSRF DÉSACTIVÉ : Plus besoin de récupérer le cookie CSRF
    // await api.get(new URL('/sanctum/csrf-cookie', appBase).toString());
    const response = await api.put(`/appointments/${id}`, updateData);
    return response.data;
  }

  // Supprimer un rendez-vous
  async deleteAppointment(id: number) {
    const appBase = (typeof window !== 'undefined'
      ? document.querySelector('meta[name="app-base"]')?.getAttribute('content')
      : '') || window.location.origin;
    // CSRF DÉSACTIVÉ : Plus besoin de récupérer le cookie CSRF
    // await api.get(new URL('/sanctum/csrf-cookie', appBase).toString());
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  }

  // Récupérer les créneaux disponibles
  async getAvailableSlots(date: string) {
    const response = await api.get('/appointments/available-slots', {
      params: { date }
    });
    return response.data;
  }

  // Envoyer des e-mails
  async sendEmails(emailsData: SendEmailsData) {
    const appBase = (typeof window !== 'undefined'
      ? document.querySelector('meta[name="app-base"]')?.getAttribute('content')
      : '') || window.location.origin;
    // CSRF DÉSACTIVÉ : Plus besoin de récupérer le cookie CSRF
    // await api.get(new URL('/sanctum/csrf-cookie', appBase).toString());
    const response = await api.post('/appointments/send-emails', emailsData);
    return response.data;
  }

  async sendEmailsContact(emailsData: SendEmailsContactData) {
    const appBase = (typeof window !== 'undefined'
      ? document.querySelector('meta[name="app-base"]')?.getAttribute('content')
      : '') || window.location.origin;
    // CSRF DÉSACTIVÉ : Plus besoin de récupérer le cookie CSRF
    // await api.get(new URL('/sanctum/csrf-cookie', appBase).toString());
    const response = await api.post('/appointments/send-emails-Contact', emailsData);
    return response.data;
  }
}

export default new AppointmentsRepository();
