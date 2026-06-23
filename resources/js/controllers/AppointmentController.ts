import appointmentsRepository from '../repositories/repositoriesAppointments';
import { Appointment, Member, CreateAppointmentData, UpdateAppointmentData, SendEmailsData, TimeSlot, SendEmailsContactData } from '../types';

export class AppointmentController {
  // Récupérer tous les rendez-vous
  static async getAllAppointments(): Promise<Appointment[]> {
    try {
      return await appointmentsRepository.getAllAppointments();
    } catch (error) {
      console.error('Erreur lors du chargement des rendez-vous:', error);
      throw new Error('Erreur lors du chargement des rendez-vous.');
    }
  }

  // Rechercher des rendez-vous par téléphone
  static async searchAppointmentsByPhone(prefixe: string, searchPhone: string): Promise<Appointment[]> {
    try {
      if (!prefixe || !searchPhone || searchPhone.length !== 10) {
        throw new Error('Veuillez saisir un préfixe et un numéro de téléphone complet (10 chiffres).');
      }
      return await appointmentsRepository.getAppointmentsByPhone(prefixe, searchPhone);
    } catch (error) {
      console.error('Erreur lors de la recherche des rendez-vous:', error);
      throw error;
    }
  }

  // Récupérer un rendez-vous par ID (téléphone optionnel pour l'accès public vérifié)
  static async getAppointmentById(id: string, prefixe?: string, searchPhone?: string): Promise<Appointment> {
    try {
      return await appointmentsRepository.getAppointmentById(id, prefixe, searchPhone);
    } catch (error) {
      console.error('Erreur lors de la récupération du rendez-vous:', error);
      throw new Error('Erreur lors de la récupération du rendez-vous.');
    }
  }

  // Créer un nouveau rendez-vous
  static async createAppointment(appointmentData: CreateAppointmentData): Promise<any> {
    try {
      // Validation des données
      if (!appointmentData.visa_type) {
        throw new Error('Le type de visa est requis.');
      }

      if (!appointmentData.target_country) {
        throw new Error('Le pays cible est requis.');
      }

      if (!appointmentData.members || appointmentData.members.length === 0) {
        throw new Error('Au moins un membre est requis.');
      }

      if (!appointmentData.date) {
        throw new Error('La date de rendez-vous est requise.');
      }

      if (!appointmentData.selected_slots || appointmentData.selected_slots.length === 0) {
        throw new Error('Au moins un créneau horaire est requis.');
      }

      if (appointmentData.selected_slots.length !== appointmentData.members.length) {
        throw new Error(`Veuillez sélectionner exactement ${appointmentData.members.length} créneau(x) consécutif(s).`);
      }

      if (!appointmentData.payment_method) {
        throw new Error('Le moyen de paiement est requis.');
      }

      return await appointmentsRepository.createAppointment(appointmentData);
    } catch (error) {
      console.error('Erreur lors de la création du rendez-vous:', error);
      throw error;
    }
  }

  // Mettre à jour un rendez-vous
  static async updateAppointment(id: number, updateData: UpdateAppointmentData): Promise<any> {
    try {
      // Validation des données
      if (!updateData.statut) {
        throw new Error('Le statut est requis.');
      }

      if (!updateData.visa_type) {
        throw new Error('Le type de visa est requis.');
      }

      return await appointmentsRepository.updateAppointment(id, updateData);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rendez-vous:', error);
      throw error;
    }
  }

  // Supprimer un rendez-vous
  static async deleteAppointment(id: number): Promise<any> {
    try {
      return await appointmentsRepository.deleteAppointment(id);
    } catch (error) {
      console.error('Erreur lors de la suppression du rendez-vous:', error);
      throw new Error('Erreur lors de la suppression du rendez-vous.');
    }
  }

  // Récupérer les créneaux disponibles
  static async getAvailableSlots(date: string): Promise<TimeSlot[]> {
    try {
      if (!date) {
        throw new Error('La date est requise.');
      }

      const response = await appointmentsRepository.getAvailableSlots(date);

      if (response.success && response.data) {
        return response.data;
      } else {
        // Fallback: générer des créneaux par défaut
        return this.generateDefaultSlots();
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des créneaux:', error);
      // Fallback: générer des créneaux par défaut
      return this.generateDefaultSlots();
    }
  }

  // Générer des créneaux par défaut (fallback)
  static generateDefaultSlots(): TimeSlot[] {
    const timeSlots: TimeSlot[] = [];

    // Créneaux du matin : 9h à 12h30
    for (let hour = 9; hour <= 12; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 12 && minute > 30) break;

        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        timeSlots.push({
          heure: timeStr,
          disponible: Math.random() > 0.3,
          sequence_ok: true,
          occupation: Math.floor(Math.random() * 5)
        });
      }
    }

