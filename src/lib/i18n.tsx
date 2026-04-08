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
    header_check_bill: "Jahresrechnung prüfen",
    header_check_savings: "Tarifersparnis prüfen",
    footer_contact: "Kontakt",
    footer_callback: "Rückruf anfordern",
    footer_legal: "Rechtliches",
    footer_privacy: "Datenschutz",
    footer_imprint: "Impressum",
    footer_rights: "Alle Rechte vorbehalten.",
    cookie_title: "Privatsphäre-Einstellungen",
    cookie_copy_1: "Wir verwenden essenzielle Cookies für den Betrieb und optionale Marketing-Cookies nur mit Ihrer Einwilligung.",
    cookie_copy_2: "Sie können jederzeit Ihre Auswahl ändern. Standardmäßig sind nur essenzielle Cookies aktiv.",
    cookie_marketing: "Marketing",
    cookie_essential: "Essenziell",
    cookie_save: "Einstellungen speichern",
    cookie_accept_all: "Alle akzeptieren",
    callback_title: "Rückruf anfordern",
  },
  en: {
    cta_check_savings: "Check savings now", header_check_bill: "Check annual bill", header_check_savings: "Check tariff savings", footer_contact: "Contact", footer_callback: "Request callback", footer_legal: "Legal", footer_privacy: "Privacy", footer_imprint: "Imprint", footer_rights: "All rights reserved.", cookie_title: "Privacy settings", cookie_copy_1: "We use essential cookies for operation and optional marketing cookies only with your consent.", cookie_copy_2: "You can change your choices at any time. By default, only essential cookies are active.", cookie_marketing: "Marketing", cookie_essential: "Essential", cookie_save: "Save settings", cookie_accept_all: "Accept all", callback_title: "Request callback"
  },
  tr: {
    cta_check_savings: "Şimdi tasarrufu kontrol et", header_check_bill: "Yıllık faturayı kontrol et", header_check_savings: "Tarife tasarrufunu kontrol et", footer_contact: "İletişim", footer_callback: "Geri arama talep et", footer_legal: "Yasal", footer_privacy: "Gizlilik", footer_imprint: "Künye", footer_rights: "Tüm hakları saklıdır.", cookie_title: "Gizlilik ayarları", cookie_copy_1: "Site için gerekli çerezleri ve yalnızca onayınızla isteğe bağlı pazarlama çerezlerini kullanıyoruz.", cookie_copy_2: "Seçimlerinizi istediğiniz zaman değiştirebilirsiniz. Varsayılan olarak yalnızca gerekli çerezler etkindir.", cookie_marketing: "Pazarlama", cookie_essential: "Gerekli", cookie_save: "Ayarları kaydet", cookie_accept_all: "Tümünü kabul et", callback_title: "Geri arama talep et"
  },
  ru: {
    cta_check_savings: "Проверить экономию", header_check_bill: "Проверить годовой счёт", header_check_savings: "Проверить экономию тарифа", footer_contact: "Контакты", footer_callback: "Запросить звонок", footer_legal: "Правовая информация", footer_privacy: "Конфиденциальность", footer_imprint: "Выходные данные", footer_rights: "Все права защищены.", cookie_title: "Настройки конфиденциальности", cookie_copy_1: "Мы используем обязательные cookie для работы сайта и маркетинговые cookie только с вашего согласия.", cookie_copy_2: "Вы можете изменить выбор в любое время. По умолчанию активны только обязательные cookie.", cookie_marketing: "Маркетинг", cookie_essential: "Обязательные", cookie_save: "Сохранить настройки", cookie_accept_all: "Принять все", callback_title: "Запросить звонок"
  },
  ar: {
    cta_check_savings: "تحقق من التوفير الآن", header_check_bill: "تحقق من الفاتورة السنوية", header_check_savings: "تحقق من توفير التعرفة", footer_contact: "التواصل", footer_callback: "طلب مكالمة", footer_legal: "قانوني", footer_privacy: "الخصوصية", footer_imprint: "بيانات النشر", footer_rights: "جميع الحقوق محفوظة.", cookie_title: "إعدادات الخصوصية", cookie_copy_1: "نستخدم ملفات تعريف الارتباط الأساسية للتشغيل وملفات التسويق فقط بموافقتك.", cookie_copy_2: "يمكنك تغيير اختياراتك في أي وقت. افتراضيًا يتم تفعيل الملفات الأساسية فقط.", cookie_marketing: "تسويق", cookie_essential: "أساسي", cookie_save: "حفظ الإعدادات", cookie_accept_all: "قبول الكل", callback_title: "طلب مكالمة"
  },
  it: {
    cta_check_savings: "Verifica il risparmio", header_check_bill: "Verifica bolletta annuale", header_check_savings: "Verifica risparmio tariffa", footer_contact: "Contatto", footer_callback: "Richiedi richiamata", footer_legal: "Legale", footer_privacy: "Privacy", footer_imprint: "Note legali", footer_rights: "Tutti i diritti riservati.", cookie_title: "Impostazioni privacy", cookie_copy_1: "Usiamo cookie essenziali per il funzionamento e cookie marketing opzionali solo con consenso.", cookie_copy_2: "Puoi modificare le scelte in qualsiasi momento. Per default sono attivi solo i cookie essenziali.", cookie_marketing: "Marketing", cookie_essential: "Essenziali", cookie_save: "Salva impostazioni", cookie_accept_all: "Accetta tutto", callback_title: "Richiedi richiamata"
  },
  zh: {
    cta_check_savings: "立即检查节省", header_check_bill: "检查年度账单", header_check_savings: "检查资费节省", footer_contact: "联系方式", footer_callback: "申请回电", footer_legal: "法律信息", footer_privacy: "隐私", footer_imprint: "法律声明", footer_rights: "版权所有。", cookie_title: "隐私设置", cookie_copy_1: "我们仅在您同意时使用营销 Cookie，网站运行必需的 Cookie 始终启用。", cookie_copy_2: "您可随时更改选择。默认仅启用必需 Cookie。", cookie_marketing: "营销", cookie_essential: "必要", cookie_save: "保存设置", cookie_accept_all: "全部接受", callback_title: "申请回电"
  },
  hi: {
    cta_check_savings: "अभी बचत जांचें", header_check_bill: "वार्षिक बिल जांचें", header_check_savings: "टैरिफ बचत जांचें", footer_contact: "संपर्क", footer_callback: "कॉल बैक का अनुरोध", footer_legal: "कानूनी", footer_privacy: "गोपनीयता", footer_imprint: "इम्प्रिंट", footer_rights: "सर्वाधिकार सुरक्षित।", cookie_title: "गोपनीयता सेटिंग्स", cookie_copy_1: "हम साइट संचालन के लिए आवश्यक कुकीज़ और आपकी सहमति से वैकल्पिक मार्केटिंग कुकीज़ उपयोग करते हैं।", cookie_copy_2: "आप कभी भी अपनी पसंद बदल सकते हैं। डिफ़ॉल्ट रूप से केवल आवश्यक कुकीज़ सक्रिय हैं।", cookie_marketing: "मार्केटिंग", cookie_essential: "आवश्यक", cookie_save: "सेटिंग्स सहेजें", cookie_accept_all: "सभी स्वीकार करें", callback_title: "कॉल बैक का अनुरोध"
  },
  es: {
    cta_check_savings: "Comprobar ahorro ahora", header_check_bill: "Revisar factura anual", header_check_savings: "Revisar ahorro de tarifa", footer_contact: "Contacto", footer_callback: "Solicitar devolución de llamada", footer_legal: "Legal", footer_privacy: "Privacidad", footer_imprint: "Aviso legal", footer_rights: "Todos los derechos reservados.", cookie_title: "Configuración de privacidad", cookie_copy_1: "Usamos cookies esenciales para el funcionamiento y cookies de marketing opcionales solo con tu consentimiento.", cookie_copy_2: "Puedes cambiar tu elección en cualquier momento. Por defecto, solo están activas las cookies esenciales.", cookie_marketing: "Marketing", cookie_essential: "Esenciales", cookie_save: "Guardar ajustes", cookie_accept_all: "Aceptar todo", callback_title: "Solicitar devolución de llamada"
  },
  fr: {
    cta_check_savings: "Vérifier les économies", header_check_bill: "Vérifier la facture annuelle", header_check_savings: "Vérifier l'économie tarifaire", footer_contact: "Contact", footer_callback: "Demander un rappel", footer_legal: "Mentions légales", footer_privacy: "Confidentialité", footer_imprint: "Mentions", footer_rights: "Tous droits réservés.", cookie_title: "Paramètres de confidentialité", cookie_copy_1: "Nous utilisons des cookies essentiels pour le fonctionnement et des cookies marketing optionnels uniquement avec votre consentement.", cookie_copy_2: "Vous pouvez modifier vos choix à tout moment. Par défaut, seuls les cookies essentiels sont actifs.", cookie_marketing: "Marketing", cookie_essential: "Essentiels", cookie_save: "Enregistrer", cookie_accept_all: "Tout accepter", callback_title: "Demander un rappel"
  },
  nl: {
    cta_check_savings: "Controleer nu besparing", header_check_bill: "Controleer jaarafrekening", header_check_savings: "Controleer tariefbesparing", footer_contact: "Contact", footer_callback: "Terugbelverzoek", footer_legal: "Juridisch", footer_privacy: "Privacy", footer_imprint: "Colofon", footer_rights: "Alle rechten voorbehouden.", cookie_title: "Privacy-instellingen", cookie_copy_1: "We gebruiken essentiële cookies voor werking en optionele marketingcookies alleen met uw toestemming.", cookie_copy_2: "U kunt uw keuze altijd aanpassen. Standaard zijn alleen essentiële cookies actief.", cookie_marketing: "Marketing", cookie_essential: "Essentieel", cookie_save: "Instellingen opslaan", cookie_accept_all: "Alles accepteren", callback_title: "Terugbelverzoek"
  },
  pl: {
    cta_check_savings: "Sprawdź oszczędność", header_check_bill: "Sprawdź rachunek roczny", header_check_savings: "Sprawdź oszczędność taryfy", footer_contact: "Kontakt", footer_callback: "Poproś o oddzwonienie", footer_legal: "Informacje prawne", footer_privacy: "Prywatność", footer_imprint: "Stopka redakcyjna", footer_rights: "Wszelkie prawa zastrzeżone.", cookie_title: "Ustawienia prywatności", cookie_copy_1: "Używamy niezbędnych plików cookie do działania oraz marketingowych tylko za Twoją zgodą.", cookie_copy_2: "Wybór możesz zmienić w każdej chwili. Domyślnie aktywne są tylko niezbędne pliki cookie.", cookie_marketing: "Marketing", cookie_essential: "Niezbędne", cookie_save: "Zapisz ustawienia", cookie_accept_all: "Akceptuj wszystko", callback_title: "Poproś o oddzwonienie"
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
