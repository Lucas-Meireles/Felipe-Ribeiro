// Fonte única de SEO do site.
// Usada pelo build (scripts/generate-seo.mjs, que gera o HTML estático de cada
// rota) e pelo App no navegador. Assim o que o Google lê no HTML é exatamente o
// que o JavaScript aplica depois — sem divergência de título/descrição.

export const SITE_ORIGIN = 'https://feliperibeiro.adv.br';
export const INSTAGRAM_URL = 'https://www.instagram.com/feliperibeiro_30/';
export const PHONE = '+55 11 94454-8048';

const BRAND = 'Felipe Ribeiro Advogado Criminalista';
const DEFAULT_IMAGE = `${SITE_ORIGIN}/assets/google-preview-felipe.jpg`;

// Datas reais de publicação dos artigos (histórico do repositório).
const ARTICLES_PUBLISHED = '2026-09-22';

const PRACTICE = [
  ['prisao-em-flagrante', 'Prisão em flagrante', 'Prisão em flagrante: atuação técnica desde os primeiros momentos para análise da legalidade da prisão e proteção dos direitos da pessoa conduzida.', 'flagrante.png'],
  ['habeas-corpus', 'Habeas Corpus', 'Habeas Corpus: análise técnica de prisões ilegais ou abusivas e atuação para a proteção da liberdade no caso concreto.', 'habeas-corpus.png'],
  ['audiencia-de-custodia', 'Audiência de custódia', 'Audiência de custódia: acompanhamento técnico, análise do auto de prisão em flagrante e avaliação das medidas possíveis.', 'audiencia.png'],
  ['inquerito-policial', 'Inquérito policial', 'Inquérito policial: acompanhamento de diligências, análise de provas, requerimentos e orientação jurídica durante a investigação.', 'inquerito.png'],
  ['acao-penal', 'Ação penal', 'Ação penal: defesa técnica, análise estratégica do processo e acompanhamento das diferentes fases da defesa criminal.', 'acao-penal.png'],
  ['tribunal-do-juri', 'Tribunal do Júri', 'Tribunal do Júri: preparação estratégica, análise de provas e atuação técnica em casos submetidos ao julgamento pelo júri.', 'tribunal.png']
];

export const PRACTICE_SEO_PAGES = PRACTICE.map(([slug, name, description, image]) => ({
  path: `/atuacao/${slug}`,
  name,
  title: `${name} | ${BRAND}`,
  description,
  type: 'WebPage',
  image: `${SITE_ORIGIN}/assets/${image}`,
  breadcrumb: [['Início', '/'], ['Áreas de atuação', '/atuacao'], [name, `/atuacao/${slug}`]]
}));

export const SEO_ROUTE_LIST = [
  {
    path: '/',
    title: `Felipe Vinicius Santana Ribeiro | Advogado Criminalista`,
    description: 'Felipe Vinicius Santana Ribeiro, advogado criminalista (OAB/SP 543.966). Defesa criminal com atendimento presencial e online em todo o Brasil, 24 horas.',
    type: 'WebPage',
    image: DEFAULT_IMAGE,
    preloadImage: '/assets/felipe-corpo.webp'
  },
  {
    path: '/atuacao',
    title: `Áreas de Atuação | ${BRAND}`,
    description: 'Áreas de atuação criminal de Felipe Ribeiro: prisão em flagrante, Habeas Corpus, audiência de custódia, inquérito policial, ação penal e Tribunal do Júri.',
    type: 'WebPage',
    image: DEFAULT_IMAGE,
    breadcrumb: [['Início', '/'], ['Áreas de atuação', '/atuacao']]
  },
  ...PRACTICE_SEO_PAGES,
  {
    path: '/informacao-importante',
    title: 'Como reduzir o tempo de prisão | Felipe Ribeiro Advogado',
    headline: 'Como reduzir o tempo de prisão: o que os familiares precisam saber',
    description: 'Como reduzir o tempo de prisão: entenda remição, progressão de regime, livramento condicional, saída temporária, indulto, comutação e detração penal.',
    type: 'Article',
    image: `${SITE_ORIGIN}/assets/informacoes/como-reduzir-tempo-prisao-cover.png`,
    section: 'Execução Penal',
    datePublished: ARTICLES_PUBLISHED,
    dateModified: ARTICLES_PUBLISHED,
    breadcrumb: [['Início', '/'], ['Como reduzir o tempo de prisão', '/informacao-importante']]
  },
  {
    path: '/informacao-importante/prisao-preventiva',
    title: 'Prisão preventiva: como buscar a liberdade | Felipe Ribeiro',
    headline: 'Prisão preventiva: o que pode ser feito para conseguir a liberdade?',
    description: 'Prisão preventiva: entenda o que é, quando pode ser revogada, as possibilidades de liberdade provisória, medidas cautelares e prisão domiciliar.',
    type: 'Article',
    image: `${SITE_ORIGIN}/assets/informacoes/prisao-preventiva-cover.png`,
    section: 'Prisão Cautelar',
    datePublished: ARTICLES_PUBLISHED,
    dateModified: ARTICLES_PUBLISHED,
    breadcrumb: [['Início', '/'], ['Informação importante', '/informacao-importante'], ['Prisão preventiva', '/informacao-importante/prisao-preventiva']]
  },
  {
    path: '/politica-de-privacidade',
    title: 'Política de Privacidade e Cookies | Felipe Ribeiro Advogado',
    description: 'Como os dados de quem acessa o site de Felipe Vinicius Santana Ribeiro são tratados: LGPD, cookies, armazenamento local e direitos do titular.',
    type: 'WebPage',
    image: DEFAULT_IMAGE,
    breadcrumb: [['Início', '/'], ['Política de Privacidade e Cookies', '/politica-de-privacidade']]
  },
  {
    path: '/termos-de-uso',
    title: `Termos e Condições de Uso | ${BRAND}`,
    description: 'Termos e condições de uso do site de Felipe Vinicius Santana Ribeiro, advogado criminalista: natureza informativa, contato, sigilo e propriedade intelectual.',
    type: 'WebPage',
    image: DEFAULT_IMAGE,
    breadcrumb: [['Início', '/'], ['Termos e Condições de Uso', '/termos-de-uso']]
  }
];

