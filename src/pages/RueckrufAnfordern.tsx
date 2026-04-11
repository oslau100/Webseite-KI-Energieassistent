import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const RueckrufAnfordern = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main className="container mx-auto px-4 pt-36 md:pt-44 pb-16">
        <iframe
          src="https://api.leadconnectorhq.com/widget/booking/z0PrnWWbt0PdC4ug1Gcw"
          style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "900px" }}
          scrolling="no"
          id="z0PrnWWbt0PdC4ug1Gcw_1775586751571"
          title="Rückruf Kalender"
        />
      </main>
      <Footer />
    </div>
  );
};

export default RueckrufAnfordern;
