// Entrada usada apenas no build para pré-renderizar o HTML de cada rota.
// Assim o conteúdo já chega pronto no HTML (melhor para indexação),
// e o React assume a página normalmente no navegador.
import { renderToString } from 'react-dom/server';
import App, { setRenderPath } from './App';

export function render(pathname) {
  setRenderPath(pathname);
  return renderToString(<App />);
}
