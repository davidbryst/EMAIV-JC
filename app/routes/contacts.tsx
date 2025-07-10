import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import Header from "~/components/header";
import Footer from "~/components/footer";

export const meta: MetaFunction = () => [
  { title: "Contact - Emaiv jc" },
  { name: "description", content: "Contactez EMAIV-JC pour toute question ou demande d'information." },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    // Ici, vous pouvez ajouter la logique d'envoi réelle
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 mt-10">
        <h1 className="text-3xl font-bold text-center mb-2">Contactez-nous</h1>
        
        <p className="text-center text-gray-600 mb-4">
          Une question ? Besoin d’un renseignement ? Remplissez le formulaire ci-dessous ou contactez-nous directement.
        </p>
        <hr className="my-4 border-t-2 border-gray-200" />
        <div className="my-5 text-center text-gray-700">
          <div className="mb-0">
            <strong>Email :</strong> contact@emaiv-jc.com
          </div>
          <div className="mb-0">
            <strong>Téléphone / WhatsApp :</strong> +225 01 23 45 67 89
          </div>
          <div>
            <strong>Adresse :</strong> Abidjan, Côte d’Ivoire
          </div>
        </div>
        
        {submitted ? (
          <div className="bg-green-100 text-green-800 rounded p-4 text-center mb-8">
            Merci pour votre message, nous vous répondrons rapidement.
          </div>
        ) : (
          <form className="bg-white rounded-xl shadow-xl p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <fieldset className=" flex gap-6">
              <label htmlFor="firstName">
                Nom
                <input id="firstName" type="text" name="firstName" required className="border rounded-lg overflow-hidden p-2 w-full mt-1" />
              </label>
              <label htmlFor="lastName">
                Prénom(s)
                <input id="lastName" type="text" name="lastName" required className="border rounded-lg overflow-hidden p-2 w-full mt-1" />
              </label>
            </fieldset>
            <fieldset>
              <label htmlFor="email">
                Adresse e-mail
                <input id="email" type="email" name="email" required className="border rounded-lg overflow-hidden p-2 w-full mt-1" />
              </label>
            </fieldset>
            <fieldset>
              <label htmlFor="subject">
                Sujet (optionnel)
                <input id="subject" type="text" name="subject" className="border rounded-lg overflow-hidden p-2 w-full mt-1" />
              </label>
            </fieldset>
            <fieldset>
              <label htmlFor="message">
                Message
                <textarea id="message" name="message" rows={5} required className="border rounded-lg overflow-hidden p-2 w-full mt-1" />
              </label>
            </fieldset>
            <button
              type="submit"
              className="bg-amber-600 text-white rounded py-2 mt-2 hover:bg-amber-700 transition"
            >
              Envoyer
            </button>
          </form>
        )}
    </div>
  );
}