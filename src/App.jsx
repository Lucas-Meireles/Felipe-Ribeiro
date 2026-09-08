import { useEffect, useState } from 'react';
import './style.css';

const WA_PHONE = '5511944548048';


const TATUAPE_ZONE = {
  name: 'Tatuapé',
  lat: -23.5407,
  lon: -46.5764,
  radiusKm: 1.8,
};

const distanceInKm = (lat1, lon1, lat2, lon2) => {
  const toRadians = (value) => (value * Math.PI) / 180;
  const earthRadius = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return 2 * earthRadius * Math.asin(Math.sqrt(a));
};

const isTatuapeLocation = ({ latitude, longitude, accuracy = 0 }) => {
  const numericAccuracy = Number(accuracy);
  // Só bloqueamos quando a posição é suficientemente precisa.
  // Em caso de baixa precisão, liberamos para evitar falso positivo.
  if (!Number.isFinite(numericAccuracy) || numericAccuracy > 250) return false;

  return (
    distanceInKm(latitude, longitude, TATUAPE_ZONE.lat, TATUAPE_ZONE.lon) <=
    TATUAPE_ZONE.radiusKm
  );
};

export default function App() {
  const [regionalAccess, setRegionalAccess] = useState({
    status: 'checking',
    city: '',
    error: '',
    permission: 'unknown',
  });

  useEffect(() => {
    let cancelled = false;

    const checkServerRegion = async () => {
      try {
        const response = await fetch('/api/region', {
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });

        if (!response.ok) throw new Error('region-request-failed');

        const data = await response.json();

        if (cancelled) return;

        if (data.isBot || data.ipAllowed) {
          setRegionalAccess({
            status: 'allowed',
            city: data.city || '',
            error: '',
            permission: 'unknown',
          });
          return;
        }

        if (data.needsDeviceLocation) {
          setRegionalAccess({
            status: 'needs-location',
            city: data.city || '',
            error: '',
            permission: 'unknown',
          });
          return;
        }

        // Em qualquer falha/indefinição, priorizamos a disponibilidade
        // nacional. O bloqueio só acontece após confirmação precisa do Tatuapé.
        setRegionalAccess({
          status: 'allowed',
          city: data.city || '',
          error: '',
          permission: 'unknown',
        });
      } catch {
        if (cancelled) return;

        setRegionalAccess({
          status: 'allowed',
          city: '',
          error: '',
          permission: 'unknown',
        });
      }
    };

    checkServerRegion();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const body = document.body;
    const loader = document.getElementById('loader');
    const header = document.getElementById('siteHeader');
    const menuButton = document.getElementById('menuButton');
    const mobileTheme = document.getElementById('mobileTheme');
    const themeToggle = document.getElementById('themeToggle');
    const contactForm = document.getElementById('contactForm');

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
  }, [regionalAccess.status]);

  const requestDeviceLocation = async () => {
    if (!('geolocation' in navigator)) {
      // A localização é um reforço para confirmar o Tatuapé, nunca um
      // requisito para o restante do território nacional.
      setRegionalAccess({
        status: 'allowed',
        city: '',
        error: '',
        permission: 'unsupported',
      });
      return;
    }

    try {
      if (navigator.permissions?.query) {
        const permission = await navigator.permissions.query({ name: 'geolocation' });

        if (permission.state === 'denied') {
          // Sem confirmação do Tatuapé, não bloqueamos um visitante brasileiro.
          setRegionalAccess({
            status: 'allowed',
            city: '',
            error: '',
            permission: 'denied',
          });
          return;
        }
      }
    } catch {
      // Alguns navegadores não expõem Permissions API para geolocation.
    }

    setRegionalAccess((current) => ({
      ...current,
      status: 'locating',
      permission: 'prompt',
      error: '',
    }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        if (isTatuapeLocation({ latitude, longitude, accuracy })) {
          setRegionalAccess({
            status: 'denied',
            city: 'Tatuapé',
            error: 'O acesso não está disponível nesta área.',
            permission: 'granted',
          });
          return;
        }

        setRegionalAccess({
          status: 'allowed',
          city: '',
          error: '',
          permission: 'granted',
        });
      },
      (error) => {
        // Falha de localização não deve impedir o acesso nacional.
        setRegionalAccess({
          status: 'allowed',
          city: '',
          error: '',
          permission: error?.code === error.PERMISSION_DENIED ? 'denied' : 'unknown',
        });
      },
      {
        enableHighAccuracy: true,
        maximumAge: 300000,
        timeout: 12000,
      }
    );
  };

  const openLocationHelp = () => {
    window.alert(
      'A localização é usada apenas para confirmar se o dispositivo está dentro da área restrita do Tatuapé. Se o navegador não puder informar a posição, o acesso nacional continua liberado.'
    );
  };

  const regionalGateVisible = regionalAccess.status !== 'allowed';
  const regionalGateCopy = {
    checking: {
      eyebrow: 'VERIFICAÇÃO DE ACESSO',
      title: 'Confirmando o acesso.',
      body: 'Estamos verificando rapidamente a região de acesso.',
    },
    'needs-location': {
      eyebrow: 'VERIFICAÇÃO DE ÁREA',
      title: 'Só precisamos confirmar uma coisa.',
      body: 'O atendimento está disponível em todo o Brasil. A localização é solicitada apenas para confirmar se o dispositivo está dentro da área restrita do Tatuapé.',
    },
    locating: {
      eyebrow: 'VERIFICAÇÃO DE ÁREA',
      title: 'Só um instante.',
      body: 'Estamos confirmando sua localização com precisão. Isso leva apenas alguns segundos.',
    },
    denied: {
      eyebrow: 'ACESSO RESTRITO',
      title: 'Esta área não está disponível.',
      body: 'O acesso não está disponível para dispositivos identificados dentro da área restrita do Tatuapé.',
    },
    error: {
      eyebrow: 'VERIFICAÇÃO DE ÁREA',
      title: 'Não foi possível confirmar a localização.',
      body: 'Sem uma confirmação precisa do Tatuapé, o acesso nacional permanece liberado.',
    },
    'permission-blocked': {
      eyebrow: 'VERIFICAÇÃO DE ÁREA',
      title: 'Localização indisponível.',
      body: 'Não foi possível confirmar a área restrita. O acesso nacional permanece liberado.',
    },
  }[regionalAccess.status] || {};

  return (
    <>
      <div
        aria-hidden={!regionalGateVisible}
        className={`regional-gate ${regionalGateVisible ? 'is-visible' : ''}`}
        role={regionalGateVisible ? 'dialog' : undefined}
        aria-modal={regionalGateVisible ? 'true' : undefined}
      >
        <div className="regional-gate-glow" aria-hidden="true" />
        <div className="regional-gate-inner">
          <p className="regional-gate-eyebrow">
            {regionalGateCopy.eyebrow}
          </p>
          <span className="regional-gate-rule" aria-hidden="true" />
          <h1>{regionalGateCopy.title}</h1>
          <p className="regional-gate-body">
            {regionalGateCopy.body}
          </p>

          {regionalAccess.city && regionalAccess.status === 'needs-location' && (
            <p className="regional-gate-detected">
              Localização de rede identificada como <strong>{regionalAccess.city}</strong>.
            </p>
          )}

          {regionalAccess.error && (
            <p className="regional-gate-error">
              {regionalAccess.error}
            </p>
          )}

          {(regionalAccess.status === 'needs-location' ||
            regionalAccess.status === 'error' ||
            regionalAccess.status === 'denied') && (
            <button
              className="regional-gate-button"
              type="button"
              onClick={requestDeviceLocation}
            >
              Confirmar minha localização
              <span aria-hidden="true">↗</span>
            </button>
          )}

          {regionalAccess.status === 'permission-blocked' && (
            <div className="regional-gate-actions">
              <button
                className="regional-gate-button"
                type="button"
                onClick={openLocationHelp}
              >
                Como liberar a localização
                <span aria-hidden="true">?</span>
              </button>
              <button
                className="regional-gate-secondary"
                type="button"
                onClick={requestDeviceLocation}
              >
                Já liberei, tentar novamente
              </button>
            </div>
          )}

          {regionalAccess.status === 'locating' && (
            <div className="regional-gate-loading" aria-live="polite">
              <span />
              Verificando localização…
            </div>
          )}

          <footer className="regional-gate-footer">
            Felipe Ribeiro · Advogado
          </footer>
        </div>
      </div>

      {regionalAccess.status === 'allowed' && (
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
            FELIPE VINICIUS SANTANA RIBEIRO
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
            Conheça algumas das frentes de atuação criminal. O atendimento é direcionado conforme as particularidades de cada situação.
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
            <div class="practice-detail">
             <span>
              01 / 06
             </span>
             <p>
              ATUAÇÃO CRIMINAL
             </p>
            </div>
           </div>
           <div class="practice-current">
            <span class="practice-current-label">
             ÁREA EM FOCO
            </span>
            <h3 id="practiceTitle">
             Prisão em flagrante
            </h3>
            <p id="practiceDescription">
             Atuação desde os primeiros momentos da ocorrência e acompanhamento das medidas cabíveis.
            </p>
           </div>
           <div aria-label="Áreas de atuação" class="practice-list" role="list">
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
          Felipe Vinicius Santana Ribeiro. Todos os direitos reservados.
         </p>
        </footer>
      ` }} />
      )}
    </>
  );
}
