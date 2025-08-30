/* ===============================================
   MODERN DEVELOPER PORTFOLIO - JAVASCRIPT
   =============================================== */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() { // Espera a que el HTML esté parseado (sin requerir imágenes/recursos)
    // Initialize all functionality
    initializeApp(); // Llama a la función principal que inicia todas las características
});

// Main initialization function
function initializeApp() { // Función orquestadora de la app
    // Core functionality
    initLoader();           // Inicializa la pantalla de carga
    initThemeToggle();      // Activa el botón para cambiar de tema (claro/oscuro)
    initMobileMenu();       // Controla el menú móvil (hamburguesa)
    initSmoothScrolling();  // Activa el desplazamiento suave al hacer clic en anclas
    initActiveNavigation(); // Sincroniza el estado activo del menú con la sección visible
    initScrollEffects();    // Efecto parallax en el hero

    // Interactive features
    initSkillBars();        // Anima las barras de habilidades al entrar en viewport
    initPortfolioFilters(); // Filtra proyectos por categoría
    initContactForm();      // Maneja estado y “envío” del formulario de contacto
    initBackToTop();        // Muestra/oculta botón “volver arriba” y su acción
    initTypingEffect();     // Efecto de tipeo en el subtítulo del hero
    initScrollAnimations(); // Animaciones al hacer scroll usando IntersectionObserver

    // Performance optimizations
    initLazyLoading();      // Carga diferida (lazy) de imágenes con data-src

    console.log('Portfolio initialized successfully! 🚀'); // Mensaje de depuración en consola
}

/* ===============================================
   LOADING SCREEN
   =============================================== */

function initLoader() { // Controla el loader inicial
    const loader = document.getElementById('loader'); // Obtiene el contenedor del loader por id

    // Hide loader after page load
    window.addEventListener('load', () => { // Espera a que TODO (incluidas imágenes) haya cargado
        setTimeout(() => { // Retrasa para asegurar al menos 1s de loader visible
            loader.classList.add('hidden'); // Agrega clase que lo desvanece (CSS)
            document.body.style.overflow = 'visible'; // Rehabilita el scroll del body

            // Remove loader from DOM after transition
            setTimeout(() => { // Espera a que termine la transición de opacidad
                if (loader) { // Verifica que exista
                    loader.remove(); // Elimina el elemento del DOM
                }
            }, 500); // Coincide con la duración de la transición CSS
        }, 1000); // Show loader for at least 1 second
    });
}

/* ===============================================
   THEME TOGGLE
   =============================================== */

function initThemeToggle() { // Activa el cambio de tema
    const themeToggle = document.getElementById('theme-toggle'); // Botón flotante de tema
    const themeIcon = themeToggle.querySelector('i'); // Ícono dentro del botón (luna/sol)

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light'; // Lee preferencia guardada o usa 'light' por defecto
    document.documentElement.setAttribute('data-theme', currentTheme); // Aplica el tema al <html> con data-attribute
    updateThemeIcon(themeIcon, currentTheme); // Actualiza el ícono según el tema

    themeToggle.addEventListener('click', () => { // Al hacer clic en el botón
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; // Alterna tema

        // Add transition class
        document.documentElement.classList.add('theme-transition'); // Agrega clase para suavizar el cambio (si lo estilizas en CSS)

        // Apply new theme
        document.documentElement.setAttribute('data-theme', newTheme); // Cambia el atributo de tema
        localStorage.setItem('theme', newTheme); // Persiste la preferencia en localStorage
        updateThemeIcon(themeIcon, newTheme); // Cambia el ícono visual

        // Remove transition class after animation
        setTimeout(() => { // Quita la clase de transición tras 300ms
            document.documentElement.classList.remove('theme-transition'); // Limpia la clase
        }, 300);
    });
}

function updateThemeIcon(icon, theme) { // Cambia el ícono según el tema
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'; // Sol para oscuro, luna para claro
}

/* ===============================================
   MOBILE MENU
   =============================================== */

