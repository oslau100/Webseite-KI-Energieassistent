export type JsonRecord = Record<string, unknown>;

/**
 * Projektweite Core-Defaults.
 *
 * Für neue Kunden nur diese Datei anpassen/duplizieren,
 * damit die Seite ohne Supabase bereits möglichst nah am Ziel-Content läuft.
 */
export const customerDefaultWebsiteDesignConfig: JsonRecord = {
  colors: {
    primary: "#16a34a",
    text: "#0f172a",
    mutedText: "#64748b",
    background: "#ffffff",
  },
  radius: {
    section: "2.5rem",
  },
  assets: {
    logo_header: "",
    logo_footer: "",
    hero_image: "",
    agency_logo: "",
  },
};

export const customerDefaultWebsiteLayoutConfig: JsonRecord = {
  pages: {
    home: {
      sections: ["header", "hero", "problem", "solution", "how_it_works", "comparison", "testimonials", "about", "stats", "faq", "footer"],
    },
    annual: {
      sections: ["header", "hero", "process", "why", "value", "comparison", "testimonials", "about", "stats", "faq", "final_cta", "footer"],
    },
  },
};

export const customerDefaultWebsiteContentConfig: JsonRecord = {
  brand: {
    name: "Kromen Energieassistent",
    contact_email: "info@kromen-energieassistent.de",
    agency_url: "https://www.laurent-digital.de",
    agency_alt: "Made by Laurent Digital",
  },
  legal: {
    variables: {
      firma: "Kromen Energieassistent",
      inhaber: "Marcel Kromen",
      strasse: "Kavenstr. 10",
      plz: "52072",
      ort: "Aachen",
      land: "Deutschland",
      email: "info@kromen-energieassistent.de",
      telefon: "015214008825",
      stand: "April 2026",
    },
  },
  i18n: {},
  sections: {
    hero: {
      image_alt: "Energieassistent",
    },
    solution: {
      // Absichtlich leer, damit kein Marcel-Fallbackbild mehr gezeigt wird
      image_url: "",
      image_alt: "Energieassistent",
      body: "Du musst den Tarifmarkt nicht selbst verstehen oder vergleichen. Dein digitaler Energieassistent übernimmt das für dich.",
      result_note: "Ergebnis in 60 Sekunden - 100% kostenlos",
    },
    about: {
      avatar_url: "",
      person_name: "Marcel Kromen",
      role: "Experte für Strom & Gas",
      social_hint: "Folge mir auf den Sozialen Medien für Tipps rund um Strom & Gas",
      social: {
        youtube: "https://www.tiktok.com/@marcel_kromen?_r=1&_t=ZG-95GQrePUCGm",
        facebook: "https://www.facebook.com/share/1GMo5WR681/",
        instagram: "https://www.instagram.com/marcel_kromen?utm_source=qr&igsh=MTd6NWFrY3FtaGM2Zw==",
      },
      paragraph_1: "Ich bin Marcel Kromen und unterstütze Haushalte dabei, mehr Transparenz beim Thema Strom- und Gastarife zu bekommen und mögliche Einsparungen zu erkennen.",
      paragraph_2:
        "In meiner Arbeit habe ich immer wieder gesehen, wie unübersichtlich der Energiemarkt für viele Menschen geworden ist. Unterschiedliche Anbieter, ständig neue Tarife und komplizierte Vertragsbedingungen machen es schwer zu erkennen, welcher Tarif wirklich sinnvoll ist. Viele Haushalte beschäftigen sich deshalb erst dann mit ihrem Energievertrag, wenn eine hohe Nachzahlung kommt oder die Kosten plötzlich steigen.",
      paragraph_3:
        "Genau hier setze ich an. Mit dem digitalen Energieassistenten stelle ich ein System zur Verfügung, das Tarife automatisch prüft, Jahresrechnungen analysiert und verständlich zeigt, wo Einsparungen oder Auffälligkeiten liegen. So wird aus einem komplexen Energiethema eine klare und verständliche Lösung.",
      paragraph_4:
        "Mein Ziel ist es, so vielen Haushalten wie möglich zu helfen, ihre Energiekosten besser zu verstehen, unnötige Ausgaben zu vermeiden und langfristig Einsparungen zu erzielen ohne komplizierte Vergleiche oder zusätzlichen Aufwand.",
    },
    faq: {
      home_items: [
        {
          question: "Wie funktioniert die Tarifprüfung genau?",
          answer:
            "Der Energieassistent analysiert deine aktuellen Tarifdaten und vergleicht diese automatisch mit hunderten verfügbaren Angeboten auf dem Markt. Dabei werden Lockangebote und riskante Anbieter direkt herausgefiltert.",
        },
        {
          question: "Welche Aufgaben übernimmt der Energieassistent für mich?",
          answer:
            "Wir überwachen deine Kündigungsfristen, prüfen regelmäßig den Markt auf bessere Angebote und übernehmen den kompletten Wechselprozess für dich, sobald ein neuer Tarif sinnvoll ist.",
        },
        {
          question: "Ist die Tarifprüfung wirklich kostenlos?",
          answer: "Ja, die Prüfung deiner aktuellen Situation und die erste Empfehlung sind komplett kostenlos und unverbindlich.",
        },
      ],
    },
  },
};
