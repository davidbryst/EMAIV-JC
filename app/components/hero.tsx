import React from "react";

export default function Hero() {
  return (
    <div className="hero-bg bg-cover bg-center h-[50vh] sm:h-[60vh] py-16">
    {/* <div className=" bg-[linear-gradient(#F8C21F4F,#F8C21F25),url('/glob.png')] bg-cover bg-center h-[50vh] py-16"> */}
    {/* <div className=" bg-[radial-gradient(circle,#221A02FF,#221A0265),url('/glob.png')] bg-cover bg-center h-[50vh] py-16"> */}
    {/* <div className="bg-[url('/glob.png')] bg-cover bg-center h-[90vh] bg-gradient-to-br from-pink-100 to-yellow-100 py-16"> */}
      <div className="container max-w-7xl mx-auto px-4 h-full">
        <div className="flex flex-col items-start justify-center text-center  h-full">
          <h1 className="text-white
          text-3xl sm:text-4xl md:text-5xl text-start font-extrabold mb-6">
            Rejoignez-nous pour <br />
            <span className="text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              explorer de <br /> nouveaux horizons
            </span> <br />
            malgré les obstacles
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            {/* Ajoutez ici une description si besoin */}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-md transition">
              Prendre rendez-vous
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-md transition">
              Voir nos services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
