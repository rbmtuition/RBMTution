import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { courses } from "@/data/courses";
import { cities } from "@/data/locations";
import { services } from "@/data/services";
import { subjects } from "@/data/subjects";
import { webNiches } from "@/data/webNiches";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/courses"),
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/services"),
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/locations"),
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/subjects"),
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/web-solutions"),
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/tutor-registration"),
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/payment"),
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/privacy-policy"),
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
    url: absoluteUrl(`/courses/${course.slug}`),
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const subjectRoutes: MetadataRoute.Sitemap = subjects.map((subject) => ({
    url: absoluteUrl(`/subjects/${subject.slug}`),
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const cityRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
    url: absoluteUrl(`/locations/${city.slug}`),
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const areaRoutes: MetadataRoute.Sitemap = cities.flatMap((city) =>
    city.areas.map((area) => ({
      url: absoluteUrl(`/locations/${city.slug}/${area.slug}`),
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  );

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const webNicheRoutes: MetadataRoute.Sitemap = webNiches.map((niche) => ({
    url: absoluteUrl(`/web-solutions/${niche.slug}`),
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...courseRoutes,
    ...serviceRoutes,
    ...subjectRoutes,
    ...cityRoutes,
    ...areaRoutes,
    ...blogRoutes,
    ...webNicheRoutes,
  ];
}
