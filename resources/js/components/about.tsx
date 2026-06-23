import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';

const values = [
  { Icon: HeartHandshake, label: 'Écoute & proximité' },
  { Icon: ShieldCheck, label: 'Rigueur & confiance' },
  { Icon: Sparkles, label: 'Exigence du détail' },
];

const About: React.FC = () => {
  return (
    <section className="section relative grain">
      <div className="container-app grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Visuel */}
        <div className="relative order-last lg:order-first">
          <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-[1.6rem] overflow-hidden border border-sand shadow-[0_40px_80px_-40px_rgba(32,24,15,0.5)]">
            <img src="/assets/gg.png" alt="L'équipe Emaiv-JC" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          </div>
          {/* badge flottant */}
          <div className="absolute -bottom-6 -right-3 sm:right-6 lg:-right-6 card-warm px-5 py-4 max-w-[14rem]">
            <div className="kicker mb-1">Depuis Abidjan</div>
            <p className="text-sm text-ink-soft leading-snug">
              Un cabinet à taille humaine, au service de vos projets à l'international.
            </p>
          </div>
        </div>

        {/* Texte */}
        <div>
          <span className="kicker">Qui sommes-nous</span>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-semibold leading-[1.05]">
            L'interlocuteur de confiance pour vos <span className="italic text-amber-deep">projets d'ailleurs</span>.
          </h2>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed">
            Le cabinet conseil Emaiv-JC vous accompagne dans la concrétisation de vos projets d'immigration
            et de voyage. Vos aspirations sont notre priorité : nous mettons notre expertise à votre service,
            avec professionnalisme et bienveillance, à chaque étape de votre parcours.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {values.map(({ Icon, label }) => (
              <span key={label} className="card-warm inline-flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold">
                <Icon className="w-4 h-4 text-amber" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-9">
            <Link to="/services" className="btn-primary">
              Voir nos services
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
