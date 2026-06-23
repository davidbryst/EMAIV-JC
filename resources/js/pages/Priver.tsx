import React from 'react';
import { ShieldCheck, Lock, FileText, Mail } from 'lucide-react';

const sections = [
  {
    Icon: ShieldCheck,
    title: 'Respect de la vie privée',
    body: [
      "Emaiv-JC s'engage à protéger la vie privée de ses utilisateurs. Toutes les informations personnelles collectées via nos formulaires (nom, contact, informations de voyage, etc.) sont utilisées uniquement dans le cadre du traitement de votre demande de visa ou de service.",
      "Vos données ne sont jamais revendues ni partagées à des tiers sans votre consentement, sauf obligation légale ou nécessité liée à la prestation de nos services.",
    ],
  },
  {
    Icon: Lock,
    title: 'Sécurité des données',
    body: [
      'Nous mettons en œuvre des mesures techniques et organisationnelles pour garantir la sécurité de vos informations (chiffrement, accès restreint, etc.).',
    ],
  },
];

const Priver: React.FC = () => {
  return (
    <section className="section relative grain w-full">
      <div className="container-app max-w-3xl">
        <div className="text-center mb-12">
          <span className="kicker justify-center">Confidentialité</span>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl font-semibold leading-[1.05]">
            Vie privée &amp; conditions d'utilisation
          </h1>
          <p className="mt-4 text-ink-soft">Votre confiance est au cœur de notre métier.</p>
        </div>

        <div className="space-y-6">
          {sections.map(({ Icon, title, body }) => (
            <div key={title} className="card-warm p-7">
              <h2 className="flex items-center gap-3 font-display text-2xl font-semibold">
                <span className="w-10 h-10 rounded-xl bg-ink text-paper flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </span>
                {title}
              </h2>
              <div className="mt-4 space-y-3 text-ink-soft leading-relaxed">
                {body.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          ))}

          <div className="card-warm p-7">
            <h2 className="flex items-center gap-3 font-display text-2xl font-semibold">
              <span className="w-10 h-10 rounded-xl bg-ink text-paper flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </span>
              Conditions d'utilisation
            </h2>
            <ul className="mt-4 space-y-3 text-ink-soft">
              {[
                'Les informations fournies sur ce site doivent être exactes et à jour.',
                "L'utilisation des services Emaiv-JC implique l'acceptation de nos conditions et de notre politique de confidentialité.",
                'Tout usage frauduleux ou tentative de nuire à la sécurité du site entraînera des poursuites.',
                "Les contenus du site sont protégés par le droit d'auteur et ne peuvent être reproduits sans autorisation.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.4rem] bg-ink text-paper p-7 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-paper">Une question ?</h2>
              <p className="mt-1 text-paper/70">Pour toute demande relative à vos données, écrivez-nous.</p>
            </div>
            <a href="mailto:contact@emaiv-jc.ci" className="btn-light shrink-0">
              <Mail className="w-4 h-4" /> contact@emaiv-jc.ci
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Priver;
