// Sistema de scroll suave optimizado para el proyecto
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugins
gsap.registerPlugin(ScrollTrigger);

class SmoothScrollManager {
  constructor() {
    this.lenis = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    
    console.log('🚀 Inicializando Lenis Smooth Scroll...');
    
    // Configurar Lenis
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
      smooth: true,
      smoothTouch: false, // Deshabilitar en móvil para mejor UX
      direction: 'vertical',
      gestureDirection: 'vertical',
      mouseMultiplier: 1,
      touchMultiplier: 2,
      wheelMultiplier: 1,
      normalizeWheel: true
    });

    // Loop de animación
    const raf = (time) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Sincronizar con ScrollTrigger
    this.lenis.on('scroll', (e) => {
      ScrollTrigger.update();
    });

    // Configurar ScrollTrigger para usar Lenis
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          this.lenis.scrollTo(value, { immediate: true });
        }
        return this.lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      }
    });

    // Optimizaciones de rendimiento
    gsap.ticker.lagSmoothing(0);
    
    // Refrescar ScrollTrigger cuando cambie el tamaño
    window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
    });

    this.isInitialized = true;
    console.log('✅ Lenis Smooth Scroll inicializado correctamente');
  }

  // Método para scrollear a una sección específica
  scrollTo(target, options = {}) {
    if (!this.lenis) return;
    
    const defaultOptions = {
      offset: 0,
      duration: 1.5,
      easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    };
    
    this.lenis.scrollTo(target, { ...defaultOptions, ...options });
  }

  // Pausar/reanudar scroll
  pause() {
    if (this.lenis) this.lenis.stop();
  }

  resume() {
    if (this.lenis) this.lenis.start();
  }

  // Destruir instancia
  destroy() {
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
      this.isInitialized = false;
    }
  }
}

// Instancia global
const smoothScroll = new SmoothScrollManager();

// Exportar funciones públicas
export const initSmoothScroll = () => smoothScroll.init();
export const scrollToSection = (target, options) => smoothScroll.scrollTo(target, options);
export const pauseScroll = () => smoothScroll.pause();
export const resumeScroll = () => smoothScroll.resume();
export const destroyScroll = () => smoothScroll.destroy();

// Auto-inicializar después del preloader
export default smoothScroll;
