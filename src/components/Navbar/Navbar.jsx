import React, { useState } from "react";
import Logo from "../../assets/maxi3d.png";
// import Logo from "../../assets/maximus-vinyl-3d-logo-crop.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navbarRedes = [
    {
      id: 1,
      title: "Instagram",
      link: "https://www.instagram.com",
      icon: "bi bi-instagram",
    },
    {
      id: 2,
      title: "Tiktok",
      link: "https://www.tiktok.com",
      icon: "bi bi-tiktok",
    },
  ];

  const navbarLinks = [
    {
      id: 1,
      title: "About",
      link: "/",
    },
    {
      id: 2,
      title: "Contact",
      link: "#",
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-300 bg-opacity-30 backdrop-blur-md z-50 transition-all duration-300">
      <div className="flex justify-between items-center sm:px-12 sm:py-2 px-4 py-1">
        {/* Logo */}
        <div className="flex items-center gap-2 md:ml-[4rem]">
          <img src={Logo} alt="Logo" className="w-[230px]" />
        </div>

        {/* Botón de menú hamburguesa - visible solo en móvil */}
        <button className="md:hidden text-white p-2" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Navegación - visible en desktop */}
        {/* <div className="hidden md:block">
          <ul className="flex sm:space-x-8 space-x-4 px-4">
            {navbarLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.link}
                  className="sm:text-lg text-sm lg:text-xl font-black tracking-tighter text-gray-700 lg:text-lg 2xl:text-xl animate-glow-pulse hover:text-sky-100 transition-transform duration-300 transform hover:scale-110 inline-block"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Redes - visible en desktop */}
        {/* <div className="hidden md:block font-black tracking-tighter text-gray-700 lg:text-lg 2xl:text-xl animate-glow-pulse">
          <ul className="flex space-x-4 ">
            {navbarRedes.map((link) => (
              <li key={link.id}>
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block  transition-transform font-black tracking-tighter text-gray-700 lg:text-lg 2xl:text-xl animate-glow-pulse duration-300 transform hover:scale-125"
                >
                  <i
                    className={`${link.icon} sm:text-2xl text-lg font-black tracking-tighter text-gray-700 lg:text-2xl 2xl:text-3xl animate-glow-pulse transition-all duration-300 hover:text-sky-100`}
                  ></i>
                </a>
              </li>
            ))}
          </ul>
        </div> */}
        {/*  */}
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase text-gray-400">
          <a href="#services" className="hover:text-cyan-400 transition-colors">
            Services
          </a>
          <a href="#process" className="hover:text-cyan-400 transition-colors">
            Process
          </a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">
            Contact
          </a>
        </div>

        <button className="hidden md:block px-6 py-2 md:mr-[4rem] border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 transition-all rounded-full text-xs font-bold tracking-[0.2em]">
          GET A QUOTE
        </button>

        <button
          className="md:hidden text-gray-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/*  */}
      </div>

      {/* Menú móvil */}
      <div
        className={`md:hidden absolute w-full bg-gray-950 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Links de navegación móvil */}
        {/* <ul className="flex flex-col px-4 py-2">
          {navbarLinks.map((link) => (
            <li key={link.id} className="py-2 text-center">
              <a
                href={link.link}
                className="text-white hover:text-sky-100 block"
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul> */}

        {/* Redes sociales móvil */}
        {/* <ul className="flex space-x-4 px-4 py-2 border-t border-gray-700 justify-center">
          {navbarRedes.map((link) => (
            <li key={link.id}>
              <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
                onClick={() => setIsOpen(false)}
              >
                <i
                  className={`${link.icon} text-lg text-white hover:text-sky-100`}
                ></i>
              </a>
            </li>
          ))}
        </ul> */}

        <style jsx>{`
          @keyframes glow-pulse {
            0%,
            100% {
              text-shadow: 0 0 4px rgba(12, 138, 234, 0.31),
                0 0 10px rgba(12, 138, 234, 0.31);
            }
            50% {
              text-shadow: 0 0 10px rgba(12, 138, 234, 0.31),
                0 0 20px rgba(12, 138, 234, 0.31),
                0 0 30px rgba(12, 138, 234, 0.31);
            }
          }
          .animate-glow-pulse {
            animation: glow-pulse 4s ease-in-out infinite;
          }
        `}</style>
      </div>
    </nav>
  );
};

export default Navbar;