    // Créneaux de l'après-midi : 14h30 à 16h30
    for (let hour = 14; hour <= 16; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 14 && minute < 30) continue;
        if (hour === 16 && minute > 30) break;

        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        timeSlots.push({
          heure: timeStr,
          disponible: Math.random() > 0.3,
          sequence_ok: true,
          occupation: Math.floor(Math.random() * 5)
        });
      }
    }

    return timeSlots;
  }

  // Envoyer des e-mails
  static async sendEmails(emailsData: SendEmailsData): Promise<any> {
    try {
      if (!emailsData.participantEmails || emailsData.participantEmails.length === 0) {
        throw new Error('Aucun email participant à envoyer.');
      }

    //   if (!emailsData.companyEmail) {
    //     throw new Error('Email de l\'entreprise requis.');
    //   }

      return await appointmentsRepository.sendEmails(emailsData);
    } catch (error) {
      console.error('Erreur lors de l\'envoi des e-mails:', error);
      throw error;
    }
  }
  static async sendEmailsContact(emailsData: SendEmailsContactData): Promise<any> {
    try {
      if (!emailsData.participantEmails || emailsData.participantEmails.length === 0) {
        throw new Error('Aucun email participant à envoyer.');
      }

    //   if (!emailsData.companyEmail) {
    //     throw new Error('Email de l\'entreprise requis.');
    //   }

      return await appointmentsRepository.sendEmailsContact(emailsData);
    } catch (error) {
      console.error('Erreur lors de l\'envoi des e-mails:', error);
      throw error;
    }
  }

  // Filtrer les rendez-vous
  static filterAppointments(
    appointments: Appointment[],
    searchQuery: string,
    filterStatut: string,
    filterVisaType: string,
    filterTargetCountry: string,
    filterDateFrom: string,
    filterDateTo: string
  ): Appointment[] {
    let filtered = [...appointments];

    // Filtre par recherche globale
    if (searchQuery) {
      filtered = filtered.filter(appointment => {
        const member = appointment.members[0];
        return (
          member?.prenom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member?.nom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member?.telephone?.includes(searchQuery) ||
          appointment.visa_type?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    // Filtre par statut
    if (filterStatut) {
      filtered = filtered.filter(appointment => appointment.statut.toLowerCase() === filterStatut.toLowerCase());
    }

    // Filtre par type de visa
    if (filterVisaType) {
      filtered = filtered.filter(appointment => appointment.visa_type.toLowerCase() === filterVisaType.toLowerCase());
    }

    // Filtre par Pays cible
    if (filterTargetCountry) {
      filtered = filtered.filter(appointment => appointment.target_country.toLowerCase() === filterTargetCountry.toLowerCase());
    }

    // Filtre par date de début
    if (filterDateFrom) {
      filtered = filtered.filter(appointment =>
        new Date(appointment.date) >= new Date(filterDateFrom)
      );
    }

    // Filtre par date de fin
    if (filterDateTo) {
      filtered = filtered.filter(appointment =>
        new Date(appointment.date) <= new Date(filterDateTo)
      );
    }

    return filtered;
  }

  // Obtenir les statistiques (comparaison insensible à la casse et aux accents)
  static getStatistics(appointments: Appointment[]): Record<string, number> {
    const stats: Record<string, number> = {
      'En attente': 0,
      'Confirmé': 0,
      'Terminé': 0,
      'Annulé': 0,
      'Total': appointments.length
    };

    // Le statut est stocké en minuscules en base ("confirmé", "en attente"...) :
    // on le normalise avant de l'associer à la clé affichée.
    const statusMap: Record<string, string> = {
      'en attente': 'En attente',
      'confirmé': 'Confirmé',
      'confirme': 'Confirmé',
      'terminé': 'Terminé',
      'termine': 'Terminé',
      'annulé': 'Annulé',
      'annule': 'Annulé',
    };

    appointments.forEach(appointment => {
      const key = statusMap[(appointment.statut || '').trim().toLowerCase()];
      if (key) {
        stats[key]++;
      }
    });

    return stats;
  }

  // Valider un membre
  static validateMember(member: Member): string[] {
    const errors: string[] = [];

    if (!member.nom) errors.push('Le nom est requis');
    if (!member.prenom) errors.push('Le prénom est requis');
    if (!member.nationalite) errors.push('La nationalité est requise');
    if (!member.motif) errors.push('Le motif est requis');
    if (!member.email) errors.push('L\'email est requis');
    if (!member.prefixe) errors.push('Le préfixe téléphone est requis');
    if (!member.telephone) errors.push('Le téléphone est requis');

    return errors;
  }

  // Formater une date
  static formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Formater une date et heure
  static formatDateTime(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }) + ' à ' + d.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Formater les créneaux horaires
  static formatSlots(slots: string[]): string[] {
    if (!slots) return [];
    return slots.map(slot => {
      const [h, m] = slot.split(':').map(Number);
      const start = slot;
      const endDate = new Date(0, 0, 0, h, m + 30);
      const end = endDate.toTimeString().slice(0, 5);
      return `${start} - ${end}`;
    });
  }

  // Ajouter des minutes à une heure
  static addMinutes(timeStr: string, mins: number): string {
    const [h, m] = timeStr.split(':').map(Number);
    const date = new Date(0, 0, 0, h, m + mins);
    return date.toTimeString().slice(0, 5);
  }

  // Sauvegarder localement en cas d'échec
  static saveAppointmentLocally(appointmentData: any): void {
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
  }
}

