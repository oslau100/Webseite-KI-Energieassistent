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

const RTL_LANGS = new Set(["ar"]);

const dictionaries: Record<LangCode, Dictionary> = {
  de: {
    cta_check_savings: "Jetzt Ersparnis prüfen",
    header_check_bill: "Jahresabrechnung prüfen",
    header_check_savings: "Tarifersparnis prüfen",
    hero_badge: "Über 2.000 zufriedene Nutzer in ganz Deutschland",
    hero_headline: "Zahlst du aktuell mehr für Strom oder Gas als nötig?",
    hero_subline_prefix: "Finde es in",
    hero_subline_emphasis: "nur 60 Sekunden",
    hero_subline_suffix:
      "heraus. Dein digitaler Energieassistent analysiert automatisch hunderte Tarife, filtert Lockangebote und riskante Anbieter heraus und zeigt dir eine sichere Empfehlung mit echter Ersparnis.",
    hero_result_note: "Ergebnis in 60 Sekunden - 100% kostenlos",
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
    cta_check_savings: "Check savings now", header_check_bill: "Check annual energy bill", header_check_savings: "Check tariff savings", hero_badge: "Over 2,000 satisfied users across Germany", hero_headline: "Are you currently paying more for electricity or gas than necessary?", hero_subline_prefix: "Find out in", hero_subline_emphasis: "just 60 seconds", hero_subline_suffix: ". Your digital Energy Assistant automatically analyzes hundreds of tariffs, filters out teaser offers and risky providers, and shows you a reliable recommendation with real savings.", hero_result_note: "Result in 60 seconds - 100% free", footer_contact: "Contact", footer_callback: "Request callback", footer_legal: "Legal", footer_privacy: "Privacy", footer_imprint: "Imprint", footer_rights: "All rights reserved.", cookie_title: "Privacy settings", cookie_copy_1: "We use essential cookies for operation and optional marketing cookies only with your consent.", cookie_copy_2: "You can change your choices at any time. By default, only essential cookies are active.", cookie_marketing: "Marketing", cookie_essential: "Essential", cookie_save: "Save settings", cookie_accept_all: "Accept all", callback_title: "Request callback"
  },
  tr: {
    cta_check_savings: "Şimdi tasarrufu kontrol et", header_check_bill: "Yıllık enerji faturasını kontrol et", header_check_savings: "Tarife tasarrufunu kontrol et", hero_badge: "Almanya genelinde 2.000+ memnun kullanıcı", hero_headline: "Şu anda elektrik veya gaz için gerekenden fazla mı ödüyorsunuz?", hero_subline_prefix: "Bunu", hero_subline_emphasis: "yalnızca 60 saniyede", hero_subline_suffix: "öğrenin. Dijital Enerji Asistanınız yüzlerce tarifeyi otomatik analiz eder, cazip ama riskli teklifleri eler ve gerçek tasarruf sunan güvenli bir öneri gösterir.", hero_result_note: "60 saniyede sonuç - %100 ücretsiz", footer_contact: "İletişim", footer_callback: "Geri arama talep et", footer_legal: "Yasal", footer_privacy: "Gizlilik", footer_imprint: "Künye", footer_rights: "Tüm hakları saklıdır.", cookie_title: "Gizlilik ayarları", cookie_copy_1: "Site için gerekli çerezleri ve yalnızca onayınızla isteğe bağlı pazarlama çerezlerini kullanıyoruz.", cookie_copy_2: "Seçimlerinizi istediğiniz zaman değiştirebilirsiniz. Varsayılan olarak yalnızca gerekli çerezler etkindir.", cookie_marketing: "Pazarlama", cookie_essential: "Gerekli", cookie_save: "Ayarları kaydet", cookie_accept_all: "Tümünü kabul et", callback_title: "Geri arama talep et"
  },
  ru: {
    cta_check_savings: "Проверить экономию", header_check_bill: "Проверить годовой счёт за энергию", header_check_savings: "Проверить экономию тарифа", hero_badge: "Более 2 000 довольных пользователей по всей Германии", hero_headline: "Платите ли вы сейчас за электричество или газ больше, чем нужно?", hero_subline_prefix: "Узнайте это всего за", hero_subline_emphasis: "60 секунд", hero_subline_suffix: ". Ваш цифровой Энергоассистент автоматически анализирует сотни тарифов, исключает заманчивые и рискованные предложения и показывает надёжную рекомендацию с реальной экономией.", hero_result_note: "Результат за 60 секунд — 100% бесплатно", footer_contact: "Контакты", footer_callback: "Запросить звонок", footer_legal: "Правовая информация", footer_privacy: "Конфиденциальность", footer_imprint: "Выходные данные", footer_rights: "Все права защищены.", cookie_title: "Настройки конфиденциальности", cookie_copy_1: "Мы используем обязательные cookie для работы сайта и маркетинговые cookie только с вашего согласия.", cookie_copy_2: "Вы можете изменить выбор в любое время. По умолчанию активны только обязательные cookie.", cookie_marketing: "Маркетинг", cookie_essential: "Обязательные", cookie_save: "Сохранить настройки", cookie_accept_all: "Принять все", callback_title: "Запросить звонок"
  },
  ar: {
    cta_check_savings: "تحقق من التوفير الآن", header_check_bill: "تحقق من الفاتورة السنوية للطاقة", header_check_savings: "تحقق من توفير التعرفة", hero_badge: "أكثر من 2,000 مستخدم راضٍ في جميع أنحاء ألمانيا", hero_headline: "هل تدفع حالياً للكهرباء أو الغاز أكثر مما ينبغي؟", hero_subline_prefix: "اكتشف ذلك خلال", hero_subline_emphasis: "60 ثانية فقط", hero_subline_suffix: ". يقوم مساعد الطاقة الرقمي بتحليل مئات التعرفات تلقائياً، ويستبعد العروض المضللة والمزوّدين ذوي المخاطر، ثم يعرض لك توصية موثوقة مع توفير حقيقي.", hero_result_note: "النتيجة خلال 60 ثانية - مجاناً 100٪", footer_contact: "التواصل", footer_callback: "طلب مكالمة", footer_legal: "قانوني", footer_privacy: "الخصوصية", footer_imprint: "بيانات النشر", footer_rights: "جميع الحقوق محفوظة.", cookie_title: "إعدادات الخصوصية", cookie_copy_1: "نستخدم ملفات تعريف الارتباط الأساسية للتشغيل وملفات التسويق فقط بموافقتك.", cookie_copy_2: "يمكنك تغيير اختياراتك في أي وقت. افتراضيًا يتم تفعيل الملفات الأساسية فقط.", cookie_marketing: "تسويق", cookie_essential: "أساسي", cookie_save: "حفظ الإعدادات", cookie_accept_all: "قبول الكل", callback_title: "طلب مكالمة"
  },
  it: {
    cta_check_savings: "Verifica il risparmio", header_check_bill: "Controlla la bolletta energetica annuale", header_check_savings: "Verifica risparmio tariffa", hero_badge: "Oltre 2.000 utenti soddisfatti in tutta la Germania", hero_headline: "Stai pagando più del necessario per luce o gas?", hero_subline_prefix: "Scoprilo in", hero_subline_emphasis: "soli 60 secondi", hero_subline_suffix: ". Il tuo Assistente Energia digitale analizza automaticamente centinaia di tariffe, esclude offerte civetta e fornitori rischiosi e ti mostra una raccomandazione sicura con risparmio reale.", hero_result_note: "Risultato in 60 secondi - 100% gratuito", footer_contact: "Contatto", footer_callback: "Richiedi richiamata", footer_legal: "Legale", footer_privacy: "Privacy", footer_imprint: "Note legali", footer_rights: "Tutti i diritti riservati.", cookie_title: "Impostazioni privacy", cookie_copy_1: "Usiamo cookie essenziali per il funzionamento e cookie marketing opzionali solo con consenso.", cookie_copy_2: "Puoi modificare le scelte in qualsiasi momento. Per default sono attivi solo i cookie essenziali.", cookie_marketing: "Marketing", cookie_essential: "Essenziali", cookie_save: "Salva impostazioni", cookie_accept_all: "Accetta tutto", callback_title: "Richiedi richiamata"
  },
  zh: {
    cta_check_savings: "立即检查节省", header_check_bill: "检查年度能源账单", header_check_savings: "检查资费节省", hero_badge: "德国各地已有 2,000+ 位满意用户", hero_headline: "你现在是否为电费或燃气费支付了不必要的高价？", hero_subline_prefix: "只需", hero_subline_emphasis: "60 秒", hero_subline_suffix: "即可知道答案。你的数字化能源助手会自动分析数百种资费方案，过滤噱头优惠和高风险供应商，并给出真正省钱且可靠的建议。", hero_result_note: "60 秒出结果 - 100% 免费", footer_contact: "联系方式", footer_callback: "申请回电", footer_legal: "法律信息", footer_privacy: "隐私", footer_imprint: "法律声明", footer_rights: "版权所有。", cookie_title: "隐私设置", cookie_copy_1: "我们仅在您同意时使用营销 Cookie，网站运行必需的 Cookie 始终启用。", cookie_copy_2: "您可随时更改选择。默认仅启用必需 Cookie。", cookie_marketing: "营销", cookie_essential: "必要", cookie_save: "保存设置", cookie_accept_all: "全部接受", callback_title: "申请回电"
  },
  hi: {
    cta_check_savings: "अभी बचत जांचें", header_check_bill: "वार्षिक ऊर्जा बिल जांचें", header_check_savings: "टैरिफ बचत जांचें", hero_badge: "जर्मनी भर में 2,000+ संतुष्ट उपयोगकर्ता", hero_headline: "क्या आप अभी बिजली या गैस के लिए जरूरत से ज्यादा भुगतान कर रहे हैं?", hero_subline_prefix: "इसे", hero_subline_emphasis: "सिर्फ 60 सेकंड में", hero_subline_suffix: "जानें। आपका डिजिटल एनर्जी असिस्टेंट सैकड़ों टैरिफ का स्वतः विश्लेषण करता है, भ्रामक ऑफ़र और जोखिम वाले प्रदाताओं को हटाता है और वास्तविक बचत के साथ एक भरोसेमंद सिफारिश दिखाता है।", hero_result_note: "60 सेकंड में परिणाम - 100% मुफ्त", footer_contact: "संपर्क", footer_callback: "कॉल बैक का अनुरोध", footer_legal: "कानूनी", footer_privacy: "गोपनीयता", footer_imprint: "इम्प्रिंट", footer_rights: "सर्वाधिकार सुरक्षित।", cookie_title: "गोपनीयता सेटिंग्स", cookie_copy_1: "हम साइट संचालन के लिए आवश्यक कुकीज़ और आपकी सहमति से वैकल्पिक मार्केटिंग कुकीज़ उपयोग करते हैं।", cookie_copy_2: "आप कभी भी अपनी पसंद बदल सकते हैं। डिफ़ॉल्ट रूप से केवल आवश्यक कुकीज़ सक्रिय हैं।", cookie_marketing: "मार्केटिंग", cookie_essential: "आवश्यक", cookie_save: "सेटिंग्स सहेजें", cookie_accept_all: "सभी स्वीकार करें", callback_title: "कॉल बैक का अनुरोध"
  },
  es: {
    cta_check_savings: "Comprobar ahorro ahora", header_check_bill: "Revisar factura energética anual", header_check_savings: "Revisar ahorro de tarifa", hero_badge: "Más de 2.000 usuarios satisfechos en toda Alemania", hero_headline: "¿Estás pagando ahora más de lo necesario por electricidad o gas?", hero_subline_prefix: "Descúbrelo en", hero_subline_emphasis: "solo 60 segundos", hero_subline_suffix: ". Tu Asistente Energético digital analiza automáticamente cientos de tarifas, filtra ofertas gancho y proveedores de riesgo, y te muestra una recomendación segura con ahorro real.", hero_result_note: "Resultado en 60 segundos - 100% gratis", footer_contact: "Contacto", footer_callback: "Solicitar devolución de llamada", footer_legal: "Legal", footer_privacy: "Privacidad", footer_imprint: "Aviso legal", footer_rights: "Todos los derechos reservados.", cookie_title: "Configuración de privacidad", cookie_copy_1: "Usamos cookies esenciales para el funcionamiento y cookies de marketing opcionales solo con tu consentimiento.", cookie_copy_2: "Puedes cambiar tu elección en cualquier momento. Por defecto, solo están activas las cookies esenciales.", cookie_marketing: "Marketing", cookie_essential: "Esenciales", cookie_save: "Guardar ajustes", cookie_accept_all: "Aceptar todo", callback_title: "Solicitar devolución de llamada"
  },
  fr: {
    cta_check_savings: "Vérifier les économies", header_check_bill: "Vérifier la facture annuelle d'énergie", header_check_savings: "Vérifier l'économie tarifaire", hero_badge: "Plus de 2 000 utilisateurs satisfaits dans toute l'Allemagne", hero_headline: "Payez-vous actuellement plus que nécessaire pour l'électricité ou le gaz ?", hero_subline_prefix: "Découvrez-le en", hero_subline_emphasis: "seulement 60 secondes", hero_subline_suffix: ". Votre Assistant Énergie numérique analyse automatiquement des centaines de tarifs, écarte les offres d'appel et les fournisseurs à risque, puis vous propose une recommandation fiable avec de vraies économies.", hero_result_note: "Résultat en 60 secondes - 100 % gratuit", footer_contact: "Contact", footer_callback: "Demander un rappel", footer_legal: "Mentions légales", footer_privacy: "Confidentialité", footer_imprint: "Mentions", footer_rights: "Tous droits réservés.", cookie_title: "Paramètres de confidentialité", cookie_copy_1: "Nous utilisons des cookies essentiels pour le fonctionnement et des cookies marketing optionnels uniquement avec votre consentement.", cookie_copy_2: "Vous pouvez modifier vos choix à tout moment. Par défaut, seuls les cookies essentiels sont actifs.", cookie_marketing: "Marketing", cookie_essential: "Essentiels", cookie_save: "Enregistrer", cookie_accept_all: "Tout accepter", callback_title: "Demander un rappel"
  },
  nl: {
    cta_check_savings: "Controleer nu besparing", header_check_bill: "Controleer jaarlijkse energierekening", header_check_savings: "Controleer tariefbesparing", hero_badge: "Meer dan 2.000 tevreden gebruikers in heel Duitsland", hero_headline: "Betaal je momenteel meer voor stroom of gas dan nodig is?", hero_subline_prefix: "Ontdek het in", hero_subline_emphasis: "slechts 60 seconden", hero_subline_suffix: ". Je digitale Energieassistent analyseert automatisch honderden tarieven, filtert lokaanbiedingen en risicovolle leveranciers en toont een veilige aanbeveling met echte besparing.", hero_result_note: "Resultaat in 60 seconden - 100% gratis", footer_contact: "Contact", footer_callback: "Terugbelverzoek", footer_legal: "Juridisch", footer_privacy: "Privacy", footer_imprint: "Colofon", footer_rights: "Alle rechten voorbehouden.", cookie_title: "Privacy-instellingen", cookie_copy_1: "We gebruiken essentiële cookies voor werking en optionele marketingcookies alleen met uw toestemming.", cookie_copy_2: "U kunt uw keuze altijd aanpassen. Standaard zijn alleen essentiële cookies actief.", cookie_marketing: "Marketing", cookie_essential: "Essentieel", cookie_save: "Instellingen opslaan", cookie_accept_all: "Alles accepteren", callback_title: "Terugbelverzoek"
  },
  pl: {
    cta_check_savings: "Sprawdź oszczędność", header_check_bill: "Sprawdź roczny rachunek za energię", header_check_savings: "Sprawdź oszczędność taryfy", hero_badge: "Ponad 2 000 zadowolonych użytkowników w całych Niemczech", hero_headline: "Czy obecnie płacisz za prąd lub gaz więcej, niż to konieczne?", hero_subline_prefix: "Sprawdź to w", hero_subline_emphasis: "zaledwie 60 sekund", hero_subline_suffix: ". Twój cyfrowy Asystent Energii automatycznie analizuje setki taryf, odrzuca oferty-pułapki i ryzykownych dostawców oraz pokazuje bezpieczną rekomendację z realną oszczędnością.", hero_result_note: "Wynik w 60 sekund - 100% bezpłatnie", footer_contact: "Kontakt", footer_callback: "Poproś o oddzwonienie", footer_legal: "Informacje prawne", footer_privacy: "Prywatność", footer_imprint: "Stopka redakcyjna", footer_rights: "Wszelkie prawa zastrzeżone.", cookie_title: "Ustawienia prywatności", cookie_copy_1: "Używamy niezbędnych plików cookie do działania oraz marketingowych tylko za Twoją zgodą.", cookie_copy_2: "Wybór możesz zmienić w każdej chwili. Domyślnie aktywne są tylko niezbędne pliki cookie.", cookie_marketing: "Marketing", cookie_essential: "Niezbędne", cookie_save: "Zapisz ustawienia", cookie_accept_all: "Akceptuj wszystko", callback_title: "Poproś o oddzwonienie"
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
    localStorage.setItem("kromen_lang", nextLang);
  }, [location.search]);

  const setLang = (code: LangCode) => {
    localStorage.setItem("kromen_lang", code);

    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("lang", code);
    window.location.assign(nextUrl.toString());
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.has(lang) ? "rtl" : "ltr";
  }, [lang]);

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
