import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { SimpleHeader } from "@/components/SimpleHeader";
import { SimpleFooter } from "@/components/SimpleFooter";

const AuftragEingegangen = () => (
  <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary pt-24 md:pt-32">
    <SimpleHeader />
    <main className="flex-grow flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl text-center space-y-4 md:space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight inline-flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          Dein Auftrag ist erfolgreich eingegangen
          <span className="inline-flex items-center justify-center rounded-md bg-primary p-1.5">
            <Check className="h-6 w-6 text-white" aria-hidden="true" />
          </span>
        </h1>
        <p className="text-lg md:text-2xl text-foreground max-w-4xl mx-auto leading-relaxed">
          Dein Wechselauftrag wurde erfolgreich übermittelt. Der Anbieter prüft nun deine Angaben und sendet dir innerhalb der nächsten 14 Tage eine offizielle Auftragsbestätigung per E-Mail oder Post zu. Du musst aktuell nichts weiter tun. Falls Rückfragen bestehen, meldet sich der Anbieter direkt bei dir.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base md:text-lg font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </main>
    <SimpleFooter />
  </div>
);

export default AuftragEingegangen;
