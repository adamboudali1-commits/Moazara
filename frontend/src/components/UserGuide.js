import React from 'react';

export default function UserGuide() {
  const steps = [
    {
      title: " se connecter(Admin,Agent)",
      description: "Pour commencer, inscrivez-vous ou connectez-vous via la page d’accueil pour accéder à votre espace personnel.",
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 15h1a1 1 0 001-1v-2a1 1 0 00-1-1H9.284a1 1 0 00-1 .7l-.634 1.834A2 2 0 008.284 15H12z" /></svg>
      )
    },
    {
      title: "Accéder à l'espace de soumission",
      description: "Une fois connecté, rendez-vous dans votre tableau de bord pour trouver l’espace de soumission de votre demande.",
      icon: (
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
      )
    },
    {
      title: "Remplir le formulaire",
      description: "Remplissez les cinq étapes du formulaire avec le plus de précision possible. Chaque étape est importante pour la validation de votre dossier.",
      icon: (
        <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
      )
    },
    {
      title: "Soumettre et noter le code de suivi",
      description: "Après avoir soumis votre demande, un code de suivi unique sera généré. **N'oubliez pas de le noter** pour vérifier l'état de votre dossier.",
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.818 17.828a4 4 0 005.656 0M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6m-6-5a4 4 0 100-8 4 4 0 000 8z" /></svg>
      )
    },
    {
      title: "Suivre l'état de votre demande",
      description: "Dans la section « Suivi », utilisez votre code pour voir l'avancement de votre dossier et les prochaines étapes à suivre.",
      icon: (
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
      )
    },
    {
      title: "Contacter l’assistance",
      description: "Si vous avez besoin d'aide ou si vous rencontrez des problèmes, notre équipe d’assistance est disponible via la page « Contactez-nous ».",
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 1h-1a2 2 0 01-2-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v1a2 2 0 01-2 2H5a2 2 0 00-2 2v2a2 2 0 002 2h1a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1a2 2 0 002-2v-2a2 2 0 00-2-2h-1z" /></svg>
      )
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Guide de l'utilisateur
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Suivez ces étapes pour soumettre et gérer votre demande facilement.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300">
              <div className="flex-shrink-0 mr-6 mb-4 sm:mb-0">
                <div className={`p-4 rounded-full bg-opacity-20 ${
                  index === 0 ? 'bg-blue-100' :
                  index === 1 ? 'bg-green-100' :
                  index === 2 ? 'bg-yellow-100' :
                  index === 3 ? 'bg-orange-100' :
                  index === 4 ? 'bg-red-100' :
                  'bg-purple-100'
                }`}>
                  {step.icon}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  <span className="text-gray-500 font-light mr-2">Étape {index + 1}:</span> {step.title}
                </h2>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}