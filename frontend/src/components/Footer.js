// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-24 px-20">
      <div className="max-w-8xl mx-auto flex justify-between items-start flex-wrap gap-20">

        {/* Logo gauche + texte */}
        <div className="flex flex-col items-center w-60">
          <img
            src="/logo-gauche.png"
            alt="Logo Gauche"
            className="w-40 h-40 object-contain"
          />
          <p className="mt-6 text-gray-400 text-center text-lg font-semibold tracking-wide max-w-xs whitespace-pre-line leading-relaxed">
            وزارة السياحة و الصناعة التقليدية والاقتصاد الاجتماعي والتضامني
            كتابة الدولة المكلفة بالصناعة التقليدية والاقتصاد الاجتماعي والتضامني
            ⵜⴰⵎⴰⵡⴰⵙⵜ ⵏ ⵜⵎⴰⵍⵍⴰⵢⵜ ⴷ ⵜⵏⵉⴹⵉ ⴷ ⵜⴷⵎⵙⴰ ⵜⴰⵏⴰⵎⵓⵏⵜ ⴷ ⵜⵏⵎⵢⴰⵡⴰⵙⵜ
            ⵜⵉⵎⵉⵔⵉⵜ ⵏ ⵓⵡⴰⵏⴽ ⵉⵜⵜⵓⵙⵎⴰⴳⵍⵏ ⵙ ⵜⵏⵉⴹⵉ ⴷ ⵜⴷⵎⵙⴰ ⵜⴰⵏⴰⵎⵓⵏⵜ ⴷ ⵜⵏⵎⵢⴰⵡⴰⵙ
          </p>
        </div>

        {/* Bloc central Contact */}
        <div className="flex flex-col items-center w-80 text-center">
          <h3 className="text-white text-2xl font-semibold mb-4">Contactez-nous</h3>
          <a
            href="mailto:contact@moazara.ma"
            className="text-gray-400 mb-6 hover:text-white transition-colors break-words"
          >
            contact@moazara.ma
          </a>
          <div className="flex gap-8 justify-center mb-6">
            <a
              href="https://www.instagram.com/seaess.gov.ma/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-600 hover:bg-pink-700 transition-colors rounded-full p-3"
              aria-label="Instagram"
            >
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0016.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.5-3a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
              </svg>
            </a>

            <a
              href="https://www.facebook.com/SEAESS.gov.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 hover:bg-blue-800 transition-colors rounded-full p-3"
              aria-label="Facebook"
            >
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 3h-1.8v7A10 10 0 0022 12z" />
              </svg>
            </a>
          </div>

          {/* Bouton Contactez-nous vers /contact */}
          <Link to="/contact">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
              Contactez-nous
            </button>
          </Link>
        </div>

        {/* Logo droit + texte */}
        <div className="flex flex-col items-center w-60">
          <img
            src="/logo-droit.png"
            alt="Logo Droit"
            className="w-40 h-40 object-contain"
          />
          <p className="mt-6 text-gray-400 text-center text-lg font-semibold tracking-wide max-w-xs whitespace-pre-line leading-relaxed">
            مديرية إنعاش الاقتصاد الاجتماعي
            ⵜⴰⵎⵀⵍⴰ ⵓⵙⴷⴷⵔ ⵏ ⵜⴷⴰⵎⵙⴰ ⵜⴰⵏⴰⵎⵓⵏⵜ
            شارع ماء العينين ، ص.ب 6435 ، أكدال ، الرباط – المغرب
            الهاتف : 05.37.27.62.90/91
          </p>
        </div>
      </div>

      <div className="mt-16 text-center text-gray-500 text-base select-none">
        © {new Date().getFullYear()} Moazara. Tous droits réservés.
      </div>
    </footer>
  );
}
