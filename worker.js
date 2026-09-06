// Esta versão usa a mesma estratégia regional inteligente do deploy Vercel:
// o IP não deve bloquear sozinho porque provedores e operadoras podem
// geolocalizar uma conexão do Alto Tietê em São Paulo capital.
// A confirmação regional é feita pela interface usando a localização do dispositivo.

export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
