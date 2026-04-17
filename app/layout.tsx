import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} | Multi-marketplace listing manager`,
    template: `%s | ${siteConfig.name}`
  },
  applicationName: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "marketplace listing manager",
    "second-hand selling",
    "multi-marketplace dashboard",
    "compliant marketplace operations",
    "Dolap",
    "Gardrops",
    "Letgo"
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/"
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/multiseller-mark.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [{ url: "/icons/apple-icon.png", sizes: "180x180", type: "image/png" }]
  },
  openGraph: {
    title: `${siteConfig.name} | Multi-marketplace listing manager`,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} marketplace operations dashboard`
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Multi-marketplace listing manager`,
    description: siteConfig.description,
    images: [siteConfig.ogImagePath]
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#0f766e",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen antialiased`}>{children}</body>
    </html>
  );
}
