import { ArrowUp, ArrowUpRight, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface FooterLink {
    label: string;
    link: string;
}
interface FooterGroup {
    title: string;
    links: FooterLink[];
}

const data: FooterGroup[] = [
    {
        title: 'Nos services',
        links: [
            { label: 'Accompagnement visa', link: '/services' },
            { label: 'Prise de rendez-vous', link: '/appointments' },
            { label: 'Préparation de dossier', link: '/services' },
            { label: 'Suivi de dossier', link: '/services' },
        ],
    },
    {
        title: 'Navigation',
        links: [
            { label: 'Accueil', link: '/' },
            { label: 'Services', link: '/services' },
            { label: 'Prendre rendez-vous', link: '/appointments' },
            { label: 'Contact', link: '/contacts' },
        ],
    },
    {
        title: 'Informations',
        links: [
            { label: 'Nous contacter', link: '/contacts' },
            { label: 'Vie privée & sécurité', link: '/priver' },
            { label: 'Politique de confidentialité', link: '/priver' },
        ],
    },
];

const socials = [
    { icon: Twitter, label: 'Twitter' },
    { icon: Instagram, label: 'Instagram' },
    { icon: Youtube, label: 'YouTube' },
];

const Footer: React.FC = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="relative bg-ink text-paper/80">
            {/* liseré ambré */}
            <div className="h-1 w-full bg-gradient-to-r from-amber via-clay to-amber" />

            <div className="container-app pt-16 pb-10">
                {/* Haut : marque + newsletter */}
                <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-2">
                    <div className="max-w-sm">
                        <img src="/assets/logoW.png" alt="Emaiv-JC" className="h-14 w-auto" />
                        <p className="mt-5 leading-relaxed text-paper/70">
                            Votre partenaire de confiance pour vos démarches de visa et vos projets à l'international.
                        </p>
                        <div className="mt-6 space-y-3 text-sm">
                            <a href="mailto:contact@emaiv-jc.ci" className="flex items-center gap-3 text-paper/70 transition-colors hover:text-white">
                                <Mail className="h-4 w-4 text-amber-2" /> contact@emaiv-jc.ci
                            </a>
                            <a href="tel:+2250123456789" className="flex items-center gap-3 text-paper/70 transition-colors hover:text-white">
                                <Phone className="h-4 w-4 text-amber-2" /> +225 01 23 45 67 89
                            </a>
                            <span className="flex items-center gap-3 text-paper/70 hover:text-white">
                                <MapPin className="h-4 w-4 text-amber-2" /> Abidjan, Côte d'Ivoire
                            </span>
                        </div>
                    </div>

                    <div className="border-white/10 lg:border-l lg:pl-10">
                        <span className="kicker kicker-light">Restez informé</span>
                        <h3 className="mt-4 font-display text-2xl text-paper">Nos conseils voyage &amp; visa, dans votre boîte mail.</h3>
                        <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="footer-newsletter" className="sr-only">
                                Email
                            </label>
                            <input
                                id="footer-newsletter"
                                type="email"
                                placeholder="Votre adresse email"
                                className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-paper placeholder-paper/40 focus:border-transparent focus:ring-2 focus:ring-amber focus:outline-none"
                            />
                            <button type="submit" className="btn-primary">
                                S'abonner
                                <ArrowUpRight className="h-4 w-4" />
                            </button>
                        </form>
                        <div className="mt-7 flex items-center gap-3">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href="#"
                                    aria-label={s.label}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-paper/70 transition-all hover:border-amber-2 hover:bg-amber-2 hover:text-ink"
                                >
                                    <s.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Colonnes de liens */}
                <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-3">
                    {data.map((group) => (
                        <div key={group.title}>
                            <h4 className="text-xs font-bold tracking-[0.18em] text-amber-2 uppercase">{group.title}</h4>
                            <ul className="mt-5 space-y-3">
                                {group.links.map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            to={link.link}
                                            className="group inline-flex items-center gap-1.5 text-paper/70 transition-colors hover:text-white"
                                        >
                                            <span>{link.label}</span>
                                            <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bas de page */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
                    <span className="text-center text-sm text-paper/50 sm:text-left">
                        © {new Date().getFullYear()} Emaiv-JC. Tous droits réservés.
                    </span>
                    <div className="flex items-center gap-4">
                        <Link to="/priver" className="text-xs text-paper/50 transition-colors hover:text-paper">
                            Politique de confidentialité
                        </Link>
                        <Link to="/priver" className="text-xs text-paper/50 transition-colors hover:text-paper">
                            Conditions d'utilisation
                        </Link>
                        <button
                            onClick={scrollToTop}
                            aria-label="Retour en haut"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-amber text-white transition-all hover:-translate-y-0.5 hover:bg-amber-deep"
                        >
                            <ArrowUp className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
