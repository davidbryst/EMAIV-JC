import { IconCookie, IconGauge, IconLock, IconMessage2, IconUser } from '@tabler/icons-react';

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


export default function Features() {
  return (
    // <div className="bg-[#f0eeec] py-24">
    //   <div className="max-w-5xl mx-auto px-4">
    //     <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">Nos services.</h2>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
    //       {MOCKDATA.map((feature, index) => (
      //         <div
      //           key={index}
      //           className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
      //         >
      //           <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 m-4 mb-6">
      //             <feature.icon size={32} stroke={1.5} className="text-orange-600" />
      //           </div>
      //           <h3 className="text-lg font-semibold mb-2 text-black">{feature.title}</h3>
      //           <p className="text-gray-500 text-sm">{feature.description}</p>
      //         </div>
      //       ))}
      //     </div>
      //   </div>
      // </div>
      <div className="bg-[#f0eeec] py-24">
    <div className="max-w-4xl mx-auto px-4 py-10 mt-10 ">
        <h1 className="text-3xl font-bold text-center mb-8">Nos Services</h1>
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded shadow p-6 flex items-start gap-4 hover:shadow-lg transition">
              <span className="text-4xl">{service.icon}</span>
              <div>
                <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
    </div>
  );
}
