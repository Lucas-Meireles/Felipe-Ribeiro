function normalize(value = '') {
  let decoded = String(value);

  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    // Mantém o valor original quando o header não estiver percent-encoded.
  }

  return decoded
    .replace(/^['"]|['"]$/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

const BOT_PATTERN = /googlebot|bingbot|duckduckbot|yandexbot|baiduspider|facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegrambot|applebot/i;

export default function handler(request, response) {
  const rawCity = request.headers['x-vercel-ip-city'] || '';
  const city = normalize(rawCity);
  const country = String(request.headers['x-vercel-ip-country'] || '').toUpperCase();
  const countryRegion = String(request.headers['x-vercel-ip-country-region'] || '').toUpperCase();
  const userAgent = String(request.headers['user-agent'] || '');
  const isBot = BOT_PATTERN.test(userAgent);

  response.setHeader('Cache-Control', 'no-store, private');
  response.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');

  // O Brasil inteiro é liberado. Quando a rede aponta para o estado de
  // São Paulo, o front-end pode pedir a localização precisa apenas para
  // confirmar a única área restrita: Tatuapé.
  const needsDeviceLocation =
    !isBot &&
    (countryRegion === 'SP' || city === 'sao paulo');

  const ipAllowed = Boolean(!isBot && country === 'BR' && !needsDeviceLocation);

  response.status(200).json({
    city: city || null,
    country: country || null,
    countryRegion: countryRegion || null,
    ipAllowed,
    needsDeviceLocation,
    isBot,
  });
}
