import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const EXCLUDED_PATHS = new Set(["/impressum", "/datenschutz"]);
const cache = new Map<string, string>();

const translateText = async (text: string, targetLang: string) => {
  const key = `${targetLang}:${text}`;
  if (cache.has(key)) return cache.get(key)!;

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=${encodeURIComponent(
    targetLang,
  )}&dt=t&q=${encodeURIComponent(text)}`;

  const res = await fetch(url);
  if (!res.ok) return text;

  const data = (await res.json()) as unknown[];
  const segments = (data?.[0] as unknown[][] | undefined) ?? [];
  const translated = segments.map((segment) => (segment?.[0] as string) ?? "").join("") || text;
  cache.set(key, translated);
  return translated;
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
          if (!node.parentElement) return;
          const original = node.parentElement.dataset.originalText ?? node.nodeValue ?? "";
          node.nodeValue = original;
        });

        placeholders.forEach(({ element, original }) => {
          element.setAttribute("placeholder", original);
        });
        return;
      }

      await Promise.all(
        textNodes.map(async (node) => {
          const parent = node.parentElement;
          if (!parent) return;

          const original = parent.dataset.originalText ?? node.nodeValue ?? "";
          parent.dataset.originalText = original;

          const translated = await translateText(original, lang);
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
