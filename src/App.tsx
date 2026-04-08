import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Jahresrechnung from "./pages/Jahresrechnung";
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";
import Start from "./pages/Start";
import Tarif from "./pages/Tarif";
import Auftrag from "./pages/Auftrag";
import Uebermittelt from "./pages/Uebermittelt";
import RueckrufAnfordern from "./pages/RueckrufAnfordern";
import { ScrollToTop } from "./components/ScrollToTop";
import { CookieBar } from "./components/CookieBar";
import { I18nProvider } from "./lib/i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <I18nProvider>
          <ScrollToTop />
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/jahresrechnung" element={<Jahresrechnung />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/start" element={<Start />} />
          <Route path="/tarif" element={<Tarif />} />
          <Route path="/auftrag" element={<Auftrag />} />
          <Route path="/uebermittelt" element={<Uebermittelt />} />
            <Route path="/rueckruf-anfordern" element={<RueckrufAnfordern />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
          <CookieBar />
        </I18nProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
