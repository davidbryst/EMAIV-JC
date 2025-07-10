
export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row items-center gap-8 py-8 min-h-[60vh]">
        <div className="flex-1">
          <h1 className="text-3xl text-black font-bold mb-4">
            Qui sommes-nous ?
          </h1>
          <p className="text-gray-600 mb-6">
            le cabinet conseil immigration & it emaiv-jc est l&apos;interlocuteur qui vous accompagne dans la concrétisation de vos projets.
            vos aspirations sont une priorité pour nous.
            <br />
            ainsi, pour répondre à vos besoins, nous vous accompagnons en faisons preuve constante de professionnalisme jour après jour.
            nos valeurs
            <br />
          </p>
          <div className="mt-8">
            <button
              type="button" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-md transition"
            >
              Voir nos services
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="/gg.png"
            alt="About"
            height={400}
            width={400}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
