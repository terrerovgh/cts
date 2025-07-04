// Script reutilizable para scroll horizontal de artistas
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export class HorizontalScrollArtist {
  constructor(containerId, sectionSelector) {
    this.containerId = containerId;
    this.sectionSelector = sectionSelector;
    this.init();
  }

  init() {
    gsap.registerPlugin(ScrollTrigger);
    
    const horizontalContainer = document.querySelector(this.containerId);
    if (!horizontalContainer) return;

    const workItems = gsap.utils.toArray('.work-item');
    if (workItems.length === 0) return;

    this.setupHorizontalScroll(horizontalContainer, workItems);
    this.setupWorkItemAnimations(workItems);
    this.setupVideoInteractions(workItems);
  }

  setupHorizontalScroll(container, workItems) {
    const totalWidth = workItems.length * 400; // 400px por item + gap
    
    gsap.set(container, {
      width: totalWidth + 'px'
    });

    // Animación de scroll horizontal principal
    this.horizontalTween = gsap.to(container, {
      x: () => -(totalWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: this.sectionSelector,
        start: "top bottom",
        end: () => "+=" + totalWidth,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: self => this.updateScrollProgress(self.progress)
      }
    });
  }

  setupWorkItemAnimations(workItems) {
    workItems.forEach((item, index) => {
      // Animación de entrada con efecto stagger
      gsap.fromTo(item, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotationY: 45
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "left 90%",
          end: "left 10%",
          scrub: true,
          horizontal: true,
          onEnter: () => item.classList.add('revealing')
        }
      });

      // Animación de parallax individual
      const media = item.querySelector('.work-media');
      if (media) {
        gsap.to(media, {
          scale: 1.1,
          scrollTrigger: {
            trigger: item,
            start: "left right",
            end: "right left",
            scrub: true,
            horizontal: true
          }
        });
      }
    });
  }

  setupVideoInteractions(workItems) {
    workItems.forEach(item => {
      const workMedia = item.querySelector('.work-media');
      
      if (workMedia?.tagName === 'VIDEO') {
        const videoEl = workMedia;
        
        // Configurar video para loop infinito
        videoEl.loop = true;
        videoEl.muted = true;
        
        // Hover interactions
        item.addEventListener('mouseenter', () => {
          videoEl.currentTime = 0;
          videoEl.play().catch(e => console.log('Video play failed:', e));
          
          // Efecto de brillo en hover
          gsap.to(videoEl, {
            filter: 'brightness(1.2) contrast(1.1) saturate(1.1)',
            duration: 0.3
          });
        });
        
        item.addEventListener('mouseleave', () => {
          videoEl.pause();
          
          // Restaurar filtros
          gsap.to(videoEl, {
            filter: 'brightness(0.8) contrast(1.2)',
            duration: 0.3
          });
        });

        // Reproducir video cuando esté en viewport durante scroll
        ScrollTrigger.create({
          trigger: item,
          start: "left center",
          end: "right center",
          horizontal: true,
          onEnter: () => {
            if (!item.matches(':hover')) {
              videoEl.currentTime = 0;
              videoEl.play().catch(e => console.log('Auto play failed:', e));
            }
          },
          onLeave: () => {
            if (!item.matches(':hover')) {
              videoEl.pause();
            }
          }
        });
      }
    });
  }

  updateScrollProgress(progress) {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
      gsap.set(progressBar, {
        scaleY: progress
      });
    }
  }

  // Método para destruir las animaciones (útil para cleanup)
  destroy() {
    if (this.horizontalTween) {
      this.horizontalTween.kill();
    }
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === this.sectionSelector) {
        trigger.kill();
      }
    });
  }
}

// Función helper para inicializar scroll horizontal de artista
export function initArtistHorizontalScroll(artistName) {
  const containerId = `#${artistName}-works-container`;
  const sectionSelector = `.horizontal-section-container`;
  
  return new HorizontalScrollArtist(containerId, sectionSelector);
}

// Función para crear indicador de progreso
export function createScrollProgressIndicator() {
  const progressHTML = `
    <div class="scroll-progress">
      <div class="scroll-progress-bar"></div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', progressHTML);
}
