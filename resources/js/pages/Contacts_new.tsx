import React, { useState } from 'react';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le nom est requis';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le prénom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
      // Ici, vous pouvez ajouter la logique d'envoi réelle
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto px-4 py-5 mt-10">
        <h1 className="text-3xl font-bold text-center mb-2">Contactez-nous</h1>
        <p className="text-center text-gray-600 mb-4">
          Une question ? Besoin d'un renseignement ? Remplissez le formulaire ci-dessous ou contactez-nous directement.
        </p>
        <hr className="my-4 border-t-2 border-gray-200" />
        <div className="my-5 text-center text-gray-700">
          <div className="mb-0"><strong>Email :</strong> contact@emaiv-jc.com</div>
          <div className="mb-0"><strong>Téléphone / WhatsApp :</strong> +225 01 23 45 67 89</div>
          <div><strong>Adresse :</strong> Abidjan, Côte d'Ivoire</div>
        </div>

        {submitted ? (
          <div className="bg-green-100 text-green-800 rounded p-4 text-center mb-8">
            Merci pour votre message, nous vous répondrons rapidement.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border-2 border-slate-200 shadow-xl p-6 flex flex-col gap-4">
            <fieldset className="flex gap-6">
              <label htmlFor="firstName" className="flex-1">
                Nom
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="border rounded-lg overflow-hidden p-2 w-full mt-1"
                />
                {errors.firstName && <span className="text-red-600 text-sm">{errors.firstName}</span>}
              </label>
              <label htmlFor="lastName" className="flex-1">
                Prénom(s)
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="border rounded-lg overflow-hidden p-2 w-full mt-1"
                />
                {errors.lastName && <span className="text-red-600 text-sm">{errors.lastName}</span>}
              </label>
            </fieldset>
            <fieldset>
              <label htmlFor="email">
                Adresse e-mail
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border rounded-lg overflow-hidden p-2 w-full mt-1"
                />
                {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
              </label>
            </fieldset>
            <fieldset>
              <label htmlFor="subject">
                Sujet (optionnel)
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="border rounded-lg overflow-hidden p-2 w-full mt-1"
                />
                {errors.subject && <span className="text-red-600 text-sm">{errors.subject}</span>}
              </label>
            </fieldset>
            <fieldset>
              <label htmlFor="message">
                Message
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  required
                  className="border rounded-lg overflow-hidden p-2 w-full mt-1"
                />
                {errors.message && <span className="text-red-600 text-sm">{errors.message}</span>}
              </label>
            </fieldset>
            <button type="submit" className="bg-amber-600 text-white rounded py-2 mt-2 hover:bg-amber-700 transition">
              Envoyer
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
