# Felipe Ribeiro | Advocacia Criminal

Landing page em React + Vite para apresentação institucional de Felipe Ribeiro.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

## Estrutura

- `src/App.jsx`: interface e interações da landing page.
- `src/style.css`: identidade visual, temas, responsividade e animações.
- `public/assets/`: imagens, logos e favicon.
- `middleware.js`: regra regional para Vercel.
- `worker.js`: regra regional para Cloudflare Workers + Static Assets.
- `.htaccess`: fallback para hospedagem estática Apache/Hostinger.

## Tema

O tema é persistido em `localStorage` pela chave `felipe-theme` e alterna entre `dark` e `light`.

O listener do botão é registrado por uma referência estável e removido no cleanup do React, evitando o problema de dupla alternância em desenvolvimento com `React.StrictMode`.
