import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const EXCLUDED_PATHS = new Set(["/impressum", "/datenschutz"]);
const cache = new Map<string, string>();

const normalize = (value: string) =>
  value
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .trim();

const OVERRIDES: Record<string, Record<string, string>> = {
  "Über 2.000 zufriedene Nutzer in ganz Deutschland": {
    en: "Over 2,000 satisfied users across Germany", tr: "Almanya genelinde 2.000'den fazla memnun kullanıcı", ru: "Более 2 000 довольных пользователей по всей Германии", ar: "أكثر من 2,000 مستخدم راضٍ في جميع أنحاء ألمانيا", it: "Oltre 2.000 utenti soddisfatti in tutta la Germania", zh: "德国各地已有 2,000+ 位满意用户", hi: "पूरे जर्मनी में 2,000+ संतुष्ट उपयोगकर्ता", es: "Más de 2.000 usuarios satisfechos en toda Alemania", fr: "Plus de 2 000 utilisateurs satisfaits dans toute l'Allemagne", nl: "Meer dan 2.000 tevreden gebruikers in heel Duitsland", pl: "Ponad 2 000 zadowolonych użytkowników w całych Niemczech"
  },
  "Zahlst du aktuell mehr für Strom oder Gas als nötig?": {
    en: "Are you currently paying more for electricity or gas than necessary?", tr: "Şu anda elektrik veya gaz için gerekenden fazla mı ödüyorsunuz?", ru: "Платите ли вы сейчас за электричество или газ больше, чем нужно?", ar: "هل تدفع حالياً مقابل الكهرباء أو الغاز أكثر مما ينبغي؟", it: "Stai pagando più del necessario per luce o gas?", zh: "你现在是否为电费或燃气费支付了不必要的高价？", hi: "क्या आप अभी बिजली या गैस के लिए जरूरत से ज्यादा भुगतान कर रहे हैं?", es: "¿Estás pagando ahora más de lo necesario por electricidad o gas?", fr: "Payez-vous actuellement plus que nécessaire pour l'électricité ou le gaz ?", nl: "Betaal je momenteel meer voor stroom of gas dan nodig is?", pl: "Czy obecnie płacisz za prąd lub gaz więcej, niż to konieczne?"
  },
  "Jahresrechnung prüfen": {
    en: "Check annual utility bill", tr: "Yıllık faturayı kontrol et", ru: "Проверить годовой счёт", ar: "تحقق من الفاتورة السنوية", it: "Verifica bolletta annuale", zh: "检查年度账单", hi: "वार्षिक बिल जांचें", es: "Revisar factura anual", fr: "Vérifier la facture annuelle", nl: "Controleer jaarafrekening", pl: "Sprawdź rachunek roczny"
  },
  "Jahresabrechnung prüfen": {
    en: "Check energy bill", tr: "Enerji faturasını kontrol et", ru: "Проверить счёт за энергию", ar: "تحقق من فاتورة الطاقة", it: "Verifica la bolletta energetica", zh: "检查能源账单", hi: "ऊर्जा बिल जांचें", es: "Revisar factura de energía", fr: "Vérifier la facture d'énergie", nl: "Controleer energierekening", pl: "Sprawdź rachunek za energię"
  },
  "So einfach funktioniert's": {
    en: "How it works", tr: "Nasıl çalışır", ru: "Как это работает", ar: "كيف يعمل", it: "Come funziona", zh: "如何运作", hi: "यह कैसे काम करता है", es: "Cómo funciona", fr: "Comment ça marche", nl: "Zo werkt het", pl: "Jak to działa"
  },
  "Häufig gestellte Fragen": {
    en: "Frequently asked questions", tr: "Sık sorulan sorular", ru: "Часто задаваемые вопросы", ar: "الأسئلة الشائعة", it: "Domande frequenti", zh: "常见问题", hi: "अक्सर पूछे जाने वाले सवाल", es: "Preguntas frecuentes", fr: "Questions fréquentes", nl: "Veelgestelde vragen", pl: "Najczęściej zadawane pytania"
  },
};

