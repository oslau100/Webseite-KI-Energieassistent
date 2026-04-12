-- Voraussetzung: webseite_* Spalten existieren.
-- JSON aus den beiliegenden Dateien in diese UPDATE-Statements einfügen oder via Editor importieren.

update public.kunden_config
set
  webseite_design_config = webseite_design_config,
  webseite_content_config = webseite_content_config,
  webseite_layout_config = webseite_layout_config,
  aktualisiert_am_utm = now()
where location_id = 'Ddc0DVM8MT67wmLP3wAA';
