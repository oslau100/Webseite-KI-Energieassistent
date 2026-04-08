import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "./AnimatedSection";

export const Comparison = () => {
  const { t, withLang } = useI18n();

  const portals = [t("comparison_left_1"), t("comparison_left_2"), t("comparison_left_3"), t("comparison_left_4"), t("comparison_left_5")];
  const assistant = [t("comparison_right_1"), t("comparison_right_2"), t("comparison_right_3"), t("comparison_right_4"), t("comparison_right_5"), t("comparison_right_6")];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <AnimatedSection className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl leading-tight">{t("comparison_title")}</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <AnimatedSection delay={100} animation="fade-right" className="h-full">
            <Card className="border-2 border-muted shadow-lg bg-card h-full">
              <CardHeader className="text-center pb-8 pt-10">
                <CardTitle className="text-2xl">{t("comparison_left_title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-8 pb-10">
                {portals.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 shrink-0 bg-muted rounded-full p-1">
                      <X className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={200} animation="fade-left" className="h-full">
            <Card className="border-none shadow-2xl bg-primary text-primary-foreground transform md:-translate-y-4 scale-100 md:scale-[1.02] transition-transform h-full">
              <CardHeader className="text-center pb-8 pt-10">
                <CardTitle className="text-2xl text-primary-foreground">{t("comparison_right_title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-8 pb-10">
                {assistant.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 shrink-0 bg-primary-foreground/20 rounded-full p-1">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <p className="text-primary-foreground/90">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={400} className="mt-16 text-center">
          <Button size="lg" className="h-14 px-10 text-lg font-semibold shadow-lg shadow-primary/20" asChild>
            <Link to={withLang("/start")}>{t("cta_check_savings")}</Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};
