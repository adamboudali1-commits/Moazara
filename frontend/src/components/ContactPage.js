import React from 'react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Section Google Maps */}
      <div className="w-full h-[400px]">
        <iframe
          title="Localisation Rabat Agdal - Av. el Hadj Ahmed Charkaoui"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.6784645045983!2d-6.839306484800081!3d33.998004528215594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76d04d7c91eaf%3A0x7aa5f1d2ee67d263!2sAvenue%20El%20Hadj%20Ahmed%20Charkaoui%2C%20Rabat!5e0!3m2!1sfr!2sma!4v1699974000000!5m2!1sfr!2sma"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          className="border-0"
        />
      </div>

      {/* Section image de fond + texte */}
      <div
        className="min-h-[70vh] w-full bg-cover bg-center flex items-center justify-center text-white text-xl font-semibold leading-relaxed p-8 whitespace-pre-line text-center"
        style={{ backgroundImage: "url('/bg-contact.jpg')" }}
      >
        {`Secrétariat d'État à l'Artisanat, à l'Économie Sociale et à la Solidarité
Adresse : Av. el Hadj Ahmed Charkaoui, Agdal, Rabat
Direction de la Promotion de l'Économie Sociale
Téléphone : 06.64.62.39.50
Courriel : hdakkouni@artesnet.gov.ma

Horaires d'ouverture
Du lundi au vendredi, de 8h30 à 16h30
Samedi et dimanche – Fermé`}
      </div>
    </div>
  );
}
