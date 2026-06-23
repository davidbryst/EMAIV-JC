import { CalendarClock, FileCheck2, Globe, LucideIcon, Plane, Search } from 'lucide-react';
import React from 'react';

interface Service {
    title: string;
    description: string;
    icon: LucideIcon;
}

const services: Service[] = [
    {
        title: 'Accompagnement Visa',
        description:
            'Conseils personnalisés et assistance complète pour vos démarches de demande de visa (court séjour, long séjour, études, affaires, regroupement familial, etc.).',
        icon: Globe,
    },
    {
        title: 'Prise de rendez-vous consulaire',
        description: 'Gestion rapide et sécurisée de vos rendez-vous auprès des consulats et ambassades partenaires.',
        icon: CalendarClock,
    },
    {
        title: 'Préparation de dossier',
        description:
            'Aide à la constitution de votre dossier : vérification des pièces, traduction, mise en forme et conseils pour maximiser vos chances.',
        icon: FileCheck2,
    },
    {
        title: 'Suivi de dossier',
        description: "Suivi personnalisé de l'avancement de votre demande et relances auprès des autorités compétentes si nécessaire.",
        icon: Search,
    },
    {
        title: 'Assistance voyage',
        description: 'Conseils pratiques pour votre voyage : assurance, réservation de billets, hébergement, etc.',
        icon: Plane,
    },
];

const Services: React.FC = () => {
    return (
        <div className="mx-auto w-full max-w-4xl px-4 pb-16">
            <div className="mb-12 text-center">
                <span className="kicker justify-center">Nos services</span>
                <h1 className="mt-5 font-display text-3xl leading-[1.05] font-semibold sm:text-5xl">Un accompagnement, à chaque étape</h1>
                <p className="mx-auto mt-4 max-w-2xl text-ink-soft">
                    De la première démarche à votre départ, Emaiv-JC vous accompagne tout au long de votre projet à l'international.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                {services.map((service: Service) => {
                    const Icon = service.icon;
                    return (
                        <div key={service.title} className="card-warm flex items-start gap-5 p-7">
                            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-ink text-paper">
                                <Icon className="h-6 w-6" />
                            </span>
                            <div>
                                <h2 className="mb-2 font-display text-2xl font-semibold">{service.title}</h2>
                                <p className="leading-relaxed text-ink-soft">{service.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Services;
