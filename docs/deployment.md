# MultiSELLER Deployment Notes

## Local branded development

Use `multiseller.local` for the cleanest local development hostname. It is explicit, reserved for local machine routing by convention, and keeps production URLs separate from development.

1. Add this line to your hosts file:

   `127.0.0.1 multiseller.local app.multiseller.local multiseller.test`

   On Windows, you can run `scripts/setup-local-domain.ps1` from an elevated PowerShell window to add it.

2. Start the development server:

   `npm run dev:domain`

3. Open:

   `http://multiseller.local:3000`

The port is still visible because Next.js is serving directly on port `3000`. To hide the port later, put a local reverse proxy such as Caddy, nginx, or Traefik in front of Next.js and proxy `http://multiseller.local` to `http://127.0.0.1:3000`.

## Vercel preview and production URLs

Set these environment variables in Vercel:

`AUTH_SECRET`
`NEXTAUTH_SECRET`
`AUTH_URL`
`NEXTAUTH_URL`
`NEXT_PUBLIC_SITE_URL`
`NEXT_PUBLIC_APP_URL`
`NEXT_PUBLIC_GITHUB_REPO_URL`
`NEXT_PUBLIC_DOWNLOAD_URL`
`DATABASE_URL`

For the first Vercel deployment before a custom domain, set:

`NEXT_PUBLIC_SITE_URL=https://your-vercel-project.vercel.app`
`NEXT_PUBLIC_APP_URL=https://your-vercel-project.vercel.app/app`
`AUTH_URL=https://your-vercel-project.vercel.app`
`NEXTAUTH_URL=https://your-vercel-project.vercel.app`

After connecting `multiseller.com`, change those values to:

`NEXT_PUBLIC_SITE_URL=https://multiseller.com`
`NEXT_PUBLIC_APP_URL=https://multiseller.com/app`
`AUTH_URL=https://multiseller.com`
`NEXTAUTH_URL=https://multiseller.com`

## Custom domain preparation

After buying `multiseller.com`, add it to the Vercel project, then configure the DNS records Vercel shows. The common setup is an apex `A` record for `multiseller.com` and a `CNAME` record for `www.multiseller.com`, but always use the exact values shown by Vercel for the project.
