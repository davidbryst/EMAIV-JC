import { useSendEmailContact } from '@/hooks/useSendEmailContact';
import { ContactFormData } from '@/types';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';

const Contact: React.FC = () => {
    const { sendEmailContacts: sendEmailsFromHook, isLoading: sendLoading, error: sendError } = useSendEmailContact();

    const [submitted, setSubmitted] = useState<boolean>(false);
    const [formData, setFormData] = useState<ContactFormData>({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
        error: '',
        succes: '',
    });
    const [errors, setErrors] = useState<Partial<ContactFormData>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof ContactFormData]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const validateForm = (): Partial<ContactFormData> => {
        const newErrors: Partial<ContactFormData> = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'Le nom est requis';
        if (!formData.lastName.trim()) newErrors.lastName = 'Le prénom est requis';
        if (!formData.email.trim()) newErrors.email = "L'email est requis";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Format d'email invalide";
        if (!formData.message.trim()) newErrors.message = 'Le message est requis';
        setErrors(newErrors);
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const validation = validateForm();
        const result: Partial<ContactFormData> = {};
        // S'il y a des erreurs, on les affiche et on arrête
        if (Object.keys(validation).length > 0) {
            setErrors(validation);
            return;
        }
        const payload = {
            participantEmails: [formData.email],
            element: formData,
        };
        const success = await sendEmailsFromHook(payload);
        if (success) {
            result.succes = "E-mails envoyés avec succès aux participants et à l'entreprise.";
        } else {
            result.error = "Erreur lors de l'envoi des e-mails. | " + sendError;
        }
        setErrors(result);

        // setSubmitted(true);
    };

    return (
        <div className="relative w-full py-2 pb-6 sm:py-16 lg:py-20">
            <div className="container-app sm:px-5">
                <div className="mb-5 flex max-w-2xl flex-col items-center pl-4 sm:items-start">
                    <span className="kicker sm:ml-5 sm:self-start">Contact</span>
                    <h1 className="mt-5 text-center font-display text-4xl leading-[1.05] font-semibold sm:text-start sm:text-5xl">
                        Parlons de votre/vos projet(s).
                    </h1>
                    <p className="mt-4 text-ink-soft">Une question, un renseignement ? Notre équipe vous répond rapidement.</p>
                </div>

                <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-5">
                    {/* Infos de contact */}
                    <aside className="lg:sticky lg:top-24 lg:col-span-2">
                        <div className="card mx-auto mb-4 hidden p-3 text-center">
                            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-base">Contactez-nous</h1>
                            <p className="mt-2 text-sm text-gray-600 sm:text-xs">
                                Une question ? Besoin d'un renseignement ? Écrivez-nous, nous répondons rapidement.
                            </p>
                        </div>
                        <div className="card space-y-3 p-3 text-gray-700">
                            <div className="flex items-start gap-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber text-white">
                                    <Mail className="h-3.5 w-3.5" />
                                </span>
                                <div>
                                    <p className="text-[11px] text-gray-500">Email</p>
                                    <p className="text-xs font-medium text-gray-900">contact@emaiv-jc.ci</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-paper">
                                    <Phone className="h-3.5 w-3.5" />
                                </span>
                                <div>
                                    <p className="text-[11px] text-gray-500">Téléphone / WhatsApp</p>
                                    <p className="text-xs font-medium text-gray-900">+225 01 23 45 67 89</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-clay text-white">
                                    <MapPin className="h-3.5 w-3.5" />
                                </span>
                                <div>
                                    <p className="text-[11px] text-gray-500">Adresse</p>
                                    <p className="text-xs font-medium text-gray-900">Abidjan, Côte d'Ivoire</p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Formulaire */}
                    <div className="lg:col-span-3">
                        {submitted ? (
                            <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center text-green-700 shadow-sm">
                                Merci pour votre message, nous vous répondrons rapidement.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="card space-y-2 p-3 sm:p-8">
                                {errors.error && <p className="mt-1 text-xs text-red-600">{errors.error}</p>}
                                {errors.succes && <p className="mt-1 text-xs text-green-600">{errors.succes}</p>}
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                            Nom
                                        </label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            className={`mt-1 w-full rounded-lg border ${errors.firstName ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-amber-500'} bg-white px-3 py-2 focus:ring-2 focus:outline-none`}
                                            aria-invalid={!!errors.firstName}
                                            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                                        />
                                        {errors.firstName && (
                                            <p id="firstName-error" className="mt-1 text-xs text-red-600">
                                                {errors.firstName}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                            Prénom(s)
                                        </label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            className={`mt-1 w-full rounded-lg border ${errors.lastName ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-amber-500'} bg-white px-3 py-2 focus:ring-2 focus:outline-none`}
                                            aria-invalid={!!errors.lastName}
                                            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                                        />
                                        {errors.lastName && (
                                            <p id="lastName-error" className="mt-1 text-xs text-red-600">
                                                {errors.lastName}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Adresse e-mail
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className={`mt-1 w-full rounded-lg border ${errors.email ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-amber-500'} bg-white px-3 py-2 focus:ring-2 focus:outline-none`}
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                    />
                                    {errors.email && (
                                        <p id="email-error" className="mt-1 text-xs text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                        Sujet (optionnel)
                                    </label>
                                    <input
                                        id="subject"
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={5}
                                        required
                                        className={`mt-1 w-full rounded-lg border ${errors.message ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-amber-500'} bg-white px-3 py-2 focus:ring-2 focus:outline-none`}
                                        aria-invalid={!!errors.message}
                                        aria-describedby={errors.message ? 'message-error' : undefined}
                                    />
                                    {errors.message && (
                                        <p id="message-error" className="mt-1 text-xs text-red-600">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <div className="pt-2">
                                    <button type="submit" className="btn-primary" disabled={sendLoading}>
                                        {sendLoading ? (
                                            <>
                                                <svg
                                                    className="h-5 w-5 animate-spin text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                                </svg>
                                                Envoi en cours...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-5 w-5" />
                                                Envoyer
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
