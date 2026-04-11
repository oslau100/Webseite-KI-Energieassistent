import { useEffect, useRef, useState } from "react";
import { SimpleFooter } from "@/components/SimpleFooter";
import { useLocation } from "react-router-dom";

const Start = () => {
  const location = useLocation();
  const src = `/loaders/start.html${location.search || ""}`;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(900);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let observer: ResizeObserver | null = null;
    const updateHeight = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        const next = Math.max(
          doc.documentElement?.scrollHeight || 0,
          doc.body?.scrollHeight || 0,
          doc.documentElement?.offsetHeight || 0,
          700,
        );
        setIframeHeight(next);
      } catch {
        // ignore cross-frame access errors
      }
    };

    const onLoad = () => {
      updateHeight();
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        observer = new ResizeObserver(updateHeight);
        observer.observe(doc.documentElement);
        if (doc.body) observer.observe(doc.body);
      } catch {
        // ignore unsupported observers
      }
    };

    iframe.addEventListener("load", onLoad);
    onLoad();
    const intervalId = window.setInterval(updateHeight, 500);

    return () => {
      iframe.removeEventListener("load", onLoad);
      window.clearInterval(intervalId);
      observer?.disconnect();
    };
  }, [src]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
      <main className="flex-grow p-2 sm:p-4">
        <iframe
          ref={iframeRef}
          title="Setting Survey Loader"
          src={src}
          scrolling="no"
          style={{ height: `${iframeHeight}px` }}
          className="w-full border-0 overflow-hidden"
        />
      </main>
      <SimpleFooter />
    </div>
  );
};

export default Start;
