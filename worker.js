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

const blockedResponse = () =>
  new Response(
    `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>403 | Atendimento regional</title>
  </head>
  <body>
    <main>
      <p>403 · ACESSO REGIONAL</p>
      <h1>Atendimento regional.</h1>
      <p>Este endereço está disponível para a região de atendimento definida pelo escritório.</p>
    </main>
  </body>
</html>`,
    {
      status: 403,
      headers: {
        'content-type': 'text/html; charset=UTF-8',
      },
    }
  );

export default {
  async fetch(request, env) {
    const city = normalize(request.cf?.city || '');

    if (city && !ALTO_TIETE.has(city)) {
      return blockedResponse();
    }

    return env.ASSETS.fetch(request);
  },
};
