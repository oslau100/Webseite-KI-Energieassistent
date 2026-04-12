import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { useWebsiteConfig } from "@/lib/websiteConfig";

export const SimpleHeader = () => {
  const { withLang } = useI18n();
  const { getText, design } = useWebsiteConfig();
  const logoUrl = ((design.assets as Record<string, string> | undefined)?.logo_header) || "";
  const logoAlt = getText("brand.name", "Energieassistent");

  return (
    <header className="absolute top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b"><div className="container mx-auto px-4 h-24 md:h-32 flex items-center justify-center md:justify-start"><Link to={withLang("/")}>{logoUrl ? <img src={logoUrl} alt={logoAlt} className="h-20 md:h-28 w-auto" /> : <span className="font-semibold text-foreground">{logoAlt}</span>}</Link></div></header>
  );
};
