import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Listiq Marketplace Manager",
    short_name: "Listiq",
    description: siteConfig.description,
    start_url: "/app",
    scope: "/",
    display: "standalone",
    background_color: "#f7f9fc",
    theme_color: "#0f9f7a",
    orientation: "portrait-primary",
    categories: ["business", "productivity", "shopping"],
    icons: [
      {
        src: "/app-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: "/app-icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ],
    shortcuts: [
      {
        name: "Dashboard",
        short_name: "Dashboard",
        url: "/dashboard",
        icons: [{ src: "/app-icon.svg", sizes: "any", type: "image/svg+xml" }]
      },
      {
        name: "New Product",
        short_name: "New",
        url: "/products/new",
        icons: [{ src: "/app-icon.svg", sizes: "any", type: "image/svg+xml" }]
      },
      {
        name: "Publish Queue",
        short_name: "Queue",
        url: "/publish-queue",
        icons: [{ src: "/app-icon.svg", sizes: "any", type: "image/svg+xml" }]
      }
    ]
  };
}
