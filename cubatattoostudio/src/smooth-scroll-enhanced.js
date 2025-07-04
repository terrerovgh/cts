/**
 * Enhanced Smooth Scroll System
 * Implementación cinematográfica basada en scroll-animation-plan.md
 * Integra perfectamente con GSAP ScrollTrigger para animaciones fluidas
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class SmoothScrollManager {
  constructor() {
    this.lenis = null;
    this.rafId = null;
    this.isInitialized = false;
    this.scrollVelocity = 0;
    this.lastScrollTime = 0;
    this.scrollEffects = [];
    
    this.init();
  }
  
  async init() {
    if (typeof window === 'undefined') return;
    
    // Intentar cargar Lenis dinámicamente, si no funciona usar smooth nativo mejorado
    try {
      const { default: Lenis } = await import('lenis');
      this.setupLenis(Lenis);
    } catch (error) {
      console.log('Lenis no disponible, usando scroll cinematográfico nativo');
      this.setupCinematicNativeSmooth();
    }
    
    this.setupScrollEffects();
    this.setupScrollTriggerIntegration();
    
    this.isInitialized = true;
    console.log('🎬 Enhanced Cinematic Scroll inicializado');
  }
  
  setupCinematicNativeSmooth() {
    // Configurar scroll cinematográfico sin dependencias externas
    document.documentElement.style.scrollBehavior = 'smooth';
    document.documentElement.style.webkitOverflowScrolling = 'touch';
    
    // Variables para smooth scroll manual
    let isScrolling = false;
    let scrollTarget = 0;
    let currentScroll = 0;
    
    // Interceptar eventos de scroll para suavizado manual
    let ticking = false;
    
    const smoothScrollStep = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const delta = scrollTarget - currentScroll;
          currentScroll += delta * 0.1; // Factor de suavizado
          
          // Calcular velocidad para efectos
          const now = performance.now();
          this.scrollVelocity = Math.abs(delta) / (now - this.lastScrollTime || 1);
          this.lastScrollTime = now;
          
          // Aplicar efectos de parallax sutil
          this.applyScrollEffects(currentScroll, this.scrollVelocity);
          
          if (Math.abs(delta) > 0.1) {
            smoothScrollStep();
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Listener para scroll nativo
    let wheelTimeout;
    window.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      scrollTarget += e.deltaY * 0.8; // Factor de scroll
      scrollTarget = Math.max(0, Math.min(scrollTarget, document.body.scrollHeight - window.innerHeight));
      
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        window.scrollTo(0, scrollTarget);
      }, 10);
      
      smoothScrollStep();
    }, { passive: false });
  }
  
  setupLenis(Lenis) {
    // Configuración cinematográfica de Lenis inspirada en GTA VI
    this.lenis = new Lenis({
      duration: 1.4, // Más lento para efecto cinematográfico
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing cinematográfico
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.2, // Más sensible para control preciso
      smoothTouch: false, // Desactivar en móvil para rendimiento
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
      syncTouch: false
    });
    
    // Integración con ScrollTrigger según el plan
    this.lenis.on('scroll', (e) => {
      this.scrollVelocity = Math.abs(e.velocity);
      this.applyScrollEffects(e.scroll, e.velocity);
      ScrollTrigger.update();
    });
    
    // Loop de animación
    const raf = (time) => {
      this.lenis.raf(time);
      this.rafId = requestAnimationFrame(raf);
    };
    this.rafId = requestAnimationFrame(raf);
  }
  
  setupScrollEffects() {
    // Efectos de scroll cinematográfico
    this.createParallaxEffects();
    this.createRevealAnimations();
    this.createVelocityEffects();
    this.createDepthEffects();
  }
  
  createParallaxEffects() {
    // Parallax sutil en elementos de fondo según el plan
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      
      ScrollTrigger.create({
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: self => {
          const y = self.progress * speed * 100;
          gsap.set(element, { 
            yPercent: -y,
            ease: 'none'
          });
        }
      });
    });
  }
  
  createRevealAnimations() {
    // Animaciones de reveal cinematográficas
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    revealElements.forEach(element => {
      const direction = element.dataset.reveal || 'up';
      const distance = parseInt(element.dataset.revealDistance) || 60;
      const delay = parseFloat(element.dataset.revealDelay) || 0;
      
      let fromVars = { opacity: 0 };
      
      switch (direction) {
        case 'up':
          fromVars.y = distance;
          break;
        case 'down':
          fromVars.y = -distance;
          break;
        case 'left':
          fromVars.x = distance;
          break;
        case 'right':
          fromVars.x = -distance;
          break;
        case 'scale':
          fromVars.scale = 0.8;
          break;
      }
      
      gsap.fromTo(element, fromVars, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        delay: delay,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }
  
  createVelocityEffects() {
    // Efectos basados en velocidad de scroll (inspirado en GTA VI)
    const velocityElements = document.querySelectorAll('[data-velocity-effect]');
    
    velocityElements.forEach(element => {
      const effect = element.dataset.velocityEffect;
      const intensity = parseFloat(element.dataset.velocityIntensity) || 1;
      
      ScrollTrigger.create({
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: () => {
          const velocity = this.scrollVelocity * intensity;
          
          switch (effect) {
            case 'blur':
              gsap.set(element, { 
                filter: `blur(${Math.min(velocity * 2, 8)}px)`,
                duration: 0.1
              });
              break;
            case 'scale':
              gsap.set(element, { 
                scale: 1 + (velocity * 0.02),
                duration: 0.1
              });
              break;
            case 'skew':
              gsap.set(element, { 
                skewY: velocity * 0.5,
                duration: 0.1
              });
              break;
          }
        }
      });
    });
  }
  
  createDepthEffects() {
    // Efectos de profundidad cinematográfica
    const depthLayers = document.querySelectorAll('[data-depth]');
    
    depthLayers.forEach(layer => {
      const depth = parseFloat(layer.dataset.depth) || 1;
      
      ScrollTrigger.create({
        trigger: layer,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: self => {
          const progress = self.progress;
          const transform = progress * depth * 50;
          
          gsap.set(layer, {
            transform: `translate3d(0, ${transform}px, 0)`,
            opacity: 1 - (progress * 0.3)
          });
        }
      });
    });
  }
  
  applyScrollEffects(scroll, velocity) {
    // Aplicar efectos dinámicos durante el scroll
    const normalizedVelocity = Math.min(Math.abs(velocity) / 10, 1);
    
    // Efecto de motion blur en el cursor
    document.body.style.setProperty('--scroll-velocity', normalizedVelocity);
    
    // Efecto de distorsión en elementos sensibles
    const sensitiveElements = document.querySelectorAll('.scroll-sensitive');
    sensitiveElements.forEach(element => {
      const distortion = normalizedVelocity * 2;
      element.style.filter = `blur(${distortion}px) brightness(${1 - distortion * 0.1})`;
    });
  }
  
  setupScrollTriggerIntegration() {
    // Integración perfecta con ScrollTrigger como en el plan
    if (this.lenis) {
      // Si tenemos Lenis, usar su scroll
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          return arguments.length ? this.lenis.scrollTo(value) : this.lenis.scroll;
        },
        getBoundingClientRect() {
          return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        }
      });
    }
    
    // Actualizar ScrollTrigger en resize
    ScrollTrigger.addEventListener('refresh', () => this.lenis?.resize());
    ScrollTrigger.refresh();
  }
  
  // Métodos públicos para controlar el scroll
  scrollTo(target, options = {}) {
    if (this.lenis) {
      this.lenis.scrollTo(target, options);
    } else {
      // Fallback nativo
      const element = typeof target === 'string' ? document.querySelector(target) : target;
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          ...options
        });
      }
    }
  }
  
  pause() {
    if (this.lenis) {
      this.lenis.stop();
    }
  }
  
  resume() {
    if (this.lenis) {
      this.lenis.start();
    }
  }
  
  destroy() {
    if (this.lenis) {
      this.lenis.destroy();
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    
    // Limpiar ScrollTriggers relacionados
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.id && trigger.vars.id.includes('smooth-scroll')) {
        trigger.kill();
      }
    });
    
    console.log('🎬 Smooth Scroll Manager destruido');
  }
}

// Instancia global
let smoothScrollManager = null;

// Función de inicialización
export function initSmoothScroll() {
  if (!smoothScrollManager) {
    smoothScrollManager = new SmoothScrollManager();
  }
  return smoothScrollManager;
}

// Exportar clase para uso avanzado
export { SmoothScrollManager };

// Auto-inicializar si no se importa como módulo
if (typeof window !== 'undefined' && !window.smoothScrollManager) {
  window.smoothScrollManager = initSmoothScroll();
}
