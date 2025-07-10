const mockdata = [
  {
    title: 'Colonie Tour Europe',
    image: '/realisation1.jpg',
    pepole: 30,
    date: '07 mai 2023',
    dateFin: '10 juillet 2023',
  },
  {
    title: 'Colonie Tour Europe',
    image: '/realisation2.jpg',
    pepole: 30,
    date: '07 mai 2023',
    dateFin: '10 juillet 2023',
  },
  {
    title: 'Colonie Tour Europe',
    image: '/realisation3.jpg',
    pepole: 30,
    date: '07 mai 2023',
    dateFin: '10 juillet 2023',
  },
  {
    title: 'Colonie Tour Europe',
    image: '/realisation4.jpg',
    pepole: 30,
    date: '07 mai 2023',
    dateFin: '10 juillet 2023',
  },
];

export default function Realisation() {
  return (
    <div className="container max-w-5xl mx-auto py-24 px-4">
      <h2 className="text-3xl font-bold text-black mb-16 text-center">Nos réalisations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">  
        {mockdata.map((article, index) => (
          <div
            key={index}
            className="flex bg-white rounded-lg shadow-md border overflow-hidden"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-32 sm:w-48 h-40 sm:h-40 object-cover object-top flex-shrink-0"
            />
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="text-xs uppercase text-gray-500 font-bold mb-1">
                  {article.pepole} personnes
                </div>
                <div className=" sm:text-lg text-black font-semibold ">{article.title}</div>
              </div>
              <div className="flex flex-wrap items-center text-xs text-gray-400">
                <span>{article.date}</span>
                <span className="mx-1">•</span>
                <span>{article.dateFin}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
