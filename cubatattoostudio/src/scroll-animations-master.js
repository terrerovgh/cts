/**
 * SCROLL ANIMATIONS MASTER
 * Sistema principal de animaciones GSAP para Cuba Tattoo Studio
 * Basado en el plan de scroll-animation-plan.md
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

// Registrar plugins
gsap.registerPlugin(ScrollTrigger, Observer);

// Variables globales
let isAnimating = false;
let currentSection = 0;
const totalSections = 8; // Hero, Gallery, Services, Artists (4), Testimonials, Contact

/**
 * INIT SYSTEM - Inicializar todo el sistema de animaciones
 */
export function initScrollAnimations() {
  console.log('🎬 Inicializando sistema de animaciones GSAP...');
  
  // Configuración global de GSAP
  gsap.config({
    autoSleep: 60,
    force3D: true,
    nullTargetWarn: false
  });

  // ScrollTrigger configuración global
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
  });

  // Inicializar componentes
  initHeroAdvanced();
  initGalleryScroll();
  initHorizontalArtistSections();
  initTestimonialsScroll();
  initBackgroundTransitions();
  initObserver();

  console.log('✅ Sistema de animaciones GSAP inicializado');
}

/**
 * HERO ADVANCED - Animación estilo GTA VI
 */
function initHeroAdvanced() {
  console.log('🎯 Configurando Hero Advanced...');

  const heroSection = document.querySelector('#video_scrub_01');
  if (!heroSection) return;

  const video = document.querySelector('#hero-video');
  const initialContent = document.querySelector('#hero-initial');
  const maskedText = document.querySelector('#hero-masked-text');
  const finalContent = document.querySelector('#hero-final');
  const dateBox = document.querySelector('#date-box');
  const logoVI = document.querySelector('#logo-vi');

  // Timeline principal del hero
  const heroTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: self => {
        // Sync video con scroll si existe
        if (video && video.duration) {
          video.currentTime = video.duration * self.progress;
        }
      }
    }
  });

  // Fase 1: Fadeout contenido inicial (0% - 20%)
  heroTimeline.to(initialContent, {
    opacity: 0,
    scale: 0.8,
    duration: 0.2,
    ease: "power2.out"
  });

  // Fase 2: Aparición del texto maskeado gigante (20% - 60%)
  heroTimeline.to(maskedText, {
    opacity: 1,
    scale: 1,
    duration: 0.4,
    ease: "power2.inOut"
  }, 0.2);

  // Fase 3: Transformación a contenido final (60% - 100%)
  heroTimeline.to(maskedText, {
    opacity: 0,
    scale: 0.5,
    duration: 0.2,
    ease: "power2.in"
  }, 0.6);

  heroTimeline.to(finalContent, {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: "power2.out"
  }, 0.7);

  // Animación especial del date box (aparece como cajita)
  heroTimeline.to(dateBox, {
    height: "auto",
    duration: 0.1,
    ease: "power2.out"
  }, 0.8);

  // Logo VI final reveal
  heroTimeline.to(logoVI, {
    opacity: 1,
    scale: 1,
    rotationY: 0,
    duration: 0.2,
    ease: "back.out(1.7)"
  }, 0.9);

  // Partículas flotantes parallax
  gsap.to('.particle', {
    y: -200,
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: "none",
    stagger: 0.5
  });

  // Ink splatters animados
  gsap.to('.ink-splatter', {
    scale: 1.2,
    opacity: 0.4,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 1
  });
}

/**
 * GALLERY SCROLL - Scroll infinito con GSAP Observer
 */
function initGalleryScroll() {
  console.log('🖼️ Configurando Gallery Scroll...');

  const gallery = document.querySelector('#gallery');
  if (!gallery) return;

  // Implementar scroll infinito horizontal aquí
  // Pendiente: crear componente Gallery mejorado
}

/**
 * HORIZONTAL ARTIST SECTIONS - Scroll horizontal por artista
 */