function initMobileMenu() { // Control del menú en móviles
    const menuToggle = document.getElementById('menu-toggle'); // Botón hamburguesa
    const nav = document.getElementById('nav'); // Contenedor de la navegación
    const navLinks = nav.querySelectorAll('.nav-link'); // Todos los enlaces del menú

    menuToggle.addEventListener('click', () => { // Al pulsar el botón
        nav.classList.toggle('active'); // Abre/cierra el menú (clase CSS)
        menuToggle.classList.toggle('active'); // Marca el botón como activo

        // Toggle hamburger animation
        const hamburger = menuToggle.querySelector('.hamburger'); // Línea central de la hamburguesa
        if (nav.classList.contains('active')) { // Si el menú está abierto
            hamburger.style.transform = 'rotate(45deg)'; // Rota para formar una “X” parcial
            hamburger.style.background = 'transparent'; // Oculta la barra central
        } else { // Si se cierra
            hamburger.style.transform = 'rotate(0deg)'; // Vuelve a su posición
            hamburger.style.background = 'var(--text-primary)'; // Restaura color
        }
    });

    // Close menu when clicking on nav links
    navLinks.forEach(link => { // Para cada enlace del menú
        link.addEventListener('click', () => { // Al hacer clic
            nav.classList.remove('active'); // Cierra el menú
            menuToggle.classList.remove('active'); // Quita estado activo del botón
            const hamburger = menuToggle.querySelector('.hamburger'); // Selecciona la barra
            hamburger.style.transform = 'rotate(0deg)'; // Restaura rotación
            hamburger.style.background = 'var(--text-primary)'; // Restaura color
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => { // Detecta clics globales
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) { // Si se hace clic fuera del menú y del botón
            nav.classList.remove('active'); // Cierra el menú
            menuToggle.classList.remove('active'); // Quita activo del botón
            const hamburger = menuToggle.querySelector('.hamburger'); // Barra
            hamburger.style.transform = 'rotate(0deg)'; // Restaura
            hamburger.style.background = 'var(--text-primary)'; // Restaura color
        }
    });
}

/* ===============================================
   SMOOTH SCROLLING
   =============================================== */

function initSmoothScrolling() { // Desplazamiento suave a anclas internas
    // Handle navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => { // Selecciona todos los <a> que comienzan con #
        anchor.addEventListener('click', function(e) { // Al hacer clic en un ancla
            e.preventDefault(); // Evita el salto brusco
            const target = document.querySelector(this.getAttribute('href')); // Busca el elemento objetivo por su id

            if (target) { // Si existe el destino
                const headerHeight = document.querySelector('.header').offsetHeight; // Altura del header fijo
                const targetPosition = target.offsetTop - headerHeight; // Posición ajustada para no quedar debajo del header

                window.scrollTo({ // Desplaza la ventana
                    top: targetPosition, // Hasta la posición calculada
                    behavior: 'smooth'   // Con animación suave
                });
            }
        });
    });
}

/* ===============================================
   ACTIVE NAVIGATION
   =============================================== */

