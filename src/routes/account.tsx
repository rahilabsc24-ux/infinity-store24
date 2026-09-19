import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Package, Heart, MapPin, User } from "lucide-react";
import { Link } from "@/shop/lib/next-compat";
import { Button } from "@/shop/components/ui/button";
import { useWishlist } from "@/shop/lib/wishlist-context";
import { useToast } from "@/shop/lib/toast-context";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your account — Infinity" },
      { name: "description", content: "Manage your Infinity profile, delivery address, and saved items." },
      { property: "og:title", content: "Your account — Infinity" },
      { property: "og:description", content: "Manage your Infinity profile, delivery address, and saved items." },
    ],
  }),
  component: AccountPage,
});

const STORAGE_KEY = "infinity-account";

type Profile = { name: string; email: string; phone: string; address: string };

const emptyProfile: Profile = { name: "", email: "", phone: "", address: "" };

function Field({
  id,
  label,
  value,
  onChange,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        {...props}
      />
    </div>
  );
}

function AccountPage() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const { count: wishlistCount } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProfile({ ...emptyProfile, ...JSON.parse(raw) });
    } catch {
      // ignore malformed storage
    }
  }, []);

  function set<K extends keyof Profile>(key: K, value: string) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore quota errors
    }
    showToast({ title: "Details saved", description: "Your account details were updated.", variant: "success" });
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-full bg-brand/10">
          <User className="size-6 text-brand" />
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Your account</h1>
          <p className="text-sm text-muted-foreground">
            {profile.name ? `Welcome back, ${profile.name.split(" ")[0]}` : "Add your details for faster checkout"}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link
          href="/wishlist"
          className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand/50"
        >
          <Heart className="size-5 text-brand" />
          <p className="mt-3 font-semibold text-foreground">Wishlist</p>
          <p className="text-sm text-muted-foreground">{wishlistCount} saved items</p>
        </Link>
        <Link
          href="/cart"
          className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand/50"
        >
          <Package className="size-5 text-brand" />
          <p className="mt-3 font-semibold text-foreground">Orders</p>
          <p className="text-sm text-muted-foreground">Track your current basket</p>
        </Link>
        <Link
          href="/settings"
          className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand/50"
        >
          <MapPin className="size-5 text-brand" />
          <p className="mt-3 font-semibold text-foreground">Preferences</p>
          <p className="text-sm text-muted-foreground">Currency, emails and more</p>
        </Link>
      </div>

      <form onSubmit={handleSave} className="mt-8 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">Personal details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field id="name" label="Full name" value={profile.name} onChange={(v) => set("name", v)} placeholder="Jane Doe" />
          <Field
            id="email"
            label="Email"
            type="email"
            value={profile.email}
            onChange={(v) => set("email", v)}
            placeholder="you@example.com"
          />
          <Field id="phone" label="Phone" value={profile.phone} onChange={(v) => set("phone", v)} placeholder="+1 555 0100" />
          <Field
            id="address"
            label="Default delivery address"
            value={profile.address}
            onChange={(v) => set("address", v)}
            placeholder="123 Main St, New York"
          />
        </div>
        <Button type="submit" className="mt-6 h-11 bg-cta px-6 text-sm font-semibold text-cta-foreground hover:bg-cta/90">
          Save details
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">
          Details are stored on this device only — connect a backend to sync them across devices.
        </p>
      </form>
    </main>
  );
}
