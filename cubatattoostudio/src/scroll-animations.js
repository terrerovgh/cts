import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Fade-in y slide-up para elementos con .fade-in
export function fadeInAnimations() {
  gsap.utils.toArray('.fade-in').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 30%',
          toggleActions: 'play reverse play reverse',
          scrub: 0.5,
        }
      }
    );
  });
}

// Parallax para elementos con .parallax
export function parallaxAnimations() {
  gsap.utils.toArray('.parallax').forEach(el => {
    gsap.to(el, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  });
}

// Fade in/out de secciones completas
export function sectionFadeAnimations() {
  gsap.utils.toArray('.section').forEach(section => {
    gsap.fromTo(section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play reverse play reverse',
          scrub: 0.5,
        }
      }
    );
    gsap.to(section, {
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: 'bottom 30%',
        end: 'bottom top',
        toggleActions: 'play reverse play reverse',
        scrub: 0.5,
      }
    });
  });
}

// Transición global tipo overlay (wipe/fade) entre secciones
export function globalOverlayTransition() {
  // Respetar prefers-reduced-motion
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let overlay = document.getElementById('global-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'global-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'black';
    overlay.style.zIndex = 9999;
    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = 0;
    overlay.style.transition = 'opacity 0.3s';
    document.body.appendChild(overlay);
  }
  if (reduceMotion) {
    overlay.style.display = 'none';
    return;
  } else {
    overlay.style.display = 'block';
  }
  // Para cada sección, animar overlay al entrar/salir
  gsap.utils.toArray('.section').forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 90%',
      end: 'top 10%',
      onEnter: () => {
        gsap.to(overlay, { opacity: 0.7, duration: 0.25, ease: 'power1.in' });
        gsap.to(overlay, { opacity: 0, duration: 0.4, delay: 0.18, ease: 'power1.out' });
      },
      onLeaveBack: () => {
        gsap.to(overlay, { opacity: 0.7, duration: 0.25, ease: 'power1.in' });
        gsap.to(overlay, { opacity: 0, duration: 0.4, delay: 0.18, ease: 'power1.out' });
      },
    });
  });
}

// Inicializador global
export function initScrollAnimations() {
  fadeInAnimations();
  parallaxAnimations();
  sectionFadeAnimations();
  globalOverlayTransition();
}
