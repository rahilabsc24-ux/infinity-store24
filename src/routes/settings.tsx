import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/shop/components/ui/button";
import { useToast } from "@/shop/lib/toast-context";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Infinity" },
      { name: "description", content: "Choose your currency, language, and the emails Infinity sends you." },
      { property: "og:title", content: "Settings — Infinity" },
      { property: "og:description", content: "Choose your currency, language, and the emails Infinity sends you." },
    ],
  }),
  component: SettingsPage,
});

const STORAGE_KEY = "infinity-settings";

type Settings = {
  currency: string;
  language: string;
  orderEmails: boolean;
  promoEmails: boolean;
  savePaymentInfo: boolean;
};

const defaults: Settings = {
  currency: "USD",
  language: "en",
  orderEmails: true,
  promoEmails: false,
  savePaymentInfo: false,
};

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 border-b border-border py-4 last:border-b-0">
      <span>
        <span className="block text-sm font-medium text-foreground">{label}</span>
        <span className="block text-sm text-muted-foreground">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 size-5 shrink-0 accent-[var(--color-brand,currentColor)]"
      />
    </label>
  );
}

function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaults);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...defaults, ...JSON.parse(raw) });
    } catch {
      // ignore malformed storage
    }
  }, []);

  function set<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  function handleSave() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore quota errors
    }
    showToast({ title: "Settings saved", description: "Your preferences were updated.", variant: "success" });
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-full bg-brand/10">
          <SettingsIcon className="size-6 text-brand" />
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Shopping preferences for this device</p>
        </div>
      </div>

      <section className="mt-8 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">Shopping</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="currency" className="mb-1.5 block text-sm font-medium text-foreground">
              Currency
            </label>
            <select
              id="currency"
              value={settings.currency}
              onChange={(e) => set("currency", e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
              <option value="INR">INR — Indian Rupee</option>
            </select>
          </div>
          <div>
            <label htmlFor="language" className="mb-1.5 block text-sm font-medium text-foreground">
              Language
            </label>
            <select
              id="language"
              value={settings.language}
              onChange={(e) => set("language", e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Prices are shown in US dollars in this demo; currency and language are saved but not yet applied.
        </p>
      </section>

      <section className="mt-6 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
        <div className="mt-2">
          <Toggle
            label="Order updates"
            description="Confirmations, shipping and delivery emails."
            checked={settings.orderEmails}
            onChange={(v) => set("orderEmails", v)}
          />
          <Toggle
            label="Offers and new arrivals"
            description="Occasional emails about sales and drops."
            checked={settings.promoEmails}
            onChange={(v) => set("promoEmails", v)}
          />
          <Toggle
            label="Remember payment details"
            description="Pre-fill checkout on this device."
            checked={settings.savePaymentInfo}
            onChange={(v) => set("savePaymentInfo", v)}
          />
        </div>
      </section>

      <Button
        onClick={handleSave}
        className="mt-6 h-11 bg-cta px-6 text-sm font-semibold text-cta-foreground hover:bg-cta/90"
      >
        Save settings
      </Button>
    </main>
  );
}
