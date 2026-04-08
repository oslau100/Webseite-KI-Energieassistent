import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

export const SimpleHeader = () => {
  const { withLang } = useI18n();

  return (
    <header className="absolute top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b"><div className="container mx-auto px-4 h-24 md:h-32 flex items-center justify-center md:justify-start"><Link to={withLang("/")}><img src="https://vibe.filesafe.space/1774643086282323006/attachments/e9aa516d-6891-4336-a8a2-49e0e6e79579.png" alt="Kromen Energieassistent" className="h-20 md:h-28 w-auto" /></Link></div></header>
  );
};
