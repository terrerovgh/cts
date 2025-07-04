# Changelog

## [0.6.0] - 2025-07-01

### Added

- **Componente ArtistBase.astro**: Creado componente reutilizable y modular que encapsula toda la lógica de scroll horizontal, animaciones y layout para las secciones de artistas.
- **Sistema de colores de acento personalizables**: Cada artista puede tener su propio color de acento que se aplica dinámicamente.
- **Barras de progreso visuales**: Indicadores de progreso personalizados para cada sección de scroll horizontal.
- **Animaciones mejoradas de reveal**: Sistema de revelado progresivo de elementos durante el scroll horizontal.
- **Efectos de video interactivos**: Videos que se reproducen automáticamente al hacer hover y durante las animaciones.
- **Estadísticas dinámicas**: Información visual sobre número de trabajos y años de experiencia por artista.

### Changed

- **Refactorización completa de componentes de artistas**: Todos los componentes (ArtistJuan, ArtistDavid, ArtistNina, ArtistKarli) ahora usan el componente base ArtistBase.astro para máxima reutilización y consistencia.
- **Eliminación de código duplicado**: Centralizada toda la lógica de scroll horizontal y animaciones en un solo componente.
- **Mejores props tipados**: Sistema de tipos TypeScript mejorado para props de artistas.
- **Optimización de rendimiento**: Reducido el JavaScript duplicado y mejoradas las animaciones GSAP.

### Technical Details

- Creado `/src/components/ArtistBase.astro` como componente central
- Actualizado `/src/styles/horizontal-scroll.css` con estilos globales optimizados
- Migrados todos los componentes de artistas para usar la nueva arquitectura modular
- Implementado sistema de colores dinámicos con CSS custom properties

## [0.5.0] - 2025-07-01

### Added

- Implementado scroll horizontal con GSAP ScrollTrigger para cada sección de artista, basado en el patrón de CodePen.
- Cada artista ahora tiene una galería horizontal con fotos y videos de sus trabajos.
- Efectos interactivos: videos se reproducen al hacer hover y durante el scroll.
- Sistema modular de scroll horizontal reutilizable (`horizontal-scroll-artist.js`).
- Estilos globales optimizados para scroll horizontal (`horizontal-scroll.css`).
- Animaciones de entrada con efectos 3D y parallax individual por elemento.
- Indicador de progreso visual para las secciones de scroll horizontal.
- Efectos de hover mejorados con transformaciones y filtros de video.

### Changed

- Actualizada la estructura de props de artistas: `imagenes` ahora es `trabajos` con soporte para imágenes y videos.
- Mejorados los efectos visuales y transiciones en todas las secciones de artistas.
- Optimizado el rendimiento del scroll con `will-change` y `transform3d`.

## [0.4.0] - 2025-07-01

### Added

- Integrados los componentes de artistas (Juan, David, Nina, Karli) en la página principal.
- Secciones nuevas: Servicios, Testimonios, Contacto y Footer implementadas como componentes modulares.
- Mejoradas las transiciones globales y animaciones GSAP centralizadas.
- Optimización para móviles y mejoras de accesibilidad (a11y).


## [0.3.0] - 2025-07-01

### Added

- Galería section with GSAP scroll animations.
- Instructions in README for adding external media assets.
- Ignored public assets directory to avoid committing binaries.


## [0.2.0] - 2025-07-01

### Added

- Hero component with background video and preloader animation using GSAP.
- Navigation links in layout header.
- Small placeholder video asset for the hero section.


## [0.1.0] - 2025-07-01

### Added

- Initialized Astro project structure manually.
- Installed dependencies: Astro, Tailwind integration, GSAP.
- Added basic layout and homepage.
