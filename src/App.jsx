import { useEffect, useState } from 'react';
import './style.css';

const WA_PHONE = '5511944548048';


const REGIONAL_CHECK_STORAGE_KEY = 'felipe-regional-check-v2';


const CURRENT_PATH = window.location.pathname.replace(/\/+$/, '') || '/';

const PRACTICE_PAGES = {
  '/atuacao/prisao-em-flagrante': {
    title: 'Prisão em flagrante',
    eyebrow: 'ÁREA DE ATUAÇÃO · 01',
    subtitle: 'Atuação imediata para garantir seus direitos e evitar abusos.',
    description: 'O flagrante exige resposta rápida e técnica. A atuação começa desde os primeiros momentos, com atenção à legalidade da prisão, aos procedimentos realizados e à proteção dos direitos da pessoa conduzida.',
    image: 'assets/flagrante.png',
    alt: 'Imagem relacionada à prisão em flagrante',
    items: ['Acompanhamento na delegacia', 'Audiência de custódia', 'Pedido de liberdade', 'Análise de ilegalidades', 'Atuação em todo o Brasil']
  },
  '/atuacao/habeas-corpus': {
    title: 'Habeas Corpus',
    eyebrow: 'ÁREA DE ATUAÇÃO · 02',
    subtitle: 'Liberdade é um direito fundamental.',
    description: 'O Habeas Corpus é um instrumento essencial para combater prisões ilegais ou abusivas. A análise técnica considera as circunstâncias do caso e a medida adequada para a proteção da liberdade.',
    image: 'assets/habeas-corpus.png',
    alt: 'Documentos relacionados a Habeas Corpus',
    items: ['Análise da legalidade da prisão', 'Elaboração e impetração do HC', 'Atuação em tribunais', 'Acompanhamento completo']
  },
  '/atuacao/audiencia-de-custodia': {
    title: 'Audiência de custódia',
    eyebrow: 'ÁREA DE ATUAÇÃO · 03',
    subtitle: 'Presença técnica desde o primeiro momento.',
    description: 'A audiência de custódia é uma etapa decisiva após a prisão. A atuação busca apresentar os argumentos pertinentes e avaliar as medidas possíveis para o caso concreto.',
    image: 'assets/audiencia.png',
    alt: 'Ambiente relacionado à audiência de custódia',
    items: ['Acompanhamento presencial ou online', 'Análise do auto de prisão em flagrante', 'Argumentação técnica', 'Pedido de liberdade']
  },
  '/atuacao/inquerito-policial': {
    title: 'Inquérito policial',
    eyebrow: 'ÁREA DE ATUAÇÃO · 04',
    subtitle: 'Acompanhamento em todas as etapas.',
    description: 'O inquérito é o ponto de partida da investigação criminal. O acompanhamento desde o início permite analisar diligências, provas e estratégias de defesa com maior clareza.',
    image: 'assets/inquerito.png',
    alt: 'Documentos de investigação criminal',
    items: ['Acompanhamento de diligências', 'Análise de provas', 'Requerimentos e manifestações', 'Orientação jurídica completa']
  },
  '/atuacao/acao-penal': {
    title: 'Ação penal',
    eyebrow: 'ÁREA DE ATUAÇÃO · 05',
    subtitle: 'Defesa técnica em cada fase do processo.',
    description: 'A ação penal exige acompanhamento estratégico, leitura cuidadosa dos autos e atuação nos atos necessários à defesa. Cada etapa deve ser conduzida com técnica e responsabilidade.',
    image: 'assets/acao-penal.png',
    alt: 'Ambiente relacionado à ação penal',
    items: ['Análise estratégica do processo', 'Defesa e manifestações processuais', 'Acompanhamento de audiências', 'Atuação nas diferentes fases']
  },
  '/atuacao/tribunal-do-juri': {
    title: 'Tribunal do Júri',
    eyebrow: 'ÁREA DE ATUAÇÃO · 06',
    subtitle: 'Preparação e atuação em casos de alta complexidade.',
    description: 'Casos submetidos ao Tribunal do Júri exigem preparação cuidadosa, domínio técnico e estratégia de defesa. A atuação acompanha todas as etapas relevantes até o julgamento.',
    image: 'assets/tribunal.png',
    alt: 'Ambiente relacionado ao Tribunal do Júri',
    items: ['Preparação estratégica do caso', 'Análise de provas e teses defensivas', 'Atuação em plenário', 'Acompanhamento completo da defesa']
  }
};

const PRACTICE_OVERVIEW = Object.entries(PRACTICE_PAGES).map(([path, page], index) => ({ path, ...page, index }));

