const ALTO_TIETE = new Set([
  'aruja',
  'biritiba-mirim',
  'ferraz de vasconcelos',
  'guararema',
  'itaquaquecetuba',
  'mogi das cruzes',
  'poa',
  'salesopolis',
  'santa isabel',
  'suzano',
]);

const normalize = (value = '') =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const blockedPage = () => `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <title>403 · Atendimento Regional</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #0d0d0c;
        --text: #eee8df;
        --muted: #9e978e;
        --rust: #a6533c;
        --line: rgba(210, 195, 180, 0.18);
      }

      * {
        box-sizing: border-box;
      }

      html,
      body {
        min-height: 100%;
      }

      body {
        margin: 0;
        display: grid;
        min-height: 100vh;
        place-items: center;
        overflow: hidden;
        background:
          radial-gradient(circle at 50% 35%, rgba(166, 83, 60, 0.12), transparent 32%),
          var(--bg);
        color: var(--text);
        font-family: Arial, Helvetica, sans-serif;
      }

      main {
        width: min(760px, calc(100% - 40px));
        padding: 56px 0;
        text-align: center;
      }

      .eyebrow {
        margin: 0 0 26px;
        color: var(--rust);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.24em;
        text-transform: uppercase;
      }

      .code {
        margin: 0;
        font-family: Georgia, 'Times New Roman', serif;
        font-size: clamp(96px, 18vw, 190px);
        font-weight: 500;
        line-height: 0.8;
        letter-spacing: -0.06em;
      }

      .line {
        width: 82px;
        height: 1px;
        margin: 38px auto 32px;
        background: var(--rust);
      }

      h1 {
        margin: 0;
        font-family: Georgia, 'Times New Roman', serif;
        font-size: clamp(38px, 6vw, 64px);
        font-weight: 500;
        line-height: 0.98;
      }

      p {
        max-width: 560px;
        margin: 24px auto 0;
        color: var(--muted);
        font-size: 17px;
        line-height: 1.7;
      }

      footer {
        margin-top: 54px;
        padding-top: 22px;
        border-top: 1px solid var(--line);
        color: #77716a;
        font-size: 12px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>
    <main>
      <p class="eyebrow">403 · Acesso regional</p>
      <p class="code" aria-hidden="true">403</p>
      <div class="line"></div>
      <h1>Atendimento regional.</h1>
      <p>
        Este escritório realiza atendimento direcionado à região do Alto Tietê.
        O endereço acessado não está disponível para esta localidade.
      </p>
      <footer>Felipe Ribeiro · Advogado</footer>
    </main>
  </body>
</html>`;

export default function middleware(request) {
  const url = new URL(request.url);
  const { pathname } = url;

  if (
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return;
  }

  const city = normalize(
    request.headers.get('x-vercel-ip-city') || ''
  );

  if (city && !ALTO_TIETE.has(city)) {
    return new Response(blockedPage(), {
      status: 403,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store, private',
        'x-robots-tag': 'noindex, nofollow',
      },
    });
  }

  return;
}

export const config = {
  matcher: ['/((?!_next/|api/).*)'],
};
