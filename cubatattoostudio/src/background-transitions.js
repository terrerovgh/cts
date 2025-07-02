/**
 * Sistema de transiciones de fondo dinámicas entre secciones
 * Implementación completa basada en scroll-animation-plan.md
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class BackgroundTransitionManager {
  constructor() {
    this.backgrounds = [];
    this.currentBg = null;
    this.isInitialized = false;
    this.sections = [];
    this.bgContainer = null;
    
    this.init();
  }
  
  init() {
    if (typeof window === 'undefined') return;
    
    document.addEventListener('DOMContentLoaded', () => {
      this.setupBackgrounds();
      this.setupSectionTriggers();
      this.isInitialized = true;
      console.log('🎨 Background Transition Manager inicializado');
    });
  }
  
  setupBackgrounds() {
    // Crear contenedor de fondos si no existe
    let bgContainer = document.querySelector('.bg-container');
    if (!bgContainer) {
      bgContainer = document.createElement('div');
      bgContainer.className = 'bg-container';
      bgContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -10;
        overflow: hidden;
        pointer-events: none;
      `;
      document.body.appendChild(bgContainer);
    }
    this.bgContainer = bgContainer;
    
    // Definir fondos para cada sección según el plan
    const backgroundConfig = [
      {
        section: 'hero',
        type: 'gradient',
        style: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
        overlay: 'rgba(0, 0, 0, 0.3)',
        effects: 'contrast(1.1) brightness(0.9)'
      },
      {
        section: 'gallery', 
        type: 'gradient',
        style: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #e9ecef 100%)',
        overlay: 'rgba(255, 255, 255, 0.1)',
        effects: 'brightness(1.05) contrast(1.02)'
      },
      {
        section: 'servicios',
        type: 'gradient', 
        style: 'linear-gradient(135deg, #212529 0%, #343a40 50%, #495057 100%)',
        overlay: 'rgba(0, 0, 0, 0.2)',
        effects: 'contrast(1.15) saturate(0.9)'
      },
      {
        section: 'testimonios',
        type: 'gradient',
        style: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #e9ecef 100%)', 
        overlay: 'rgba(0, 0, 0, 0.05)',
        effects: 'brightness(1.02) sepia(0.1)'
      },
      {
        section: 'contacto',
        type: 'gradient',
        style: 'linear-gradient(135deg, #000000 0%, #212529 50%, #000000 100%)',
        overlay: 'rgba(0, 0, 0, 0.4)',
        effects: 'contrast(1.2) brightness(0.85)'
      }
    ];
    
    // Crear elementos de fondo
    backgroundConfig.forEach((config, index) => {
      const bgElement = document.createElement('div');
      bgElement.className = `bg-layer bg-${config.section}`;
      bgElement.dataset.section = config.section;
      bgElement.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${config.style};
        opacity: ${index === 0 ? 1 : 0};
        transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: opacity, filter;
        filter: ${config.effects};
      `;
      
      // Añadir overlay si está definido
      if (config.overlay) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${config.overlay};
          backdrop-filter: blur(0.5px);
        `;
        bgElement.appendChild(overlay);
      }
      
      bgContainer.appendChild(bgElement);
      this.backgrounds.push({
        element: bgElement,
        config: config,
        isActive: index === 0
      });
    });
    
    this.currentBg = this.backgrounds[0];
  }
  
  setupSectionTriggers() {
    // Obtener todas las secciones principales
    const sectionSelectors = ['#hero', '#gallery', '#servicios', '#testimonios', '#contacto'];
    
    sectionSelectors.forEach((selector, index) => {
      const section = document.querySelector(selector);
      if (!section) {
        console.warn(`Sección no encontrada: ${selector}`);
        return;
      }
      
      this.sections.push(section);
      
      // Crear ScrollTrigger para cada sección según el plan
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%', // Cambia cuando la sección alcanza la mitad de la pantalla
        end: 'bottom 50%',
        onEnter: () => this.changeBackground(index),
        onEnterBack: () => this.changeBackground(index),
        markers: false, // Cambiar a true para debugging
        id: `bg-trigger-${index}`
      });
    });
  }
  
  changeBackground(index) {
    if (!this.backgrounds[index] || this.backgrounds[index].isActive) return;
    
    const targetBg = this.backgrounds[index];
    const currentSection = targetBg.config.section;
    
    console.log(`🎨 Cambiando a fondo: ${currentSection}`);
    
    // Timeline para transición suave según el plan
    const tl = gsap.timeline();
    
    // Fade out todos los fondos activos
    this.backgrounds.forEach(bg => {
      if (bg.isActive) {
        bg.isActive = false;
        tl.to(bg.element, {
          opacity: 0,
          duration: 0.5,
          ease: 'power1.out'
        }, 0);
      }
    });
    
    // Fade in el nuevo fondo con duración más larga para suavidad
    tl.to(targetBg.element, {
      opacity: 1,
      duration: 0.8,
      ease: 'power1.out',
      onStart: () => {
        targetBg.isActive = true;
        this.currentBg = targetBg;
      }
    }, 0.2); // Pequeño retraso para crossfade
    
    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent('backgroundChanged', {
      detail: { 
        section: currentSection, 
        index: index,
        background: targetBg.config 
      }
    }));
  }
  
  // Método público para cambiar fondo manualmente
  goToSection(sectionName) {
    const index = this.backgrounds.findIndex(bg => bg.config.section === sectionName);
    if (index !== -1) {
      this.changeBackground(index);
    }
  }
  
  // Método para obtener el fondo actual
  getCurrentBackground() {
    return this.currentBg?.config.section || null;
  }
  
  // Cleanup
  destroy() {
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.id && trigger.vars.id.includes('bg-trigger')) {
        trigger.kill();
      }
    });
    
    if (this.bgContainer) {
      this.bgContainer.remove();
    }
    
    console.log('🎨 Background Transition Manager destruido');
  }
}

// Instancia global
let backgroundManager = null;

// Función de inicialización
export function initBackgroundTransitions() {
  if (!backgroundManager) {
    backgroundManager = new BackgroundTransitionManager();
  }
  return backgroundManager;
}

// Exportar clase para uso avanzado  
export { BackgroundTransitionManager };

// Auto-inicializar si no se importa como módulo
if (typeof window !== 'undefined' && !window.backgroundTransitionManager) {
  window.backgroundTransitionManager = initBackgroundTransitions();
}
