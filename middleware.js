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

export default function middleware(request) {
  const { pathname } = new URL(request.url);

  if (
    pathname.startsWith('/assets/') ||
    pathname === '/favicon.ico' ||
    pathname === '/403.html' ||
    pathname === '/404.html' ||
    pathname === '/403' ||
    pathname === '/404'
  ) {
    return;
  }

  const city = normalize(
    request.headers.get('x-vercel-ip-city') || ''
  );

  if (city && !ALTO_TIETE.has(city)) {
    return Response.redirect(
      new URL('/403', request.url),
      307
    );
  }
}

export const config = {
  matcher: ['/((?!_next/|api/).*)'],
};
