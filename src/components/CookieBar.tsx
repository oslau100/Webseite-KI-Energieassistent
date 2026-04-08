import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

const CONSENT_KEY = "kromen_cookie_consent_v1";

type Consent = {
  essential: true;
  marketing: boolean;
  updatedAt: string;
};

export const CookieBar = () => {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as Consent;
      setMarketingEnabled(Boolean(parsed.marketing));
      setVisible(false);
    } catch {
      setVisible(true);
    }
  }, []);

  const persist = (marketing: boolean) => {
    const payload: Consent = {
      essential: true,
      marketing,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
    setMarketingEnabled(marketing);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] flex justify-center p-4">
      <div className="w-full max-w-5xl max-h-[40vh] overflow-y-auto rounded-2xl border bg-background shadow-2xl">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-4">{t("cookie_title")}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{t("cookie_copy_1")}</p>
          <p className="text-muted-foreground leading-relaxed mb-6">{t("cookie_copy_2")}</p>

          <div className="flex flex-wrap items-center gap-8 rounded-xl bg-muted/50 p-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-semibold">{t("cookie_marketing")}</span>
              <Switch
                checked={marketingEnabled}
                onCheckedChange={setMarketingEnabled}
                aria-label={t("cookie_marketing")}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold">{t("cookie_essential")}</span>
              <Switch checked disabled aria-label={t("cookie_essential")} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="sm:flex-1" onClick={() => persist(false)}>
              {t("cookie_save")}
            </Button>
            <Button className="sm:flex-1" onClick={() => persist(true)}>
              {t("cookie_accept_all")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};