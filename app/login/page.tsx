import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-sm font-black text-white">
            LQ
          </div>
          <CardTitle>Sign in to Listiq</CardTitle>
          <p className="text-sm text-muted-foreground">
            Use the demo workspace to review products, queues, and account states.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input defaultValue="demo@listiq.app" type="email" />
          </div>
          <div className="grid gap-2">
            <Label>Password</Label>
            <Input defaultValue="listiq-demo" type="password" />
          </div>
          <Button asChild className="w-full">
            <Link href="/dashboard">Continue to dashboard</Link>
          </Button>
          <div className="flex gap-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
            NextAuth is wired for credentials. Add a real provider and Prisma adapter when
            production authentication is configured.
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
