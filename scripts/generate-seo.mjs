import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const DIST_DIR = path.join(ROOT, 'dist');
const SITE_ORIGIN = 'https://feliperibeiro.adv.br';

const PRACTICE_PAGES = [
  {
    path: '/atuacao/prisao-em-flagrante',
    title: 'Prisão em flagrante | Felipe Ribeiro Advogado Criminalista',
    description: 'Prisão em flagrante: atuação técnica desde os primeiros momentos para análise da legalidade da prisão e proteção dos direitos da pessoa conduzida.',
    type: 'WebPage',
    image: `${SITE_ORIGIN}/assets/flagrante.png`
  },
  {
    path: '/atuacao/habeas-corpus',
    title: 'Habeas Corpus | Felipe Ribeiro Advogado Criminalista',
    description: 'Habeas Corpus: análise técnica de prisões ilegais ou abusivas e atuação para a proteção da liberdade no caso concreto.',
    type: 'WebPage',
    image: `${SITE_ORIGIN}/assets/habeas-corpus.png`
  },
  {
    path: '/atuacao/audiencia-de-custodia',
    title: 'Audiência de custódia | Felipe Ribeiro Advogado Criminalista',
    description: 'Audiência de custódia: acompanhamento técnico, análise do auto de prisão em flagrante e avaliação das medidas possíveis.',
    type: 'WebPage',
    image: `${SITE_ORIGIN}/assets/audiencia.png`
  },
  {
    path: '/atuacao/inquerito-policial',
    title: 'Inquérito policial | Felipe Ribeiro Advogado Criminalista',
    description: 'Inquérito policial: acompanhamento de diligências, análise de provas, requerimentos e orientação jurídica durante a investigação.',
    type: 'WebPage',
    image: `${SITE_ORIGIN}/assets/inquerito.png`
  },
  {
    path: '/atuacao/acao-penal',
    title: 'Ação penal | Felipe Ribeiro Advogado Criminalista',
    description: 'Ação penal: defesa técnica, análise estratégica do processo e acompanhamento das diferentes fases da defesa criminal.',
    type: 'WebPage',
    image: `${SITE_ORIGIN}/assets/acao-penal.png`
  },
  {
    path: '/atuacao/tribunal-do-juri',
    title: 'Tribunal do Júri | Felipe Ribeiro Advogado Criminalista',
    description: 'Tribunal do Júri: preparação estratégica, análise de provas e atuação técnica em casos submetidos ao julgamento pelo júri.',
    type: 'WebPage',
    image: `${SITE_ORIGIN}/assets/tribunal.png`
  }
];

const ROUTES = [
  {
    path: '/',
    title: 'Felipe Vinicius Santana Ribeiro | Advogado Criminalista',
    description: 'Felipe Vinicius Santana Ribeiro, advogado criminalista. Atuação em defesa criminal, com atendimento presencial e online em todo o Brasil.',
    type: 'WebPage',
    image: `${SITE_ORIGIN}/assets/google-preview-felipe.png`
  },
  {
    path: '/atuacao',
    title: 'Áreas de Atuação | Felipe Ribeiro Advogado Criminalista',
    description: 'Conheça as principais áreas de atuação criminal de Felipe Vinicius Santana Ribeiro.',
    type: 'WebPage',
    image: `${SITE_ORIGIN}/assets/google-preview-felipe.png`
  },
  ...PRACTICE_PAGES,
  {
    path: '/informacao-importante',
    title: 'Como reduzir o tempo de prisão | Felipe Ribeiro Advogado Criminalista',
    description: 'Como reduzir o tempo de prisão: entenda remição, progressão de regime, livramento condicional, saída temporária, indulto, comutação e detração penal.',
    type: 'Article',
    image: `${SITE_ORIGIN}/assets/informacoes/como-reduzir-tempo-prisao-cover.png`,
    section: 'Execução Penal'
  },
  {
    path: '/informacao-importante/prisao-preventiva',
    title: 'Prisão preventiva: o que pode ser feito para conseguir a liberdade? | Felipe Ribeiro Advogado Criminalista',
    description: 'Prisão preventiva: entenda o que é, quando pode ser revogada, as possibilidades de liberdade provisória, medidas cautelares e prisão domiciliar.',
    type: 'Article',
    image: `${SITE_ORIGIN}/assets/informacoes/prisao-preventiva-cover.png`,
    section: 'Prisão Cautelar'
  }
];

