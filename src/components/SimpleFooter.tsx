import { Link } from "react-router-dom";

export const SimpleFooter = () => {
  return (
    <footer className="bg-muted py-6 border-t mt-auto"><div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4"><p className="text-sm text-muted-foreground text-center md:text-left">© {new Date().getFullYear()} Alle Rechte vorbehalten. Kromen Energieassistent</p><div className="flex gap-4 text-sm text-muted-foreground"><Link to="/datenschutz" className="hover:text-primary transition-colors">Datenschutz</Link><Link to="/impressum" className="hover:text-primary transition-colors">Impressum</Link></div></div></footer>
  );
};