function initActiveNavigation() { // Marca el enlace activo según la sección visible
    const sections = document.querySelectorAll('.section, .hero'); // Todas las secciones que cuentan para navegación
    const navLinks = document.querySelectorAll('.nav-link'); // Todos los links del menú
    const header = document.querySelector('.header'); // Header para cambiar estilo al hacer scroll

    window.addEventListener('scroll', () => { // En cada scroll
        const scrollPosition = window.scrollY + 100; // Posición actual con un offset para activar un poco antes

        // Add scrolled class to header
        if (window.scrollY > 50) { // Si se ha scrolleado más de 50px
            header.classList.add('scrolled'); // Agrega sombra/estilo de header scrolleado
        } else {
            header.classList.remove('scrolled'); // Lo quita cerca del top
        }

        // Update active navigation
        sections.forEach((section, index) => { // Recorre cada sección
            const sectionTop = section.offsetTop; // Posición superior de la sección
            const sectionHeight = section.offsetHeight; // Altura de la sección
            const sectionId = section.getAttribute('id'); // Id para enlazar con el menú

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) { // Si la sección está en viewport
                navLinks.forEach(link => link.classList.remove('active')); // Limpia estados activos
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`); // Busca el link vinculado a la sección
                if (activeLink) {
                    activeLink.classList.add('active'); // Marca ese link como activo
                }
            }
        });
    });
}

/* ===============================================
   SCROLL EFFECTS
   =============================================== */

function initScrollEffects() { // Efecto parallax simple para partículas del hero
    // Parallax effect for hero section
    const hero = document.querySelector('.hero'); // Contenedor de la sección hero
    const heroParticles = document.querySelector('.hero-particles'); // Capa de partículas

    window.addEventListener('scroll', () => { // En cada scroll
        const scrolled = window.pageYOffset; // Cantidad scrolleada desde el top
        const rate = scrolled * -0.5; // Velocidad inversa (parallax suave)

        if (heroParticles && scrolled < hero.offsetHeight) { // Solo mientras el scroll está dentro del hero
            heroParticles.style.transform = `translateY(${rate}px)`; // Mueve las partículas hacia arriba
        }
    });
}

/* ===============================================
   SKILL BARS ANIMATION
   =============================================== */

function initSkillBars() { // Anima las barras de skills al entrar al viewport
    const skillBars = document.querySelectorAll('.skill-progress'); // Todas las barras de progreso

    const animateSkillBars = () => { // Función que evalúa qué barras animar
        skillBars.forEach(bar => { // Recorre cada barra
            const skillValue = bar.getAttribute('data-skill'); // Lee el valor objetivo (porcentaje) del atributo data-skill
            const barPosition = bar.getBoundingClientRect().top; // Posición superior relativa al viewport
            const screenHeight = window.innerHeight; // Altura visible de la ventana

            if (barPosition < screenHeight - 100) { // Si la barra está lo suficientemente visible
                bar.style.width = skillValue + '%'; // Anima el ancho hasta el porcentaje
                bar.classList.add('animated'); // Marca como animada (por si quieres evitar re-animar)
            }
        });
    };

    // Initial check
    animateSkillBars(); // Ejecuta al cargar por si ya hay barras visibles

    // Check on scroll
    window.addEventListener('scroll', animateSkillBars); // Vuelve a evaluar en cada scroll
}

/* ===============================================
   PORTFOLIO FILTERS
   =============================================== */

function initPortfolioFilters() { // Filtrado de proyectos por categoría
    const filterButtons = document.querySelectorAll('.filter-btn'); // Botones de filtro
    const portfolioItems = document.querySelectorAll('.portfolio-item'); // Tarjetas de proyecto

    filterButtons.forEach(button => { // Para cada botón
        button.addEventListener('click', () => { // Al hacer clic
            const filter = button.getAttribute('data-filter'); // Lee la categoría objetivo

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active')); // Quita estado activo a todos
            button.classList.add('active'); // Activa el botón pulsado

            // Filter portfolio items
            portfolioItems.forEach(item => { // Recorre cada proyecto
                const category = item.getAttribute('data-category'); // Categoría del proyecto

                if (filter === 'all' || category === filter) { // Si coincide o es "all"
                    item.style.display = 'block'; // Asegura que se muestre
                    setTimeout(() => { // Pequeño delay para permitir transición
                        item.style.opacity = '1'; // Hace visible
                        item.style.transform = 'scale(1)'; // Escala normal
                    }, 100);
                } else { // Si no coincide
                    item.style.opacity = '0'; // Desvanece
                    item.style.transform = 'scale(0.8)'; // Reduce escala
                    setTimeout(() => { // Tras la animación
                        item.style.display = 'none'; // Lo oculta del flujo
                    }, 300);
                }
            });
        });
    });
}

// ANIMACIÓN 3D PARA LAS TARJETAS Y BOTONES

function addTiltEffect(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 10; 
      const rotateY = ((x - centerX) / centerX) * 10;

      el.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// Aplica a cards y botones
addTiltEffect('.portfolio-item');
addTiltEffect('.btn');
addTiltEffect('.skill-card');

/* ===============================================
   CONTACT FORM
   =============================================== */

function initContactForm() { // Maneja el formulario de contacto (simulado)
    const contactForm = document.getElementById('contact-form'); // Selecciona el form por id

    if (!contactForm) return; // Si no existe el form, termina

    contactForm.addEventListener('submit', async function(e) { // Al enviar el formulario
        e.preventDefault(); // Evita el envío real (para simular)
        
        const submitBtn = contactForm.querySelector('.submit-btn'); // Botón de enviar
        const originalText = submitBtn.innerHTML; // Guarda el contenido original del botón

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'; // Muestra spinner y texto
        submitBtn.disabled = true; // Deshabilita el botón para evitar reenvíos

        // Simulate form submission (replace with actual form handling)
        try {
            await simulateFormSubmission(); // Simula una espera de envío (Promise)

            // Success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje enviado!'; // Cambia a estado de éxito
            submitBtn.style.background = '#10B981'; // Verde éxito

            // Reset form
            contactForm.reset(); // Limpia los campos del formulario

            // Show success message
            showNotification('¡Mensaje enviado exitosamente!', 'success'); // Notificación visual
        } catch (error) { // Si la promesa falla
            // Error state
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Error al enviar'; // Estado de error
            submitBtn.style.background = '#EF4444'; // Rojo error

            showNotification('Error al enviar el mensaje. Intenta de nuevo.', 'error'); // Notificación de error
        }

        // Reset button after 3 seconds
        setTimeout(() => { // Pasados 3 segundos
            submitBtn.innerHTML = originalText; // Restaura el contenido original
            submitBtn.disabled = false; // Habilita nuevamente
            submitBtn.style.background = ''; // Limpia estilos inline
        }, 3000);
    });
}

function simulateFormSubmission() { // Simula un envío (Promise que se resuelve/rechaza)
    return new Promise((resolve, reject) => { // Crea nueva promesa
        setTimeout(() => { // Espera 2 segundos
            // Simulate success (90% of the time)
            Math.random() > 0.1 ? resolve() : reject(new Error('Submission failed')); // 90% éxito, 10% error
        }, 2000);
    });
}

function showNotification(message, type) { // Crea y muestra una notificación flotante
    const notification = document.createElement('div'); // Crea contenedor
    notification.className = `notification notification-${type}`; // Agrega clases semánticas
    notification.innerHTML = ` // Inserta contenido con ícono, mensaje y botón cerrar
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = ` // Estilos inline para evitar depender del CSS global
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    document.body.appendChild(notification); // Inserta la notificación al final del body

    // Animate in
    setTimeout(() => { // Después de un instante
        notification.style.transform = 'translateX(0)'; // Desliza la notificación hacia dentro
    }, 100);

    // Handle close button
    const closeBtn = notification.querySelector('.notification-close'); // Botón de cerrar
    closeBtn.style.cssText = 'background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; padding: 0; margin-left: 1rem;'; // Estilos inline del botón

    closeBtn.addEventListener('click', () => { // Al hacer clic en cerrar
        removeNotification(notification); // Quita la notificación
    });

    // Auto remove after 5 seconds
    setTimeout(() => { // Pasados 5 segundos
        removeNotification(notification); // Se cierra automáticamente
    }, 5000);
}

function removeNotification(notification) { // Oculta y elimina la notificación
    notification.style.transform = 'translateX(100%)'; // La desliza hacia afuera
    setTimeout(() => { // Espera a que termine la transición
        if (notification.parentNode) { // Si sigue en el DOM
            notification.parentNode.removeChild(notification); // Elimina el nodo
        }
    }, 300);
}

/* ===============================================
   BACK TO TOP BUTTON
   =============================================== */

function initBackToTop() { // Control del botón “volver arriba”
    const backToTopBtn = document.getElementById('back-to-top'); // Selecciona el botón

    window.addEventListener('scroll', () => { // En cada scroll
        if (window.scrollY > 500) { // Si superó 500px
            backToTopBtn.classList.add('visible'); // Muestra el botón
        } else {
            backToTopBtn.classList.remove('visible'); // Lo oculta
        }
    });

    backToTopBtn.addEventListener('click', () => { // Al hacer clic en el botón
        window.scrollTo({ // Desplaza a la parte superior
            top: 0,
            behavior: 'smooth' // Con suavidad
        });
    });
}

/* ===============================================
   TYPING EFFECT
   =============================================== */

function initTypingEffect() { // Efecto máquina de escribir en el subtítulo del hero
    const heroSubtitle = document.querySelector('.hero-subtitle'); // Selecciona el elemento de subtítulo
    if (!heroSubtitle) return; // Si no existe, termina

    const text = heroSubtitle.textContent; // (No se usa luego, pero toma el texto inicial)
    const roles = [ // Lista de frases a escribir/borrar en bucle
        'Desarrollador Full Stack',
        'Creador de Experiencias Web',
        'Solucionador de Problemas',
        'Apasionado por la Tecnología'
    ];

    let roleIndex = 0; // Índice de la frase actual
    let charIndex = 0; // Índice del carácter actual
    let isDeleting = false; // Bandera: escribiendo o borrando

    function typeWriter() { // Función recursiva que escribe/borra caracteres
        const currentRole = roles[roleIndex]; // Frase actual

        if (isDeleting) { // Si está borrando
            heroSubtitle.textContent = currentRole.substring(0, charIndex - 1); // Quita un carácter
            charIndex--; // Retrocede el índice
        } else { // Si está escribiendo
            heroSubtitle.textContent = currentRole.substring(0, charIndex + 1); // Agrega un carácter
            charIndex++; // Avanza el índice
        }

        let typeSpeed = isDeleting ? 50 : 100; // Velocidad más rápida al borrar

        if (!isDeleting && charIndex === currentRole.length) { // Si terminó de escribir la frase
            typeSpeed = 2000; // Pausa 2s
            isDeleting = true; // Comienza a borrar
        } else if (isDeleting && charIndex === 0) { // Si terminó de borrar
            isDeleting = false; // Vuelve a escribir
            roleIndex = (roleIndex + 1) % roles.length; // Avanza a la siguiente frase (cíclico)
            typeSpeed = 500; // Pequeña pausa antes de escribir
        }

        setTimeout(typeWriter, typeSpeed); // Programa la siguiente iteración
    }

    // Start typing effect after page load
    setTimeout(typeWriter, 2000); // Inicia el efecto 2s después de cargar
}

/* ===============================================
   SCROLL ANIMATIONS
   =============================================== */

function initScrollAnimations() { // Aplica animaciones cuando elementos entran al viewport
    const observerOptions = {
        threshold: 0.1,                 // Se activa cuando el 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px' // Margen inferior negativo para activar un poco antes
    };

    const observer = new IntersectionObserver((entries) => { // Crea el observador
        entries.forEach(entry => { // Revisa cada elemento observado
            if (entry.isIntersecting) { // Si es visible
                entry.target.classList.add('animate-in'); // Agrega clase que dispara la animación
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(` // Selecciona elementos a animar
        .section-header,
        .stat-item,
        .skill-item,
        .skill-card,
        .portfolio-item,
        .timeline-item,
        .contact-item
    `);

    animateElements.forEach((el, index) => { // Prepara cada elemento con estado inicial
        el.style.opacity = '0'; // Opacidad inicial 0
        el.style.transform = 'translateY(30px)'; // Desplazado hacia abajo
        el.style.transition = `all 0.6s ease ${index * 0.1}s`; // Transición con retraso escalonado
        observer.observe(el); // Comienza a observar el elemento
    });

    // Add CSS for animate-in class
    const style = document.createElement('style'); // Crea un <style> dinámico
    style.textContent = ` // Define la clase final de animación
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style); // Inserta el <style> en el <head>
}

/* ===============================================
   LAZY LOADING
   =============================================== */

function initLazyLoading() { // Carga diferida de imágenes con data-src
    const images = document.querySelectorAll('img[data-src]'); // Selecciona imágenes que tengan data-src

    if ('IntersectionObserver' in window) { // Si el navegador soporta IntersectionObserver
        const imageObserver = new IntersectionObserver((entries) => { // Crea observador para imágenes
            entries.forEach(entry => { // Para cada imagen observada
                if (entry.isIntersecting) { // Si es visible
                    const img = entry.target; // Referencia a la imagen
                    img.src = img.dataset.src; // Mueve data-src a src para cargar la imagen real
                    img.classList.remove('lazy'); // Quita clase opcional 'lazy'
                    imageObserver.unobserve(img); // Deja de observarla (ya cargó)
                }
            });
        });

        images.forEach(img => imageObserver.observe(img)); // Observa cada imagen lazy
    } else {
        // Fallback for older browsers
        images.forEach(img => { // Si no hay soporte, carga todas de una vez
            img.src = img.dataset.src; // Asigna src directamente
        });
    }
}

/* ===============================================
   UTILITY FUNCTIONS
   =============================================== */

// Debounce function for performance optimization
function debounce(func, wait, immediate) { // Limita la frecuencia de ejecución de una función
    let timeout; // Identificador del temporizador
    return function executedFunction(...args) { // Devuelve una función envolvente
        const later = () => { // Función que se ejecuta tras la espera
            timeout = null; // Limpia el timeout
            if (!immediate) func(...args); // Si no es inmediata, ejecuta al final
        };
        const callNow = immediate && !timeout; // Ejecuta de inmediato si se solicita y no hay timeout previo
        clearTimeout(timeout); // Limpia cualquier timeout previo
        timeout = setTimeout(later, wait); // Programa la ejecución diferida
        if (callNow) func(...args); // Si aplica, ejecuta ahora
    };
}

// Throttle function for scroll events
function throttle(func, limit) { // Asegura que una función no se ejecute más de una vez por intervalo
    let inThrottle; // Bandera para saber si está “acelerada”
    return function() { // Devuelve función envolvente
        const args = arguments; // Argumentos originales
        const context = this; // Contexto original
        if (!inThrottle) { // Si no está en periodo de bloqueo
            func.apply(context, args); // Ejecuta la función
            inThrottle = true; // Activa el bloqueo
            setTimeout(() => inThrottle = false, limit); // Lo desactiva tras el límite
        }
    }
}

/* ===============================================
   EASTER EGGS & FUN FEATURES
   =============================================== */

// Konami Code Easter Egg
let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Secuencia de teclas del código Konami
let konamiIndex = 0; // Posición actual dentro de la secuencia

document.addEventListener('keydown', (e) => { // Escucha las teclas presionadas
    if (e.keyCode === konamiCode[konamiIndex]) { // Si coincide la tecla con la esperada
        konamiIndex++; // Avanza en la secuencia
        if (konamiIndex === konamiCode.length) { // Si se completó toda la secuencia
            activateEasterEgg(); // Activa el easter egg
            konamiIndex = 0; // Reinicia el índice
        }
    } else {
        konamiIndex = 0; // Si falla en cualquier punto, reinicia
    }
});

function activateEasterEgg() { // Aplica efectos de arcoíris temporalmente
    // Add rainbow animation to the page
    const style = document.createElement('style'); // Crea un <style> temporal
    style.textContent = ` // Define animación de rotación de tono
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        .easter-egg-active {
            animation: rainbow 3s linear infinite;
        }
    `;
    document.head.appendChild(style); // Inserta en el head

    document.body.classList.add('easter-egg-active'); // Activa la clase de animación en el body

    showNotification('¡Código Konami activado! 🌈', 'success'); // Muestra notificación de éxito

    setTimeout(() => { // Tras 10 segundos
        document.body.classList.remove('easter-egg-active'); // Quita la animación
        document.head.removeChild(style); // Elimina el <style> inyectado
    }, 10000);
}

// Console message for curious developers
console.log(` // Mensaje estilizado en la consola con ASCII art
%c
 ██████╗ ██████╗ ██████╗ ███████╗    ██████╗ ███████╗██╗   ██╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝    ██╔══██╗██╔════╝██║   ██║
██║     ██║   ██║██║  ██║█████╗      ██║  ██║█████╗  ██║   ██║
██║     ██║   ██║██║  ██║██╔══╝      ██║  ██║██╔══╝  ╚██╗ ██╔╝
╚██████╗╚██████╔╝██████╔╝███████╗    ██████╔╝███████╗ ╚████╔╝ 
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═════╝ ╚══════╝  ╚═══╝  

%c¡Hola, desarrollador curioso! 
Si estás viendo esto, probablemente te interese el código.
Este portafolio fue creado con HTML, CSS y JavaScript vanilla.

¿Quieres aprender más? Contáctame y hablemos de desarrollo! 

%cPD: Intenta el código Konami (↑↑↓↓←→←→BA) 
`, 'color: #667eea; font-family: monospace; font-size: 12px;', 'color: #2d3748; font-size: 14px; font-weight: normal;', 'color: #718096; font-size: 12px; font-style: italic;'); // Estilos por %c aplican a los bloques de texto

/* ===============================================
   ERROR HANDLING
   =============================================== */

// Global error handler
window.addEventListener('error', (e) => { // Captura errores JS no manejados
    console.error('Portfolio Error:', e.error); // Loguea el error en consola
    // In production, you might want to send this to an error tracking service
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (e) => { // Captura promesas rechazadas sin catch
    console.error('Unhandled Promise Rejection:', e.reason); // Loguea la razón del rechazo
    e.preventDefault(); // Previene logs duplicados en algunos navegadores
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) { // Verifica soporte de Service Workers
    window.addEventListener('load', () => { // Espera a que la página termine de cargar
        navigator.serviceWorker.register('/sw.js') // Registra el SW en la ruta dada
            .then(registration => { // Si el registro fue exitoso
                console.log('SW registered: ', registration); // Informa detalles
            })
            .catch(registrationError => { // Si falla el registro
                console.log('SW registration failed: ', registrationError); // Loguea el error
            });
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) { // Si está en un entorno CommonJS (Node/testing)
    module.exports = { // Exporta funciones para pruebas unitarias
        initializeApp,
        showNotification,
        debounce,
        throttle
    };
}

// Funcion para el año actualizado en el footer
document.getElementById("year").textContent = new Date().getFullYear();