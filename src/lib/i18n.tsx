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
    hero_headline: "Zahlst du zu viel für Strom oder Gas?",
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
    cta_check_savings: "Check savings now", header_check_bill: "Check annual energy bill", header_check_savings: "Check tariff savings", hero_badge: "Over 2,000 satisfied users across Germany", hero_headline: "Are you paying too much for electricity or gas?", hero_subline_prefix: "Find out in", hero_subline_emphasis: "just 60 seconds", hero_subline_suffix: ". Your digital Energy Assistant automatically analyzes hundreds of tariffs, filters out teaser offers and risky providers, and shows you a reliable recommendation with real savings.", hero_result_note: "Result in 60 seconds - 100% free", footer_contact: "Contact", footer_callback: "Request callback", footer_legal: "Legal", footer_privacy: "Privacy", footer_imprint: "Imprint", footer_rights: "All rights reserved.", cookie_title: "Privacy settings", cookie_copy_1: "We use essential cookies for operation and optional marketing cookies only with your consent.", cookie_copy_2: "You can change your choices at any time. By default, only essential cookies are active.", cookie_marketing: "Marketing", cookie_essential: "Essential", cookie_save: "Save settings", cookie_accept_all: "Accept all", callback_title: "Request callback"
  },
  tr: {
    cta_check_savings: "Şimdi tasarrufu kontrol et", header_check_bill: "Yıllık enerji faturasını kontrol et", header_check_savings: "Tarife tasarrufunu kontrol et", hero_badge: "Almanya genelinde 2.000+ memnun kullanıcı", hero_headline: "Elektrik veya gaz için fazla mı ödüyorsunuz?", hero_subline_prefix: "Bunu", hero_subline_emphasis: "yalnızca 60 saniyede", hero_subline_suffix: "öğrenin. Dijital Enerji Asistanınız yüzlerce tarifeyi otomatik analiz eder, cazip ama riskli teklifleri eler ve gerçek tasarruf sunan güvenli bir öneri gösterir.", hero_result_note: "60 saniyede sonuç - %100 ücretsiz", footer_contact: "İletişim", footer_callback: "Geri arama talep et", footer_legal: "Yasal", footer_privacy: "Gizlilik", footer_imprint: "Künye", footer_rights: "Tüm hakları saklıdır.", cookie_title: "Gizlilik ayarları", cookie_copy_1: "Site için gerekli çerezleri ve yalnızca onayınızla isteğe bağlı pazarlama çerezlerini kullanıyoruz.", cookie_copy_2: "Seçimlerinizi istediğiniz zaman değiştirebilirsiniz. Varsayılan olarak yalnızca gerekli çerezler etkindir.", cookie_marketing: "Pazarlama", cookie_essential: "Gerekli", cookie_save: "Ayarları kaydet", cookie_accept_all: "Tümünü kabul et", callback_title: "Geri arama talep et"
  },
  ru: {
    cta_check_savings: "Проверить экономию", header_check_bill: "Проверить годовой счёт за энергию", header_check_savings: "Проверить экономию тарифа", hero_badge: "Более 2 000 довольных пользователей по всей Германии", hero_headline: "Платите ли вы слишком много за электричество или газ?", hero_subline_prefix: "Узнайте это всего за", hero_subline_emphasis: "60 секунд", hero_subline_suffix: ". Ваш цифровой Энергоассистент автоматически анализирует сотни тарифов, исключает заманчивые и рискованные предложения и показывает надёжную рекомендацию с реальной экономией.", hero_result_note: "Результат за 60 секунд — 100% бесплатно", footer_contact: "Контакты", footer_callback: "Запросить звонок", footer_legal: "Правовая информация", footer_privacy: "Конфиденциальность", footer_imprint: "Выходные данные", footer_rights: "Все права защищены.", cookie_title: "Настройки конфиденциальности", cookie_copy_1: "Мы используем обязательные cookie для работы сайта и маркетинговые cookie только с вашего согласия.", cookie_copy_2: "Вы можете изменить выбор в любое время. По умолчанию активны только обязательные cookie.", cookie_marketing: "Маркетинг", cookie_essential: "Обязательные", cookie_save: "Сохранить настройки", cookie_accept_all: "Принять все", callback_title: "Запросить звонок"
  },
  ar: {
    cta_check_savings: "تحقق من التوفير الآن", header_check_bill: "تحقق من الفاتورة السنوية للطاقة", header_check_savings: "تحقق من توفير التعرفة", hero_badge: "أكثر من 2,000 مستخدم راضٍ في جميع أنحاء ألمانيا", hero_headline: "هل تدفع أكثر من اللازم مقابل الكهرباء أو الغاز؟", hero_subline_prefix: "اكتشف ذلك خلال", hero_subline_emphasis: "60 ثانية فقط", hero_subline_suffix: ". يقوم مساعد الطاقة الرقمي بتحليل مئات التعرفات تلقائياً، ويستبعد العروض المضللة والمزوّدين ذوي المخاطر، ثم يعرض لك توصية موثوقة مع توفير حقيقي.", hero_result_note: "النتيجة خلال 60 ثانية - مجاناً 100٪", footer_contact: "التواصل", footer_callback: "طلب مكالمة", footer_legal: "قانوني", footer_privacy: "الخصوصية", footer_imprint: "بيانات النشر", footer_rights: "جميع الحقوق محفوظة.", cookie_title: "إعدادات الخصوصية", cookie_copy_1: "نستخدم ملفات تعريف الارتباط الأساسية للتشغيل وملفات التسويق فقط بموافقتك.", cookie_copy_2: "يمكنك تغيير اختياراتك في أي وقت. افتراضيًا يتم تفعيل الملفات الأساسية فقط.", cookie_marketing: "تسويق", cookie_essential: "أساسي", cookie_save: "حفظ الإعدادات", cookie_accept_all: "قبول الكل", callback_title: "طلب مكالمة"
  },
  it: {
    cta_check_savings: "Verifica il risparmio", header_check_bill: "Controlla la bolletta energetica annuale", header_check_savings: "Verifica risparmio tariffa", hero_badge: "Oltre 2.000 utenti soddisfatti in tutta la Germania", hero_headline: "Stai pagando troppo per luce o gas?", hero_subline_prefix: "Scoprilo in", hero_subline_emphasis: "soli 60 secondi", hero_subline_suffix: ". Il tuo Assistente Energia digitale analizza automaticamente centinaia di tariffe, esclude offerte civetta e fornitori rischiosi e ti mostra una raccomandazione sicura con risparmio reale.", hero_result_note: "Risultato in 60 secondi - 100% gratuito", footer_contact: "Contatto", footer_callback: "Richiedi richiamata", footer_legal: "Legale", footer_privacy: "Privacy", footer_imprint: "Note legali", footer_rights: "Tutti i diritti riservati.", cookie_title: "Impostazioni privacy", cookie_copy_1: "Usiamo cookie essenziali per il funzionamento e cookie marketing opzionali solo con consenso.", cookie_copy_2: "Puoi modificare le scelte in qualsiasi momento. Per default sono attivi solo i cookie essenziali.", cookie_marketing: "Marketing", cookie_essential: "Essenziali", cookie_save: "Salva impostazioni", cookie_accept_all: "Accetta tutto", callback_title: "Richiedi richiamata"
  },
  zh: {
    cta_check_savings: "立即检查节省", header_check_bill: "检查年度能源账单", header_check_savings: "检查资费节省", hero_badge: "德国各地已有 2,000+ 位满意用户", hero_headline: "你是否为电费或燃气费支付过高？", hero_subline_prefix: "只需", hero_subline_emphasis: "60 秒", hero_subline_suffix: "即可知道答案。你的数字化能源助手会自动分析数百种资费方案，过滤噱头优惠和高风险供应商，并给出真正省钱且可靠的建议。", hero_result_note: "60 秒出结果 - 100% 免费", footer_contact: "联系方式", footer_callback: "申请回电", footer_legal: "法律信息", footer_privacy: "隐私", footer_imprint: "法律声明", footer_rights: "版权所有。", cookie_title: "隐私设置", cookie_copy_1: "我们仅在您同意时使用营销 Cookie，网站运行必需的 Cookie 始终启用。", cookie_copy_2: "您可随时更改选择。默认仅启用必需 Cookie。", cookie_marketing: "营销", cookie_essential: "必要", cookie_save: "保存设置", cookie_accept_all: "全部接受", callback_title: "申请回电"
  },
  hi: {
    cta_check_savings: "अभी बचत जांचें", header_check_bill: "वार्षिक ऊर्जा बिल जांचें", header_check_savings: "टैरिफ बचत जांचें", hero_badge: "जर्मनी भर में 2,000+ संतुष्ट उपयोगकर्ता", hero_headline: "क्या आप बिजली या गैस के लिए ज़रूरत से ज़्यादा भुगतान कर रहे हैं?", hero_subline_prefix: "इसे", hero_subline_emphasis: "सिर्फ 60 सेकंड में", hero_subline_suffix: "जानें। आपका डिजिटल एनर्जी असिस्टेंट सैकड़ों टैरिफ का स्वतः विश्लेषण करता है, भ्रामक ऑफ़र और जोखिम वाले प्रदाताओं को हटाता है और वास्तविक बचत के साथ एक भरोसेमंद सिफारिश दिखाता है।", hero_result_note: "60 सेकंड में परिणाम - 100% मुफ्त", footer_contact: "संपर्क", footer_callback: "कॉल बैक का अनुरोध", footer_legal: "कानूनी", footer_privacy: "गोपनीयता", footer_imprint: "इम्प्रिंट", footer_rights: "सर्वाधिकार सुरक्षित।", cookie_title: "गोपनीयता सेटिंग्स", cookie_copy_1: "हम साइट संचालन के लिए आवश्यक कुकीज़ और आपकी सहमति से वैकल्पिक मार्केटिंग कुकीज़ उपयोग करते हैं।", cookie_copy_2: "आप कभी भी अपनी पसंद बदल सकते हैं। डिफ़ॉल्ट रूप से केवल आवश्यक कुकीज़ सक्रिय हैं।", cookie_marketing: "मार्केटिंग", cookie_essential: "आवश्यक", cookie_save: "सेटिंग्स सहेजें", cookie_accept_all: "सभी स्वीकार करें", callback_title: "कॉल बैक का अनुरोध"
  },
  es: {
    cta_check_savings: "Comprobar ahorro ahora", header_check_bill: "Revisar factura energética anual", header_check_savings: "Revisar ahorro de tarifa", hero_badge: "Más de 2.000 usuarios satisfechos en toda Alemania", hero_headline: "¿Estás pagando demasiado por electricidad o gas?", hero_subline_prefix: "Descúbrelo en", hero_subline_emphasis: "solo 60 segundos", hero_subline_suffix: ". Tu Asistente Energético digital analiza automáticamente cientos de tarifas, filtra ofertas gancho y proveedores de riesgo, y te muestra una recomendación segura con ahorro real.", hero_result_note: "Resultado en 60 segundos - 100% gratis", footer_contact: "Contacto", footer_callback: "Solicitar devolución de llamada", footer_legal: "Legal", footer_privacy: "Privacidad", footer_imprint: "Aviso legal", footer_rights: "Todos los derechos reservados.", cookie_title: "Configuración de privacidad", cookie_copy_1: "Usamos cookies esenciales para el funcionamiento y cookies de marketing opcionales solo con tu consentimiento.", cookie_copy_2: "Puedes cambiar tu elección en cualquier momento. Por defecto, solo están activas las cookies esenciales.", cookie_marketing: "Marketing", cookie_essential: "Esenciales", cookie_save: "Guardar ajustes", cookie_accept_all: "Aceptar todo", callback_title: "Solicitar devolución de llamada"
  },
  fr: {
    cta_check_savings: "Vérifier les économies", header_check_bill: "Vérifier la facture annuelle d'énergie", header_check_savings: "Vérifier l'économie tarifaire", hero_badge: "Plus de 2 000 utilisateurs satisfaits dans toute l'Allemagne", hero_headline: "Payez-vous trop cher votre électricité ou votre gaz ?", hero_subline_prefix: "Découvrez-le en", hero_subline_emphasis: "seulement 60 secondes", hero_subline_suffix: ". Votre Assistant Énergie numérique analyse automatiquement des centaines de tarifs, écarte les offres d'appel et les fournisseurs à risque, puis vous propose une recommandation fiable avec de vraies économies.", hero_result_note: "Résultat en 60 secondes - 100 % gratuit", footer_contact: "Contact", footer_callback: "Demander un rappel", footer_legal: "Mentions légales", footer_privacy: "Confidentialité", footer_imprint: "Mentions", footer_rights: "Tous droits réservés.", cookie_title: "Paramètres de confidentialité", cookie_copy_1: "Nous utilisons des cookies essentiels pour le fonctionnement et des cookies marketing optionnels uniquement avec votre consentement.", cookie_copy_2: "Vous pouvez modifier vos choix à tout moment. Par défaut, seuls les cookies essentiels sont actifs.", cookie_marketing: "Marketing", cookie_essential: "Essentiels", cookie_save: "Enregistrer", cookie_accept_all: "Tout accepter", callback_title: "Demander un rappel"
  },
  nl: {
    cta_check_savings: "Controleer nu besparing", header_check_bill: "Controleer jaarlijkse energierekening", header_check_savings: "Controleer tariefbesparing", hero_badge: "Meer dan 2.000 tevreden gebruikers in heel Duitsland", hero_headline: "Betaal je te veel voor stroom of gas?", hero_subline_prefix: "Ontdek het in", hero_subline_emphasis: "slechts 60 seconden", hero_subline_suffix: ". Je digitale Energieassistent analyseert automatisch honderden tarieven, filtert lokaanbiedingen en risicovolle leveranciers en toont een veilige aanbeveling met echte besparing.", hero_result_note: "Resultaat in 60 seconden - 100% gratis", footer_contact: "Contact", footer_callback: "Terugbelverzoek", footer_legal: "Juridisch", footer_privacy: "Privacy", footer_imprint: "Colofon", footer_rights: "Alle rechten voorbehouden.", cookie_title: "Privacy-instellingen", cookie_copy_1: "We gebruiken essentiële cookies voor werking en optionele marketingcookies alleen met uw toestemming.", cookie_copy_2: "U kunt uw keuze altijd aanpassen. Standaard zijn alleen essentiële cookies actief.", cookie_marketing: "Marketing", cookie_essential: "Essentieel", cookie_save: "Instellingen opslaan", cookie_accept_all: "Alles accepteren", callback_title: "Terugbelverzoek"
  },
  pl: {
    cta_check_savings: "Sprawdź oszczędność", header_check_bill: "Sprawdź roczny rachunek za energię", header_check_savings: "Sprawdź oszczędność taryfy", hero_badge: "Ponad 2 000 zadowolonych użytkowników w całych Niemczech", hero_headline: "Czy płacisz za dużo za prąd lub gaz?", hero_subline_prefix: "Sprawdź to w", hero_subline_emphasis: "zaledwie 60 sekund", hero_subline_suffix: ". Twój cyfrowy Asystent Energii automatycznie analizuje setki taryf, odrzuca oferty-pułapki i ryzykownych dostawców oraz pokazuje bezpieczną rekomendację z realną oszczędnością.", hero_result_note: "Wynik w 60 sekund - 100% bezpłatnie", footer_contact: "Kontakt", footer_callback: "Poproś o oddzwonienie", footer_legal: "Informacje prawne", footer_privacy: "Prywatność", footer_imprint: "Stopka redakcyjna", footer_rights: "Wszelkie prawa zastrzeżone.", cookie_title: "Ustawienia prywatności", cookie_copy_1: "Używamy niezbędnych plików cookie do działania oraz marketingowych tylko za Twoją zgodą.", cookie_copy_2: "Wybór możesz zmienić w każdej chwili. Domyślnie aktywne są tylko niezbędne pliki cookie.", cookie_marketing: "Marketing", cookie_essential: "Niezbędne", cookie_save: "Zapisz ustawienia", cookie_accept_all: "Akceptuj wszystko", callback_title: "Poproś o oddzwonienie"
  },
};

