#!/usr/bin/env python3
"""
Auto-translate de-based website content config into configured target languages.

Usage:
  python scripts/translate_webseite_content_config.py \
    --input supabase/webseite_content_config.kromen.json \
    --output supabase/webseite_content_config.kromen.json
"""

from __future__ import annotations

import argparse
import json
import time
import urllib.parse
import urllib.request
from typing import Any

LANGS = ["de", "en", "tr", "ru", "ar", "it", "zh", "hi", "es", "fr", "nl", "pl"]

# domain-specific replacements to keep terminology more accurate in energy context
ENERGY_GLOSSARY = {
    "en": {
        "basic supply": "default utility tariff",
        "energy assistant": "Energy Assistant",
    },
    "tr": {"temel tedarik": "varsayılan enerji tarifesi"},
    "ru": {"базов": "стандартный тариф поставщика"},
    "it": {"fornitura di base": "tariffa standard"},
    "es": {"suministro básico": "tarifa estándar"},
    "fr": {"fourniture de base": "tarif standard"},
    "nl": {"basisvoorziening": "standaardtarief"},
    "pl": {"podstaw": "taryfa standardowa"},
}

_cache: dict[tuple[str, str], str] = {}


def polish(text: str, lang: str) -> str:
    out = " ".join(text.split())
    for src, dst in ENERGY_GLOSSARY.get(lang, {}).items():
        if src in out.lower():
            out = out.replace(src, dst)
    if lang == "ar":
        out = out.replace("?", "؟")
    return out


def translate_google(text: str, target_lang: str, source_lang: str = "de") -> str:
    if target_lang == source_lang:
        return text

    key = (target_lang, text)
    if key in _cache:
        return _cache[key]

    url = (
        "https://translate.googleapis.com/translate_a/single"
        f"?client=gtx&sl={urllib.parse.quote(source_lang)}"
        f"&tl={urllib.parse.quote(target_lang)}&dt=t&q={urllib.parse.quote(text)}"
    )

    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        payload = json.loads(resp.read().decode("utf-8"))

    segments = payload[0] if payload and payload[0] else []
    translated = "".join(seg[0] for seg in segments if seg and seg[0]) or text
    translated = polish(translated, target_lang)
    _cache[key] = translated
    time.sleep(0.08)
    return translated


def translate_multilang_map(value: dict[str, Any]) -> dict[str, Any]:
    # Only auto-fill from de when missing or identical copy.
    de_val = value.get("de")
    if not isinstance(de_val, str) or not de_val.strip():
        return value

    out = dict(value)
    for lang in LANGS:
        cur = out.get(lang)
        if lang == "de":
            out[lang] = de_val
            continue
        if not isinstance(cur, str) or not cur.strip() or cur.strip() == de_val.strip():
            out[lang] = translate_google(de_val, lang)
    return out


def walk(node: Any) -> Any:
    if isinstance(node, dict):
        keys = set(node.keys())
        if keys and keys.issubset(set(LANGS)):
            # multilingual map candidate
            str_map = {k: v for k, v in node.items() if isinstance(v, str)}
            if str_map:
                merged = dict(node)
                merged.update(translate_multilang_map(merged))
                return merged

        return {k: walk(v) for k, v in node.items()}

    if isinstance(node, list):
        return [walk(item) for item in node]

    return node


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()

    with open(args.input, "r", encoding="utf-8") as f:
        data = json.load(f)

    translated = walk(data)

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(translated, f, ensure_ascii=False, indent=2)

    print("Done.")


if __name__ == "__main__":
    main()
