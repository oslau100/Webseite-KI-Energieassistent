import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const CookieBar = () => {
  const [visible, setVisible] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] flex justify-center p-4 pointer-events-none">
      <div className="w-full max-w-5xl max-h-[40vh] overflow-y-auto rounded-2xl border bg-background shadow-2xl pointer-events-auto">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-4">Privatsphäre-Einstellungen</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Um Ihnen ein optimales Website-Erlebnis zu bieten, verwendet der Energieassistent Cookies und ähnliche Technologien.
            Essenzielle Cookies sind für den Betrieb notwendig. Marketing Cookies helfen uns, Ihr Nutzererlebnis zu verbessern.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Sie haben die Wahl, welche Verarbeitungen und Cookies Sie zulassen möchten.
          </p>

          <div className="flex flex-wrap items-center gap-8 rounded-xl bg-muted/50 p-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-semibold">Marketing</span>
              <Switch checked={marketingEnabled} onCheckedChange={setMarketingEnabled} />
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold">Essenziell</span>
              <Switch checked disabled />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="sm:flex-1" onClick={() => setVisible(false)}>
              Einstellungen speichern
            </Button>
            <Button className="sm:flex-1" onClick={() => setVisible(false)}>
              Alles akzeptieren
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
