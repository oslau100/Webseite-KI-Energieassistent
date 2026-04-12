# Translation workflow for `webseite_content_config`

To semantically fill all 12 language slots for config keys, run:

```bash
python scripts/translate_webseite_content_config.py \
  --input supabase/webseite_content_config.kromen.json \
  --output supabase/webseite_content_config.kromen.json
```

The script:
- fills missing/non-translated language values from the German source (`de`),
- keeps existing translations untouched,
- applies small energy-domain glossary adjustments.

After generation, review legal and marketing copy with native speakers before publishing.
