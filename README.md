# Felipe Ribeiro Advocacia

## Deploy Vercel

Este projeto é React + Vite e está configurado para o Vercel.

Configuração importante:
- Build: `node node_modules/vite/bin/vite.js build`
- Output: `dist`
- SPA fallback: qualquer rota de página volta para `index.html`
- `assets`, favicon, robots, sitemap e `/api/` continuam fora do fallback da SPA
- O projeto usa `/api/region` para consultar a geolocalização aproximada do IP no Vercel

### Passos

1. Extraia este ZIP.
2. Substitua o conteúdo do repositório pelo conteúdo desta pasta.
3. Faça commit e push para a branch `main`.
4. No Vercel, confirme que o Root Directory é a raiz do projeto, onde estão `package.json`, `vite.config.js` e `vercel.json`.
5. Aguarde o deploy aparecer como `Ready`.

## Restrição regional inteligente

O projeto mantém o atendimento direcionado às 10 cidades tradicionais usadas para este site:

Arujá, Biritiba-Mirim, Ferraz de Vasconcelos, Guararema, Itaquaquecetuba, Mogi das Cruzes, Poá, Salesópolis, Santa Isabel e Suzano.

A lógica não bloqueia mais o visitante somente porque o IP foi geolocalizado em outra cidade. Isso evita falsos bloqueios, como o caso diagnosticado em que uma conexão do Alto Tietê foi identificada pela Vercel como São Paulo.

Fluxo:

1. `/api/region` consulta a cidade aproximada fornecida pelo Vercel.
2. Se o IP estiver claramente em uma das cidades permitidas, o site é liberado imediatamente.
3. Se o IP estiver fora ou impreciso, o visitante vê uma tela de confirmação regional.
4. Ao clicar em `Confirmar minha localização`, o navegador solicita a localização do dispositivo.
5. A coordenada é comparada com zonas aproximadas das 10 cidades.
6. Se estiver na região, o site é liberado.
7. Se estiver fora da região ou a localização for recusada, o conteúdo do site permanece bloqueado.

A Geolocation API exige HTTPS e permissão explícita do visitante. Por isso, a produção usa `Permissions-Policy: geolocation=(self)` no `vercel.json`.

### SEO

Bots de mecanismos e plataformas conhecidos são liberados pelo endpoint regional para não transformar a restrição local em um bloqueio indiscriminado de indexadores e prévias.

A proteção é de acesso/experiência regional, não uma barreira criptográfica. Como o projeto é um site público, não há dados privados ou área autenticada sendo protegidos por essa regra.

## Diagnóstico anterior

O diagnóstico temporário `?geo-debug=1` foi removido desta versão. A causa encontrada foi:

- cidade informada pela Vercel: `São Paulo`
- CEP informado: `08441`
- latitude: `-23.5475`
- longitude: `-46.6361`

Por isso o bloqueio exclusivamente baseado em IP foi abandonado.

## Hostinger / Cloudflare

Para Hostinger, o front-end pode ser publicado como site estático. O `.htaccess` incluído mantém o fallback do React.

O `worker.js` foi mantido sem bloqueio rígido por cidade para não repetir o falso 403 baseado somente em IP. A confirmação regional principal desta versão acontece no front-end usando IP + localização do dispositivo.

## Atualização Felipe-25

- Transição das Áreas de atuação usa duas camadas e crossfade real.
- As seis imagens de atuação são pré-carregadas localmente.
- Service Worker adiciona cache local para as imagens e shell do site, permitindo que recursos já visitados continuem disponíveis offline.
- Alternância de tema agora usa ícones SVG, sem os textos "Claro / Escuro".
