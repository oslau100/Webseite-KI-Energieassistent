-- Führt ein echtes Seed-Update für die Kromen-Zeile aus.
-- Ausführung (im Repo-Root):
-- psql "$SUPABASE_DB_URL" -f supabase/seed_kromen_webseite_configs.sql
--
-- Voraussetzung: Datei wird mit psql ausgeführt (Meta-Commands \set/\!).

\set kromen_design_config `cat supabase/webseite_design_config.kromen.json`
\set kromen_content_config `cat supabase/webseite_content_config.kromen.json`
\set kromen_layout_config `cat supabase/webseite_layout_config.kromen.json`

update public.kunden_config
set
  webseite_design_config = :'kromen_design_config'::jsonb,
  webseite_content_config = :'kromen_content_config'::jsonb,
  webseite_layout_config = :'kromen_layout_config'::jsonb,
  aktualisiert_am_utm = now()
where location_id = 'Ddc0DVM8MT67wmLP3wAA';
