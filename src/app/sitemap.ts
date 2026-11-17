import type { MetadataRoute } from "next";
import { apps } from "@/lib/apps";
import { projects } from "@/lib/projects";
import { legalNav, nav, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...nav.map((item) => item.href),
    ...projects.map((project) => `/projeler/${project.slug}`),
    ...apps.map((app) => `/uygulamalar/${app.slug}`),
    ...legalNav.map((item) => item.href),
  ];
  return paths.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    priority: path === "/" ? 1 : 0.7,
  }));
}
