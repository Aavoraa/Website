/** sitemap.xml, generated at build time from every page so new pages are never missed. */
import { site, cases } from '../data/site';
import { pillarSlug, serviceDetails, subServicePath, subSlug } from '../data/pages';
import type { PillarKey } from '../data/site';
import { articles } from '../data/insights';

export function GET() {
  const pages: [string, string, string][] = [
    ['/', 'weekly', '1.0'],
    ['/services/', 'monthly', '0.9'],
    ...Object.values(pillarSlug).map((s): [string, string, string] => [`/services/${s}/`, 'monthly', '0.9']),
    ...(Object.keys(serviceDetails) as PillarKey[]).flatMap((k) => serviceDetails[k].flatMap((d): [string, string, string][] => [[subServicePath(k, d.name), 'monthly', '0.8'], ...(d.children || []).map((c): [string, string, string] => [`${subServicePath(k, d.name)}${subSlug(c.name)}/`, 'monthly', '0.7'])])),
    ['/solutions/', 'monthly', '0.8'],
    ['/industries/', 'monthly', '0.8'],
    ['/work/', 'monthly', '0.8'],
    ...cases.map((c): [string, string, string] => [`/work/${c.slug}/`, 'monthly', '0.7']),
    ['/warexx/', 'monthly', '0.8'],
    ['/about/', 'monthly', '0.7'],
    ['/approach/', 'monthly', '0.7'],
    ['/faq/', 'monthly', '0.6'],
    ['/insights/', 'weekly', '0.7'],
    ...articles.map((a): [string, string, string] => [`/insights/${a.slug}/`, 'monthly', '0.6']),
    ['/contact/', 'yearly', '0.7'],
    ['/privacy/', 'yearly', '0.2'],
    ['/terms/', 'yearly', '0.2'],
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([p, f, pr]) => `  <url><loc>${site.url}${p}</loc><changefreq>${f}</changefreq><priority>${pr}</priority></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
