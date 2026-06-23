import React from 'react';
import { Quote, Star } from 'lucide-react';

interface CommentData {
  image: string;
  text: string;
  name: string;
  info: string;
}

const mockdata: CommentData[] = [
  {
    image: '/assets/realisation4.jpg',
    text: "Grâce à Emaiv-JC, j'ai concrétisé mon projet d'installation au Canada sans stress. Un accompagnement impeccable, du début à la fin.",
    name: 'Mariam K.',
    info: 'Visa visiteur · Canada',
  },
  {
    image: '/assets/realisation4.jpg',
    text: "Un dossier monté avec une rigueur remarquable. J'ai senti une équipe qui prend vraiment à cœur la réussite de chacun.",
    name: 'Jean-Marc T.',
    info: 'Visa affaires · France',
  },
  {
    image: '/assets/realisation4.jpg',
    text: 'Des conseils clairs, un suivi constant et une vraie disponibilité. Je recommande les yeux fermés.',
    name: 'Sébastien O.',
    info: 'Visa études · Belgique',
  },
  {
    image: '/assets/realisation4.jpg',
    text: "Professionnalisme et chaleur humaine à la fois. Mon visa obtenu dans les délais, et un voyage parfaitement organisé.",
    name: 'David A.',
    info: 'Visa touristique · Espagne',
  },
];

const Comment: React.FC = () => {
  return (
    <section className="section bg-ink text-paper relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 -left-32 w-[30rem] h-[30rem] rounded-full bg-amber/10 blur-[120px]" />
      <div className="container-app relative">
        <div className="max-w-2xl mb-12">
          <span className="kicker kicker-light">Ils nous font confiance</span>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-semibold leading-[1.05] text-paper">
            Leurs horizons, devenus réalité.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {mockdata.map((comment, index) => (
            <figure key={index} className="relative rounded-[1.4rem] bg-cream text-ink p-7">
              <Quote className="w-9 h-9 text-amber/30 absolute right-6 top-6" />
              <div className="flex items-center gap-1 mb-5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 text-amber fill-amber" />
                ))}
              </div>
              <blockquote className="font-display text-xl leading-snug italic">
                « {comment.text} »
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-dashed border-sand">
                <img src={comment.image} alt={comment.name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <div className="font-semibold">{comment.name}</div>
                  <div className="text-xs text-ink-soft">{comment.info}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comment;
