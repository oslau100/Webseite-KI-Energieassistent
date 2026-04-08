import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

export const LANGUAGES = [
  { code: "de", label: "Deutsch", flagUrl: "https://flagcdn.com/w40/de.png" },
  { code: "en", label: "English", flagUrl: "https://flagcdn.com/w40/gb.png" },
  { code: "tr", label: "Türkçe", flagUrl: "https://flagcdn.com/w40/tr.png" },
  { code: "ru", label: "Русский", flagUrl: "https://flagcdn.com/w40/ru.png" },
  { code: "ar", label: "العربية", flagUrl: "https://flagcdn.com/w40/sa.png" },
  { code: "it", label: "Italiano", flagUrl: "https://flagcdn.com/w40/it.png" },
  { code: "zh", label: "中文", flagUrl: "https://flagcdn.com/w40/cn.png" },
  { code: "hi", label: "हिन्दी", flagUrl: "https://flagcdn.com/w40/in.png" },
  { code: "es", label: "Español", flagUrl: "https://flagcdn.com/w40/es.png" },
  { code: "fr", label: "Français", flagUrl: "https://flagcdn.com/w40/fr.png" },
  { code: "nl", label: "Nederlands", flagUrl: "https://flagcdn.com/w40/nl.png" },
  { code: "pl", label: "Polski", flagUrl: "https://flagcdn.com/w40/pl.png" },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

type Dictionary = Record<string, string>;

const dictionaries: Record<LangCode, Dictionary> = {
  de: {
    cta_check_savings: "Jetzt Ersparnis prüfen",
    header_check_bill: "Jahresabrechnung prüfen",
    header_check_savings: "Tarifersparnis prüfen",
    footer_contact: "Kontakt",
    footer_callback: "Rückruf anfordern",
    footer_legal: "Rechtliches",
    footer_privacy: "Datenschutz",
    footer_imprint: "Impressum",
    footer_rights: "Alle Rechte vorbehalten.",
    cookie_title: "Privatsphäre-Einstellungen",
    cookie_copy_1:
      "Wir verwenden essenzielle Cookies für den Betrieb und optionale Marketing-Cookies nur mit Ihrer Einwilligung.",
    cookie_copy_2:
      "Sie können jederzeit Ihre Auswahl ändern. Standardmäßig sind nur essenzielle Cookies aktiv.",
    cookie_marketing: "Marketing",
    cookie_essential: "Essenziell",
    cookie_save: "Einstellungen speichern",
    cookie_accept_all: "Alle akzeptieren",
    callback_title: "Rückruf anfordern",
  },
  en: {
    cta_check_savings: "Check savings potential",
    header_check_bill: "Review annual utility statement",
    header_check_savings: "Review tariff savings",
    footer_contact: "Contact",
    footer_callback: "Request a callback",
    footer_legal: "Legal",
    footer_privacy: "Privacy",
    footer_imprint: "Legal notice",
    footer_rights: "All rights reserved.",
    cookie_title: "Privacy settings",
    cookie_copy_1: "We use essential cookies for site operation and optional marketing cookies only with your consent.",
    cookie_copy_2: "You can change your choices at any time. By default, only essential cookies are enabled.",
    cookie_marketing: "Marketing",
    cookie_essential: "Essential",
    cookie_save: "Save settings",
    cookie_accept_all: "Accept all",
    callback_title: "Request a callback",
  },
  tr: {
    cta_check_savings: "Tasarruf potansiyelini kontrol et",
    header_check_bill: "Yıllık enerji faturası incelemesi",
    header_check_savings: "Tarife tasarrufunu incele",
    footer_contact: "İletişim",
    footer_callback: "Geri arama talep et",
    footer_legal: "Yasal bilgiler",
    footer_privacy: "Gizlilik",
    footer_imprint: "Künye",
    footer_rights: "Tüm hakları saklıdır.",
    cookie_title: "Gizlilik ayarları",
    cookie_copy_1: "Siteyi çalıştırmak için gerekli çerezleri, pazarlama çerezlerini ise yalnızca onayınızla kullanırız.",
    cookie_copy_2: "Tercihlerinizi istediğiniz zaman değiştirebilirsiniz. Varsayılan olarak yalnızca gerekli çerezler aktiftir.",
    cookie_marketing: "Pazarlama",
    cookie_essential: "Gerekli",
    cookie_save: "Ayarları kaydet",
    cookie_accept_all: "Tümünü kabul et",
    callback_title: "Geri arama talep et",
  },
  ru: {
    cta_check_savings: "Проверить потенциал экономии",
    header_check_bill: "Проверить годовой счёт за энергию",
    header_check_savings: "Проверить экономию по тарифу",
    footer_contact: "Контакты",
    footer_callback: "Заказать обратный звонок",
    footer_legal: "Правовая информация",
    footer_privacy: "Конфиденциальность",
    footer_imprint: "Выходные данные",
    footer_rights: "Все права защищены.",
    cookie_title: "Настройки конфиденциальности",
    cookie_copy_1: "Мы используем обязательные cookie для работы сайта, а маркетинговые — только с вашего согласия.",
    cookie_copy_2: "Вы можете изменить выбор в любой момент. По умолчанию включены только обязательные cookie.",
    cookie_marketing: "Маркетинг",
    cookie_essential: "Обязательные",
    cookie_save: "Сохранить настройки",
    cookie_accept_all: "Принять все",
    callback_title: "Заказать обратный звонок",
  },
  ar: {
    cta_check_savings: "تحقّق من إمكانية التوفير",
    header_check_bill: "مراجعة فاتورة الطاقة السنوية",
    header_check_savings: "مراجعة توفير التعرفة",
    footer_contact: "التواصل",
    footer_callback: "طلب معاودة الاتصال",
    footer_legal: "معلومات قانونية",
    footer_privacy: "الخصوصية",
    footer_imprint: "البيانات القانونية",
    footer_rights: "جميع الحقوق محفوظة.",
    cookie_title: "إعدادات الخصوصية",
    cookie_copy_1: "نستخدم ملفات تعريف ارتباط أساسية لتشغيل الموقع، وملفات التسويق فقط بعد موافقتك.",
    cookie_copy_2: "يمكنك تعديل اختياراتك في أي وقت. افتراضيًا يتم تفعيل الملفات الأساسية فقط.",
    cookie_marketing: "التسويق",
    cookie_essential: "أساسية",
    cookie_save: "حفظ الإعدادات",
    cookie_accept_all: "قبول الكل",
    callback_title: "طلب معاودة الاتصال",
  },
  it: {
    cta_check_savings: "Verifica il potenziale di risparmio",
    header_check_bill: "Controlla il conguaglio annuale energia",
    header_check_savings: "Controlla il risparmio tariffario",
    footer_contact: "Contatti",
    footer_callback: "Richiedi richiamata",
    footer_legal: "Note legali",
    footer_privacy: "Privacy",
    footer_imprint: "Informazioni legali",
    footer_rights: "Tutti i diritti riservati.",
    cookie_title: "Impostazioni privacy",
    cookie_copy_1: "Utilizziamo cookie essenziali per il funzionamento del sito e cookie marketing opzionali solo con il tuo consenso.",
    cookie_copy_2: "Puoi modificare le preferenze in qualsiasi momento. Per impostazione predefinita sono attivi solo i cookie essenziali.",
    cookie_marketing: "Marketing",
    cookie_essential: "Essenziali",
    cookie_save: "Salva impostazioni",
    cookie_accept_all: "Accetta tutto",
    callback_title: "Richiedi richiamata",
  },
  zh: {
    cta_check_savings: "立即查看可节省金额",
    header_check_bill: "核查年度能源账单",
    header_check_savings: "核查资费节省空间",
    footer_contact: "联系我们",
    footer_callback: "申请回电",
    footer_legal: "法律信息",
    footer_privacy: "隐私",
    footer_imprint: "法律声明",
    footer_rights: "保留所有权利。",
    cookie_title: "隐私设置",
    cookie_copy_1: "我们使用站点运行所必需的 Cookie，营销类 Cookie 仅在您同意后启用。",
    cookie_copy_2: "您可随时调整选择。默认仅启用必要 Cookie。",
    cookie_marketing: "营销",
    cookie_essential: "必要",
    cookie_save: "保存设置",
    cookie_accept_all: "全部接受",
    callback_title: "申请回电",
  },
  hi: {
    cta_check_savings: "बचत की संभावनाएँ जाँचें",
    header_check_bill: "वार्षिक ऊर्जा बिल की जाँच करें",
    header_check_savings: "टैरिफ बचत की जाँच करें",
    footer_contact: "संपर्क",
    footer_callback: "कॉलबैक का अनुरोध करें",
    footer_legal: "कानूनी जानकारी",
    footer_privacy: "गोपनीयता",
    footer_imprint: "कानूनी सूचना",
    footer_rights: "सर्वाधिकार सुरक्षित।",
    cookie_title: "गोपनीयता सेटिंग्स",
    cookie_copy_1: "हम वेबसाइट संचालन के लिए आवश्यक कुकीज़ और वैकल्पिक मार्केटिंग कुकीज़ केवल आपकी सहमति से उपयोग करते हैं।",
    cookie_copy_2: "आप अपनी पसंद कभी भी बदल सकते हैं। डिफ़ॉल्ट रूप से केवल आवश्यक कुकीज़ सक्रिय रहती हैं।",
    cookie_marketing: "मार्केटिंग",
    cookie_essential: "आवश्यक",
    cookie_save: "सेटिंग्स सहेजें",
    cookie_accept_all: "सभी स्वीकार करें",
    callback_title: "कॉलबैक का अनुरोध करें",
  },
  es: {
    cta_check_savings: "Comprobar potencial de ahorro",
    header_check_bill: "Revisar la factura anual de energía",
    header_check_savings: "Revisar ahorro de tarifa",
    footer_contact: "Contacto",
    footer_callback: "Solicitar devolución de llamada",
    footer_legal: "Aviso legal",
    footer_privacy: "Privacidad",
    footer_imprint: "Información legal",
    footer_rights: "Todos los derechos reservados.",
    cookie_title: "Configuración de privacidad",
    cookie_copy_1: "Usamos cookies esenciales para el funcionamiento del sitio y cookies de marketing opcionales solo con tu consentimiento.",
    cookie_copy_2: "Puedes cambiar tu elección en cualquier momento. Por defecto, solo se activan las cookies esenciales.",
    cookie_marketing: "Marketing",
    cookie_essential: "Esenciales",
    cookie_save: "Guardar ajustes",
    cookie_accept_all: "Aceptar todo",
    callback_title: "Solicitar devolución de llamada",
  },
  fr: {
    cta_check_savings: "Vérifier le potentiel d'économies",
    header_check_bill: "Vérifier la facture annuelle d'énergie",
    header_check_savings: "Vérifier les économies de tarif",
    footer_contact: "Contact",
    footer_callback: "Demander un rappel",
    footer_legal: "Mentions légales",
    footer_privacy: "Confidentialité",
    footer_imprint: "Informations légales",
    footer_rights: "Tous droits réservés.",
    cookie_title: "Paramètres de confidentialité",
    cookie_copy_1: "Nous utilisons des cookies essentiels au fonctionnement du site et des cookies marketing optionnels uniquement avec votre consentement.",
    cookie_copy_2: "Vous pouvez modifier vos choix à tout moment. Par défaut, seuls les cookies essentiels sont activés.",
    cookie_marketing: "Marketing",
    cookie_essential: "Essentiels",
    cookie_save: "Enregistrer les paramètres",
    cookie_accept_all: "Tout accepter",
    callback_title: "Demander un rappel",
  },
  nl: {
    cta_check_savings: "Besparingspotentieel controleren",
    header_check_bill: "Jaarlijkse energieafrekening controleren",
    header_check_savings: "Tariefbesparing controleren",
    footer_contact: "Contact",
    footer_callback: "Terugbelverzoek",
    footer_legal: "Juridisch",
    footer_privacy: "Privacy",
    footer_imprint: "Colofon",
    footer_rights: "Alle rechten voorbehouden.",
    cookie_title: "Privacy-instellingen",
    cookie_copy_1: "We gebruiken essentiële cookies voor de werking van de site en optionele marketingcookies alleen met uw toestemming.",
    cookie_copy_2: "U kunt uw keuze op elk moment aanpassen. Standaard zijn alleen essentiële cookies ingeschakeld.",
    cookie_marketing: "Marketing",
    cookie_essential: "Essentieel",
    cookie_save: "Instellingen opslaan",
    cookie_accept_all: "Alles accepteren",
    callback_title: "Terugbelverzoek",
  },
  pl: {
    cta_check_savings: "Sprawdź potencjał oszczędności",
    header_check_bill: "Sprawdź roczne rozliczenie energii",
    header_check_savings: "Sprawdź oszczędności taryfy",
    footer_contact: "Kontakt",
    footer_callback: "Poproś o oddzwonienie",
    footer_legal: "Informacje prawne",
    footer_privacy: "Prywatność",
    footer_imprint: "Nota prawna",
    footer_rights: "Wszelkie prawa zastrzeżone.",
    cookie_title: "Ustawienia prywatności",
    cookie_copy_1: "Używamy niezbędnych plików cookie do działania strony, a marketingowych tylko za Twoją zgodą.",
    cookie_copy_2: "Wybór możesz zmienić w każdej chwili. Domyślnie aktywne są tylko niezbędne pliki cookie.",
    cookie_marketing: "Marketing",
    cookie_essential: "Niezbędne",
    cookie_save: "Zapisz ustawienia",
    cookie_accept_all: "Akceptuj wszystko",
    callback_title: "Poproś o oddzwonienie",
  },
};

interface I18nContextValue {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  t: (key: keyof (typeof dictionaries)["de"] | string) => string;
  withLang: (path: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [lang, setLangState] = useState<LangCode>("de");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryLang = params.get("lang") as LangCode | null;
    const storedLang = localStorage.getItem("kromen_lang") as LangCode | null;
    const valid = new Set(LANGUAGES.map((l) => l.code));
    const nextLang = (queryLang && valid.has(queryLang) ? queryLang : storedLang && valid.has(storedLang) ? storedLang : "de") as LangCode;
    setLangState(nextLang);
  }, [location.search]);

  const setLang = (code: LangCode) => {
    localStorage.setItem("kromen_lang", code);
    setLangState(code);
  };

  const value = useMemo<I18nContextValue>(() => ({
    lang,
    setLang,
    t: (key) => dictionaries[lang][key] ?? dictionaries.de[key] ?? key,
    withLang: (path) => `${path}${path.includes("?") ? "&" : "?"}lang=${lang}`,
  }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