const QUALITY_REPLACEMENTS: Record<string, Array<[RegExp, string]>> = {
  en: [
    [/annual financial statements/gi, "energy bills"],
    [/financial statements/gi, "energy bills"],
    [/annual statement/gi, "energy bill"],
    [/annual bill/gi, "energy bill"],
    [/basic supply/gi, "default utility tariff"],
    [/discount tricks/gi, "bonus-driven teaser offers"],
    [/energy assistant/gi, "Energy Assistant"],
    [/utility settlement/gi, "energy bill"],
    [/electric current/gi, "electricity"],
  ],
  tr: [[/temel tedarik/gi, "standart tarife"]],
  ru: [[/базов[а-я ]+снабжен[а-я ]+/gi, "тариф поставщика по умолчанию"]],
  it: [[/fornitura di base/gi, "tariffa standard"]],
  es: [[/suministro básico/gi, "tarifa estándar"]],
  fr: [[/fourniture de base/gi, "tarif standard"]],
  nl: [[/basisvoorziening/gi, "standaardtarief"]],
  pl: [[/podstawow[a-ząćęłńóśźż ]+/gi, "taryfa standardowa"]],
};

const polishText = (input: string, lang: string) => {
  let value = input
    .replace(/\s+\?/g, "?")
    .replace(/\?\./g, "?")
    .replace(/\.\?/g, "?")
    .replace(/\s+\./g, ".")
    .replace(/\s+,/g, ",")
    .replace(/\s+:/g, ":")
    .replace(/\s+;/g, ";")
    .replace(/\s{2,}/g, " ")
    .trim();

  for (const [pattern, replacement] of QUALITY_REPLACEMENTS[lang] ?? []) {
    value = value.replace(pattern, replacement);
  }

  if (lang === "ar") {
    value = value.replace(/\?/g, "؟");
  }

  return value;
};

const translateText = async (text: string, targetLang: string) => {
  const cleanText = normalize(text);
  if (!cleanText || targetLang === "de") return text;

  const override = OVERRIDES[cleanText]?.[targetLang];
  if (override) return override;

  const key = `${targetLang}:${cleanText}`;
  if (cache.has(key)) return cache.get(key)!;

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=${encodeURIComponent(
    targetLang,
  )}&dt=t&q=${encodeURIComponent(cleanText)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return cleanText;

    const data = (await res.json()) as unknown[];
    const segments = (data?.[0] as unknown[][] | undefined) ?? [];
    const translated = segments.map((segment) => (segment?.[0] as string) ?? "").join("") || cleanText;
    const polished = polishText(translated, targetLang);
    cache.set(key, polished);
    return polished;
  } catch {
    return cleanText;
  }
};

export const AutoPageTranslator = () => {
  const { lang } = useI18n();
  const location = useLocation();

  useEffect(() => {
    if (EXCLUDED_PATHS.has(location.pathname)) return;

    const root = document.querySelector("main") ?? document.body;
    if (!root) return;

    const textNodes: Text[] = [];
    const placeholders: Array<{ element: HTMLElement; original: string }> = [];

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        const text = node.nodeValue?.trim() ?? "";
        if (!text) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        if (parent.closest("[data-no-translate='true']")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

    root.querySelectorAll<HTMLElement>("input[placeholder], textarea[placeholder]").forEach((element) => {
      const original = element.dataset.originalPlaceholder ?? element.getAttribute("placeholder") ?? "";
      element.dataset.originalPlaceholder = original;
      placeholders.push({ element, original });
    });

    const run = async () => {
      if (lang === "de") {
        textNodes.forEach((node) => {
          const original = (node as Text & { __orig?: string }).__orig;
          if (original) node.nodeValue = original;
        });

        placeholders.forEach(({ element, original }) => {
          element.setAttribute("placeholder", original);
        });
        return;
      }

      await Promise.all(
        textNodes.map(async (node) => {
          const textNode = node as Text & { __orig?: string };
          if (!textNode.__orig) textNode.__orig = node.nodeValue ?? "";
          const translated = await translateText(textNode.__orig, lang);
          node.nodeValue = translated;
        }),
      );

      await Promise.all(
        placeholders.map(async ({ element, original }) => {
          const translated = await translateText(original, lang);
          element.setAttribute("placeholder", translated);
        }),
      );
    };

    run();
  }, [lang, location.pathname]);

  return null;
};
