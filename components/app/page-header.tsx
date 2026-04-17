import { Button } from "@/components/ui/button";

export function PageHeader({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-1 text-3xl font-semibold tracking-normal">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export function HeaderAction({
  children,
  href
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Button asChild>
      <a href={href}>{children}</a>
    </Button>
  );
}
