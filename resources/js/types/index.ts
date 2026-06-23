// Types pour les rendez-vous
export interface Appointment {
  appointment_date: string;
  id: number;
  date: string;
  visa_type: string;
  target_country: string;
  statut: string;
  selected_slots: string[];
  members: Member[];
  telephone: string;
  notes: string;
  format: string;
  payment_method: string;
  created_at: string;
}

export interface Member {
  id?: number;
  nom: string;
  prenom: string;
  nationalite: string;
  motif: string;
  dates: string;
  passeport: string;
  email: string;
  prefixe: string;
  telephone: string;
  avatar: string;
}

export interface CreateAppointmentData {
  visa_type: string;
  target_country: string;
  members: Member[];
  date: string;
  selected_slots: string[];
  format: string;
  payment_method: string;
}

export interface UpdateAppointmentData {
  statut: string;
  visa_type: string;
  notes: string;
}

export interface SendEmailsData {
  participantEmails: string[];
  // companyEmail: string;
  appointment: any;
}

export interface SendEmailsContactData {
  participantEmails: string[];
  element: ContactFormData;
}
export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    error: string;
    succes: string;
  }

// Types pour l'authentification
export interface User {
  id: number;       // id: number;
  name: string;
  email: string;
}

export interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

// Types pour les créneaux horaires
export interface TimeSlot {
  heure: string;
  disponible: boolean;
  sequence_ok: boolean;
  occupation: number;
}

// Types pour les réponses API
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}