const PERSON_ID = `${SITE_ORIGIN}/#felipe-ribeiro`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function structuredData(route) {
  const webpageId = `${SITE_ORIGIN}${route.path === '/' ? '/' : route.path}#webpage`;
  const graph = [
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Felipe Vinicius Santana Ribeiro',
      jobTitle: 'Advogado Criminalista',
      url: `${SITE_ORIGIN}/`,
      telephone: '+55 11 94454-8048',
      identifier: { '@type': 'PropertyValue', propertyID: 'OAB/SP', value: '543.966' },
      knowsAbout: ['Direito Criminal', 'Prisão em flagrante', 'Habeas Corpus', 'Audiência de custódia', 'Inquérito policial', 'Ação penal', 'Tribunal do Júri']
    },
    {
      '@type': 'LegalService',
      '@id': `${SITE_ORIGIN}/#legal-service`,
      name: 'Felipe Ribeiro | Advogado Criminalista',
      url: `${SITE_ORIGIN}/`,
      telephone: '+55 11 94454-8048',
      areaServed: { '@type': 'Country', name: 'Brasil' },
      serviceType: 'Advocacia criminal',
      provider: { '@id': PERSON_ID }
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_ORIGIN}/`,
      name: 'Felipe Ribeiro | Advogado Criminalista',
      publisher: { '@id': PERSON_ID },
      inLanguage: 'pt-BR'
    },
    {
      '@type': route.type,
      '@id': webpageId,
      url: `${SITE_ORIGIN}${route.path === '/' ? '/' : route.path}`,
      name: route.title,
      description: route.description,
      isPartOf: { '@id': WEBSITE_ID },
      inLanguage: 'pt-BR'
    }
  ];

  if (route.type === 'Article') {
    graph.push({
      '@type': 'Article',
      '@id': `${SITE_ORIGIN}${route.path}#article`,
      mainEntityOfPage: { '@id': webpageId },
      headline: route.title.replace(' | Felipe Ribeiro Advogado Criminalista', ''),
      description: route.description,
      image: [route.image],
      author: { '@id': PERSON_ID },
      publisher: { '@id': PERSON_ID },
      articleSection: route.section,
      inLanguage: 'pt-BR'
    });
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
}

function robots() {
  return `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /404.html\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
}

function sitemap() {
  const urls = ROUTES.map((route) => `  <url><loc>${escapeXml(`${SITE_ORIGIN}${route.path === '/' ? '/' : route.path}`)}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function llms() {
  const practice = PRACTICE_PAGES.map((route) => `- [${route.title.split(' | ')[0]}](${SITE_ORIGIN}${route.path})`).join('\n');
  return `# Felipe Ribeiro | Advogado Criminalista\n\n> Site oficial de Felipe Vinicius Santana Ribeiro, advogado criminalista. Atendimento presencial e online em todo o Brasil.\n\n## Site\n- [Página inicial](${SITE_ORIGIN}/)\n- [Áreas de atuação](${SITE_ORIGIN}/atuacao)\n${practice}\n\n## Publicações informativas\n- [Como reduzir o tempo de prisão](${SITE_ORIGIN}/informacao-importante)\n- [Prisão preventiva: o que pode ser feito para conseguir a liberdade?](${SITE_ORIGIN}/informacao-importante/prisao-preventiva)\n\n## Identidade\n- Nome: Felipe Vinicius Santana Ribeiro\n- Profissão: Advogado Criminalista\n- OAB/SP: 543.966\n- Telefone/WhatsApp: +55 11 94454-8048\n- Área de atuação: Direito Criminal\n- Atendimento: nacional, presencial e online\n\n## Observação\nAs páginas listadas acima são as URLs públicas e canônicas do site. Se uma informação não estiver presente nestas páginas, não a presuma.\n`;
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

function upsertJsonLd(html, json) {
  const block = `<script id="felipe-structured-data" type="application/ld+json">${json}</script>`;
  const regex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/i;
  return regex.test(html) ? html.replace(regex, block) : html.replace('</head>', `    ${block}\n  </head>`);
}

function renderRouteTemplate(template, route) {
  const canonical = `${SITE_ORIGIN}${route.path === '/' ? '/' : route.path}`;
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeXml(route.title)}</title>`);
  html = upsertMeta(html, 'description', route.description);
  html = upsertMeta(html, 'robots', 'index,follow,max-image-preview:large');
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

  for (const route of ROUTES) {
    const routeDir = route.path === '/' ? DIST_DIR : path.join(DIST_DIR, ...route.path.split('/').filter(Boolean));
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), renderRouteTemplate(template, route), 'utf8');
  }
}

console.log(`SEO generated: ${ROUTES.length} indexable routes, robots.txt, sitemap.xml and llms.txt.`);
