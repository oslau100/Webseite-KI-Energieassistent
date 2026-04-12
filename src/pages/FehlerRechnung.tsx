import { Link } from "react-router-dom";
import { SimpleHeader } from "@/components/SimpleHeader";
import { SimpleFooter } from "@/components/SimpleFooter";

const FehlerRechnung = () => (
  <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary pt-24 md:pt-32">
    <SimpleHeader />
    <main className="flex-grow flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl text-center space-y-10">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Die Übermittlung deiner Rechnung ist fehlgeschlagen.
          <br />
          Bitte versuche es erneut.
        </h1>
        <Link
          to="/start-rechnung"
          className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-base md:text-lg font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Erneut versuchen
        </Link>
      </div>
    </main>
    <SimpleFooter />
  </div>
);

export default FehlerRechnung;
