import { useState } from 'react';
import { Member, SendEmailsData } from '../types';
import { AppointmentController } from '@/controllers';



interface UseSendEmailReturn {
  sendEmails: (payload: SendEmailsData) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

export const useSendEmail = (): UseSendEmailReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmails = async (payload: SendEmailsData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);


    try {

        await AppointmentController.sendEmails(payload);
        return true;
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    // Envoi d'e-mails aux participants et à l'entreprise depuis la page détails

  };

  return {
    sendEmails,
    isLoading,
    error
  };
};
