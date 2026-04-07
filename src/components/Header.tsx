import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const isIndexPage = location.pathname === "/";
  const isLegalPage = location.pathname === "/impressum" || location.pathname === "/datenschutz";

  const changeLanguage = (langCode: string) => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
  };

  return (
    <header className="absolute top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b"><div className="container mx-auto px-4 h-24 md:h-32 flex items-center justify-between"><div className="flex items-center"><Link to="/"><img src="https://vibe.filesafe.space/1774643086282323006/attachments/e9aa516d-6891-4336-a8a2-49e0e6e79579.png" alt="Kromen Energieassistent" className="h-20 md:h-28 w-auto" /></Link></div><div className="flex items-center gap-2 sm:gap-4"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="text-foreground hover:bg-primary/5 h-8 w-8 sm:h-10 sm:w-10"><Globe className="h-4 w-4 sm:h-5 sm:w-5" /><span className="sr-only">Sprache wechseln</span></Button></DropdownMenuTrigger><DropdownMenuContent align="end">{[['de','Deutsch'],['en','English'],['tr','Türkçe'],['ru','Русский'],['ar','العربية'],['it','Italiano'],['zh-CN','中文'],['hi','हिन्दी'],['es','Español'],['fr','Français'],['nl','Nederlands'],['pl','Polski']].map(([c,l])=><DropdownMenuItem key={c} onClick={()=>changeLanguage(c)}>{l}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>{!isLegalPage && <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/5 inline-flex rounded-md font-semibold text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4"><Link to={isIndexPage ? "/jahresrechnung" : "/"}>{isIndexPage ? "Jahresrechnung prüfen" : "Tarifersparnis prüfen"}</Link></Button>}</div></div></header>
  );
};
