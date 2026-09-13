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

## Acesso nacional com área restrita

O site possui atendimento em todo o Brasil. A única área geográfica restrita é o Tatuapé, em São Paulo.

A lógica de acesso funciona de forma conservadora:

1. O território nacional permanece liberado por padrão.
2. Quando necessário, o front-end solicita a localização do dispositivo apenas para confirmar se ele está dentro da área restrita do Tatuapé.
3. Se a localização não puder ser obtida ou tiver precisão insuficiente, o acesso nacional permanece liberado para evitar falsos bloqueios.
4. Bots de mecanismos de busca e plataformas conhecidas não ficam presos na verificação de localização.

A proteção é de acesso/experiência territorial, não uma barreira criptográfica. Como o projeto é um site público, não há dados privados ou área autenticada sendo protegidos por essa regra.

## Diagnóstico anterior

O diagnóstico temporário `?geo-debug=1` foi removido desta versão. A causa encontrada foi:

- cidade informada pela Vercel: `São Paulo`
- CEP informado: `08441`
- latitude: `-23.5475`
- longitude: `-46.6361`

Por isso o bloqueio exclusivamente baseado em IP foi abandonado.

## Hostinger / Cloudflare

Para Hostinger, o front-end pode ser publicado como site estático. O `.htaccess` incluído mantém o fallback do React.

O `worker.js` permanece sem bloqueio rígido por cidade. A única área restrita é o Tatuapé, e a confirmação é feita no front-end usando localização do dispositivo quando necessário.

## Atualização Felipe-25

- Transição das Áreas de atuação usa duas camadas e crossfade real.
- As seis imagens de atuação são pré-carregadas localmente.
- Service Worker adiciona cache local para as imagens e shell do site, permitindo que recursos já visitados continuem disponíveis offline.
- Alternância de tema agora usa ícones SVG, sem os textos "Claro / Escuro".


## Atualização Felipe-26

- Áreas de atuação movida para imediatamente após os compromissos e antes de O Advogado.
- Transição de fotos refinada com duas camadas, crossfade, clip-path e movimento sutil.
- Mantido o cache offline e o pré-carregamento das imagens.


## Correção da navegação em larguras intermediárias
A navegação mobile permanece disponível até 1050px. Isso evita que, entre 901px e 1050px, o painel mobile fique visível por padrão enquanto o menu desktop já está oculto. O painel agora segue o mesmo ciclo de fechado/aberto nessa faixa intermediária.


## Rotas de conteúdo

A aplicação mantém a home como landing page principal e possui páginas internas para ampliar a arquitetura de conteúdo e busca orgânica:

- `/sobre`
- `/atuacao`
- `/atuacao/prisao-em-flagrante`
- `/atuacao/habeas-corpus`
- `/atuacao/audiencia-de-custodia`
- `/atuacao/inquerito-policial`
- `/atuacao/acao-penal`
- `/atuacao/tribunal-do-juri`
- `/depoimentos`
- `/contato`

O efeito de profundidade editorial das fotos é limitado a ponteiros finos em desktop. Em touch/mobile, tablet e `prefers-reduced-motion`, a interação é desativada para preservar responsividade e desempenho.