function internalPageHtml(page) {
  const cards = PRACTICE_OVERVIEW.map((item) => `
    <a class="internal-practice-card ${item.path === CURRENT_PATH ? 'is-current' : ''}" href="${item.path}">
      <span>0${item.index + 1}</span>
      <strong>${item.title}</strong>
      <b>Saiba mais <i>↗</i></b>
    </a>
  `).join('');

  const isOverview = CURRENT_PATH === '/atuacao';
  const content = isOverview ? `
    <section class="internal-hero internal-hero-overview">
      <div class="internal-hero-copy">
        <p class="eyebrow">ÁREAS DE ATUAÇÃO</p>
        <h1>Defesa criminal com<br><em>estratégia e presença.</em></h1>
        <p class="internal-lead">Conheça as principais frentes de atuação e encontre informações objetivas sobre cada etapa da defesa criminal.</p>
      </div>
    </section>
    <section class="internal-practices section-light">
      <div class="internal-section-heading">
        <p class="eyebrow">ATUAÇÃO CRIMINAL</p>
        <h2>Escolha uma área para<br><em>conhecer em detalhes.</em></h2>
      </div>
      <div class="internal-practice-grid">${cards}</div>
    </section>
  ` : `
    <section class="internal-detail-hero">
      <div class="internal-detail-copy">
        <a class="internal-breadcrumb" href="/">Início <span>›</span> Áreas de atuação <span>›</span> ${page.title}</a>
        <p class="eyebrow">${page.eyebrow}</p>
        <h1>${page.title}</h1>
        <p class="internal-subtitle">${page.subtitle}</p>
        <p class="internal-description">${page.description}</p>
        <ul class="internal-checklist">${page.items.map(item => `<li><span>✓</span>${item}</li>`).join('')}</ul>
        <a class="header-cta internal-cta" href="https://wa.me/${WA_PHONE}?text=Olá%2C%20Felipe!%20Gostaria%20de%20falar%20sobre%20${encodeURIComponent(page.title)}." target="_blank" rel="noopener noreferrer">Falar com o advogado <b>↗</b></a>
      </div>
      <div class="internal-detail-media">
        <img src="/${page.image}" alt="${page.alt}">
        <span>FELIPE RIBEIRO · ADVOCACIA CRIMINAL</span>
      </div>
    </section>
    <section class="internal-related section-light">
      <div class="internal-section-heading compact">
        <p class="eyebrow">OUTRAS ÁREAS</p>
        <h2>Continue conhecendo<br><em>as possibilidades de atuação.</em></h2>
      </div>
      <div class="internal-practice-grid">${cards}</div>
    </section>
  `;

  return `
    <div class="internal-page">
      <div class="grain" aria-hidden="true"></div>
      <header class="site-header" id="siteHeader">
        <a aria-label="Felipe Ribeiro, início" class="brand" href="/">
          <img alt="Felipe Ribeiro Advogado" class="brand-dark" src="/assets/logo-felipe-ribeiro-dark.png">
          <img alt="Felipe Ribeiro Advogado" class="brand-light" src="/assets/logo-felipe-ribeiro-clean.png">
        </a>
        <nav aria-label="Navegação principal" class="desktop-nav">
          <a href="/#atuacao">Atuação</a>
          <a href="/#sobre">O advogado</a>
          <a href="/#presenca">Presença</a>
          <a href="/#contato">Contato</a>
        </nav>
        <div class="header-actions">
          <button aria-label="Mudar para modo claro" aria-pressed="false" class="theme-toggle" id="themeToggle" title="Alternar tema" type="button">
            <svg aria-hidden="true" class="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.2"></circle><path d="M12 2.5V5M12 19V21.5M4.77 4.77l1.77 1.77M17.46 17.46l1.77 1.77M2.5 12H5M19 12h2.5M4.77 19.23l1.77-1.77M17.46 6.54l1.77-1.77"></path></svg>
            <svg aria-hidden="true" class="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none"><path d="M20.2 14.2A8.5 8.5 0 0 1 9.8 3.8a8.5 8.5 0 1 0 10.4 10.4Z"></path></svg>
          </button>
          <a class="header-cta" href="https://wa.me/${WA_PHONE}?text=Olá%2C%20Felipe!%20Gostaria%20de%20falar%20sobre%20um%20caso." target="_blank" rel="noopener noreferrer">Falar com o advogado <b>↗</b></a>
        </div>
        <button aria-expanded="false" aria-label="Abrir menu" class="menu-button" id="menuButton" type="button"><span></span><span></span></button>
        <div class="mobile-panel" id="mobilePanel">
          <nav aria-label="Navegação mobile">
            <a href="/#atuacao">Atuação <b>01</b></a>
            <a href="/#sobre">O advogado <b>02</b></a>
            <a href="/#presenca">Presença <b>03</b></a>
            <a href="/#contato">Contato <b>04</b></a>
          </nav>
          <button aria-label="Mudar para modo claro" class="mobile-theme" id="mobileTheme" title="Alternar tema" type="button"><span>Alternar tema</span><svg aria-hidden="true" class="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.2"></circle><path d="M12 2.5V5M12 19V21.5M4.77 4.77l1.77 1.77M17.46 17.46l1.77 1.77M2.5 12H5M19 12h2.5M4.77 19.23l1.77-1.77M17.46 6.54l1.77-1.77"></path></svg><svg aria-hidden="true" class="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none"><path d="M20.2 14.2A8.5 8.5 0 0 1 9.8 3.8a8.5 8.5 0 1 0 10.4 10.4Z"></path></svg></button>
          <a class="header-cta" href="https://wa.me/${WA_PHONE}?text=Olá%2C%20Felipe!%20Gostaria%20de%20falar%20sobre%20um%20caso." target="_blank" rel="noopener noreferrer">Falar com o advogado <b>↗</b></a>
        </div>
      </header>
      <main>${content}
        <section class="internal-final-cta">
          <div><p class="eyebrow">ATENDIMENTO</p><h2>Precisa de orientação<br><em>sobre o seu caso?</em></h2><p>Apresente a situação e entenda os próximos passos do atendimento.</p></div>
          <a class="header-cta" href="https://wa.me/${WA_PHONE}?text=Olá%2C%20Felipe!%20Gostaria%20de%20falar%20sobre%20um%20caso." target="_blank" rel="noopener noreferrer">Falar agora <b>↗</b></a>
        </section>
      </main>
      <footer class="footer"><div class="footer-brand"><img alt="Felipe Ribeiro Advogado" src="/assets/logo-felipe-ribeiro-clean.png"></div><div class="footer-links"><a href="/">Início</a><a href="/atuacao">Atuação</a><a href="/#sobre">O advogado</a><a href="/#contato">Contato</a></div><p>© ${new Date().getFullYear()} Felipe Vinicius Santana Ribeiro · OAB/SP 543.966. Todos os direitos reservados.</p></footer>
    </div>
  `;
}

