import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Plane } from "lucide-react";

const Newsletter: React.FC = () => {
  return (
    <section className="section bg-paper-2">
      <div className="container-app">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink text-paper px-6 py-14 sm:px-12 sm:py-16 text-center">
          {/* halos */}
          <div className="pointer-events-none absolute -top-20 -right-16 w-80 h-80 rounded-full bg-amber/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 w-80 h-80 rounded-full bg-clay/20 blur-[100px]" />
          {/* trajectoire décorative */}
          <div className="pointer-events-none absolute inset-x-10 top-10 flex items-center text-paper/15">
            <span className="dotted-path flex-1" />
            <Plane className="w-5 h-5 mx-2 text-amber-2/60" />
            <span className="dotted-path flex-1" />
          </div>

          <div className="relative max-w-2xl mx-auto">
            <span className="kicker kicker-light justify-center">Prêt au départ ?</span>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl font-semibold leading-[1.05] text-paper">
              Faisons décoller votre projet, ensemble.
            </h2>
            <p className="mt-5 text-lg text-paper/75">
              Réservez un rendez-vous avec nos conseillers et avancez sereinement vers votre destination.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/appointments" className="btn-primary">
                Prendre rendez-vous
                <ArrowUpRight className="w-5 h-5" />
              </Link>
              <Link to="/contacts" className="btn-light">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
