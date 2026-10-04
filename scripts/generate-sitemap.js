import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://apurv-gupta.vercel.app';
const BLOGS_DIR = path.resolve('./src/content/blogs');
const PUBLIC_DIR = path.resolve('./public');

const getSitemapXML = (urls) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
      .map(
        (url) => `  <url>
    <loc>${url}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
      )
      .join('\n')}
</urlset>`;
};

try {
  const files = fs.readdirSync(BLOGS_DIR);

  const urls = [SITE_URL]; // Add home page

  files.forEach((file) => {
    if (file.endsWith('.md')) {
      const slug = file.replace('.md', '');
      urls.push(`${SITE_URL}/blog/${slug}`);
    }
  });

  const sitemapXML = getSitemapXML(urls);

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR);
  }

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXML);
  console.log('✅ sitemap.xml generated successfully!');
} catch (error) {
  console.error('Error generating sitemap:', error);
}