export default function App() {
  const [regionalAccess, setRegionalAccess] = useState(() => {
    try {
      const savedCheck = localStorage.getItem(REGIONAL_CHECK_STORAGE_KEY);

      if (savedCheck === 'restricted') {
        return {
          status: 'denied',
          city: 'Tatuapé',
          error: 'O acesso não está disponível nesta área.',
          permission: 'stored',
        };
      }

      if (savedCheck === 'allowed') {
        return {
          status: 'allowed',
          city: '',
          error: '',
          permission: 'stored',
        };
      }
    } catch {
      // Sem armazenamento disponível, o site segue normalmente.
    }

    // A confirmação de localização já foi retirada da abertura recorrente.
    // Na primeira entrada, o acesso fica liberado e a decisão permanece salva.
    try {
      localStorage.setItem(REGIONAL_CHECK_STORAGE_KEY, 'allowed');
    } catch {
      // O site continua funcionando mesmo sem localStorage.
    }

    return {
      status: 'allowed',
      city: '',
      error: '',
      permission: 'stored',
    };
  });

  useEffect(() => {
    const body = document.body;
    const loader = document.getElementById('loader');
    const header = document.getElementById('siteHeader');
    const menuButton = document.getElementById('menuButton');
    const mobileTheme = document.getElementById('mobileTheme');
    const themeToggle = document.getElementById('themeToggle');
    const contactForm = document.getElementById('contactForm');

    const seoTitles = {
      '/': 'Felipe Vinicius Santana Ribeiro | Advogado Criminalista',
      '/atuacao': 'Áreas de Atuação | Felipe Ribeiro Advogado Criminalista',
      ...Object.fromEntries(Object.entries(PRACTICE_PAGES).map(([path, page]) => [path, `${page.title} | Felipe Ribeiro Advogado Criminalista`]))
    };

    const seoDescriptions = {
      '/': 'Felipe Vinicius Santana Ribeiro, advogado criminalista. Atuação em defesa criminal, com atendimento presencial e online em todo o Brasil.',
      '/atuacao': 'Conheça as principais áreas de atuação criminal de Felipe Vinicius Santana Ribeiro.',
      ...Object.fromEntries(Object.entries(PRACTICE_PAGES).map(([path, page]) => [path, `${page.title}: ${page.subtitle}`]))
    };

    document.title = seoTitles[CURRENT_PATH] || seoTitles['/'];
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', seoDescriptions[CURRENT_PATH] || seoDescriptions['/']);

    const setTheme = (theme) => {
      body.dataset.theme = theme;
      localStorage.setItem('felipe-theme', theme);

      themeToggle?.setAttribute(
        'aria-label',
        theme === 'dark'
          ? 'Mudar para modo claro'
          : 'Mudar para modo escuro'
      );
      themeToggle?.setAttribute(
        'aria-pressed',
        String(theme === 'light')
      );
    };

    const savedTheme = localStorage.getItem('felipe-theme');
    const initialTheme = savedTheme === 'light' ? 'light' : 'dark';
    setTheme(initialTheme);

    const loaderTimer = window.setTimeout(() => {
      loader?.classList.add('hide');
    }, 2700);

    const onScroll = () => {
      header?.classList.toggle('scrolled', window.scrollY > 30);
    };

    const toggleTheme = () => {
      const nextTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    };

    const closeMenu = () => {
      header?.classList.remove('menu-open');
      menuButton?.setAttribute('aria-expanded', 'false');
      menuButton?.setAttribute('aria-label', 'Abrir menu');
      body.classList.remove('no-scroll');
    };

    const toggleMenu = () => {
      if (!header || !menuButton) return;

      const open = !header.classList.contains('menu-open');

      header.classList.toggle('menu-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute(
        'aria-label',
        open ? 'Fechar menu' : 'Abrir menu'
      );
      body.classList.toggle('no-scroll', open);
    };

    const mobileLinks = [
      ...document.querySelectorAll('.mobile-panel a')
    ];

    const onResize = () => {
      if (window.innerWidth > 1050) {
        closeMenu();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    themeToggle?.addEventListener('click', toggleTheme);
    mobileTheme?.addEventListener('click', toggleTheme);
    menuButton?.addEventListener('click', toggleMenu);
    mobileLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    onScroll();

    const selectors = [
      '.about-copy > .eyebrow',
      '.about-copy > h2',
      '.about-copy > .lead',
      '.about-facts',
      '.about-media',
      '.process-heading > .eyebrow',
      '.process-heading > h2',
      '.timeline-step',
      '.practice-top > .eyebrow',
      '.practice-top > h2',
      '.practice-intro',
      '.practice-stage',
      '.presence-copy > .eyebrow',
      '.presence-copy > h2',
      '.principle',
      '.authority-head > .eyebrow',
      '.authority-head > h2',
      '.authority-lead',
      '.authority-list',
      '.testimonial-head',
      '.testimonial-stage',
      '.testimonial-author',
      '.final-cta-inner > .eyebrow',
      '.final-cta-inner > h2',
      '.final-cta-inner > p',
      '.final-cta-inner > .button',
      '.contact-intro > .eyebrow',
      '.contact-intro > h2',
      '.contact-intro > p',
      '.contact-details',
      '.contact-form'
    ];

    document.querySelectorAll(selectors.join(',')).forEach((element) => {
      if (element.classList.contains('scroll-reveal')) return;

      element.classList.add('scroll-reveal');

      const parent = element.parentElement;
      const siblings = parent ? [...parent.children] : [];
      const index = siblings.indexOf(element);

      if (element.matches('.about-media, .contact-form')) {
        element.classList.add('scale-in');
      } else if (element.matches('.authority-list, .contact-form')) {
        element.classList.add('from-right');
      } else if (
        element.matches(
          '.about-copy > h2, .process-heading > h2, .presence-copy > h2, .authority-head > h2, .final-cta-inner > h2'
        )
      ) {
        element.classList.add('from-left');
      }

      if (index) {
        element.dataset.delay = String(
          Math.min(5, Math.max(0, index))
        );
      }
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    document
      .querySelectorAll(
        '.reveal, .reveal-media, .reveal-step, .scroll-reveal, .scroll-section-line'
      )
      .forEach((element) => revealObserver.observe(element));

    const heroPortrait = document.querySelector('.hero-portrait');
    const aboutMedia = document.querySelector('.about-media img');
    let parallaxTick = false;

    const updateParallax = () => {
      if (parallaxTick) return;

      parallaxTick = true;

      window.requestAnimationFrame(() => {
        const y = window.scrollY;

        if (heroPortrait && y < window.innerHeight * 1.15) {
          heroPortrait.style.setProperty(
            '--scroll-y',
            `${Math.min(y * 0.055, 34)}px`
          );
        }

        if (aboutMedia) {
          const rect = aboutMedia.getBoundingClientRect();
          const shift = Math.max(
            -18,
            Math.min(
              18,
              (window.innerHeight * 0.55 -
                (rect.top + rect.height * 0.5)) *
                0.035
            )
          );

          aboutMedia.style.setProperty(
            '--about-shift',
            `${shift}px`
          );
        }

        parallaxTick = false;
      });
    };

    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();

    const timeline = document.getElementById('timeline');
    const axis = timeline?.querySelector('.timeline-axis');
    const steps = [...document.querySelectorAll('.timeline-step')];

    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          axis?.classList.add('active');
          steps.forEach((step) => {
            step.classList.remove('is-active');
          });
          entry.target.classList.add('is-active');
        });
      },
      { threshold: 0.55 }
    );

    steps.forEach((step) => timelineObserver.observe(step));

    const practiceStage = document.getElementById('practiceStage');
    const practiceImageCurrent = document.getElementById('practiceImageCurrent');
    const practiceImageNext = document.getElementById('practiceImageNext');
    const practiceImage = document.getElementById('practiceImage');
    const practiceImageNextImg = document.getElementById('practiceImageNextImg');
    const practiceTitle = document.getElementById('practiceTitle');
    const practiceDescription = document.getElementById('practiceDescription');
    const practiceDetail = document.querySelector('.practice-detail span');
    const practiceItems = [
      ...document.querySelectorAll('.practice-item')
    ];

    const practiceSources = practiceItems
      .map((item) => item.dataset.image)
      .filter(Boolean);

    // Todas as imagens ficam pré-carregadas localmente. A troca nunca depende
    // de uma nova requisição no momento do clique.
    practiceSources.forEach((src) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = src;
    });

    let practiceBusy = false;

    const activatePractice = (item) => {
      if (
        !practiceStage ||
        !practiceImageCurrent ||
        !practiceImageNext ||
        !practiceImage ||
        !practiceImageNextImg ||
        practiceBusy ||
        item.classList.contains('is-active')
      ) {
        return;
      }

      practiceBusy = true;

      const current = document.querySelector('.practice-item.is-active');
      const currentIndex = Number(current?.dataset.index || 0);
      const nextIndex = Number(item.dataset.index || 0);
      const direction = nextIndex >= currentIndex ? 1 : -1;
      const nextSrc = item.dataset.image;

      practiceStage.classList.remove('change-next', 'change-prev');
      practiceStage.classList.add(
        'is-changing',
        direction > 0 ? 'change-next' : 'change-prev'
      );

      // A próxima camada é preparada antes de qualquer mudança visual.
      practiceImageNextImg.alt = item.dataset.alt || '';
      practiceImageNextImg.src = nextSrc;

      const revealNext = () => {
        practiceImageNext.classList.add('is-visible');
        practiceImageCurrent.classList.add('is-exiting');

        window.setTimeout(() => {
          practiceItems.forEach((practiceItem) => {
            practiceItem.classList.remove('is-active');
          });

          item.classList.add('is-active');
          practiceTitle.textContent = item.dataset.title;
          practiceDescription.textContent = item.dataset.description;
          practiceDetail.textContent = `${String(nextIndex + 1).padStart(2, '0')} / 06`;

          // A camada que entrou passa a ser a atual.
          practiceImage.src = nextSrc;
          practiceImage.alt = item.dataset.alt || '';
          practiceImageCurrent.classList.remove('is-exiting');
          practiceImageNext.classList.remove('is-visible');

          practiceStage.classList.remove(
            'is-changing',
            'change-next',
            'change-prev'
          );
          practiceBusy = false;
        }, 720);
      };

      // decode() evita revelar uma imagem que ainda esteja rasterizando.
      // Como as imagens já foram pré-carregadas, normalmente é imediato.
      if (practiceImageNextImg.decode) {
        practiceImageNextImg.decode().catch(() => {}).finally(revealNext);
      } else {
        revealNext();
      }
    };

    practiceItems.forEach((item) => {
      const handleFocus = () => activatePractice(item);
      const handleClick = () => activatePractice(item);

      item.addEventListener('focus', handleFocus);
      item.addEventListener('click', handleClick);

      item._felipeHandleFocus = handleFocus;
      item._felipeHandleClick = handleClick;
    });

    const testimonialCounter = document.getElementById(
      'testimonialCounter'
    );

    if (testimonialCounter) {
      testimonialCounter.textContent = '01 / 03';
    }

    const submitContact = (event) => {
      event.preventDefault();

      if (!contactForm) return;

      const data = new FormData(contactForm);
      const text = `Olá, Dr. Felipe. Meu nome é ${data.get('nome')}.

WhatsApp: ${data.get('whatsapp')}
E-mail: ${data.get('email') || 'Não informado'}

${data.get('mensagem')}`;
      const whatsappUrl =
        `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;

      window.open(whatsappUrl, '_blank', 'noopener');
    };

    contactForm?.addEventListener('submit', submitContact);

    const year = document.getElementById('year');
    if (year) {
      year.textContent = new Date().getFullYear();
    }

    const ring = document.querySelector('.cursor-ring');
    const dot = document.querySelector('.cursor-dot');
    let cursorAnimationFrame = null;
    let cursorMoveHandler = null;
    const cursorHoverHandlers = [];

    if (
      window.matchMedia('(pointer:fine)').matches &&
      ring &&
      dot
    ) {
      let x = window.innerWidth / 2;
      let y = window.innerHeight / 2;
      let rx = x;
      let ry = y;

      cursorMoveHandler = (event) => {
        x = event.clientX;
        y = event.clientY;
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
      };

      const cursorLoop = () => {
        rx += (x - rx) * 0.16;
        ry += (y - ry) * 0.16;
        ring.style.left = `${rx}px`;
        ring.style.top = `${ry}px`;
        cursorAnimationFrame = window.requestAnimationFrame(cursorLoop);
      };

      window.addEventListener('mousemove', cursorMoveHandler);
      cursorLoop();

      document
        .querySelectorAll('a, button, .practice-item')
        .forEach((element) => {
          const mouseEnter = () => {
            ring.style.width = '56px';
            ring.style.height = '56px';
          };
          const mouseLeave = () => {
            ring.style.width = '38px';
            ring.style.height = '38px';
          };

          element.addEventListener('mouseenter', mouseEnter);
          element.addEventListener('mouseleave', mouseLeave);

          cursorHoverHandlers.push({
            element,
            mouseEnter,
            mouseLeave
          });
        });
    }

    return () => {
      window.clearTimeout(loaderTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', updateParallax);

      themeToggle?.removeEventListener('click', toggleTheme);
      mobileTheme?.removeEventListener('click', toggleTheme);
      menuButton?.removeEventListener('click', toggleMenu);

      mobileLinks.forEach((link) => {
        link.removeEventListener('click', closeMenu);
      });

      contactForm?.removeEventListener('submit', submitContact);

      revealObserver.disconnect();
      timelineObserver.disconnect();

      practiceItems.forEach((item) => {
        if (item._felipeHandleFocus) {
          item.removeEventListener('focus', item._felipeHandleFocus);
        }
        if (item._felipeHandleClick) {
          item.removeEventListener('click', item._felipeHandleClick);
        }
        delete item._felipeHandleFocus;
        delete item._felipeHandleClick;
      });


      if (cursorMoveHandler) {
        window.removeEventListener('mousemove', cursorMoveHandler);
      }

      if (cursorAnimationFrame) {
        window.cancelAnimationFrame(cursorAnimationFrame);
      }

      cursorHoverHandlers.forEach(
        ({ element, mouseEnter, mouseLeave }) => {
          element.removeEventListener('mouseenter', mouseEnter);
          element.removeEventListener('mouseleave', mouseLeave);
        }
      );
    };
  }, []);

  if (CURRENT_PATH === '/atuacao' || PRACTICE_PAGES[CURRENT_PATH]) {
    return <div dangerouslySetInnerHTML={{ __html: internalPageHtml(PRACTICE_PAGES[CURRENT_PATH]) }} />;
  }

  return (
      <div dangerouslySetInnerHTML={{ __html: `
        <div aria-hidden="true" class="loader" id="loader">
         <img alt="Felipe Ribeiro Advogado" src="assets/logo-felipe-ribeiro-dark.png"/>
         <div class="loader-rule">
          <span>
          </span>
         </div>
         <p>
          ADVOGADO CRIMINAL
         </p>
        </div>
        <div aria-hidden="true" class="grain">
        </div>
        <div aria-hidden="true" class="cursor-ring">
        </div>
        <div aria-hidden="true" class="cursor-dot">
        </div>
        <header class="site-header" id="siteHeader">
         <a aria-label="Felipe Ribeiro, início" class="brand" href="#inicio">
          <img alt="Felipe Ribeiro Advogado" class="brand-dark" src="assets/logo-felipe-ribeiro-dark.png"/>
          <img alt="Felipe Ribeiro Advogado" class="brand-light" src="assets/logo-felipe-ribeiro-clean.png"/>
         </a>
         <nav aria-label="Navegação principal" class="desktop-nav">
          <a href="#atuacao">
           Atuação
          </a>
          <a href="#sobre">
           O advogado
          </a>
          <a href="#presenca">
           Presença
          </a>
          <a href="#contato">
           Contato
          </a>
         </nav>
         <div class="header-actions">
          <button aria-label="Mudar para modo claro" aria-pressed="false" class="theme-toggle" id="themeToggle" title="Alternar tema" type="button">
           <svg aria-hidden="true" class="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4.2"></circle>
            <path d="M12 2.5V5M12 19V21.5M4.77 4.77l1.77 1.77M17.46 17.46l1.77 1.77M2.5 12H5M19 12h2.5M4.77 19.23l1.77-1.77M17.46 6.54l1.77-1.77"></path>
           </svg>
           <svg aria-hidden="true" class="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none">
            <path d="M20.2 14.2A8.5 8.5 0 0 1 9.8 3.8a8.5 8.5 0 1 0 10.4 10.4Z"></path>
           </svg>
          </button>
          <a class="header-cta" href="https://wa.me/5511944548048?text=Olá%2C%20Felipe!%20Gostaria%20de%20falar%20sobre%20um%20caso." rel="noopener noreferrer" target="_blank">
           Falar com o advogado
           <b>
            ↗
           </b>
          </a>
         </div>
         <button aria-expanded="false" aria-label="Abrir menu" class="menu-button" id="menuButton" type="button">
          <span>
          </span>
          <span>
          </span>
         </button>
         <div class="mobile-panel" id="mobilePanel">
          <nav aria-label="Navegação mobile">
           <a href="#atuacao">
            Atuação
            <b>
             01
            </b>
           </a>
           <a href="#sobre">
            O advogado
            <b>
             02
            </b>
           </a>
           <a href="#presenca">
            Presença
            <b>
             03
            </b>
           </a>
           <a href="#contato">
            Contato
            <b>
             04
            </b>
           </a>
          </nav>
          <button aria-label="Mudar para modo claro" class="mobile-theme" id="mobileTheme" title="Alternar tema" type="button">
           <span>Alternar tema</span>
           <svg aria-hidden="true" class="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4.2"></circle>
            <path d="M12 2.5V5M12 19V21.5M4.77 4.77l1.77 1.77M17.46 17.46l1.77 1.77M2.5 12H5M19 12h2.5M4.77 19.23l1.77-1.77M17.46 6.54l1.77-1.77"></path>
           </svg>
           <svg aria-hidden="true" class="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none">
            <path d="M20.2 14.2A8.5 8.5 0 0 1 9.8 3.8a8.5 8.5 0 1 0 10.4 10.4Z"></path>
           </svg>
          </button>
          <a class="header-cta" href="https://wa.me/5511944548048?text=Olá%2C%20Felipe!%20Gostaria%20de%20falar%20sobre%20um%20caso." rel="noopener noreferrer" target="_blank">
           Falar com o advogado
           <b>
            ↗
           </b>
          </a>
         </div>
        </header>
        <main>
         <section class="hero" id="inicio">
          <div aria-hidden="true" class="hero-image">
          </div>
          <div aria-hidden="true" class="hero-overlay">
          </div>
          <div class="hero-copy">
           <p class="eyebrow hero-reveal">
            ADVOGADO CRIMINAL
            <span>
            </span>
            SÃO PAULO
           </p>
           <h1 class="hero-reveal delay-1">
            Sua defesa
            <br/>
            <em>
             merece estratégia.
            </em>
           </h1>
           <p class="hero-text hero-reveal delay-2">
            Atuação técnica, personalizada e comprometida com cada etapa da defesa criminal.
           </p>
           <div class="availability-badge hero-reveal delay-2" aria-label="Atendimento nacional 24 horas">
            <span aria-hidden="true"></span>
            ATENDIMENTO NACIONAL · 24 HORAS · TODOS OS DIAS
           </div>
           <div class="hero-actions hero-reveal delay-3">
            <a class="header-cta" href="https://wa.me/5511944548048?text=Olá%2C%20Felipe!%20Gostaria%20de%20falar%20sobre%20um%20caso." rel="noopener noreferrer" target="_blank">
             Falar com o advogado
             <b>
              ↗
             </b>
            </a>
            <a class="under-link" href="#atuacao">
             Conhecer atuação
             <span>
              ↓
             </span>
            </a>
           </div>
          </div>
          <div class="hero-portrait hero-reveal delay-2">
           <img alt="Felipe Vinicius Santana Ribeiro" src="assets/felipe-corpo.jpg"/>
           <div class="portrait-caption">
             FELIPE VINICIUS SANTANA RIBEIRO · OAB/SP 543.966
           </div>
          </div>
          <div aria-hidden="true" class="hero-vertical">
           DEFESA    ESTRATÉGIA    PRESENÇA    RESULTADOS
          </div>
          <a class="scroll-cue" href="#sobre">
           <span>
           </span>
           Rolar para conhecer
          </a>
         </section>
         <section aria-label="Compromissos da atuação" class="commitments">
          <div>
           <b>
            01
           </b>
           <strong>
            Sigilo
           </strong>
           <p>
            em primeiro lugar
           </p>
          </div>
          <div>
           <b>
            02
           </b>
           <strong>
            Estratégia
           </strong>
           <p>
            em cada passo
           </p>
          </div>
          <div>
           <b>
            03
           </b>
           <strong>
            Compromisso
           </strong>
           <p>
            com cada etapa
           </p>
          </div>
         </section>
         <section class="practice section-dark" id="atuacao">
          <div class="practice-top">
           <div>
            <p class="eyebrow reveal">
             ÁREAS DE ATUAÇÃO
            </p>
            <h2 class="reveal">
             Defesa em momentos
             <br/>
             <em>
              que exigem resposta.
             </em>
            </h2>
           </div>
           <p class="practice-intro reveal">
            Atuação em defesa criminal com estratégia, acompanhamento próximo e resposta técnica em cada etapa do caso.
           </p>
          </div>
          <div class="practice-stage" id="practiceStage">
           <div class="practice-image-wrap">
            <div class="practice-image-layer practice-image-layer-current" id="practiceImageCurrent">
             <img alt="Ambiente relacionado à atuação criminal" id="practiceImage" src="assets/flagrante.png"/>
            </div>
            <div class="practice-image-layer practice-image-layer-next" id="practiceImageNext">
             <img alt="" id="practiceImageNextImg" src="assets/audiencia.png"/>
            </div>
            <div class="practice-shade">
            </div>
            <div class="practice-current">
             <span class="practice-current-label" aria-hidden="true">
              ÁREA EM FOCO
             </span>
             <h3 id="practiceTitle" aria-live="polite">
              Prisão em flagrante
             </h3>
             <p id="practiceDescription" aria-live="polite">
              Atuação desde os primeiros momentos da ocorrência e acompanhamento das medidas cabíveis.
             </p>
            </div>
            <div class="practice-detail">
             <span>
              01 / 06
             </span>
             <p>
              ATUAÇÃO CRIMINAL
             </p>
            </div>
           </div>
           <div aria-label="Áreas de atuação" class="practice-list" role="list">
           <div class="practice-item-wrap">
            <button
             class="practice-item is-active"
             data-alt="Ambiente relacionado à prisão em flagrante"
             data-description="Atuação desde os primeiros momentos da ocorrência e acompanhamento das medidas cabíveis."
             data-image="assets/flagrante.png"
             data-index="0"
             data-title="Prisão em flagrante"
            >
             <span>
              01
             </span>
             <strong>
              Prisão em flagrante
             </strong>
            </button>
            <a class="practice-more" href="/atuacao/prisao-em-flagrante">Saiba mais <span aria-hidden="true">↗</span></a>
           </div>
           <div class="practice-item-wrap">
            <button
             class="practice-item"
             data-alt="Delegacia de Polícia"
             data-description="Acompanhamento jurídico e análise da situação para definição da estratégia de defesa."
             data-image="assets/audiencia.png"
             data-index="1"
             data-title="Audiência de custódia"
            >
             <span>
              02
             </span>
             <strong>
              Audiência de custódia
             </strong>
            </button>
            <a class="practice-more" href="/atuacao/audiencia-de-custodia">Saiba mais <span aria-hidden="true">↗</span></a>
           </div>
           <div class="practice-item-wrap">
            <button
             class="practice-item"
             data-alt="Felipe no escritório"
             data-description="Análise das circunstâncias e das medidas processuais aplicáveis ao caso concreto."
             data-image="assets/habeas-corpus.png"
             data-index="2"
             data-title="Habeas Corpus"
            >
             <span>
              03
             </span>
             <strong>
              Habeas Corpus
             </strong>
            </button>
            <a class="practice-more" href="/atuacao/habeas-corpus">Saiba mais <span aria-hidden="true">↗</span></a>
           </div>
           <div class="practice-item-wrap">
            <button
             class="practice-item"
             data-alt="Ambiente de delegacia"
             data-description="Orientação e defesa técnica durante a fase de investigação e seus desdobramentos."
             data-image="assets/inquerito.png"
             data-index="3"
             data-title="Inquérito policial"
            >
             <span>
              04
             </span>
             <strong>
              Inquérito policial
             </strong>
            </button>
            <a class="practice-more" href="/atuacao/inquerito-policial">Saiba mais <span aria-hidden="true">↗</span></a>
           </div>
           <div class="practice-item-wrap">
            <button
             class="practice-item"
             data-alt="Escritório de Felipe Ribeiro"
             data-description="Acompanhamento estratégico do processo e atuação nos atos necessários à defesa."
             data-image="assets/acao-penal.png"
             data-index="4"
             data-title="Ação penal"
            >
             <span>
              05
             </span>
             <strong>
              Ação penal
             </strong>
            </button>
            <a class="practice-more" href="/atuacao/acao-penal">Saiba mais <span aria-hidden="true">↗</span></a>
           </div>
           <div class="practice-item-wrap">
            <button
             class="practice-item"
             data-alt="Ambiente institucional"
             data-description="Preparação e atuação técnica em casos submetidos ao julgamento pelo Tribunal do Júri."
             data-image="assets/tribunal.png"
             data-index="5"
             data-title="Tribunal do Júri"
            >
             <span>
              06
             </span>
             <strong>
              Tribunal do Júri
             </strong>
            </button>
            <a class="practice-more" href="/atuacao/tribunal-do-juri">Saiba mais <span aria-hidden="true">↗</span></a>
           </div>
           </div>
          </div>
         </section>
         <section class="about section-light" id="sobre">
          <div class="about-media reveal-media">
           <img alt="Felipe Vinicius Santana Ribeiro" src="assets/felipe-retrato.jpg"/>
           <span class="image-index">
            01 / 03
           </span>
          </div>
          <div class="about-copy">
           <p class="eyebrow reveal">
            O ADVOGADO
           </p>
           <h2 class="reveal">
            Advocacia exige mais do que conhecimento.
            <br/>
            <em>
             Exige posição.
            </em>
           </h2>
           <div class="thin-rule reveal">
           </div>
           <p class="lead reveal">
            Felipe Vinicius Santana Ribeiro atua na área criminal com uma abordagem individualizada, comunicação clara e atenção aos detalhes que podem fazer diferença na
            construção de uma defesa.
           </p>
           <p class="reveal" style="margin-top: 18px; font-weight: 600;">
            Felipe Vinicius Santana Ribeiro · OAB/SP 543.966
           </p>
           <p class="reveal">
            Cada atendimento parte da compreensão cuidadosa dos fatos. A estratégia é construída a partir das circunstâncias concretas do caso, com técnica, sigilo e proximidade.
           </p>
           <div class="about-facts reveal">
            <div>
             <span>
              ATUAÇÃO
             </span>
             <strong>
              Advocacia Criminal
             </strong>
            </div>
            <div>
             <span>
              ABORDAGEM
             </span>
             <strong>
              Individualizada
             </strong>
            </div>
            <div>
             <span>
              COMPROMISSO
             </span>
             <strong>
              Defesa técnica
             </strong>
            </div>
           </div>
          </div>
         </section>
         <section class="process section-light" id="processo">
          <div class="process-heading">
           <p class="eyebrow reveal">
            COMO FUNCIONA
           </p>
           <h2 class="reveal">
            Do primeiro contato
            <br/>
            <em>
             à estratégia de defesa.
            </em>
           </h2>
          </div>
          <div class="timeline" id="timeline">
           <div aria-hidden="true" class="timeline-axis">
            <span>
            </span>
           </div>
           <article class="timeline-step reveal-step is-active">
            <div class="step-marker">
             <span>
              01
             </span>
            </div>
            <div class="step-body">
             <span class="step-number">
              01
             </span>
             <h3>
              Contato
             </h3>
             <p>
              Você apresenta a situação e recebe orientação inicial sobre o atendimento e os próximos passos possíveis.
             </p>
            </div>
           </article>
           <article class="timeline-step reveal-step">
            <div class="step-marker">
             <span>
              02
             </span>
            </div>
            <div class="step-body">
             <span class="step-number">
              02
             </span>
             <h3>
              Análise
             </h3>
             <p>
              Os fatos, documentos e circunstâncias relevantes são avaliados com atenção individualizada.
             </p>
            </div>
           </article>
           <article class="timeline-step reveal-step">
            <div class="step-marker">
             <span>
              03
             </span>
            </div>
            <div class="step-body">
             <span class="step-number">
              03
             </span>
             <h3>
              Estratégia
             </h3>
             <p>
              São definidos os caminhos jurídicos adequados às particularidades e aos objetivos legítimos da defesa.
             </p>
            </div>
           </article>
           <article class="timeline-step reveal-step">
            <div class="step-marker">
             <span>
              04
             </span>
            </div>
            <div class="step-body">
             <span class="step-number">
              04
             </span>
             <h3>
              Atuação
             </h3>
             <p>
              A defesa é conduzida com técnica, acompanhamento e comunicação transparente ao longo de cada etapa.
             </p>
            </div>
           </article>
          </div>
         </section>
         <section class="presence section-dark" id="presenca">
          <div class="presence-copy">
           <p class="eyebrow reveal">
            A FORMA DE ATUAR
           </p>
           <h2 class="reveal">
            Cada caso tem uma história.
            <br/>
            <em>
             A estratégia começa entendendo a sua.
            </em>
           </h2>
          </div>
          <div class="principles">
           <article class="principle reveal">
            <span>
             01
            </span>
            <div>
             <h3>
              Escutar
             </h3>
             <p>
              Antes de definir qualquer caminho, é preciso compreender o contexto e os fatos que envolvem cada situação.
             </p>
            </div>
           </article>
           <article class="principle reveal">
            <span>
             02
            </span>
            <div>
             <h3>
              Estratégia
             </h3>
             <p>
              Cada decisão jurídica precisa ter fundamento, propósito e coerência com as circunstâncias do caso.
             </p>
            </div>
           </article>
           <article class="principle reveal">
            <span>
             03
            </span>
            <div>
             <h3>
              Atuação
             </h3>
             <p>
              Do primeiro contato à condução do caso, cada etapa importa e exige presença técnica.
             </p>
            </div>
           </article>
          </div>
         </section>
         <section class="authority section-light">
          <div class="authority-head">
           <p class="eyebrow reveal">
            EXPERIÊNCIA E AUTORIDADE
           </p>
           <h2 class="reveal">
            Conhecimento jurídico precisa
            <br/>
            <em>
             se transformar em direção.
            </em>
           </h2>
          </div>
          <div class="authority-grid">
           <p class="authority-lead reveal">
            A atuação profissional combina conhecimento jurídico, leitura cuidadosa do contexto e
            acompanhamento próximo. O objetivo é transformar informação em caminhos claros para a tomada
            de decisão.
           </p>
           <div class="authority-list reveal">
            <div>
             <span>
              01
             </span>
             <p>
              Formação e qualificação profissional
             </p>
            </div>
            <div>
             <span>
              02
             </span>
             <p>
              Atuação direcionada à área criminal
             </p>
            </div>
            <div>
             <span>
              03
             </span>
             <p>
              Atendimento presencial e online
             </p>
            </div>
            <div>
             <span>
              04
             </span>
             <p>
              Comunicação clara durante o atendimento
             </p>
            </div>
           </div>
          </div>
         </section>
         <section class="testimonials section-dark" id="depoimentos">
          <div class="testimonial-head">
           <p class="eyebrow">
            EXPERIÊNCIAS
           </p>
           <span id="testimonialCounter">
            01 / 03
           </span>
          </div>
          <div class="review-intro">
           <div>
            <h2>
             Experiências reais.
             <br/>
             <em>
              Registradas com autorização.
             </em>
            </h2>
           </div>
           <p>
            Espaço reservado para inserir imagens de avaliações reais de clientes, mantendo a apresentação visual discreta e alinhada à identidade do escritório.
           </p>
          </div>
          <div
           aria-label="Galeria de avaliações de clientes"
           class="review-gallery"
          >
           <figure class="review-card">
            <img
             alt="Avaliação de cliente 1"
             class="review-photo"
             src="assets/avaliacoes/avaliacao-01.png"
            />
           </figure>
           <figure class="review-card review-card-offset">
            <img
             alt="Avaliação de cliente 2"
             class="review-photo"
             src="assets/avaliacoes/avaliacao-02.png"
            />
           </figure>
           <figure class="review-card">
            <img
             alt="Avaliação de cliente 3"
             class="review-photo"
             src="assets/avaliacoes/avaliacao-03.png"
            />
           </figure>
          </div>
         </section>
         <section class="final-cta section-dark">
          <div class="final-cta-inner">
           <p class="eyebrow reveal">
            CONVERSA INICIAL
           </p>
           <h2 class="reveal">
            Seu caso merece ser
            <br/>
            <em>
             analisado com atenção.
            </em>
           </h2>
           <p class="reveal">
            Entre em contato para apresentar a situação e entender os próximos passos do atendimento.
           </p>
           <a class="header-cta" href="https://wa.me/5511944548048?text=Olá%2C%20Felipe!%20Gostaria%20de%20falar%20sobre%20um%20caso." rel="noopener noreferrer" target="_blank">
            Falar com o advogado
            <b>
             ↗
            </b>
           </a>
          </div>
         </section>
         <section class="contact section-light" id="contato">
          <div class="contact-intro">
           <p class="eyebrow reveal">
            CONTATO
           </p>
           <h2 class="reveal">
            Vamos conversar
            <br/>
            <em>
             sobre o seu caso.
            </em>
           </h2>
           <p class="reveal">
            O primeiro contato é o momento de apresentar a situação, esclarecer dúvidas e entender como o atendimento pode ser conduzido.
           </p>
           <div class="contact-details reveal">
            <a href="tel:+5511944548048">
             Telefone / WhatsApp
            </a>
            <span>
             Atendimento nacional · 24 horas · todos os dias
            </span>
            <span>
             Atendimento presencial e online
            </span>
            <span>
             Sigilo e privacidade
            </span>
           </div>
          </div>
          <form class="contact-form reveal" id="contactForm">
           <label>
            Nome
            <input autocomplete="name" name="nome" required="" type="text"/>
           </label>
           <label>
            WhatsApp
            <input autocomplete="tel" name="whatsapp" required="" type="tel"/>
           </label>
           <label>
            E-mail
            <span>
             (opcional)
            </span>
            <input autocomplete="email" name="email" type="email"/>
           </label>
           <label>
            Como podemos ajudar?
            <textarea name="mensagem" required="" rows="5"></textarea>
           </label>
           <button class="button button-dark" type="submit">
            Enviar mensagem
            <span>
             ↗
            </span>
           </button>
           <p class="form-note">
            A mensagem será preparada para envio pelo WhatsApp. O atendimento preserva a confidencialidade das informações.
           </p>
          </form>
         </section>
        </main>
        <footer class="footer">
         <div class="footer-brand">
          <img alt="Felipe Ribeiro Advogado" src="assets/logo-felipe-ribeiro-clean.png"/>
         </div>
         <div class="footer-links">
          <a href="#atuacao">
           Atuação
          </a>
          <a href="#sobre">
           O advogado
          </a>
          <a href="#presenca">
           Presença
          </a>
          <a href="#contato">
           Contato
          </a>
         </div>
         <p>
          ©
          <span id="year">
          </span>
          Felipe Vinicius Santana Ribeiro · OAB/SP 543.966. Todos os direitos reservados.
         </p>
        </footer>
      ` }} />
  );
}
