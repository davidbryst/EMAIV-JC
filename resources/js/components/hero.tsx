import { ArrowUpRight, Compass, MapPin, Plane } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
    return (
        <section className="hero-evasion relative flex min-h-dvh items-center overflow-hidden text-paper">
            {/* halo ambré + grain */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-[36rem] w-[36rem] rounded-full bg-amber/20 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-[28rem] w-[28rem] rounded-full bg-clay/20 blur-[120px]" />

            {/* coordonnées décoratives */}
            <span className="absolute top-32 right-10 hidden origin-right rotate-90 text-[0.7rem] tracking-[0.3em] text-paper/40 lg:block">
                5.3599° N · 4.0083° W
            </span>

            <div className="container-app relative z-10 grid items-center gap-12 pt-32 pb-24 md:pt-40 lg:grid-cols-12">
                {/* Colonne texte */}
                <div className="lg:col-span-7">
                    <span className="reveal kicker kicker-light" style={{ animationDelay: '60ms' }}>
                        Visa · Immigration · Voyage
                    </span>

                    <h1
                        className="reveal mt-6 font-display text-[clamp(2.6rem,7vw,5.3rem)] leading-[0.98] font-semibold text-paper"
                        style={{ animationDelay: '140ms' }}
                    >
                        Vos rêves
                        <br />
                        d'<span className="text-amber-2 italic">ailleurs</span>, enfin
                        <br />à portée de main.
                    </h1>

                    <p className="reveal mt-7 max-w-xl text-lg leading-relaxed text-paper/80" style={{ animationDelay: '240ms' }}>
                        Emaiv-JC vous accompagne à chaque étape — du choix du visa à l'embarquement — avec l'écoute et la rigueur d'un cabinet de
                        confiance.
                    </p>

                    <div className="reveal mt-9 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: '320ms' }}>
                        <Link to="/appointments" className="btn-primary">
                            Prendre rendez-vous
                            <ArrowUpRight className="h-5 w-5" />
                        </Link>
                        <Link to="/services" className="btn-light">
                            Découvrir nos services
                        </Link>
                    </div>

                    <div className="reveal mt-12 flex flex-wrap items-center gap-x-8 gap-y-3" style={{ animationDelay: '420ms' }}>
                        {['Conseil personnalisé', 'Dossiers sécurisés', 'Accompagnement de A à Z'].map((t) => (
                            <span key={t} className="inline-flex items-center gap-2 text-sm text-paper/70">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-2" />
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Carte « itinéraire » */}
                <div className="hidden lg:col-span-5 lg:block">
                    <div
                        className="reveal-blur relative ml-auto w-full max-w-sm rounded-[1.6rem] bg-cream p-7 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
                        style={{ animationDelay: '360ms' }}
                    >
                        {/* perforations */}
                        <span className="absolute top-1/2 -left-3 h-6 w-6 rounded-full bg-ink" />
                        <span className="absolute top-1/2 -right-3 h-6 w-6 rounded-full bg-ink" />

                        <div className="flex items-center justify-between">
                            <span className="kicker">Itinéraire</span>
                            <Compass className="h-5 w-5 text-amber" />
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <div>
                                <div className="font-display text-3xl leading-none font-semibold">ABJ</div>
                                <div className="mt-1 text-xs text-ink-soft">Abidjan</div>
                            </div>
                            <div className="relative mx-3 flex-1">
                                <div className="dotted-path text-sand" />
                                <Plane className="absolute -top-2.5 right-0 h-5 w-5 text-amber" />
                            </div>
                            <div className="text-right">
                                <div className="font-display text-3xl leading-none font-semibold">∞</div>
                                <div className="mt-1 text-xs text-ink-soft">Le monde</div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3 border-t border-dashed border-sand pt-5 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-ink-soft">Statut</span>
                                <span className="chip">Prêt au départ</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-ink-soft">Prochaine étape</span>
                                <span className="inline-flex items-center gap-1 font-semibold">
                                    <MapPin className="h-4 w-4 text-amber" /> Votre rendez-vous
                                </span>
                            </div>
                        </div>

                        <Link to="/appointments" className="btn-ink mt-6 w-full !py-3 text-sm">
                            Réserver mon créneau
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* indicateur de scroll */}
            <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-paper/50">
                <span className="text-[0.65rem] tracking-[0.3em] uppercase">Défiler</span>
                <span className="h-10 w-px bg-gradient-to-b from-paper/60 to-transparent" />
            </div>
        </section>
    );
};

export default Hero;
