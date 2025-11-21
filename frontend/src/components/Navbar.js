import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Component pour les icônes
const SvgIcon = ({ path, className = "w-4 h-4 mr-2" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const MoonIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    stroke="none"
  >
    <path d="M21 12.79A9 9 0 0112.21 3 7 7 0 1019 16.79z" />
  </svg>
);

const SunIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v1m0 16v1m8.485-8.485h1M4.515 12h1m12.02 4.95l.707.707M6.343 6.343l.707.707m12.02 0l-.707.707M6.343 17.657l-.707.707M12 7a5 5 0 000 10 5 5 0 000-10z"
    />
  </svg>
);

// Component de bouton de navigation réutilisable
const NavButton = ({ to, onClick, children, className = "", ...props }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={(e) => {
        if (to && to !== "#") navigate(to);
        if (onClick) onClick(e);
      }}
      className={`font-semibold py-2 px-4 transition-all duration-300
        hover:opacity-100 hover:scale-105 active:scale-95
        cursor-pointer select-none relative after:content-['']
        after:absolute after:bottom-0 after:left-1/2 after:w-0
        after:h-[2px] after:bg-current after:transition-all
        after:duration-300 after:ease-in-out hover:after:w-full
        hover:after:left-0 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [moazaraOpen, setMoazaraOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => window.localStorage.getItem("darkMode") === "true" || false
  );
  const moazaraRef = useRef();

  const isHome = location.pathname === "/";
  const role = localStorage.getItem("role");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    window.localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moazaraRef.current && !moazaraRef.current.contains(event.target)) {
        setMoazaraOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navColors = {
    light: {
      navbar: isHome ? "bg-transparent" : "bg-white shadow-md",
      textBtn: "text-amber-900/80 hover:text-amber-900",
      dropdownBg: "bg-white border-gray-200",
      dropdownItem: "hover:bg-amber-100 text-amber-900",
      toggleBtn: "border-gray-400 bg-white text-gray-700 hover:bg-gray-100",
    },
    dark: {
      navbar: "bg-gray-900 shadow-lg",
      textBtn: "text-amber-300/80 hover:text-amber-300",
      dropdownBg: "bg-gray-800 border-gray-700",
      dropdownItem: "hover:bg-amber-800/40 text-amber-300",
      toggleBtn: "border-amber-300 bg-amber-700 text-white hover:bg-amber-600",
    },
  };

  const currentColors = darkMode ? navColors.dark : navColors.light;

  const moazaraItems = [
    { label: "Présentation", path: "/presentation", iconPath: "M3 7h18M3 12h18M3 17h18" },
    { label: "Questions posées", path: "/faq", iconPath: "M12 4.354a8 8 0 100 15.292 8 8 0 000-15.292zM11 10h2v2h-2v-2zm0 4h2v2h-2v-2z" },
    { label: "Guide de l'utilisateur", path: "/guide", iconPath: "M4 19.5A2.5 2.5 0 016.5 17H20m-16 2.5V5a2 2 0 012-2h11.5a2.5 2.5 0 012.5 2.5V17m-16 2.5H20" },
    { label: "Contactez-nous", path: "/contact", iconPath: "M21 12c0 4.418-4.03 8-9 8S3 16.418 3 12 7.03 4 12 4s9 3.582 9 8z" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 flex items-center justify-between
        ${currentColors.navbar} transition-all duration-300`}
      style={{ minHeight: "80px" }}
    >
      <div className="flex space-x-4 items-center relative">
        <NavButton to="/" className={currentColors.textBtn}>Accueil</NavButton>
        <NavButton to="/submit-form" className={currentColors.textBtn}>Remplir une demande</NavButton>
        <NavButton to="/suivi" className={currentColors.textBtn}>Suivi de demande</NavButton>

        <div className="relative" ref={moazaraRef}>
          <NavButton
            to="#"
            onClick={(e) => {
              e.stopPropagation();
              setMoazaraOpen(!moazaraOpen);
            }}
            className={`${currentColors.textBtn} flex items-center`}
          >
            Moazara ▾
          </NavButton>

          {moazaraOpen && (
            <div
              className={`absolute top-full mt-2 w-64 rounded-2xl shadow-2xl z-50 overflow-hidden border
                ${currentColors.dropdownBg} transition-all duration-300 ease-in-out
                ${moazaraOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}`}
              style={{ transformOrigin: "top" }}
            >
              <ul className="flex flex-col text-left text-sm">
                {moazaraItems.map((item, index) => (
                  <li key={index}>
                    <NavButton
                      to={item.path}
                      onClick={() => setMoazaraOpen(false)}
                      className={`w-full text-left px-6 py-3 ${currentColors.dropdownItem} flex items-center`}
                    >
                      <SvgIcon path={item.iconPath} className="w-4 h-4 mr-3" />
                      {item.label}
                    </NavButton>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {role === "admin" && (
          <NavButton to="/admin/users" className={currentColors.textBtn}>Gestion utilisateurs</NavButton>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {/* 🚀 Bouton Chat AI via Chatbase */}
        <button
  onClick={() => window.chatbase && window.chatbase("openWidget")}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
>
  🤖 Chat AI
</button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle mode sombre"
          className={`p-2 rounded-full border transition ${currentColors.toggleBtn} cursor-pointer`}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>

        <div>
          <img
            src="/logo.png"
            alt="Logo Ministère du Tourisme Maroc"
            className={`h-16 object-contain cursor-pointer transition duration-300 hover:scale-105 hover:drop-shadow-lg ${isHome ? "filter brightness-100" : ""}`}
            style={{ maxHeight: "80px" }}
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </nav>
  );
}
