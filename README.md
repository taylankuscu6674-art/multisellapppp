# Listiq

Listiq is a compliant multi-marketplace listing operations dashboard for second-hand sales teams. It lets a seller create product data once, review platform-specific readiness, publish only through approved integrations, and route unsupported marketplaces into a manual publish queue.

## Stack

- Next.js 15 App Router with TypeScript
- Tailwind CSS with shadcn/ui-style components
- Prisma with PostgreSQL
- NextAuth-ready authentication shell
- S3-compatible media storage service
- Marketplace adapter pattern for compliant integrations

## Local Development

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

The UI ships with demo data, so it runs before a database is connected. Use `npm run db:push` and `npm run db:seed` when a PostgreSQL database is available.

## Website, App, And GitHub Links

- Website: set `NEXT_PUBLIC_SITE_URL`
- Installable app: set `NEXT_PUBLIC_APP_URL` and open `/app`
- GitHub repository: set `NEXT_PUBLIC_GITHUB_REPO_URL`

The app includes a web app manifest, service worker registration, offline fallback page, app icons, and a `/app` launch route that opens the dashboard. Browsers can install it as a PWA from the site URL after deployment.

To connect this local folder to GitHub:

```bash
git init -b main
git add .
git commit -m "Initial Listiq MVP"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Compliance Model

Adapters default to manual publishing unless a platform has an official API, approved partner integration, documented import/export flow, or another clearly permitted method. No stealth browser automation, CAPTCHA bypass, fingerprint spoofing, scraping-based publishing, or platform-rule evasion is included.
