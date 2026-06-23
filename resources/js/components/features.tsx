import React from 'react';
import { Link } from 'react-router-dom';
import { Globe2, CalendarCheck, FileCheck2, Search, Plane, ArrowUpRight } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  span: string;
}

const services: Service[] = [
  {
    title: 'Accompagnement visa',
    description: "Conseils personnalisés et assistance complète pour vos démarches : court séjour, long séjour, études, affaires ou regroupement familial.",
    Icon: Globe2,
    span: 'md:col-span-3',
  },
  {
    title: 'Prise de rendez-vous consulaire',
    description: 'Gestion rapide et sécurisée de vos rendez-vous auprès des consulats et ambassades partenaires.',
    Icon: CalendarCheck,
    span: 'md:col-span-3',
  },
  {
    title: 'Préparation de dossier',
    description: 'Vérification des pièces, traduction et mise en forme pour maximiser vos chances.',
    Icon: FileCheck2,
    span: 'md:col-span-2',
  },
  {
    title: 'Suivi de dossier',
    description: "Suivi de l'avancement de votre demande et relances auprès des autorités.",
    Icon: Search,
    span: 'md:col-span-2',
  },
  {
    title: 'Assistance voyage',
    description: 'Assurance, billets, hébergement : tout pour un départ serein.',
    Icon: Plane,
    span: 'md:col-span-2',
  },
];

const Features: React.FC = () => {
  return (
    <section className="section bg-paper-2 relative">
      <div className="container-app">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="kicker">Ce que nous faisons</span>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl font-semibold leading-[1.05]">
              Un accompagnement complet, du dossier au décollage.
            </h2>
          </div>
          <Link to="/services" className="btn-ghost shrink-0">
            Tous les services
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-6 gap-5">
          {services.map(({ title, description, Icon, span }, i) => (
            <div key={title} className={`card-warm p-7 flex flex-col ${span}`}>
              <div className="flex items-start justify-between">
                <span className="w-12 h-12 rounded-xl bg-ink text-paper flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </span>
                <span className="font-display text-2xl text-sand">0{i + 1}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold">{title}</h3>
              <p className="mt-3 text-ink-soft leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
