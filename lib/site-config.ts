const defaultSiteUrl = "http://multiseller.local:3000";

function normalizeUrl(value: string | undefined, fallback: string, base?: string) {
  const url = value?.trim() || fallback;
  if (base && url.startsWith("/")) {
    return new URL(url, base).toString().replace(/\/+$/, "");
  }

  const withProtocol = /^https?:\/\//i.test(url) ? url : `https://${url}`;

  return withProtocol.replace(/\/+$/, "");
}

const siteUrl = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL, defaultSiteUrl);
const appUrl = normalizeUrl(process.env.NEXT_PUBLIC_APP_URL, `${siteUrl}/app`, siteUrl);

export const siteConfig = {
  name: "MultiSELLER",
  shortName: "MultiSELLER",
  domain: "multiseller.com",
  localDomain: "multiseller.local",
  description:
    "A compliant multi-marketplace listing manager for second-hand sellers.",
  siteUrl,
  appUrl,
  dashboardPath: "/dashboard",
  ogImagePath: "/multiseller-og.png",
  githubUrl:
    process.env.NEXT_PUBLIC_GITHUB_REPO_URL ??
    "https://github.com/taylankuscu6674-art/multisellapppp",
  downloadUrl:
    process.env.NEXT_PUBLIC_DOWNLOAD_URL ??
    "https://github.com/taylankuscu6674-art/multisellapppp/archive/refs/heads/main.zip"
};
