// O acesso é nacional, com uma única área restrita: Tatuapé.
// A decisão de bloquear nunca é feita pelo IP sozinho. Quando necessário,
// o front-end pode solicitar uma localização precisa. Se a localização não
// puder ser confirmada, o acesso nacional permanece liberado, evitando falsos positivos.

export default function middleware() {
  return;
}

export const config = {
  matcher: ['/((?!_next/|api/).*)'],
};
