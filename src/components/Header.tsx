import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";

const LANGUAGES = [
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "zh-CN", label: "中文", flag: "🇨🇳" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "pl", label: "Polski", flag: "🇵🇱" },
];

export const Header = () => {
  const location = useLocation();
  const isIndexPage = location.pathname === "/";
  const isLegalPage = location.pathname === "/impressum" || location.pathname === "/datenschutz";
  const [currentLanguage, setCurrentLanguage] = useState("de");

  const selectedLanguage = useMemo(
    () => LANGUAGES.find((language) => language.code === currentLanguage) ?? LANGUAGES[0],
    [currentLanguage],
  );

  const changeLanguage = (langCode: string) => {
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    }
    setCurrentLanguage(langCode);
  };

  return (
    <header className="absolute top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-24 md:h-32 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img
              src="https://vibe.filesafe.space/1774643086282323006/attachments/e9aa516d-6891-4336-a8a2-49e0e6e79579.png"
              alt="Kromen Energieassistent"
              className="h-20 md:h-28 w-auto"
            />
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-10 rounded-md px-3 gap-2 bg-background shadow-sm border-border hover:bg-muted/50"
              >
                <span className="text-lg leading-none">{selectedLanguage.flag}</span>
                <span className="font-semibold uppercase text-sm">{selectedLanguage.code.slice(0, 2)}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Sprache wechseln</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LANGUAGES.map((language) => (
                <DropdownMenuItem key={language.code} onClick={() => changeLanguage(language.code)}>
                  <span className="mr-2">{language.flag}</span>
                  {language.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {!isLegalPage && (
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 inline-flex rounded-md font-semibold text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4"
            >
              <Link to={isIndexPage ? "/jahresrechnung" : "/"}>
                {isIndexPage ? "Jahresrechnung prüfen" : "Tarifersparnis prüfen"}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
