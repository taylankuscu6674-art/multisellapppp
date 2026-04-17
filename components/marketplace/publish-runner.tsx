"use client";

import { useState, useTransition } from "react";
import { Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PublishResult } from "@/types/marketplace";

type PublishAction = () => Promise<PublishResult[]>;

export function PublishRunner({ action }: { action: PublishAction }) {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<PublishResult[] | null>(null);

  const manualCount =
    results?.filter((result) => result.status === "manual_action_needed").length ?? 0;
  const publishedCount =
    results?.filter((result) => result.status === "published").length ?? 0;

  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Compliance review is enforced before publishing.
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Supported integrations publish through approved methods. Unsupported platforms
            become manual actions.
          </p>
        </div>
        <Button
          onClick={() => {
            startTransition(async () => {
              const nextResults = await action();
              setResults(nextResults);
            });
          }}
          disabled={isPending}
        >
          <Send className="mr-2 h-4 w-4" />
          {isPending ? "Reviewing..." : "Publish everywhere possible"}
        </Button>
      </div>
      {results ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>{publishedCount} published</Badge>
          <Badge variant="warning">{manualCount} manual actions</Badge>
          <Badge variant="muted">{results.length} attempts logged</Badge>
        </div>
      ) : null}
    </div>
  );
}
