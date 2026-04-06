import { useEffect, useRef, useState } from "react";
import { AnimatedSection } from "./AnimatedSection";

const CountUp = ({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={ref} className="notranslate">{count.toLocaleString("de-DE")}{suffix}</span>;
};

export const Stats = () => (
  <section className="py-12 bg-background"><div className="container px-4 md:px-6"><AnimatedSection className="max-w-5xl mx-auto border-2 border-primary rounded-3xl p-8 md:p-12 shadow-lg shadow-primary/5"><div className="grid gap-8 md:grid-cols-3 text-center divide-y md:divide-y-0 md:divide-x divide-border"><div className="space-y-2 pt-4 md:pt-0"><h3 className="text-4xl md:text-5xl font-bold text-primary tracking-tighter"><CountUp end={15000} suffix="+" /></h3><p className="text-muted-foreground md:text-lg">Tarife und Rechnungen bereits geprüft</p></div><div className="space-y-2 pt-8 md:pt-0"><h3 className="text-4xl md:text-5xl font-bold text-primary tracking-tighter"><CountUp end={2000} suffix="+" /></h3><p className="text-muted-foreground md:text-lg">Haushalte nutzen den Energieassistenten</p></div><div className="space-y-2 pt-8 md:pt-0"><h3 className="text-4xl md:text-5xl font-bold text-primary tracking-tighter"><CountUp end={900000} suffix="+ €" /></h3><p className="text-muted-foreground md:text-lg">an Energiekosten bereits eingespart</p></div></div></AnimatedSection></div></section>
);
