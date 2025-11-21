import React, { useState } from 'react';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    {
      question: "Qu'est-ce que le programme « Moazara » ?",
      answer: "Le programme « Moazara » s'inscrit dans le cadre de la contribution du Ministère au financement de projets de développement innovants et intégrés portés par des associations et des réseaux d'associations œuvrant dans l'économie sociale et solidaire.",
    },
    {
      question: "Quels sont les principaux objectifs du programme « Mu'awazra » ?",
      answer: (
        <ul className="list-disc list-inside space-y-2">
          <li>Soutenir et accompagner les acteurs de l'économie sociale et solidaire dans le lancement, la mise en œuvre et le développement de projets socio-économiques innovants.</li>
          <li>Contribuer au financement de projets innovants, flexibles et réalisables, répondant aux besoins de production de biens et services à forte valeur ajoutée et ayant un impact social et économique durable et mesurable.</li>
          <li>Mettre en place un tissu associatif permettant d'encadrer et d'accompagner les acteurs de l'économie sociale et solidaire.</li>
        </ul>
      ),
    },
    {
      question: "Quels sont les documents requis pour l'inscription au programme pour les associations et les réseaux associatifs ?",
      answer: (
        <ul className="list-disc list-inside space-y-2">
          <li>Une demande adressée au Secrétaire d'État chargé de l'Artisanat, de l'Économie sociale et solidaire (télécharger le formulaire via la plateforme dédiée).</li>
          <li>Une copie du récépissé de dépôt de garantie de l'association.</li>
          <li>Une copie des statuts.</li>
          <li>Une copie du procès-verbal de l'assemblée générale constitutive.</li>
          <li>Une copie du procès-verbal de la dernière assemblée générale.</li>
          <li>Une copie du rapport financier et comptable de la dernière séance.</li>
          <li>Une liste des membres du bureau exécutif de l'association.</li>
          <li>Une attestation d'identification fiscale.</li>
          <li>Un relevé de compte bancaire de l'association datant de moins de trois mois à la date de signature.</li>
          <li>L'association doit être titulaire d'un compte ouvert auprès de la Trésorerie générale du Royaume.</li>
          <li>Un relevé des opérations bancaires effectuées sur le compte de l'association au cours des trois derniers mois.</li>
          <li>
            Pour le siège social :
            <ul className="list-disc list-inside ml-6 space-y-1 mt-2">
              <li>Si détenu par l'association : un certificat de propriété.</li>
              <li>Si loué : le contrat de bail.</li>
              <li>Si mis à disposition : une preuve de disponibilité.</li>
            </ul>
          </li>
          <li>Un curriculum vitae du porteur de projet.</li>
          <li>Un procès-verbal de la réunion du conseil d'administration de l'association ayant validé le projet, signé et scellé par le président ou représentant légal.</li>
          <li>Une déclaration sur l'honneur certifiée par les autorités locales, confirmant l'exactitude des informations fournies (formulaire téléchargeable).</li>
          <li><strong className="text-red-600">« Les offres seront envoyées après approbation du projet. »</strong></li>
        </ul>
      ),
    },
    {
      question: "Comment soumettre une demande ?",
      answer: "Accédez au formulaire via le bouton 'Soumettre une demande', remplissez les informations et validez.",
    },
    {
      question: "Quels types de soutien sont offerts dans le cadre du programme « Moazara » ?",
      answer: "Le soutien au programme « Mu'azra » est un soutien financier direct visant à l'achat d'équipements et de matières premières, ainsi qu'à la mise en place de programmes et de formations.",
    },
    {
      question: "Quand la demande de devis est-elle envoyée ?",
      answer: "La demande de devis est envoyée après approbation du projet soumis par les membres du comité.",
    },
    {
      question: "Comment les bénéficiaires du programme sont-ils sélectionnés ?",
      answer: "La sélection repose sur la nature du projet proposé dans le cadre de soutien.",
    },
    {
      question: "Quelles coopératives sont éligibles ?",
      answer: (
        <>
          <p>Les coopératives éligibles, dans le cadre de conventions particulières signées avec les conseils régionaux, sont :</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Coopératives de la région de Fès-Meknès,</li>
            <li>Coopératives de la région de l’Oriental,</li>
            <li>Coopératives de la région de Tanger-Tétouan-Al Hoceima,</li>
            <li>Coopératives de la région de Dakhla-Oued Eddahab,</li>
            <li>Coopératives de la région de Drâa-Tafilalet.</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      
      {/* Bannière de titre */}
      <header className="relative py-24 sm:py-32 bg-gray-900 overflow-hidden" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/bg-faq.jpg')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
            Questions fréquentes
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
            Retrouvez ici les réponses aux questions les plus courantes concernant le programme "Moazara".
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 lg:py-20">
        
        {/* Section FAQ */}
        <section className="max-w-4xl mx-auto space-y-6">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ${activeIndex === idx ? 'shadow-2xl border-blue-400' : 'hover:shadow-xl'}`}
            >
              <button
                onClick={() => toggleAnswer(idx)}
                className="w-full text-left p-6 flex justify-between items-center group focus:outline-none"
              >
                <span className={`text-xl font-semibold text-gray-900 transition-colors duration-200 ${activeIndex === idx ? 'text-blue-600' : 'group-hover:text-blue-600'}`}>
                  {q.question}
                </span>
                <span
                  className={`text-2xl text-gray-400 transform transition-transform duration-[200ms] ease-in-out ${
                    activeIndex === idx ? 'rotate-45 text-blue-500' : 'rotate-0'
                  }`}
                >
                  +
                </span>
              </button>
              
              <div
                className={`transition-all duration-[200ms] ease-in-out overflow-hidden ${
                  activeIndex === idx ? 'max-h-screen opacity-100 pt-4' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  {q.answer}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Barre d'info en bas */}
        <footer className="max-w-4xl mx-auto mt-12">
          <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-8 p-8 bg-white border-l-4 border-blue-500 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 text-blue-600">
              <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold">Plus d'informations</h3>
            </div>
            <div className="flex-1 text-gray-700">
              <p className="mb-4">
                Pour toute question supplémentaire, n'hésitez pas à nous contacter.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.293 1.147a1 1 0 00-.493 1.082l2.924 2.924a1 1 0 001.082-.493l1.147-2.293a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+212664623950" className="font-semibold text-blue-700 hover:underline">
                    06.64.62.66.56
                  </a>
                  <span className="text-gray-500">- Mme rania </span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:hdakkouni@artesnet.gov.ma" className="font-semibold text-blue-700 hover:underline">
                    ihavenop@artesnet.gov.ma
                  </a>
                </li>
                <li className="flex items-start space-x-3 mt-4">
                  <svg className="w-5 h-5 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">
                    Vous pouvez également contacter les directions régionales ou provinciales de l'artisanat traditionnel et de l'économie sociale et solidaire dans votre ressort territorial.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default FAQPage;