import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { AnimatedSection } from "./AnimatedSection";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const FAQ = () => {
  const { t, withLang } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [{ question: t("faq_q1"), answer: t("faq_a1") }];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{t("faq_title")}</h2>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="border rounded-xl bg-muted/30 px-6">
                  <button onClick={() => setOpenIndex(isOpen ? null : index)} className="flex w-full items-center justify-between py-6 font-semibold text-lg text-left hover:underline" aria-expanded={isOpen}>
                    {faq.question}
                    <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
                  </button>
                  <div className={cn("grid transition-all duration-200 ease-in-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <div className="overflow-hidden">
                      <div className="text-muted-foreground text-base leading-relaxed pb-6">{faq.answer}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={300} className="mt-24 bg-primary text-primary-foreground rounded-[2.5rem] p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl leading-tight">{t("faq_cta_title")}</h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">{t("faq_cta_text")}</p>
            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-semibold w-full sm:w-auto shadow-lg text-primary" asChild>
              <Link to={withLang("/start")}>{t("cta_check_savings")}</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
