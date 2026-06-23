import { TimeSlot } from '../types';

export class UtilityController {
  // Générer un avatar pour un utilisateur
  static generateAvatar(name: string, background: string = 'f59e0b'): string {
    try {
      const encodedName = encodeURIComponent(name);
      return `https://ui-avatars.com/api/?name=${encodedName}&background=${background}&color=ffffff`;
    } catch (error) {
      console.error('Erreur lors de la génération de l\'avatar:', error);
      return `https://ui-avatars.com/api/?name=User&background=${background}&color=ffffff`;
    }
  }

  // Formater un numéro de téléphone
  static formatPhoneNumber(prefixe: string, phone: string): string {
    if (!prefixe || !phone) return '';
    return `${prefixe} ${phone}`;
  }

  // Valider un numéro de téléphone
  static isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }

  // Obtenir les options de préfixes téléphoniques
  static getPhonePrefixes(): { value: string; label: string }[] {
    return [
      { value: '', label: '+ code' },
      { value: '+225', label: '+225 (Côte d\'Ivoire)' },
      { value: '+223', label: '+223 (Mali)' },
      { value: '+226', label: '+226 (Burkina Faso)' },
      { value: '+221', label: '+221 (Sénégal)' },
      { value: '+233', label: '+233 (Ghana)' },
      { value: '+227', label: '+227 (Niger)' },
      { value: '+228', label: '+228 (Togo)' },
      { value: '+229', label: '+229 (Bénin)' },
      { value: '+224', label: '+224 (Guinée)' },
      { value: '+33', label: '+33 (France)' },
      { value: '+1', label: '+1 (USA/Canada)' }
    ];
  }

  // Obtenir les options de nationalités
  static getNationalities(): string[] {
    return [
      'Française',
      'Ivoirienne',
      'Malienne',
      'Burkinabé',
      'Sénégalaise',
      'Ghanéenne',
      'Nigérienne',
      'Togolaise',
      'Béninoise',
      'Guinéenne',
      'Autre'
    ];
  }

  // Obtenir les options de types de visa
  static getVisaTypes(): string[] {
    return ['Touriste', 'Affaires', 'Étudiant', 'Transit', 'Famille'];
  }
  static getTargetCountries(): { value: string; label: string; icon?: string }[] {
    // Liste complète des pays cibles, synchronisée avec appointmentsNew.tsx
    return [
      { value: 'France', label: 'France', icon: 'fi fi-fr' },
      { value: 'Canada', label: 'Canada', icon: 'fi fi-ca' },
      { value: 'États-Unis', label: 'États-Unis', icon: 'fi fi-us' },
      { value: 'Royaume-Uni', label: 'Royaume-Uni', icon: 'fi fi-gb' },
      { value: 'Allemagne', label: 'Allemagne', icon: 'fi fi-de' },
      { value: 'Italie', label: 'Italie', icon: 'fi fi-it' },
      { value: 'Espagne', label: 'Espagne', icon: 'fi fi-es' },
      { value: 'Belgique', label: 'Belgique', icon: 'fi fi-be' },
      { value: 'Suisse', label: 'Suisse', icon: 'fi fi-ch' },
      { value: 'Pays-Bas', label: 'Pays-Bas', icon: 'fi fi-nl' },
      { value: 'Suède', label: 'Suède', icon: 'fi fi-se' },
      { value: 'Norvège', label: 'Norvège', icon: 'fi fi-no' },
      { value: 'Danemark', label: 'Danemark', icon: 'fi fi-dk' },
      { value: 'Finlande', label: 'Finlande', icon: 'fi fi-fi' },
      { value: 'Australie', label: 'Australie', icon: 'fi fi-au' },
      { value: 'Nouvelle-Zélande', label: 'Nouvelle-Zélande', icon: 'fi fi-nz' },
      { value: 'Japon', label: 'Japon', icon: 'fi fi-jp' },
      { value: 'Corée du Sud', label: 'Corée du Sud', icon: 'fi fi-kr' },
      { value: 'Singapour', label: 'Singapour', icon: 'fi fi-sg' },
      { value: 'Émirats arabes unis', label: 'Émirats arabes unis', icon: 'fi fi-ae' },
      { value: 'Qatar', label: 'Qatar', icon: 'fi fi-qa' },
      { value: 'Arabie saoudite', label: 'Arabie saoudite', icon: 'fi fi-sa' },
      { value: 'Maroc', label: 'Maroc', icon: 'fi fi-ma' },
      { value: 'Tunisie', label: 'Tunisie', icon: 'fi fi-tn' },
      { value: 'Algérie', label: 'Algérie', icon: 'fi fi-dz' },
      { value: 'Sénégal', label: 'Sénégal', icon: 'fi fi-sn' },
      { value: 'Mali', label: 'Mali', icon: 'fi fi-ml' },
      { value: 'Burkina Faso', label: 'Burkina Faso', icon: 'fi fi-bf' },
      { value: 'Niger', label: 'Niger', icon: 'fi fi-ne' },
      { value: 'Tchad', label: 'Tchad', icon: 'fi fi-td' },
      { value: 'Cameroun', label: 'Cameroun', icon: 'fi fi-cm' },
      { value: 'Gabon', label: 'Gabon', icon: 'fi fi-ga' },
      { value: 'Congo', label: 'Congo', icon: 'fi fi-cg' },
      { value: 'RDC', label: 'RDC', icon: 'fi fi-cd' },
      { value: 'Côte d\'Ivoire', label: 'Côte d\'Ivoire', icon: 'fi fi-ci' },
      { value: 'Ghana', label: 'Ghana', icon: 'fi fi-gh' },
      { value: 'Nigeria', label: 'Nigeria', icon: 'fi fi-ng' },
      { value: 'Bénin', label: 'Bénin', icon: 'fi fi-bj' },
      { value: 'Togo', label: 'Togo', icon: 'fi fi-tg' },
      { value: 'Guinée', label: 'Guinée', icon: 'fi fi-gn' },
      { value: 'Sierra Leone', label: 'Sierra Leone', icon: 'fi fi-sl' },
      { value: 'Liberia', label: 'Liberia', icon: 'fi fi-lr' },
      { value: 'Gambie', label: 'Gambie', icon: 'fi fi-gm' },
      { value: 'Guinée-Bissau', label: 'Guinée-Bissau', icon: 'fi fi-gw' },
      { value: 'Cap-Vert', label: 'Cap-Vert', icon: 'fi fi-cv' },
      { value: 'São Tomé-et-Príncipe', label: 'São Tomé-et-Príncipe', icon: 'fi fi-st' },
      { value: 'Mauritanie', label: 'Mauritanie', icon: 'fi fi-mr' },
      { value: 'Madagascar', label: 'Madagascar', icon: 'fi fi-mg' },
      { value: 'Maurice', label: 'Maurice', icon: 'fi fi-mu' },
      { value: 'Seychelles', label: 'Seychelles', icon: 'fi fi-sc' },
      { value: 'Comores', label: 'Comores', icon: 'fi fi-km' },
      { value: 'Djibouti', label: 'Djibouti', icon: 'fi fi-dj' },
      { value: 'Éthiopie', label: 'Éthiopie', icon: 'fi fi-et' },
      { value: 'Érythrée', label: 'Érythrée', icon: 'fi fi-er' },
      { value: 'Somalie', label: 'Somalie', icon: 'fi fi-so' },
      { value: 'Soudan', label: 'Soudan', icon: 'fi fi-sd' },
      { value: 'Soudan du Sud', label: 'Soudan du Sud', icon: 'fi fi-ss' },
      { value: 'Ouganda', label: 'Ouganda', icon: 'fi fi-ug' },
      { value: 'Kenya', label: 'Kenya', icon: 'fi fi-ke' },
      { value: 'Tanzanie', label: 'Tanzanie', icon: 'fi fi-tz' },
      { value: 'Rwanda', label: 'Rwanda', icon: 'fi fi-rw' },
      { value: 'Burundi', label: 'Burundi', icon: 'fi fi-bi' },
      { value: 'République centrafricaine', label: 'République centrafricaine', icon: 'fi fi-cf' },
      { value: 'Guinée équatoriale', label: 'Guinée équatoriale', icon: 'fi fi-gq' },
      { value: 'Angola', label: 'Angola', icon: 'fi fi-ao' },
      { value: 'Zambie', label: 'Zambie', icon: 'fi fi-zm' },
      { value: 'Zimbabwe', label: 'Zimbabwe', icon: 'fi fi-zw' },
      { value: 'Botswana', label: 'Botswana', icon: 'fi fi-bw' },
      { value: 'Namibie', label: 'Namibie', icon: 'fi fi-na' },
      { value: 'Afrique du Sud', label: 'Afrique du Sud', icon: 'fi fi-za' },
      { value: 'Lesotho', label: 'Lesotho', icon: 'fi fi-ls' },
      { value: 'Eswatini', label: 'Eswatini', icon: 'fi fi-sz' },
      { value: 'Mozambique', label: 'Mozambique', icon: 'fi fi-mz' },
      { value: 'Malawi', label: 'Malawi', icon: 'fi fi-mw' }
    ];
  }

  // Obtenir les options de statuts
  static getStatusOptions(): string[] {
    return ['En attente', 'Confirmé', 'Terminé', 'Annulé'];
  }

  // Obtenir les options de moyens de paiement EN LIGNE.
  static getPaymentMethods(): string[] {
    return ['Orange Money', 'MTN Mobile Money', 'Moov Money', 'Wave', 'Carte Visa'];
  }

  // Libellé du paiement physique (en espèces, réglé sur place à l'agence).
  static getOnsitePaymentMethod(): string {
    return 'Espèces (sur place)';
  }

  // Modes de paiement proposés (au choix du candidat) : en ligne ou sur place.
  static getPaymentModes(): { value: string; label: string; icon: string; description: string }[] {
    return [
      { value: 'En ligne', label: 'En ligne', icon: 'fa-globe', description: 'Mobile Money, Wave ou carte bancaire' },
      { value: 'Sur place', label: 'Sur place', icon: 'fa-store', description: 'En espèces à l\'agence avant l\'entretien' },
    ];
  }

  // Formats d'entretien proposés (au choix du candidat)
  static getAppointmentFormats(): string[] {
    return ['En ligne', 'En présentiel'];
  }

  // Frais d'entretien : tarif unique et obligatoire (en FCFA)
  static getAppointmentFee(): number {
    return 25000;
  }

  // Formater un montant en FCFA (ex. 25000 -> "25 000 FCFA")
  static formatFcfa(amount: number): string {
    return `${amount.toLocaleString('fr-FR')} FCFA`;
  }

  // Obtenir la couleur d'un statut
  static getStatusColor(status: string): string {
    switch (status) {
      case 'Confirmé':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Terminé':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Annulé':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  // Obtenir l'icône d'un statut
  static getStatusIcon(status: string): string {
    switch (status) {
      case 'Confirmé':
        return 'fas fa-check-circle';
      case 'En attente':
        return 'fas fa-clock';
      case 'Terminé':
        return 'fas fa-flag-checkered';
      case 'Annulé':
        return 'fas fa-times-circle';
      default:
        return 'fas fa-question-circle';
    }
  }

  // Formater une date en français
  static formatDate(dateStr: string, options?: Intl.DateTimeFormatOptions): string {
    if (!dateStr) return '';

    const defaultOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', options || defaultOptions);
  }

  // Formater une date et heure en français
  static formatDateTime(dateStr: string): string {
    if (!dateStr) return '';

    const d = new Date(dateStr);
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit'
    };

    return `${d.toLocaleDateString('fr-FR', dateOptions)} à ${d.toLocaleTimeString('fr-FR', timeOptions)}`;
  }

  // Formater une durée en minutes
  static formatDuration(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h${remainingMinutes.toString().padStart(2, '0')}`;
  }
  static formatSlots(slots: string[]): string[] {
    if (!slots) return [];
    return slots.map(slot => {
      const [h, m] = slot.split(':').map(Number);
      const start = slot;
      const endDate = new Date(0, 0, 0, h, m + 30);
      const end = endDate.toTimeString().slice(0, 5);
      return `${start} - ${end}`;
    });
  };

  // Ajouter des minutes à une heure
  static addMinutes(timeStr: string, minutes: number): string {
    const [hours, mins] = timeStr.split(':').map(Number);
    const date = new Date(0, 0, 0, hours, mins + minutes);
    return date.toTimeString().slice(0, 5);
  }

  // Calculer la différence entre deux heures
  static getTimeDifference(time1: string, time2: string): number {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;

    return Math.abs(totalMinutes2 - totalMinutes1);
  }

  // Générer un ID unique
  static generateId(): number {
    return Date.now() + Math.random();
  }

  // Tronquer un texte
  static truncateText(text: string, maxLength: number): string {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  // Capitaliser la première lettre
  static capitalize(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  // Formater un nom complet
  static formatFullName(firstName: string, lastName: string): string {
    return `${this.capitalize(firstName)} ${this.capitalize(lastName)}`;
  }

  // Valider un email
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Masquer un email
  static maskEmail(email: string): string {
    if (!email || !this.isValidEmail(email)) return email;

    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) return email;

    const maskedLocal = localPart.charAt(0) + '*'.repeat(localPart.length - 2) + localPart.charAt(localPart.length - 1);
    return `${maskedLocal}@${domain}`;
  }

  // Masquer un numéro de téléphone
  static maskPhoneNumber(phone: string): string {
    if (!phone || phone.length < 4) return phone;

    const visibleDigits = 4;
    const maskedPart = '*'.repeat(phone.length - visibleDigits);
    const visiblePart = phone.slice(-visibleDigits);

    return maskedPart + visiblePart;
  }

  // Copier du texte dans le presse-papiers
  static async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Erreur lors de la copie dans le presse-papiers:', error);
      return false;
    }
  }

  // Télécharger un fichier
  static downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
    try {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier:', error);
    }
  }

  // Débouncer une fonction
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Throttler une fonction
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

