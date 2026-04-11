import { SimpleFooter } from "@/components/SimpleFooter";
import { useLocation } from "react-router-dom";

const Auftrag = () => {
  const location = useLocation();
  const src = `/loaders/auftrag.html${location.search || ""}`;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
      <main className="flex-grow p-2 sm:p-4">
        <iframe title="Closing Survey Loader" src={src} className="w-full min-h-[70vh] border-0" />
      </main>
      <SimpleFooter />
    </div>
  );
};

export default Auftrag;
