import { ArrowUpRight, Phone, Plane, ShieldCheck, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLink {
    link: string;
    label: string;
}

const mainLinks: NavLink[] = [
    { link: '/', label: 'Accueil' },
    { link: '/services', label: 'Services' },
    { link: '/contacts', label: 'Contacts' },
];

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 24);
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isCurrent = (path: string): boolean => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

    const close = () => setMenuOpen(false);

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            {/* Barre utilitaire */}
            <div className="hidden bg-ink text-paper/80 md:block">
                <div className="container-app flex items-center justify-between py-2 text-[0.72rem] tracking-wide">
                    <span className="inline-flex items-center gap-2">
                        <Plane className="h-3.5 w-3.5 text-amber-2" />
                        Cabinet conseil — Visa, immigration &amp; voyage · Abidjan
                    </span>
                    <div className="flex items-center gap-6">
                        <a href="tel:+2250123456789" className="inline-flex items-center gap-2 text-paper/70 transition-colors hover:text-white">
                            <Phone className="h-3.5 w-3.5 text-amber-2" /> +225 01 23 45 67 89
                        </a>
                        <Link to="/priver" className="inline-flex items-center gap-2 text-paper/70 transition-colors hover:text-white">
                            <ShieldCheck className="h-3.5 w-3.5 text-amber-2" /> Vie privée &amp; sécurité
                        </Link>
                    </div>
                </div>
            </div>

            {/* Barre principale */}
            <div
                className={`transition-all duration-300 ${
                    scrolled ? 'bg-paper/85 shadow-[0_10px_30px_-18px_rgba(32,24,15,0.5)] backdrop-blur-md' : 'bg-paper/70 backdrop-blur-sm'
                } border-b border-sand/70`}
            >
                <div className="container-app flex h-[68px] items-center justify-between">
                    <Link to="/" className="group flex-shrink-0" onClick={close}>
                        <img
                            src="/assets/logoXL.png"
                            alt="Emaiv-JC"
                            className="h-9 w-auto transition-transform duration-300 group-hover:scale-[1.03] lg:h-10"
                        />
                    </Link>

                    {/* Nav desktop */}
                    <nav className="hidden items-center gap-9 md:flex">
                        {mainLinks.map((item) => (
                            <Link
                                key={item.label}
                                to={item.link}
                                className={`relative text-sm font-semibold tracking-wide transition-colors duration-200 ${
                                    isCurrent(item.link) ? 'text-ink' : 'text-ink-soft hover:text-ink'
                                }`}
                            >
                                {item.label}
                                <span
                                    className={`absolute -bottom-1.5 left-0 h-0.5 bg-amber transition-all duration-300 ${
                                        isCurrent(item.link) ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}
                                />
                            </Link>
                        ))}
                        <Link to="/appointments" className="btn-primary !px-5 !py-2.5 text-sm">
                            Prendre rendez-vous
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </nav>

                    {/* Bouton mobile */}
                    <button
                        className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-paper md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                        type="button"
                        aria-label="Ouvrir le menu"
                    >
                        <span className="relative flex h-5 w-5 items-center justify-center">
                            <span
                                className={`absolute h-0.5 w-5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45' : '-translate-y-1.5'}`}
                            />
                            <span className={`absolute h-0.5 w-5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
                            <span
                                className={`absolute h-0.5 w-5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45' : 'translate-y-1.5'}`}
                            />
                        </span>
                    </button>
                </div>
            </div>

            {/* Menu mobile plein écran */}
            <div className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
                <div
                    className={`absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={close}
                />
                <div
                    className={`absolute top-0 right-0 h-dvh w-[88vw] max-w-sm bg-paper shadow-2xl transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="flex h-[68px] items-center justify-between border-b border-sand px-6">
                        <img src="/assets/logoXL.png" alt="Emaiv-JC" className="h-9 w-auto" />
                        <button onClick={close} className="rounded-lg p-2 transition-colors hover:bg-sand/40" aria-label="Fermer">
                            <X className="h-6 w-6 text-ink" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-1 px-6 py-8">
                        <span className="kicker mb-4">Navigation</span>
                        {mainLinks.map((item, i) => (
                            <Link
                                key={item.label}
                                to={item.link}
                                onClick={close}
                                style={{ animationDelay: `${i * 60}ms` }}
                                className={`reveal flex items-center justify-between border-b border-sand/60 py-4 font-display text-2xl ${
                                    isCurrent(item.link) ? 'text-amber-deep' : 'text-ink'
                                }`}
                            >
                                {item.label}
                                <ArrowUpRight className="h-5 w-5 text-ink-soft" />
                            </Link>
                        ))}
                        <Link to="/appointments" onClick={close} className="btn-primary mt-8 w-full">
                            Prendre rendez-vous
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                        <div className="mt-8 space-y-2 text-sm text-ink-soft">
                            <a href="tel:+2250123456789" className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-amber" /> +225 01 23 45 67 89
                            </a>
                            <Link to="/priver" onClick={close} className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-amber" /> Vie privée &amp; sécurité
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
