import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const EXCLUDED_PATHS = new Set(["/impressum", "/datenschutz"]);
const cache = new Map<string, string>();
const originalTextByNode = new WeakMap<Text, string>();
const originalPlaceholderByElement = new WeakMap<HTMLElement, string>();

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
    const placeholders: HTMLElement[] = [];

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

    while (walker.nextNode()) {
      const textNode = walker.currentNode as Text;
      textNodes.push(textNode);
      if (!originalTextByNode.has(textNode)) {
        originalTextByNode.set(textNode, textNode.nodeValue ?? "");
      }
    }

    root.querySelectorAll<HTMLElement>("input[placeholder], textarea[placeholder]").forEach((element) => {
      placeholders.push(element);
      if (!originalPlaceholderByElement.has(element)) {
        originalPlaceholderByElement.set(element, element.getAttribute("placeholder") ?? "");
      }
    });

    const run = async () => {
      if (lang === "de") {
        textNodes.forEach((node) => {
          node.nodeValue = originalTextByNode.get(node) ?? node.nodeValue ?? "";
        });

        placeholders.forEach((element) => {
          element.setAttribute("placeholder", originalPlaceholderByElement.get(element) ?? "");
        });
        return;
      }

      await Promise.all(
        textNodes.map(async (node) => {
          const original = originalTextByNode.get(node) ?? node.nodeValue ?? "";
          const translated = await translateText(original, lang);
          node.nodeValue = translated;
        }),
      );

      await Promise.all(
        placeholders.map(async (element) => {
          const original = originalPlaceholderByElement.get(element) ?? "";
          const translated = await translateText(original, lang);
          element.setAttribute("placeholder", translated);
        }),
      );
    };

    run();
  }, [lang, location.pathname]);

  return null;
};
