import { useState } from 'react';
import { AppointmentController } from '@/controllers';
import { SendEmailsContactData } from '@/types';



interface UseSendEmailContactReturn {
  sendEmailContacts: (payload: SendEmailsContactData) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

export const useSendEmailContact = (): UseSendEmailContactReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmailContacts = async (payload: SendEmailsContactData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);


    try {

        await AppointmentController.sendEmailsContact(payload);
        return true;
      } catch (error: any) {
        console.error('Erreur détaillée:', error);
        let errorMessage = 'Erreur inconnue';

        if (error?.response?.data?.errors) {
          // Erreur de validation Laravel
          const validationErrors = error.response.data.errors;
          errorMessage = Object.values(validationErrors).flat().join(', ');
        } else if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    // Envoi d'e-mails aux participants et à l'entreprise depuis la page détails

  };

  return {
    sendEmailContacts,
    isLoading,
    error
  };
};
