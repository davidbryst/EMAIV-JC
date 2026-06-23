import { CalendarRange, Users } from 'lucide-react';
import React from 'react';

interface RealisationItem {
    title: string;
    image: string;
    people: number;
    date: string;
    dateFin: string;
    tag: string;
}

const mockdata: RealisationItem[] = [
    { title: 'Colonie Tour Europe', image: '/assets/realisation1.jpg', people: 30, date: '07 mai 2023', dateFin: '10 juil. 2023', tag: 'Groupe' },
    { title: 'Colonie Tour Europe', image: '/assets/realisation2.jpg', people: 30, date: '07 mai 2023', dateFin: '10 juil. 2023', tag: 'Études' },
    { title: 'Colonie Tour Europe', image: '/assets/realisation3.jpg', people: 30, date: '07 mai 2023', dateFin: '10 juil. 2023', tag: 'Famille' },
    { title: 'Colonie Tour Europe', image: '/assets/realisation4.jpg', people: 30, date: '07 mai 2023', dateFin: '10 juil. 2023', tag: 'Affaires' },
];

const Realisation: React.FC = () => {
    return (
        <section className="section grain relative">
            <div className="container-app">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="kicker justify-center">Nos réalisations</span>
                    <h2 className="mt-5 font-display text-4xl leading-[1.05] font-semibold sm:text-5xl">
                        Des départs réussis, des histoires qui décollent.
                    </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
                    {mockdata.map((article, index) => (
                        <article key={index} className="group relative overflow-hidden rounded-[1.4rem] border border-sand bg-ink">
                            <div className="aspect-[16/10] overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                            </div>

                            <div className="absolute top-4 left-4">
                                <span className="chip-dark inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
                                    {article.tag}
                                </span>
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-6 text-paper">
                                <h3 className="font-display text-2xl font-semibold text-paper">{article.title}</h3>
                                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-paper/70">
                                    <span className="inline-flex items-center gap-2">
                                        <Users className="h-4 w-4 text-amber-2" /> {article.people} personnes
                                    </span>
                                    <span className="inline-flex items-center gap-2">
                                        <CalendarRange className="h-4 w-4 text-amber-2" /> {article.date} → {article.dateFin}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Realisation;