const headlineDictionaries: Record<LangCode, Dictionary> = {
  de: {
    home_problem_h2: "Warum viele Haushalte unnötig hohe Strom- und Gaskosten haben",
    home_solution_h2: "Genau deshalb lohnt sich eine kurze Ersparnisprüfung.",
    home_how_it_works_h2: "So einfach funktioniert's",
    home_comparison_h2: "So unterscheidet sich der digitale Energieassistent von Vergleichsportalen",
    home_testimonials_h2: "Über 2000 Haushalte nutzen bereits den digitalen Energieassistenten",
    home_about_h2: "Wer steckt hinter Kromen Energieassistenten?",
    home_faq_h2: "Häufige Fragen",
    home_final_cta_h2: "Jetzt Ersparnis prüfen",
    annual_hero_h1: "Wurde deine Strom- oder Gasabrechnung falsch berechnet?",
    annual_process_h2: "So läuft die Prüfung deiner Jahresabrechnung ab",
    annual_why_h2: "Warum sich die Prüfung deiner Jahresabrechnung lohnt",
    annual_blue_value_h2: "Du musst deine Jahresabrechnung nicht selbst prüfen",
    annual_comparison_h2: "Selbst prüfen oder professionell prüfen lassen",
    annual_testimonials_h2: "Mehr als 2.000 Haushalte nutzen den Energieassistenten bereits",
    annual_faq_h2: "Häufige Fragen",
    annual_final_cta_h2: "Unsicher bei deiner Jahresabrechnung? Jetzt Klarheit bekommen",
  },
  en: {
    home_problem_h2: "Why many households pay unnecessarily high electricity and gas costs",
    home_solution_h2: "That is exactly why a short savings check is worth it.",
    home_how_it_works_h2: "It's that simple",
    home_comparison_h2: "How the digital Energy Assistant differs from comparison portals",
    home_testimonials_h2: "Over 2,000 households already use the digital Energy Assistant",
    home_about_h2: "Who is behind Kromen Energy Assistant?",
    home_faq_h2: "Frequently asked questions",
    home_final_cta_h2: "Check savings now",
    annual_hero_h1: "Was your electricity or gas bill calculated incorrectly?",
    annual_process_h2: "How your annual bill review works",
    annual_why_h2: "Why it is worth reviewing your annual bill",
    annual_blue_value_h2: "You don't have to review your annual bill yourself",
    annual_comparison_h2: "Review it yourself or let professionals review it",
    annual_testimonials_h2: "More than 2,000 households already use the Energy Assistant",
    annual_faq_h2: "Frequently asked questions",
    annual_final_cta_h2: "Unsure about your annual bill? Get clarity now",
  },
  tr: {
    home_problem_h2: "Neden birçok hane elektrik ve gaz için gereksiz yere yüksek ödeme yapıyor",
    home_solution_h2: "İşte tam bu yüzden kısa bir tasarruf kontrolü fayda sağlar.",
    home_how_it_works_h2: "İşte bu kadar basit",
    home_comparison_h2: "Dijital Enerji Asistanı karşılaştırma portallarından nasıl ayrılır",
    home_testimonials_h2: "2.000'den fazla hane dijital Enerji Asistanını şimdiden kullanıyor",
    home_about_h2: "Kromen Enerji Asistanı'nın arkasında kim var?",
    home_faq_h2: "Sık sorulan sorular",
    home_final_cta_h2: "Tasarrufu şimdi kontrol et",
    annual_hero_h1: "Elektrik veya gaz faturanız yanlış mı hesaplandı?",
    annual_process_h2: "Yıllık fatura kontrolünüz böyle ilerler",
    annual_why_h2: "Yıllık faturanızı kontrol ettirmek neden faydalıdır",
    annual_blue_value_h2: "Yıllık faturanızı kendiniz kontrol etmek zorunda değilsiniz",
    annual_comparison_h2: "Kendiniz kontrol edin veya profesyonel kontrol alın",
    annual_testimonials_h2: "2.000'den fazla hane Enerji Asistanını zaten kullanıyor",
    annual_faq_h2: "Sık sorulan sorular",
    annual_final_cta_h2: "Yıllık faturanızdan emin değil misiniz? Hemen netlik kazanın",
  },
  ru: {
    home_problem_h2: "Почему многие домохозяйства переплачивают за электричество и газ",
    home_solution_h2: "Именно поэтому быстрая проверка экономии действительно полезна.",
    home_how_it_works_h2: "Это работает очень просто",
    home_comparison_h2: "Чем цифровой Энергоассистент отличается от сайтов сравнения",
    home_testimonials_h2: "Более 2 000 домохозяйств уже пользуются цифровым Энергоассистентом",
    home_about_h2: "Кто стоит за Kromen Energy Assistant?",
    home_faq_h2: "Частые вопросы",
    home_final_cta_h2: "Проверить экономию",
    annual_hero_h1: "Ваш счёт за электричество или газ рассчитан неверно?",
    annual_process_h2: "Как проходит проверка вашего годового счёта",
    annual_why_h2: "Почему стоит проверить ваш годовой счёт",
    annual_blue_value_h2: "Вам не нужно проверять годовой счёт самостоятельно",
    annual_comparison_h2: "Проверить самостоятельно или доверить профессионалам",
    annual_testimonials_h2: "Более 2 000 домохозяйств уже используют Энергоассистент",
    annual_faq_h2: "Частые вопросы",
    annual_final_cta_h2: "Сомневаетесь в годовом счёте? Получите ясность уже сейчас",
  },
  ar: {
    home_problem_h2: "لماذا تتحمّل كثير من الأسر تكاليف كهرباء وغاز أعلى من اللازم",
    home_solution_h2: "ولهذا السبب تحديداً تستحق مراجعة التوفير السريعة.",
    home_how_it_works_h2: "هكذا تعمل الخدمة ببساطة",
    home_comparison_h2: "كيف يختلف مساعد الطاقة الرقمي عن مواقع المقارنة",
    home_testimonials_h2: "أكثر من 2,000 أسرة تستخدم بالفعل مساعد الطاقة الرقمي",
    home_about_h2: "من يقف وراء Kromen Energy Assistant؟",
    home_faq_h2: "الأسئلة الشائعة",
    home_final_cta_h2: "تحقق من التوفير الآن",
    annual_hero_h1: "هل تم احتساب فاتورة الكهرباء أو الغاز لديك بشكل خاطئ؟",
    annual_process_h2: "هكذا تتم مراجعة فاتورتك السنوية",
    annual_why_h2: "لماذا يستحق فحص فاتورتك السنوية",
    annual_blue_value_h2: "لست بحاجة إلى فحص فاتورتك السنوية بنفسك",
    annual_comparison_h2: "افحصها بنفسك أو دع خبراء يفحصونها لك",
    annual_testimonials_h2: "أكثر من 2,000 أسرة تستخدم مساعد الطاقة بالفعل",
    annual_faq_h2: "الأسئلة الشائعة",
    annual_final_cta_h2: "غير متأكد من فاتورتك السنوية؟ احصل على وضوح الآن",
  },
  it: {
    home_problem_h2: "Perché molte famiglie pagano inutilmente troppo per luce e gas",
    home_solution_h2: "Ecco perché una rapida verifica del risparmio conviene davvero.",
    home_how_it_works_h2: "Funziona in modo semplicissimo",
    home_comparison_h2: "Ecco come l'Assistente Energia digitale si distingue dai portali di confronto",
    home_testimonials_h2: "Oltre 2.000 famiglie usano già l'Assistente Energia digitale",
    home_about_h2: "Chi c'è dietro Kromen Energy Assistant?",
    home_faq_h2: "Domande frequenti",
    home_final_cta_h2: "Verifica ora il risparmio",
    annual_hero_h1: "La tua bolletta di luce o gas è stata calcolata in modo errato?",
    annual_process_h2: "Ecco come funziona il controllo della tua bolletta annuale",
    annual_why_h2: "Perché conviene controllare la tua bolletta annuale",
    annual_blue_value_h2: "Non devi controllare da solo la tua bolletta annuale",
    annual_comparison_h2: "Controlla da solo o affidati a una verifica professionale",
    annual_testimonials_h2: "Più di 2.000 famiglie usano già l'Assistente Energia",
    annual_faq_h2: "Domande frequenti",
    annual_final_cta_h2: "Hai dubbi sulla tua bolletta annuale? Ottieni chiarezza ora",
  },
  zh: {
    home_problem_h2: "为什么许多家庭在电费和燃气费上不必要地多花钱",
    home_solution_h2: "这正是为什么一次简短的节省检查很值得。",
    home_how_it_works_h2: "流程就是这么简单",
    home_comparison_h2: "数字能源助手与比价平台有何不同",
    home_testimonials_h2: "已有超过 2,000 个家庭在使用数字能源助手",
    home_about_h2: "Kromen Energy Assistant 背后是谁？",
    home_faq_h2: "常见问题",
    home_final_cta_h2: "立即检查节省",
    annual_hero_h1: "你的电费或燃气费账单是否被错误计算？",
    annual_process_h2: "你的年度账单审核流程如下",
    annual_why_h2: "为什么值得审核你的年度账单",
    annual_blue_value_h2: "你不必自己审核年度账单",
    annual_comparison_h2: "自己审核，或交给专业团队审核",
    annual_testimonials_h2: "已有超过 2,000 个家庭在使用能源助手",
    annual_faq_h2: "常见问题",
    annual_final_cta_h2: "不确定年度账单是否正确？现在就获得清晰结论",
  },
  hi: {
    home_problem_h2: "कई परिवार बिजली और गैस पर बेवजह ज़्यादा खर्च क्यों करते हैं",
    home_solution_h2: "इसीलिए एक छोटी बचत-जांच वास्तव में फायदेमंद है।",
    home_how_it_works_h2: "यह इतना आसान है",
    home_comparison_h2: "डिजिटल एनर्जी असिस्टेंट तुलना पोर्टल्स से कैसे अलग है",
    home_testimonials_h2: "2,000 से अधिक परिवार पहले से डिजिटल एनर्जी असिस्टेंट का उपयोग कर रहे हैं",
    home_about_h2: "Kromen Energy Assistant के पीछे कौन है?",
    home_faq_h2: "अक्सर पूछे जाने वाले सवाल",
    home_final_cta_h2: "अभी बचत जांचें",
    annual_hero_h1: "क्या आपकी बिजली या गैस बिलिंग गलत तरीके से हुई है?",
    annual_process_h2: "आपके वार्षिक बिल की जांच ऐसे होती है",
    annual_why_h2: "आपके वार्षिक बिल की जांच क्यों फायदेमंद है",
    annual_blue_value_h2: "आपको अपना वार्षिक बिल खुद जांचने की ज़रूरत नहीं है",
    annual_comparison_h2: "खुद जांचें या प्रोफेशनल से जांच करवाएं",
    annual_testimonials_h2: "2,000 से अधिक परिवार पहले से एनर्जी असिस्टेंट का उपयोग कर रहे हैं",
    annual_faq_h2: "अक्सर पूछे जाने वाले सवाल",
    annual_final_cta_h2: "वार्षिक बिल को लेकर असमंजस है? अभी स्पष्टता पाएं",
  },
  es: {
    home_problem_h2: "Por qué muchos hogares pagan de más en luz y gas sin necesidad",
    home_solution_h2: "Precisamente por eso merece la pena una revisión rápida del ahorro.",
    home_how_it_works_h2: "Así de simple funciona",
    home_comparison_h2: "Así se diferencia el Asistente Energético digital de los comparadores",
    home_testimonials_h2: "Más de 2.000 hogares ya usan el Asistente Energético digital",
    home_about_h2: "¿Quién está detrás de Kromen Energy Assistant?",
    home_faq_h2: "Preguntas frecuentes",
    home_final_cta_h2: "Comprobar ahorro ahora",
    annual_hero_h1: "¿Se calculó mal tu factura de luz o gas?",
    annual_process_h2: "Así funciona la revisión de tu factura anual",
    annual_why_h2: "Por qué merece la pena revisar tu factura anual",
    annual_blue_value_h2: "No tienes que revisar tu factura anual por tu cuenta",
    annual_comparison_h2: "Revisarla tú mismo o dejarla en manos profesionales",
    annual_testimonials_h2: "Más de 2.000 hogares ya utilizan el Asistente Energético",
    annual_faq_h2: "Preguntas frecuentes",
    annual_final_cta_h2: "¿Dudas sobre tu factura anual? Consigue claridad ahora",
  },
  fr: {
    home_problem_h2: "Pourquoi de nombreux foyers paient inutilement trop cher l'électricité et le gaz",
    home_solution_h2: "C'est exactement pour cela qu'un bilan économies rapide vaut la peine.",
    home_how_it_works_h2: "C'est aussi simple que ça",
    home_comparison_h2: "En quoi l'Assistant Énergie numérique se distingue des comparateurs",
    home_testimonials_h2: "Plus de 2 000 foyers utilisent déjà l'Assistant Énergie numérique",
    home_about_h2: "Qui se cache derrière Kromen Energy Assistant ?",
    home_faq_h2: "Questions fréquentes",
    home_final_cta_h2: "Vérifier les économies maintenant",
    annual_hero_h1: "Votre facture d'électricité ou de gaz a-t-elle été mal calculée ?",
    annual_process_h2: "Comment se déroule la vérification de votre facture annuelle",
    annual_why_h2: "Pourquoi il vaut la peine de vérifier votre facture annuelle",
    annual_blue_value_h2: "Vous n'avez pas besoin de vérifier votre facture annuelle vous-même",
    annual_comparison_h2: "Vérifier soi-même ou faire vérifier par des professionnels",
    annual_testimonials_h2: "Plus de 2 000 foyers utilisent déjà l'Assistant Énergie",
    annual_faq_h2: "Questions fréquentes",
    annual_final_cta_h2: "Un doute sur votre facture annuelle ? Obtenez une réponse claire maintenant",
  },
  nl: {
    home_problem_h2: "Waarom veel huishoudens onnodig hoge stroom- en gaskosten hebben",
    home_solution_h2: "Precies daarom loont een korte besparingscheck.",
    home_how_it_works_h2: "Zo eenvoudig werkt het",
    home_comparison_h2: "Zo onderscheidt de digitale Energieassistent zich van vergelijkingssites",
    home_testimonials_h2: "Meer dan 2.000 huishoudens gebruiken de digitale Energieassistent al",
    home_about_h2: "Wie zit er achter Kromen Energy Assistant?",
    home_faq_h2: "Veelgestelde vragen",
    home_final_cta_h2: "Controleer nu je besparing",
    annual_hero_h1: "Is je stroom- of gasrekening verkeerd berekend?",
    annual_process_h2: "Zo verloopt de controle van je jaarafrekening",
    annual_why_h2: "Waarom het loont om je jaarafrekening te controleren",
    annual_blue_value_h2: "Je hoeft je jaarafrekening niet zelf te controleren",
    annual_comparison_h2: "Zelf controleren of professioneel laten controleren",
    annual_testimonials_h2: "Meer dan 2.000 huishoudens gebruiken de Energieassistent al",
    annual_faq_h2: "Veelgestelde vragen",
    annual_final_cta_h2: "Twijfel je over je jaarafrekening? Krijg nu duidelijkheid",
  },
  pl: {
    home_problem_h2: "Dlaczego wiele gospodarstw domowych niepotrzebnie płaci za dużo za prąd i gaz",
    home_solution_h2: "Właśnie dlatego krótka analiza oszczędności naprawdę się opłaca.",
    home_how_it_works_h2: "To działa naprawdę prosto",
    home_comparison_h2: "Tak cyfrowy Asystent Energii różni się od porównywarek ofert",
    home_testimonials_h2: "Ponad 2 000 gospodarstw domowych już korzysta z cyfrowego Asystenta Energii",
    home_about_h2: "Kto stoi za Kromen Energy Assistant?",
    home_faq_h2: "Najczęstsze pytania",
    home_final_cta_h2: "Sprawdź oszczędność teraz",
    annual_hero_h1: "Czy Twój rachunek za prąd lub gaz został błędnie naliczony?",
    annual_process_h2: "Tak przebiega weryfikacja Twojego rocznego rachunku",
    annual_why_h2: "Dlaczego warto sprawdzić roczny rachunek",
    annual_blue_value_h2: "Nie musisz samodzielnie sprawdzać rocznego rachunku",
    annual_comparison_h2: "Sprawdź samodzielnie albo zleć to profesjonalistom",
    annual_testimonials_h2: "Ponad 2 000 gospodarstw domowych korzysta już z Asystenta Energii",
    annual_faq_h2: "Najczęstsze pytania",
    annual_final_cta_h2: "Masz wątpliwości co do rocznego rachunku? Zyskaj jasność już teraz",
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
    t: (key) =>
      headlineDictionaries[lang][key] ??
      headlineDictionaries.de[key] ??
      dictionaries[lang][key] ??
      dictionaries.de[key] ??
      key,
    withLang: (path) => `${path}${path.includes("?") ? "&" : "?"}lang=${lang}`,
  }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
