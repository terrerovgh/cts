// Script simplificado para animaciones de scroll horizontal
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin
gsap.registerPlugin(ScrollTrigger);

console.log('GSAP artist-animations.js cargado');

// Función principal para inicializar todas las animaciones de artistas
export function initArtistAnimations() {
  console.log('🎨 Inicializando animaciones de artistas...');

  // Esperar a que el DOM esté completamente listo
  setTimeout(() => {
    // Configurar cada artista
    const artistIds = ['juan', 'david', 'nina', 'karli'];
    const accentColors = {
      'juan': '#ff6b35',
      'david': '#8b5cf6', 
      'nina': '#10b981',
      'karli': '#f59e0b'
    };

    artistIds.forEach(artistId => {
      const artistSection = document.querySelector(`#artist-${artistId}`);
      if (artistSection) {
        console.log(`📝 Configurando ${artistId}...`);
        setupArtist(artistId, accentColors[artistId]);
      } else {
        console.log(`❌ No se encontró la sección para ${artistId}`);
      }
    });

    // Refrescar después de configurar todo
    setTimeout(() => {
      ScrollTrigger.refresh();
      console.log('🔄 ScrollTrigger refrescado');
    }, 1000);
  }, 500);
}

function setupArtist(artistId, accentColor) {
  const artistSection = document.querySelector(`#artist-${artistId}`);
  const horizontalSection = document.querySelector(`#horizontal-${artistId}`);
  const horizontalContent = document.querySelector(`#${artistId}-works`);
  const workItems = document.querySelectorAll(`#artist-${artistId} .work-item`);
  const video = document.getElementById(`video-${artistId}`);

  console.log(`🔍 Elementos para ${artistId}:`, {
    section: !!artistSection,
    horizontal: !!horizontalSection, 
    content: !!horizontalContent,
    items: workItems.length,
    video: !!video
  });

  // 1. Video scrubbing
  if (video) {
    video.addEventListener('loadedmetadata', () => {
      console.log(`🎬 Video cargado para ${artistId}`);
      
      ScrollTrigger.create({
        trigger: artistSection.querySelector('.artist-intro'),
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        onUpdate: function(self) {
          if (video.duration) {
            video.currentTime = self.progress * video.duration;
          }
        }
      });
    });
  }

  // 2. Scroll horizontal SIMPLIFICADO
  if (horizontalSection && horizontalContent && workItems.length > 0) {
    console.log(`🏃 Configurando scroll horizontal para ${artistId}`);

    // Calcular distancia de scroll
    const scrollDistance = horizontalContent.scrollWidth - window.innerWidth;
    
    if (scrollDistance > 0) {
      // Animación de scroll horizontal
      gsap.to(horizontalContent, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSection,
          start: "top top",
          end: `bottom -${scrollDistance}px`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onToggle: function(self) {
            console.log(`🎯 Scroll horizontal ${self.isActive ? 'activado' : 'desactivado'} para ${artistId}`);
          }
        }
      });

      // 3. Animaciones de elementos individuales
      workItems.forEach((item, index) => {
        const media = item.querySelector('.work-media');
        
        // Efecto hover simple
        item.addEventListener('mouseenter', () => {
          gsap.to(item, { scale: 1.05, duration: 0.3 });
          if (media && media.tagName === 'VIDEO') {
            media.play().catch(() => {});
          }
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, { scale: 1, duration: 0.3 });
          if (media && media.tagName === 'VIDEO') {
            media.pause();
          }
        });
      });
    }
  }

  // 4. Animaciones de entrada para la intro
  const fadeElements = artistSection.querySelectorAll('.fade-in-artist');
  fadeElements.forEach((el, i) => {
    gsap.fromTo(el, 
      { opacity: 0, y: 50 }, 
      {
        opacity: 1, 
        y: 0,
        duration: 1,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: artistSection.querySelector('.artist-intro'),
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // 5. Color de acento
  if (accentColor) {
    const style = document.createElement('style');
    style.textContent = `
      #artist-${artistId} .accent-color { color: ${accentColor} !important; }
      #artist-${artistId} .work-item:hover .work-number { color: ${accentColor} !important; }
    `;
    document.head.appendChild(style);
  }

  console.log(`✅ ${artistId} configurado correctamente`);
}
