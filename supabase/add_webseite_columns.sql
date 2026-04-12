alter table public.kunden_config
  add column if not exists webseite_design_config jsonb not null default '{}'::jsonb,
  add column if not exists webseite_content_config jsonb not null default '{}'::jsonb,
  add column if not exists webseite_layout_config jsonb not null default '{}'::jsonb;

comment on column public.kunden_config.webseite_design_config is 'Design tokens und Assets für die Marketing-Website';
comment on column public.kunden_config.webseite_content_config is 'Komplette Website-Copy inkl. i18n-Overrides';
comment on column public.kunden_config.webseite_layout_config is 'Layout/Sektion-Reihenfolge und Sichtbarkeit pro Seite';
