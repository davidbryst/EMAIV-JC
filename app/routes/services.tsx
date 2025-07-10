import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/header";
import Footer from "~/components/footer";

export const meta: MetaFunction = () => [
  { title: "Nos services - Emaiv jc" },
  { name: "description", content: "Découvrez les services proposés par EMAIV-JC" },
];

const services = [
  {
    title: "Accompagnement Visa",
    description: "Conseils personnalisés et assistance complète pour vos démarches de demande de visa (court séjour, long séjour, études, affaires, regroupement familial, etc.).",
    icon: "🌍",
  },
  {
    title: "Prise de rendez-vous consulaire",
    description: "Gestion rapide et sécurisée de vos rendez-vous auprès des consulats et ambassades partenaires.",
    icon: "📅",
  },
  {
    title: "Préparation de dossier",
    description: "Aide à la constitution de votre dossier : vérification des pièces, traduction, mise en forme et conseils pour maximiser vos chances.",
    icon: "🗂️",
  },
  {
    title: "Suivi de dossier",
    description: "Suivi personnalisé de l’avancement de votre demande et relances auprès des autorités compétentes si nécessaire.",
    icon: "🔎",
  },
  {
    title: "Assistance voyage",
    description: "Conseils pratiques pour votre voyage : assurance, réservation de billets, hébergement, etc.",
    icon: "✈️",
  },
];

export default function Services() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 mt-10">
        <h1 className="text-3xl font-bold text-center mb-8">Nos Services</h1>
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded shadow-md p-6 flex items-start gap-4 hover:shadow-xl transition">
              <span className="text-4xl">{service.icon}</span>
              <div>
                <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}