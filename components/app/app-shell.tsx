"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Boxes,
  Home,
  ListChecks,
  Plus,
  Settings,
  ShieldCheck,
  Store
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/products", label: "Products", icon: Boxes },
  { href: "/products/new", label: "New Product", icon: Plus },
  { href: "/accounts", label: "Accounts", icon: Store },
  { href: "/publish-queue", label: "Publish Queue", icon: ListChecks },
  { href: "/activity", label: "Activity Logs", icon: Activity },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r bg-white/92 backdrop-blur md:flex md:flex-col">
        <div className="flex h-16 items-center gap-3 border-b px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-black text-primary-foreground">
            LQ
          </div>
          <div>
            <p className="font-semibold leading-tight">Listiq</p>
            <p className="text-xs text-muted-foreground">Marketplace ops</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-5">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                href={item.href}
                key={item.href}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  active && "bg-foreground text-white hover:bg-foreground hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="m-4 rounded-lg border bg-muted/45 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Compliance mode
          </div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Unsupported marketplaces stay in manual queues. No bypass logic is enabled.
          </p>
        </div>
      </aside>

      <div className="md:pl-72">
        <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between border-b bg-background/88 px-4 backdrop-blur md:px-8">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              Demo workspace
            </p>
            <h1 className="truncate text-lg font-semibold">
              Multi-marketplace listing control
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/products/new">Create listing</Link>
            </Button>
            <Button asChild>
              <Link href="/publish-queue">Review queue</Link>
            </Button>
          </div>
        </header>
        <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
