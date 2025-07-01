# Cuba Tattoo Studio Website

Este repositorio contiene el código fuente de Cuba Tattoo Studio, una web one-page inmersiva construida con [Astro](https://astro.build/), Tailwind CSS y GSAP. El objetivo es lograr una experiencia cinemática inspirada en GTA VI, con animaciones avanzadas, scrubbing de video, parallax y transiciones suaves.

## Setup

```bash
cd cubatattoostudio
npm install
npm run dev
```

Para crear un build de producción y previsualizarlo localmente:

```bash
npm run build
npm run preview
```

### Estructura y Modularidad

- Todas las secciones principales están implementadas como componentes Astro independientes:
  - Hero, Galería, Servicios, Tatuadores (uno por artista), Testimonios, Contacto, Footer.
- El layout global gestiona navegación fija, scroll suave y animaciones centralizadas.
- Para agregar un nuevo artista, crea un componente en `src/components/` siguiendo el patrón de los existentes y añádelo en la sección de Tatuadores en `index.astro`.

### Logotipo y Marca

- El logotipo oficial (`logo.png`) está disponible en `public/assets/logo.png` y se utiliza en el header, hero y footer para máxima coherencia visual y de marca.

### Accesibilidad y Optimización

- El sitio es responsive y optimizado para móviles.
- Se han seguido buenas prácticas de accesibilidad (a11y): contraste alto, navegación por teclado, textos alternativos y animaciones adaptadas a `prefers-reduced-motion`.
- Imágenes y videos usan lazy loading y formatos modernos.

### Animaciones y Experiencia

- GSAP + ScrollTrigger controlan animaciones de entrada, parallax, scrubbing de video y transiciones globales.
- El sistema de animaciones es centralizado y fácil de mantener.
- Se ha añadido una transición global tipo overlay (wipe/fade) entre secciones para una experiencia narrativa más fluida.

### Documentación y Tareas

- El avance, plan técnico y tasklist están en `/doc/Plan.md`.
- Cambios y versiones en `cubatattoostudio/CHANGELOG.md`.

### Assets

Los archivos binarios (videos, imágenes) no están en el repo. Coloca tu propio `hero.mp4` en `cubatattoostudio/public/assets/` antes de correr el servidor de desarrollo o build.
