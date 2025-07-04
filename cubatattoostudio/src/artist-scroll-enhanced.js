/**
 * Enhanced Artist Horizontal Scroll with GSAP
 * Advanced effects for Cuba Tattoo Studio artist sections
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(ScrollTrigger, Observer);

class ArtistScrollManager {
  constructor() {
    this.artists = [];
    this.currentArtist = 0;
    this.isTransitioning = false;
    this.observers = new Map();
    
    this.init();
  }
  
  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupArtists();
      this.createScrollTriggers();
      this.setupColorTransitions();
    });
  }
  
  setupArtists() {
    const artistSections = document.querySelectorAll('.artist-section');
    
    artistSections.forEach((section, index) => {
      const artistData = {
        element: section,
        id: section.id,
        index: index,
        accentColor: section.dataset.accentColor || '#ffd700',
        video: section.querySelector('.artist-video'),
        works: section.querySelectorAll('.work-item'),
        horizontalContent: section.querySelector('.horizontal-content'),
        progressBar: section.querySelector('.progress-bar')
      };
      
      this.artists.push(artistData);
      this.setupArtistSection(artistData);
    });
  }
  
  setupArtistSection(artist) {
    const { element, works, horizontalContent, video, progressBar } = artist;
    
    // Setup video scrubbing if video exists
    if (video) {
      this.setupVideoScrubbing(artist);
    }
    
    // Setup horizontal scroll for works
    if (horizontalContent && works.length > 0) {
      this.setupHorizontalScroll(artist);
    }
    
    // Setup reveal animations
    this.setupRevealAnimations(artist);
    
    // Setup work item interactions
    this.setupWorkInteractions(artist);
  }
  
  setupVideoScrubbing(artist) {
    const { video, element } = artist;
    
    let targetTime = 0;
    let currentTime = 0;
    let rafId = null;
    
    // Smooth video scrubbing function
    function updateVideoTime() {
      currentTime = gsap.utils.interpolate(currentTime, targetTime, 0.1);
      if (video && video.duration) {
        video.currentTime = Math.min(currentTime, video.duration - 0.1);
      }
      
      if (Math.abs(currentTime - targetTime) > 0.01) {
        rafId = requestAnimationFrame(updateVideoTime);
      }
    }
    
    // Video scrubbing on scroll
    ScrollTrigger.create({
      trigger: element.querySelector('.artist-intro'),
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        if (video && video.readyState >= 2) { // Video has loaded metadata
          targetTime = self.progress * (video.duration - 0.1);
          
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(updateVideoTime);
        }
      },
      onLeave: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      onEnterBack: () => {
        if (!rafId && video && video.readyState >= 2) {
          rafId = requestAnimationFrame(updateVideoTime);
        }
      }
    });
    
    // Play video on hover (optional)
    if (video) {
      video.addEventListener('mouseenter', () => {
        if (video.paused) video.play().catch(() => {});
      });
      
      video.addEventListener('mouseleave', () => {
        video.pause();
      });
    }
  }
  
  setupHorizontalScroll(artist) {
    const { horizontalContent, works, progressBar, element } = artist;
    
    // Calculate total scroll width
    const scrollWidth = horizontalContent.scrollWidth - horizontalContent.clientWidth;
    
    // Horizontal scroll animation
    const horizontalTween = gsap.to(horizontalContent, {
      x: -scrollWidth,
      ease: 'none',
      duration: 1
    });
    
    // ScrollTrigger for horizontal scroll
    ScrollTrigger.create({
      trigger: element.querySelector('.horizontal-section'),
      start: 'top bottom',
      end: () => `+=${window.innerHeight * 1.5}`,
      animation: horizontalTween,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Update progress bar
        if (progressBar) {
          gsap.to(progressBar, {
            width: `${self.progress * 100}%`,
            duration: 0.1,
            ease: 'none'
          });
        }
        
        // Parallax effect on work items
        works.forEach((work, index) => {
          const workProgress = Math.max(0, Math.min(1, 
            (self.progress * works.length) - index
          ));
          
          const image = work.querySelector('.work-media');
          const overlay = work.querySelector('.work-overlay');
          
          if (image) {
            gsap.to(image, {
              scale: 1 + workProgress * 0.1,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
          
          if (overlay) {
            gsap.to(overlay, {
              opacity: 0.7 + workProgress * 0.3,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });
      }
    });
    
    // Individual work item animations
    works.forEach((work, index) => {
      const image = work.querySelector('.work-media');
      const overlay = work.querySelector('.work-overlay');
      const number = work.querySelector('.work-number');
      
      // Entrance animation
      gsap.fromTo(work, 
        { 
          opacity: 0, 
          y: 50, 
          scale: 0.9 
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: work,
            start: 'left right',
            end: 'right left',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Stagger effect based on scroll progress
      ScrollTrigger.create({
        trigger: element.querySelector('.horizontal-section'),
        start: 'top center',
        end: 'bottom center',
        onUpdate: (self) => {
          const stagger = index * 0.1;
          const delayedProgress = Math.max(0, self.progress - stagger);
          
          if (number) {
            gsap.to(number, {
              opacity: delayedProgress,
              y: -delayedProgress * 20,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        }
      });
    });
  }
  
  setupRevealAnimations(artist) {
    const { element } = artist;
    
    // Artist intro reveal
    const introElements = element.querySelectorAll('.fade-in-artist');
    
    gsap.fromTo(introElements, 
      { 
        opacity: 0, 
        y: 60,
        stagger: 0.2 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: element.querySelector('.artist-intro'),
          start: 'top 80%',
          end: 'center center',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // Section header reveal
    const header = element.querySelector('.section-header');
    if (header) {
      gsap.fromTo(header,
        { 
          opacity: 0, 
          scale: 0.9 
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: header,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }
  
  setupWorkInteractions(artist) {
    const { works, accentColor } = artist;
    
    works.forEach((work) => {
      const image = work.querySelector('.work-media');
      const overlay = work.querySelector('.work-overlay');
      const number = work.querySelector('.work-number');
      
      // Enhanced hover effects
      work.addEventListener('mouseenter', () => {
        gsap.to(work, {
          scale: 1.05,
          rotation: Math.random() * 4 - 2, // Random slight rotation
          duration: 0.4,
          ease: 'power2.out'
        });
        
        if (image) {
          gsap.to(image, {
            scale: 1.1,
            filter: 'brightness(1.1) contrast(1.2)',
            duration: 0.4,
            ease: 'power2.out'
          });
        }
        
        if (number) {
          gsap.to(number, {
            color: accentColor,
            scale: 1.2,
            textShadow: `0 0 20px ${accentColor}`,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
        
        // Play video if it's a video element
        if (image && image.tagName === 'VIDEO') {
          image.play().catch(() => {
            // Ignore play errors
          });
        }
      });
      
      work.addEventListener('mouseleave', () => {
        gsap.to(work, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
        
        if (image) {
          gsap.to(image, {
            scale: 1,
            filter: 'brightness(0.8) contrast(1.1)',
            duration: 0.4,
            ease: 'power2.out'
          });
        }
        
        if (number) {
          gsap.to(number, {
            color: '#ffffff',
            scale: 1,
            textShadow: '3px 3px 8px rgba(0,0,0,0.9)',
            duration: 0.3,
            ease: 'power2.out'
          });
        }
        
        // Pause video if it's a video element
        if (image && image.tagName === 'VIDEO') {
          image.pause();
        }
      });
      
      // Click handler for lightbox (to be implemented)
      work.addEventListener('click', () => {
        console.log('Work item clicked:', work.dataset.workIndex);
        // TODO: Implement lightbox functionality
      });
    });
  }
  
  setupColorTransitions() {
    // Create smooth color transitions between artist sections
    this.artists.forEach((artist, index) => {
      const { element, accentColor } = artist;
      
      ScrollTrigger.create({
        trigger: element,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          this.transitionToArtist(index);
        },
        onEnterBack: () => {
          this.transitionToArtist(index);
        }
      });
    });
  }
  
  transitionToArtist(index) {
    if (this.isTransitioning || this.currentArtist === index) return;
    
    this.isTransitioning = true;
    this.currentArtist = index;
    
    const artist = this.artists[index];
    if (!artist) return;
    
    const { accentColor } = artist;
    
    // Transition background color
    gsap.to('body', {
      backgroundColor: this.lightenColor(accentColor, 0.95),
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        this.isTransitioning = false;
      }
    });
    
    // Update CSS custom properties for accent color
    document.documentElement.style.setProperty('--artist-accent', accentColor);
  }
  
  lightenColor(color, amount) {
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.min(255, Math.floor((num >> 16) + amount * 255));
    const g = Math.min(255, Math.floor(((num >> 8) & 0x00FF) + amount * 255));
    const b = Math.min(255, Math.floor((num & 0x0000FF) + amount * 255));
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  // Public methods for external control
  goToArtist(index) {
    if (index >= 0 && index < this.artists.length) {
      const artist = this.artists[index];
      artist.element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
  
  getCurrentArtist() {
    return this.currentArtist;
  }
  
  // Cleanup method
  destroy() {
    this.observers.forEach(observer => observer.kill());
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger && trigger.vars.trigger.closest && trigger.vars.trigger.closest('.artist-section')) {
        trigger.kill();
      }
    });
  }
}

// Initialize when DOM is ready
export default ArtistScrollManager;

// Auto-initialize if not imported as module
if (typeof window !== 'undefined') {
  window.ArtistScrollManager = new ArtistScrollManager();
}
