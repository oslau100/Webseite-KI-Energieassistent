import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-muted pt-12 pb-2 md:py-16 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-start gap-2 -mt-4 md:-mt-8">
              <img src="https://vibe.filesafe.space/1774643086282323006/attachments/2e3ecdff-f542-4634-89f0-2179d8141a83.png" alt="Kromen Energieassistent Logo" className="h-28 md:h-32 w-auto object-contain object-left-top" />
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Alle Rechte vorbehalten.<br />Kromen Energieassistent</p>
          </div>
          <div className="space-y-4"><h4 className="font-semibold text-foreground">Kontakt</h4><div className="space-y-2 text-sm text-muted-foreground"><a href="#" className="hover:text-primary transition-colors block underline underline-offset-4">Rückruf anfordern</a></div></div>
          <div className="space-y-4"><h4 className="font-semibold text-foreground">Rechtliches</h4><div className="space-y-2 text-sm text-muted-foreground"><Link to="/datenschutz" className="hover:text-primary transition-colors block">Datenschutz</Link><Link to="/impressum" className="hover:text-primary transition-colors block">Impressum</Link><div className="-mt-12 -mb-12 md:-mt-2 md:mb-0"><a href="https://www.laurent-digital.de" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity"><img src="https://vibe.filesafe.space/1774643086282323006/attachments/a629d547-6056-4079-8549-0a910a7eafbd.png" alt="Made by Laurent Digital" className="h-48 w-auto object-contain object-left -ml-6 sm:-ml-8 md:ml-0" /></a></div></div></div>
        </div>
      </div>
    </footer>
  );
};
