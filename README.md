# Felipe Ribeiro Advocacia

## Deploy Vercel

Este projeto é React + Vite e está configurado para o Vercel.

Configuração importante:
- Build: `node node_modules/vite/bin/vite.js build`
- Output: `dist`
- SPA fallback: qualquer rota de página volta para `index.html`
- `assets`, favicon, robots e sitemap continuam como arquivos estáticos
- O `middleware.js` fica na raiz para a restrição regional

### Passos

1. Extraia este ZIP.
2. Substitua o conteúdo do repositório pelo conteúdo desta pasta.
3. Faça commit e push para a branch `main`.
4. No Vercel, confirme que o Root Directory é a raiz do projeto, onde estão `package.json`, `vite.config.js`, `vercel.json` e `middleware.js`.
5. Faça um novo deploy.

## Restrição regional

O middleware permite as 10 cidades tradicionais do Alto Tietê:
Arujá, Biritiba-Mirim, Ferraz de Vasconcelos, Guararema, Itaquaquecetuba, Mogi das Cruzes, Poá, Salesópolis, Santa Isabel e Suzano.

Quando o Vercel informa uma cidade fora da lista, o middleware retorna a página 403 diretamente, sem redirecionar para `/403`.

Quando a geolocalização não estiver disponível, o acesso é liberado para evitar falso bloqueio.

## Hostinger

Para Hostinger, o front-end pode ser publicado como site estático. O `.htaccess` incluído mantém o fallback do React. A restrição por cidade no Hostinger deve ser feita na camada Cloudflare, usando o `worker.js` incluído.
