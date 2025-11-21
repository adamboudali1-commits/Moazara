import React, { useState, useEffect } from "react";

export default function Presentation() {
  const [modalImg, setModalImg] = useState(null);

  const images = [
    { src: "/results1.jpg", alt: "Résultat 1" },
    { src: "/results2.jpg", alt: "Résultat 2" },
    { src: "/results3.jpg", alt: "Résultat 3" },
    { src: "/results4.jpg", alt: "Résultat 4" },
    { src: "/results5.jpg", alt: "Résultat 5" },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setModalImg(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 px-6 py-8">
      {/* Image du haut */}
      <div
        className="w-full h-96 md:h-[28rem] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/presentation-bg.jpg')",
        }}
      >
        {/* Texte sans fond transparent */}
        <h1 className="text-white text-5xl md:text-7xl font-extrabold px-8 py-5 rounded">
          Programme Moazara
        </h1>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto mt-16 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Cadre de référence</h2>

        <p className="mb-4 leading-relaxed">
          Décret royal n° 1.58.376, réglementant le droit de constituer des associations,
          publié au Journal officiel n° 2404 bis du 16 joumada I 1378 (27 novembre 1958), p. 2849.
        </p>
        <p className="mb-4 leading-relaxed">
          Décret royal n° 1.15.83, publié le 20 ramadan 1436 (7 juillet 2015),
          portant application de la loi organique n° 111.14 relative aux régions.
        </p>
        <p className="mb-4 leading-relaxed">
          Décret royal n° 1.02.124, publié le 13 juin 2002, portant application de la loi n° 62.99 relative
          au Code des tribunaux financiers. Loi n° 12.112 relative aux coopératives, mise en œuvre
          par le décret royal n° 189.14.1 du 21 novembre 2014.
        </p>
        <p className="mb-4 leading-relaxed">
          Circulaire du Premier ministre n° 2003/7 du 27 juin 2003 relative au partenariat entre l'État et les
          organisations de la société civile.
        </p>
        <p className="mb-4 leading-relaxed">
          Programme du gouvernement, notamment en ce qui concerne la gouvernance, la transparence,
          et l’égalité dans l’accès aux aides publiques du ministère.
        </p>

        <h3 className="text-2xl font-semibold mt-8 mb-4 text-center">
          Présentation du programme
        </h3>

        <p className="mb-4 leading-relaxed">
          Le programme « Mouazara » s'inscrit dans le cadre de la contribution du ministère au financement
          de projets innovants présentés par des associations œuvrant dans l'économie sociale et solidaire.
        </p>

        <h3 className="text-2xl font-semibold mt-12 mb-4 text-center">
          Principaux objectifs du programme « Mouazara »
        </h3>

        <ul className="list-disc list-inside space-y-2">
          <li>Soutenir les acteurs de l'économie sociale et solidaire dans la mise en œuvre de projets innovants.</li>
          <li>Financer des projets à fort impact social et économique.</li>
          <li>Encourager un tissu associatif dynamique et structuré.</li>
        </ul>

        {/* Résultat du programme de soutien */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Résultat du programme de soutien</h2>

          <div className="overflow-x-auto">
            <div className="flex space-x-6 pb-4">
              {images.map(({ src, alt }) => (
                <img
                  key={src}
                  src={src}
                  alt={alt}
                  className="h-48 w-72 object-cover rounded-xl shadow-lg cursor-pointer
                    transition-transform duration-300 hover:scale-105 flex-shrink-0"
                  onClick={() => setModalImg(src)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Section Directives déplacée en bas */}
      <section className="max-w-4xl mx-auto mt-16 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Directives</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Objectif de l'appel à projets</h3>
            <p>
              L'appel à projets du programme Mu'asara vise à contribuer au financement de projets innovants
              pour les associations et réseaux d'associations œuvrant dans l'économie sociale et solidaire.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Partenariat avec les conseils régionaux</h3>
            <p>
              Le Secrétariat d'État à l'Artisanat et à l'Économie sociale et solidaire travaillera en partenariat
              avec les conseils régionaux ayant signé des conventions spécifiques pour contribuer au financement
              des projets proposés par les associations et réseaux d'associations sur l'ensemble du territoire.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Comment demander un soutien ?</h3>
            <p className="mb-4">
              Les associations, réseaux d'associations et coopératives affiliés aux conseils régionaux partenaires doivent :
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Remplir le dossier de demande de soutien.</li>
              <li>Joindre les documents et justificatifs suivants :
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-sm text-gray-700">
                  <li>Copie des statuts de l'association ou coopérative</li>
                  <li>Copie du récépissé de dépôt légal</li>
                  <li>Rapport moral et financier de l'année précédente</li>
                  <li>Relevé d'identité bancaire</li>
                </ul>
              </li>
              <li>Soumettre dans les délais impartis.</li>
            </ul>

            <div className="mt-6 text-center">
              <a
                href="/formulaire_moazara.pdf"
                download
                className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
              >
                📥 Télécharger le formulaire de demande
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Conditions et mise en œuvre</h3>
            <p>
              Un comité de sélection examinera les demandes de soutien. Le montant ne doit pas dépasser
              49 000 DH pour les associations et 50 000 DH pour les coopératives.
              Le projet doit être mis en œuvre immédiatement après le financement, avec rapport détaillé à envoyer
              au ministère sous 1 mois.
            </p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setModalImg(null)}
        >
          <img
            src={modalImg}
            alt="Zoom"
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
