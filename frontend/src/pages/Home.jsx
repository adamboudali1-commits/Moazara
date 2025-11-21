import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center text-center px-6 w-full bg-cover bg-center flex-grow"
      style={{
        backgroundImage: "url('/background.jpg')",
        minHeight: "calc(100vh - 160px)", // hauteur totale moins navbar + footer
      }}
    >
      <div className="max-w-3xl">
        <h1
          className="text-white text-5xl md:text-6xl font-extrabold mb-8"
          style={{
            textShadow:
              '0 2px 6px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.7)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            letterSpacing: '0.05em',
          }}
        >
          Programme Moazara
        </h1>
        <p
          className="text-white text-2xl md:text-3xl mb-12"
          style={{
            textShadow: '0 1px 5px rgba(0,0,0,0.7)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            lineHeight: '1.4',
          }}
        >
          Programme national de soutien à l'économie sociale et solidaire
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-green-600 text-white font-semibold px-8 py-4 rounded-full shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-green-700 focus:outline-none"
          style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            letterSpacing: '0.05em',
          }}
        >
          Appuyer ici pour s’authentifier
        </button>
      </div>
    </div>
  );
}
