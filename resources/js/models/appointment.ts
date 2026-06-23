interface Member {
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

  interface Appointment {
    id: number;
    visa_type: string;
    target_country: string;
    date: string;
    selected_slots: string[];
    payment_method: string;
    telephone: string;
    statut: string;
    notes: string;
    members: Member[];
    created_at: string;
  }
