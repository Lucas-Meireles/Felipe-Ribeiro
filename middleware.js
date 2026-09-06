// O bloqueio regional agora é "inteligente":
// 1. O endpoint /api/region lê a geolocalização aproximada do IP.
// 2. Se o IP não estiver claramente no Alto Tietê, a interface solicita a
//    localização do dispositivo ao visitante.
// 3. A página não usa mais 403 baseado exclusivamente em x-vercel-ip-city,
//    evitando falsos bloqueios como Ferraz de Vasconcelos -> São Paulo.
//
// O middleware permanece no projeto para manter a arquitetura preparada para
// futuras regras de borda sem interromper a experiência regional atual.

export default function middleware() {
  return;
}

export const config = {
  matcher: ['/((?!_next/|api/).*)'],
};
