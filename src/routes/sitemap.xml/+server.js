import { projects } from "$lib/config";

export async function GET() {
  const host = "https://kooperlingohr.com";

  const generateUrl = (path, lastmod) => `
        <url>
            <loc>${host}${path}</loc>
            <lastmod>${lastmod}</lastmod>
        </url>
    `;
  const urls = [
    generateUrl("/", "2024-11-01"),
    generateUrl("/about", "2024-11-01"),
    generateUrl("/contact", "2024-11-01"),
    ...Object.values(projects).map((project) =>
      generateUrl(`/projects/${project["projectPathVar"]}`, "2024-11-01"),
    ),
  ];

  return new Response(
    `
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
			<url>
                <loc>https://kooperlingohr.com/</loc>
                <lastmod>2024-11-01</lastmod>
            </url>
            ${urls.join("")}
            
		</urlset>`.trim(),
    {
      headers: {
        "Content-Type": "application/xml",
      },
    },
  );
}