export const SEO_ROUTES = Object.fromEntries(SEO_ROUTE_LIST.map((route) => [route.path, route]));

export const NOT_FOUND_SEO = {
  title: `Página não encontrada | ${BRAND}`,
  description: 'O endereço acessado não existe. Acesse a página inicial ou as áreas de atuação de Felipe Vinicius Santana Ribeiro, advogado criminalista.',
  type: 'WebPage'
};

export const canonicalUrl = (path) => `${SITE_ORIGIN}${path === '/' ? '/' : path}`;

// Dados estruturados (Schema.org) de uma rota.
export function structuredData(route) {
  const url = canonicalUrl(route.path);
  const personId = `${SITE_ORIGIN}/#felipe-ribeiro`;
  const serviceId = `${SITE_ORIGIN}/#legal-service`;
  const websiteId = `${SITE_ORIGIN}/#website`;
  const webpageId = `${url}#webpage`;

  const graph = [
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Felipe Vinicius Santana Ribeiro',
      alternateName: 'Felipe Ribeiro',
      jobTitle: 'Advogado Criminalista',
      url: `${SITE_ORIGIN}/`,
      image: `${SITE_ORIGIN}/assets/felipe-retrato.jpg`,
      telephone: PHONE,
      sameAs: [INSTAGRAM_URL],
      identifier: { '@type': 'PropertyValue', propertyID: 'OAB/SP', value: '543.966' },
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Inscrição profissional',
        name: 'OAB/SP 543.966',
        recognizedBy: { '@type': 'Organization', name: 'Ordem dos Advogados do Brasil — Seção São Paulo' }
      },
      knowsAbout: ['Direito Criminal', 'Prisão em flagrante', 'Habeas Corpus', 'Audiência de custódia', 'Inquérito policial', 'Ação penal', 'Tribunal do Júri', 'Execução penal']
    },
    {
      '@type': 'LegalService',
      '@id': serviceId,
      name: 'Felipe Ribeiro | Advogado Criminalista',
      url: `${SITE_ORIGIN}/`,
      image: DEFAULT_IMAGE,
      logo: `${SITE_ORIGIN}/assets/favicon.png`,
      telephone: PHONE,
      sameAs: [INSTAGRAM_URL],
      areaServed: { '@type': 'Country', name: 'Brasil' },
      serviceType: 'Advocacia criminal',
      availableLanguage: 'pt-BR',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59'
      },
      founder: { '@id': personId },
      employee: { '@id': personId }
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${SITE_ORIGIN}/`,
      name: 'Felipe Ribeiro | Advogado Criminalista',
      publisher: { '@id': personId },
      inLanguage: 'pt-BR'
    },
    {
      '@type': route.type === 'Article' ? 'WebPage' : route.type,
      '@id': webpageId,
      url,
      name: route.title,
      description: route.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': serviceId },
      primaryImageOfPage: route.image ? { '@type': 'ImageObject', url: route.image } : undefined,
      breadcrumb: route.breadcrumb ? { '@id': `${url}#breadcrumb` } : undefined,
      inLanguage: 'pt-BR'
    }
  ];

  if (route.breadcrumb) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: route.breadcrumb.map(([name, path], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        item: canonicalUrl(path)
      }))
    });
  }

  if (route.type === 'Article') {
    graph.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      mainEntityOfPage: { '@id': webpageId },
      headline: route.headline,
      description: route.description,
      image: [route.image],
      datePublished: route.datePublished,
      dateModified: route.dateModified,
      author: { '@id': personId },
      publisher: { '@id': personId },
      articleSection: route.section,
      inLanguage: 'pt-BR'
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
