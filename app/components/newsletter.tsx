import React from "react";

export default function Newsletter() {
  return (
    <>
    <div className="md:max-w-3xl xl:max-w-5xl mx-auto bg-gray-900 md:rounded-lg shadow-md p-8 md:my-16">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Attendez une minute...</h2>
        <p className="font-medium text-orange-500 text-lg mb-1">
          S&apos;abonner à notre lettre d&apos;information !
        </p>
        <p className="text-sm text-gray-400 mb-6">
          pour recevoir les dernières nouvelles avant tout le monde.
        </p>
        <div className="flex flex-wrap items-end justify-end gap-2">
          <input
            type="email"
            placeholder="Ton email"
            className="flex-1 px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-md transition"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
      <div className="block md:hidden w-full h-1 bg-slate-50"></div>
      {/* <div className="block md:hidden w-full h-1 bg-slate-950"></div>
      <div className="block md:hidden w-full h-1 bg-slate-50"></div> */}
    </>
  );
}