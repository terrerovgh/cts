/**
 * CUBA TATTOO STUDIO - TRANSITION MANAGER
 * 
 * Maneja transiciones globales entre secciones para crear una experiencia
 * cinematográfica fluida inspirada en GTA VI.
 * 
 * Características:
 * - Transiciones fade/wipe entre secciones
 * - Cambios de color de fondo sincronizados
 * - Efectos de overlay para dramatic transitions
 * - Performance optimizado con GSAP
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class TransitionManager {
  constructor() {
    this.overlay = null;
    this.currentSection = '';
    this.transitions = [];
    this.init();
  }
  
  init() {
    this.createOverlay();
    this.setupDefaultTransitions();
    this.setupScrollTriggers();
  }
  
  createOverlay() {
    // Create transition overlay element
    this.overlay = document.createElement('div');
    this.overlay.id = 'transition-overlay';
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
      z-index: 9998;
      pointer-events: none;
      opacity: 0;
      transform: translateX(-100%);
    `;
    document.body.appendChild(this.overlay);
  }
  
  setupDefaultTransitions() {
    this.transitions = [
      {
        trigger: '#video_scrub_01',
        backgroundFrom: '#000000',
        backgroundTo: '#1a1a1a',
        transitionType: 'fade',
        duration: 1.2
      },
      {
        trigger: '#gallery',
        backgroundFrom: '#1a1a1a',
        backgroundTo: '#ffffff',
        transitionType: 'wipe',
        duration: 1.0
      },
      {
        trigger: '#servicios',
        backgroundFrom: '#ffffff',
        backgroundTo: '#000000',
        transitionType: 'slide',
        duration: 0.8
      },
      {
        trigger: '#tatuadores',
        backgroundFrom: '#000000',
        backgroundTo: '#111111',
        transitionType: 'fade',
        duration: 1.0
      },
      {
        trigger: '#testimonios',
        backgroundFrom: '#111111',
        backgroundTo: '#ffffff',
        transitionType: 'wipe',
        duration: 1.0
      },
      {
        trigger: '#contacto',
        backgroundFrom: '#ffffff',
        backgroundTo: '#000000',
        transitionType: 'fade',
        duration: 0.8
      }
    ];
  }
  
  setupScrollTriggers() {
    this.transitions.forEach((transition, index) => {
      const section = document.querySelector(transition.trigger);
      
      if (!section) {
        console.warn(`Section not found: ${transition.trigger}`);
        return;
      }
      
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        onEnter: () => this.executeTransition(transition, 'enter'),
        onLeave: () => this.executeTransition(transition, 'leave'),
        onEnterBack: () => this.executeTransition(transition, 'enterBack'),
        onLeaveBack: () => this.executeTransition(transition, 'leaveBack'),
        // markers: true, // Debug - remove in production
      });
    });
  }
  
  executeTransition(transition, direction) {
    if (!this.overlay) return;
    
    const isEntering = direction === 'enter' || direction === 'enterBack';
    const backgroundColor = isEntering ? transition.backgroundTo : transition.backgroundFrom;
    
    // Update page background
    this.updatePageBackground(backgroundColor);
    
    // Execute transition effect
    switch (transition.transitionType) {
      case 'fade':
        this.executeFadeTransition(transition, isEntering);
        break;
      case 'wipe':
        this.executeWipeTransition(transition, isEntering);
        break;
      case 'slide':
        this.executeSlideTransition(transition, isEntering);
        break;
    }
    
    // Update current section
    if (isEntering) {
      this.currentSection = transition.trigger;
    }
  }
  
  updatePageBackground(color) {
    gsap.to(document.body, {
      backgroundColor: color,
      duration: 0.8,
      ease: 'power2.inOut'
    });
  }
  
  executeFadeTransition(transition, isEntering) {
    const tl = gsap.timeline();
    
    if (isEntering) {
      tl.to(this.overlay, {
        opacity: 0.3,
        duration: 0.2,
        ease: 'power1.in'
      })
      .to(this.overlay, {
        opacity: 0,
        duration: transition.duration || 1.0,
        ease: 'power2.out'
      });
    }
  }
  
  executeWipeTransition(transition, isEntering) {
    if (!this.overlay) return;
    
    const tl = gsap.timeline();
    
    if (isEntering) {
      // Wipe in from left
      gsap.set(this.overlay, { 
        transform: 'translateX(-100%)', 
        opacity: 1,
        background: `linear-gradient(90deg, ${transition.backgroundTo} 0%, ${transition.backgroundFrom} 100%)`
      });
      
      tl.to(this.overlay, {
        transform: 'translateX(0%)',
        duration: (transition.duration || 1.0) * 0.6,
        ease: 'power2.inOut'
      })
      .to(this.overlay, {
        transform: 'translateX(100%)',
        duration: (transition.duration || 1.0) * 0.4,
        ease: 'power2.in'
      });
    }
  }
  
  executeSlideTransition(transition, isEntering) {
    if (!this.overlay) return;
    
    const tl = gsap.timeline();
    
    if (isEntering) {
      // Slide curtain effect
      gsap.set(this.overlay, { 
        transform: 'translateY(-100%)', 
        opacity: 1,
        background: transition.backgroundTo
      });
      
      tl.to(this.overlay, {
        transform: 'translateY(0%)',
        duration: (transition.duration || 0.8) * 0.5,
        ease: 'power2.out'
      })
      .to(this.overlay, {
        transform: 'translateY(100%)',
        duration: (transition.duration || 0.8) * 0.5,
        ease: 'power2.in'
      });
    }
  }
  
  // Public methods for manual control
  triggerManualTransition(fromSection, toSection) {
    const transition = this.transitions.find(t => t.trigger === toSection);
    if (transition) {
      this.executeTransition(transition, 'enter');
    }
  }
  
  addCustomTransition(transition) {
    this.transitions.push(transition);
    this.setupScrollTriggers(); // Re-setup triggers
  }
  
  getCurrentSection() {
    return this.currentSection;
  }
  
  // Cleanup method
  destroy() {
    if (this.overlay) {
      this.overlay.remove();
    }
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.id?.includes('transition')) {
        trigger.kill();
      }
    });
  }
}

// Export singleton instance
export const transitionManager = new TransitionManager();

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎬 Transition Manager initialized');
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  transitionManager.destroy();
});

export default TransitionManager;
