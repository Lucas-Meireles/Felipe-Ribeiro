import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { NOT_FOUND_SEO, PRACTICE_SEO_PAGES, SEO_ROUTE_LIST, SITE_ORIGIN, canonicalUrl, structuredData } from '../src/seo-data.js';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const DIST_DIR = path.join(ROOT, 'dist');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');
// Fonte única de SEO (a mesma usada pelo App no navegador).
const ROUTES = SEO_ROUTE_LIST;
const PRACTICE_PAGES = PRACTICE_SEO_PAGES;

// Página 404 (não indexável). O caminho é fictício: qualquer rota
// desconhecida faz o App renderizar a tela de "página não encontrada".
const NOT_FOUND_ROUTE = { path: '/__404__', ...NOT_FOUND_SEO };

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function robots() {
  return `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /404.html\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
}

function sitemap() {
  const urls = ROUTES.map((route) => `  <url><loc>${escapeXml(canonicalUrl(route.path))}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function llms() {
  const practice = PRACTICE_PAGES.map((route) => `- [${route.name}](${SITE_ORIGIN}${route.path})`).join('\n');
  return `# Felipe Ribeiro | Advogado Criminalista\n\n> Site oficial de Felipe Vinicius Santana Ribeiro, advogado criminalista. Atendimento presencial e online em todo o Brasil.\n\n## Site\n- [Página inicial](${SITE_ORIGIN}/)\n- [Áreas de atuação](${SITE_ORIGIN}/atuacao)\n${practice}\n\n## Documentos
- [Política de Privacidade e Cookies](${SITE_ORIGIN}/politica-de-privacidade)
- [Termos e Condições de Uso](${SITE_ORIGIN}/termos-de-uso)

## Publicações informativas\n- [Como reduzir o tempo de prisão](${SITE_ORIGIN}/informacao-importante)\n- [Prisão preventiva: o que pode ser feito para conseguir a liberdade?](${SITE_ORIGIN}/informacao-importante/prisao-preventiva)\n\n## Identidade\n- Nome: Felipe Vinicius Santana Ribeiro\n- Profissão: Advogado Criminalista\n- OAB/SP: 543.966\n- Telefone/WhatsApp: +55 11 94454-8048\n- Área de atuação: Direito Criminal\n- Atendimento: nacional, presencial e online\n\n## Observação\nAs páginas listadas acima são as URLs públicas e canônicas do site. Se uma informação não estiver presente nestas páginas, não a presuma.\n`;
}

function upsertMeta(html, name, content, attribute = 'name') {
  const escaped = content.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
  const regex = new RegExp(`<meta\\s+${attribute}=["']${name}["'][^>]*>`, 'i');
  const tag = `<meta ${attribute}="${name}" content="${escaped}" />`;
  return regex.test(html) ? html.replace(regex, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function upsertLink(html, rel, href) {
  const escaped = href.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
  const regex = new RegExp(`<link\\s+[^>]*rel=["']${rel}["'][^>]*>`, 'i');
  const tag = `<link rel="${rel}" href="${escaped}" />`;
  return regex.test(html) ? html.replace(regex, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function upsertJsonLd(html, data) {
  // "<" escapado para o JSON nunca fechar a tag <script> por engano.
  const json = JSON.stringify(data).replaceAll('<', '\\u003c');
  const block = `<script id="felipe-structured-data" type="application/ld+json">${json}</script>`;
  const regex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/i;
  return regex.test(html) ? html.replace(regex, block) : html.replace('</head>', `    ${block}\n  </head>`);
}

function injectAppHtml(html, appHtml) {
  if (!appHtml) return html;
  return html.replace(/<div id="root">\s*<\/div>/i, () => `<div id="root">${appHtml}</div>`);
}

function renderNotFoundTemplate(template, appHtml) {
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeXml(NOT_FOUND_ROUTE.title)}</title>`);
  html = upsertMeta(html, 'description', NOT_FOUND_ROUTE.description);
  html = upsertMeta(html, 'robots', 'noindex,follow');
  html = upsertMeta(html, 'googlebot', 'noindex,follow');
  html = html.replace(/\s*<link\s+[^>]*rel=["']canonical["'][^>]*>/i, '');
  html = html.replace(/\s*<meta\s+property=["']og:url["'][^>]*>/i, '');
  html = html.replace(/\s*<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/i, '');
  return injectAppHtml(html, appHtml);
}

function setPreload(html, href) {
  if (!href) return html;
  const tag = `<link rel="preload" as="image" href="${href}" fetchpriority="high" />`;
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function renderRouteTemplate(template, route, appHtml) {
  const canonical = canonicalUrl(route.path);
  let html = template;
  html = setPreload(html, route.preloadImage);
  if (route.datePublished) {
    html = upsertMeta(html, 'article:published_time', route.datePublished, 'property');
    html = upsertMeta(html, 'article:modified_time', route.dateModified || route.datePublished, 'property');
  }
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeXml(route.title)}</title>`);
  html = upsertMeta(html, 'description', route.description);
  html = upsertMeta(html, 'robots', 'index,follow,max-image-preview:large');
  html = upsertMeta(html, 'googlebot', 'index,follow,max-image-preview:large');
  html = upsertMeta(html, 'og:type', route.type === 'Article' ? 'article' : 'website', 'property');
  html = upsertMeta(html, 'og:title', route.title, 'property');
  html = upsertMeta(html, 'og:description', route.description, 'property');
  html = upsertMeta(html, 'og:url', canonical, 'property');
  html = upsertMeta(html, 'og:image', route.image, 'property');
  html = upsertMeta(html, 'twitter:title', route.title);
  html = upsertMeta(html, 'twitter:description', route.description);
  html = upsertMeta(html, 'twitter:image', route.image);
  html = upsertLink(html, 'canonical', canonical);
  html = upsertJsonLd(html, structuredData(route));
  html = injectAppHtml(html, appHtml);
  return html;
}

fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots(), 'utf8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap(), 'utf8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), llms(), 'utf8');

if (fs.existsSync(DIST_DIR)) {
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots(), 'utf8');
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap(), 'utf8');
  fs.writeFileSync(path.join(DIST_DIR, 'llms.txt'), llms(), 'utf8');

  const templatePath = path.join(DIST_DIR, 'index.html');
  const template = fs.readFileSync(templatePath, 'utf8');

  // Pré-renderização: o conteúdo de cada rota entra no HTML estático.
  // Se o bundle SSR não existir, o build segue apenas com as metatags.
  let render = null;
  if (fs.existsSync(SSR_ENTRY)) {
    ({ render } = await import(pathToFileURL(SSR_ENTRY).href));
  } else {
    console.warn('SSR bundle not found: pages will be generated without prerendered content.');
  }

  for (const route of ROUTES) {
    const routeDir = route.path === '/' ? DIST_DIR : path.join(DIST_DIR, ...route.path.split('/').filter(Boolean));
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), renderRouteTemplate(template, route, render ? render(route.path) : ''), 'utf8');
  }

  // 404 com a identidade do site (servida pela Vercel para qualquer URL inexistente).
  fs.writeFileSync(path.join(DIST_DIR, '404.html'), renderNotFoundTemplate(template, render ? render(NOT_FOUND_ROUTE.path) : ''), 'utf8');

  fs.rmSync(path.join(ROOT, 'dist-ssr'), { recursive: true, force: true });
}

console.log(`SEO generated: ${ROUTES.length} indexable routes, robots.txt, sitemap.xml and llms.txt.`);
