// O acesso é nacional. A única área restrita é o Tatuapé, confirmada pela
// localização do dispositivo quando necessário. Falhas de localização não bloqueiam
// o restante do território nacional.

export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
