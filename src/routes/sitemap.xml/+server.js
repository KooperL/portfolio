export const prerender = true;

export async function GET() {
  return new Response(
    `<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml" xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0" xmlns:news="https://www.google.com/schemas/sitemap-news/0.9" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">
			<url>
                <loc>https://kooperlingohr.com/</loc>
                <lastmod>2024-11-01</lastmod>
            </url>
            
        <url>
            <loc>https://kooperlingohr.com/</loc>
            <lastmod>2024-11-01</lastmod>
        </url>
    
        <url>
            <loc>https://kooperlingohr.com/about</loc>
            <lastmod>2024-11-01</lastmod>
        </url>
    
        <url>
            <loc>https://kooperlingohr.com/contact</loc>
            <lastmod>2024-11-01</lastmod>
        </url>
    
        <url>
            <loc>https://kooperlingohr.com/projects/pento</loc>
            <lastmod>2024-11-01</lastmod>
        </url>
    
        <url>
            <loc>https://kooperlingohr.com/projects/bingo_app</loc>
            <lastmod>2024-11-01</lastmod>
        </url>
    
        <url>
            <loc>https://kooperlingohr.com/projects/logridge</loc>
            <lastmod>2024-11-01</lastmod>
        </url>
    
        <url>
            <loc>https://kooperlingohr.com/projects/md-app</loc>
            <lastmod>2024-11-01</lastmod>
        </url>
    
        <url>
            <loc>https://kooperlingohr.com/projects/pocketbase_logging</loc>
            <lastmod>2024-11-01</lastmod>
        </url>
    
        <url>
            <loc>https://kooperlingohr.com/projects/redirected</loc>
            <lastmod>2024-11-01</lastmod>
        </url>
    
        <url>
            <loc>https://kooperlingohr.com/projects/portfolio</loc>
            <lastmod>2024-11-01</lastmod>
        </url>
    
        <url>
            <loc>https://kooperlingohr.com/projects/vitality</loc>
            <lastmod>2024-11-01</lastmod>
        </url>
    
        <url>
            <loc>https://kooperlingohr.com/projects/svelte_pocketbase_quickstart</loc>
            <lastmod>2024-11-01</lastmod>
        </url>
    
        <url>
            <loc>https://kooperlingohr.com/projects/tailwind-color-generator</loc>
            <lastmod>2024-11-01</lastmod>
        </url>
    
        <url>
            <loc>https://kooperlingohr.com/projects/vybs</loc>
            <lastmod>2024-11-01</lastmod>
        </url>
    
            
		</urlset>`.trim(),
    {
      headers: {
        "Content-Type": "application/xml",
      },
    },
  );
}
