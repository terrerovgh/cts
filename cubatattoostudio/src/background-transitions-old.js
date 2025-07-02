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
        z-index: -1;
        overflow: hidden;
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
        type: 'gradient',
        value: 'linear-gradient(45deg, #0a0a0a 0%, #2a2a2a 50%, #0a0a0a 100%)',
        overlay: 'linear-gradient(90deg, rgba(255, 215, 0, 0.03) 0%, transparent 50%, rgba(255, 215, 0, 0.03) 100%)'
      },
      'artist-juan': {
        type: 'gradient',
        value: 'linear-gradient(225deg, #1a0a0a 0%, #3a1a1a 50%, #1a0a0a 100%)',
        overlay: 'radial-gradient(circle at 80% 20%, rgba(255, 69, 0, 0.1) 0%, transparent 60%)'
      },
      'artist-david': {
        type: 'gradient',
        value: 'linear-gradient(315deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a1a 100%)',
        overlay: 'radial-gradient(circle at 20% 80%, rgba(138, 92, 246, 0.1) 0%, transparent 60%)'
      },
      'artist-nina': {
        type: 'gradient',
        value: 'linear-gradient(135deg, #1a0a1a 0%, #3a1a3a 50%, #1a0a1a 100%)',
        overlay: 'radial-gradient(circle at 60% 40%, rgba(236, 72, 153, 0.1) 0%, transparent 60%)'
      },
      'artist-karli': {
        type: 'gradient',
        value: 'linear-gradient(45deg, #0a1a0a 0%, #1a3a1a 50%, #0a1a0a 100%)',
        overlay: 'radial-gradient(circle at 40% 60%, rgba(34, 197, 94, 0.1) 0%, transparent 60%)'
      },
      'servicios': {
        type: 'gradient',
        value: 'linear-gradient(180deg, #1a1a0a 0%, #3a3a1a 50%, #1a1a0a 100%)',
        overlay: 'linear-gradient(45deg, rgba(255, 215, 0, 0.05) 0%, transparent 50%)'
      },
      'testimonios': {
        type: 'gradient',
        value: 'linear-gradient(270deg, #0a1a1a 0%, #1a3a3a 50%, #0a1a1a 100%)',
        overlay: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 70%)'
      },
      'contacto': {
        type: 'gradient',
        value: 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)',
        overlay: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%)'
      }
    };
    
    // Create background elements for each section
    sections.forEach((section, index) => {
      const sectionId = section.id;
      const bgConfig = sectionBackgrounds[sectionId] || sectionBackgrounds['contacto']; // fallback
      
      // Main background
      const bgElement = document.createElement('div');
      bgElement.className = `bg-image bg-image-${index} absolute inset-0 w-full h-full`;
      bgElement.style.background = bgConfig.value;
      bgElement.style.opacity = index === 0 ? '1' : '0';
      bgElement.style.transition = 'opacity 0.8s ease-in-out';
      
      // Overlay background
      if (bgConfig.overlay) {
        const overlayElement = document.createElement('div');
        overlayElement.className = `bg-overlay bg-overlay-${index} absolute inset-0 w-full h-full`;
        overlayElement.style.background = bgConfig.overlay;
        overlayElement.style.opacity = index === 0 ? '1' : '0';
        overlayElement.style.transition = 'opacity 1s ease-in-out';
        overlayElement.style.mixBlendMode = 'overlay';
        
        this.bgContainer.appendChild(overlayElement);
      }
      
      this.bgContainer.appendChild(bgElement);
      
      this.backgrounds.push({
        element: bgElement,
        overlay: bgConfig.overlay ? this.bgContainer.querySelector(`.bg-overlay-${index}`) : null,
        section: section,
        index: index,
        config: bgConfig
      });
    });
  }
  
  createScrollTriggers() {
    this.backgrounds.forEach((bg, index) => {
      ScrollTrigger.create({
        trigger: bg.section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => this.changeBackground(index),
        onEnterBack: () => this.changeBackground(index)
      });
    });
  }
  
  changeBackground(index) {
    if (this.isTransitioning || this.currentBg === index) return;
    
    this.isTransitioning = true;
    const newBg = this.backgrounds[index];
    
    if (!newBg) {
      this.isTransitioning = false;
      return;
    }
    
    // Animate out current backgrounds
    this.backgrounds.forEach((bg, i) => {
      if (i !== index) {
        gsap.to(bg.element, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut'
        });
        
        if (bg.overlay) {
          gsap.to(bg.overlay, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut'
          });
        }
      }
    });
    
    // Animate in new background
    gsap.to(newBg.element, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        this.currentBg = index;
        this.isTransitioning = false;
      }
    });
    
    if (newBg.overlay) {
      gsap.to(newBg.overlay, {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
        delay: 0.2
      });
    }
    
    // Update CSS custom properties for current accent color
    this.updateAccentColor(newBg.section);
    
    // Emit custom event for other components
    document.dispatchEvent(new CustomEvent('backgroundChanged', {
      detail: { 
        index, 
        sectionId: newBg.section.id,
        config: newBg.config 
      }
    }));
  }
  
  updateAccentColor(section) {
    const accentColor = section.dataset.accentColor;
    if (accentColor) {
      document.documentElement.style.setProperty('--current-accent', accentColor);
    }
  }
  
  // Public methods
  goToBackground(index) {
    if (index >= 0 && index < this.backgrounds.length) {
      this.changeBackground(index);
    }
  }
  
  getCurrentBackground() {
    return this.currentBg;
  }
  
  // Add particle effects (optional enhancement)
  addParticleEffects() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container absolute inset-0 pointer-events-none';
    particleContainer.style.zIndex = '-5';
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle absolute rounded-full bg-white bg-opacity-10';
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // Animate particle
      gsap.to(particle, {
        y: '-100vh',
        x: Math.sin(i) * 100,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        ease: 'none',
        delay: Math.random() * 10
      });
      
      particleContainer.appendChild(particle);
    }
    
    this.bgContainer.appendChild(particleContainer);
  }
  
  // Cleanup method
  destroy() {
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger?.tagName === 'SECTION') {
        trigger.kill();
      }
    });
    
    if (this.bgContainer) {
      this.bgContainer.remove();
    }
  }
}

// Initialize when DOM is ready
export default BackgroundTransitionManager;

// Auto-initialize if not imported as module
if (typeof window !== 'undefined') {
  window.backgroundManager = new BackgroundTransitionManager();
}
