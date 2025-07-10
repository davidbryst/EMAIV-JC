import { Link } from '@remix-run/react';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
    import { useLocation } from "@remix-run/react";

const userLinks = [
  { link: '/priver', label: 'Vie privée et sécurité' },
  { link: '#', label: 'Connexion' },
];

const mainLinks = [
  { link: '/', label: 'Emaiv jc' },
  { link: '/services', label: 'Services' },
  { link: '/rendez-vous', label: 'Prendre rendez-vous' },
  { link: '/contacts', label: 'Contacts' },
];

export default function Header() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
      const location = useLocation();
      function whereiam (params:string) {
        return location.pathname === params;
      }

  return (
    <header className="bg-white shadow w-full relative border-b-4 border-gray-200">
      <div className="container max-w-7xl mx-auto flex items-center justify-between  bg-white h-[10vh] px-4 z-20">
        <img src={"/logo.png"} alt="Logo" className="rounded h-[4vh] sm:h-[6vh] md:h-[8vh] m-2" />
        {/* Desktop nav */}
        <nav className="hidden md:flex flex-1 flex-col h-full items-end justify-between">
          <div className="flex flex-1 gap-4 items-center">
            {userLinks.map((item) => (
              <Link
                key={item.label}
                to={item.link}
                className="text-gray-500 hover:text-black text-sm font-medium uppercase transition"

              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-6 ml-8">
            {mainLinks.map((item, idx) => (
              <Link
                key={item.label}
                to={item.link}
                className={`text-sm xl:text-base uppercase px-2 xl:px-4 py-1 xl:py-2 font-bold transition ${
                  whereiam(item.link) 
                    ? 'bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text text-transparent border-b-[5px] border-amber-600'
                    : 'text-gray-700 hover:text-black'
                }`}

              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center bg-gray-100 text-amber-600 p-2 rounded hover:text-gray-100 hover:bg-amber-600 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          // onMouseEnter={() => setMenuOpen(true)}
        >
          {menuOpen ? (
            <FaTimes className="w-7 h-7" />
          ) : (
            <FaBars className="w-7 h-7" />
          )}
        </button>
      </div>
      {/* Mobile menu */}
      {(
        <div className={`md:hidden bg-white absolute transition w-full z-0 border-gray-200 border ${menuOpen ? 'pop' : 'unpop'}`}>
          <div className="flex flex-col items-center py-4"> 
            <div className="flex flex-col flex-1 gap-1 items-end w-4/5">
              {userLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.link}
                  className="text-gray-500 hover:text-black text-sm font-medium uppercase transition"
                  onClick={e => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-1 w-4/5 transition">
              {mainLinks.map((item, idx) => (
                <Link
                  key={item.label}
                  to={item.link}
                  className={`text-sm xl:text-base uppercase px-4 py-2 font-bold transition ${
                    whereiam(item.link)
                      ? 'bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text text-transparent border-l-[5px] border-pink-600'
                      : 'text-gray-700 hover:text-black'
                  }`}
                  onClick={e => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