function initHorizontalArtistSections() {
  console.log('👨‍🎨 Configurando secciones horizontales de artistas...');

  const artists = ['david', 'juan', 'karli', 'nina'];
  
  artists.forEach((artist, index) => {
    const section = document.querySelector(`#artist-${artist}`);
    if (!section) return;

    // ScrollTrigger horizontal para cada artista
    gsap.to(section.querySelector('.artist-content-wrapper'), {
      x: () => -(section.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "center center",
        end: () => "+=" + section.scrollWidth,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // Efectos por artista según plan
    initArtistEffects(artist, section);
  });
}

/**
 * ARTIST EFFECTS - Efectos específicos por artista
 */
function initArtistEffects(artist, section) {
  switch(artist) {
    case 'david':
      // Realismo: efectos de profundidad y zoom
      gsap.to(section.querySelectorAll('.artwork'), {
        scale: 1.1,
        rotation: 2,
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: true
        },
        stagger: 0.1
      });
      break;

    case 'juan':
      // Tradicional: efectos vintage y sepia
      gsap.to(section, {
        filter: 'sepia(0.3) contrast(1.1)',
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });
      break;

    case 'karli':
      // Geométrico: efectos de formas y patrones
      gsap.to(section.querySelectorAll('.geometric-shape'), {
        rotation: 360,
        scale: 1.2,
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: true
        },
        stagger: 0.2
      });
      break;

    case 'nina':
      // Minimalista: efectos sutiles y elegantes
      gsap.to(section.querySelectorAll('.minimal-element'), {
        opacity: 0.8,
        y: -20,
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: true
        },
        stagger: 0.05
      });
      break;
  }
}

/**
 * TESTIMONIALS SCROLL - Scroll suave para testimoniales
 */
function initTestimonialsScroll() {
  console.log('💬 Configurando Testimonials Scroll...');

  const testimonials = document.querySelector('#testimonials');
  if (!testimonials) return;

  // Animaciones de entrada para testimoniales
  gsap.fromTo(testimonials.querySelectorAll('.testimonial-card'), {
    y: 100,
    opacity: 0,
    scale: 0.9
  }, {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: testimonials,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    }
  });
}

/**
 * BACKGROUND TRANSITIONS - Transiciones de fondo dinámicas
 */
function initBackgroundTransitions() {
  console.log('🎨 Configurando Background Transitions...');

  const sections = [
    { id: 'video_scrub_01', bg: 'from-black via-gray-900 to-black' },
    { id: 'gallery', bg: 'from-white via-gray-100 to-white' },
    { id: 'services', bg: 'from-gray-900 via-black to-gray-900' },
    { id: 'artist-david', bg: 'from-red-900 via-black to-red-900' },
    { id: 'artist-juan', bg: 'from-amber-900 via-black to-amber-900' },
    { id: 'artist-karli', bg: 'from-purple-900 via-black to-purple-900' },
    { id: 'artist-nina', bg: 'from-blue-900 via-black to-blue-900' },
    { id: 'testimonials', bg: 'from-gray-800 via-black to-gray-800' },
    { id: 'contact', bg: 'from-black via-gray-900 to-black' }
  ];

  sections.forEach((section, index) => {
    const element = document.querySelector(`#${section.id}`);
    if (!element) return;

    ScrollTrigger.create({
      trigger: element,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => updateBackgroundGradient(section.bg),
      onEnterBack: () => updateBackgroundGradient(section.bg)
    });
  });
}

/**
 * UPDATE BACKGROUND GRADIENT
 */
function updateBackgroundGradient(gradient) {
  const body = document.body;
  gsap.to(body, {
    background: `linear-gradient(135deg, ${gradient.replace('from-', '').replace('via-', ', ').replace('to-', ', ')})`,
    duration: 1,
    ease: "power2.inOut"
  });
}

/**
 * OBSERVER - Control de navegación por secciones
 */
function initObserver() {
  console.log('👀 Configurando Observer...');

  let isScrolling = false;

  Observer.create({
    type: "wheel,touch,pointer",
    wheelSpeed: -1,
    onDown: () => !isScrolling && navigateSection('down'),
    onUp: () => !isScrolling && navigateSection('up'),
    tolerance: 10,
    preventDefault: true
  });
}

/**
 * NAVIGATE SECTION - Navegación suave entre secciones
 */
function navigateSection(direction) {
  if (isAnimating) return;

  const sections = [
    '#video_scrub_01', '#gallery', '#services', 
    '#artist-david', '#artist-juan', '#artist-karli', '#artist-nina',
    '#testimonials', '#contact'
  ];

  if (direction === 'down' && currentSection < sections.length - 1) {
    currentSection++;
  } else if (direction === 'up' && currentSection > 0) {
    currentSection--;
  } else {
    return;
  }

  isAnimating = true;

  gsap.to(window, {
    scrollTo: { y: sections[currentSection], offsetY: 0 },
    duration: 1.2,
    ease: "power2.inOut",
    onComplete: () => {
      isAnimating = false;
    }
  });
}

/**
 * REFRESH - Recalcular todas las animaciones
 */
export function refreshScrollAnimations() {
  ScrollTrigger.refresh();
}

/**
 * KILL - Destruir todas las animaciones
 */
export function killScrollAnimations() {
  ScrollTrigger.killAll();
  Observer.getAll().forEach(o => o.kill());
}

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}
