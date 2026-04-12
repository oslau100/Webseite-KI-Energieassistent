// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";
import App from "@/App";

type JsonObject = Record<string, unknown>;

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const repoRoot = path.resolve(__dirname, "../..");

const readJson = (relativePath: string): JsonObject => {
  const filePath = path.join(repoRoot, relativePath);
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as JsonObject;
};

const get = (obj: JsonObject, dottedPath: string): unknown =>
  dottedPath.split(".").reduce<unknown>((acc, key) => {
    if (!acc || typeof acc !== "object") return undefined;
    return (acc as JsonObject)[key];
  }, obj);

describe("Kromen JSON config completeness", () => {
  it("contains all required keys in content and design configs", () => {
    const content = readJson("supabase/webseite_content_config.kromen.json");
    const design = readJson("supabase/webseite_design_config.kromen.json");

    const requiredPaths = [
      "brand.name",
      "sections.about.avatar_url",
      "sections.about.social",
      "sections.about.person_name",
      "sections.about.paragraph_1",
      "sections.about.paragraph_2",
      "sections.about.paragraph_3",
      "sections.about.paragraph_4",
      "legal.variables",
    ];

    for (const requiredPath of requiredPaths) {
      expect(get(content, requiredPath), `missing content key: ${requiredPath}`).toBeTruthy();
    }

    const requiredDesignPaths = [
      "assets.logo_header",
      "assets.logo_footer",
      "assets.hero_image",
      "assets.agency_logo",
    ];

    for (const requiredPath of requiredDesignPaths) {
      expect(get(design, requiredPath), `missing design key: ${requiredPath}`).toBeTruthy();
    }
  });
});

describe("Route smoke checks", () => {
  beforeEach(() => {
    localStorage.clear();
    window.scrollTo = () => undefined;
    globalThis.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;
    globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders Home with cookie bar", async () => {
    window.history.pushState({}, "", "/");
    render(<App />);

    expect(await screen.findByRole("heading", { name: /Zahlst du zu viel für Strom oder Gas/i })).toBeTruthy();
    expect(await screen.findByText(/Privatsphäre-Einstellungen/i)).toBeTruthy();
  });

  it("renders Jahresrechnung page", async () => {
    window.history.pushState({}, "", "/jahresrechnung");
    render(<App />);

    expect(await screen.findByRole("heading", { name: /Wurde deine Strom- oder Gasabrechnung falsch berechnet/i })).toBeTruthy();
  });

  it("renders Impressum page", async () => {
    window.history.pushState({}, "", "/impressum");
    render(<App />);

    expect(await screen.findByRole("heading", { name: /Impressum/i })).toBeTruthy();
  });

  it("renders Datenschutz page", async () => {
    window.history.pushState({}, "", "/datenschutz");
    render(<App />);

    expect(await screen.findByRole("heading", { name: /Datenschutzerklärung/i })).toBeTruthy();
  });

  it("renders pages with SimpleHeader and SimpleFooter", async () => {
    window.history.pushState({}, "", "/fehler");
    render(<App />);

    expect(await screen.findByAltText(/Kromen Energieassistent/i)).toBeTruthy();
    expect(await screen.findByText(/Alle Rechte vorbehalten/i)).toBeTruthy();
  });
});
