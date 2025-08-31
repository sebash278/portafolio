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

    // Performance optimizations
    initLazyLoading();      // Carga diferida (lazy) de imágenes con data-src

    console.log('Portafolio iniciado exitosamente'); // Mensaje de depuración en consola
}

/* ===============================================
   LOADING SCREEN
   =============================================== */

function initLoader() {
  const loader = document.getElementById("loader");
  const loaderConsole = document.getElementById("loader-console");

  const lines = [
    "> Initializing portfolio...",
    "> Loading assets...",
    "> Connecting to server...",
    "> Access granted!",
  ];

  let i = 0;
  function typeLine() {
    if (i < lines.length) {
      loaderConsole.textContent += lines[i] + "\n";
      i++;
      setTimeout(typeLine, 600);
    } else {
      setTimeout(() => {
        loader.classList.add("hidden");
        document.body.style.overflow = "visible";

        setTimeout(() => {
          loader.remove();
        }, 600);
      }, 800);
    }
  }

  typeLine();
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

// AOS PARA ANIMACIONES ENTRE SECCIONES
AOS.init({
  duration: 1000, // duración animación
  once: true,     // se ejecuta solo la primera vez
});

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
   SCROLL ANIMATIONS
   =============================================== */

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

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const konamiCode = [38,38,40,40,37,39,37,39,66,65];
let konamiIndex = 0;

document.addEventListener("keydown", (e) => {
  if (e.keyCode === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiActivated();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0; // reset si se equivoca
  }
});

function konamiActivated() {
  const doomModal = document.getElementById("doomModal");
  const doomFrame = document.getElementById("doomFrame");
  const closeDoom = document.getElementById("closeDoom");

  // Abre el modal y carga DOOM
  doomModal.style.display = "flex";
  doomFrame.src = "https://midzer.de/wasm/doom/";

  // Cerrar modal
  closeDoom.onclick = () => {
    doomModal.style.display = "none";
    doomFrame.src = ""; // parar el juego cuando cierras
  };

  // Cerrar si haces click fuera del contenido
  doomModal.onclick = (e) => {
    if (e.target === doomModal) {
      doomModal.style.display = "none";
      doomFrame.src = "";
    }
  };

  alert("DOOM desbloqueado");
}

// Funcion para el año actualizado en el footer
document.getElementById("year").textContent = new Date().getFullYear();

//Console
const consoleText = document.getElementById("console-text");
if (consoleText) {
  const messages = [
    "Transformando ideas en líneas de código",
    "Siempre aprendiendo, siempre creando",
    "Frontend + Backend = Magia",
    "Amante del Morado 💜"
  ];
  let messageIndex = 0;
  let charIndex = 0;

  function typeMessage() {
    if (charIndex < messages[messageIndex].length) {
      consoleText.textContent += messages[messageIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeMessage, 80);
    } else {
      setTimeout(() => {
        consoleText.textContent = "";
        charIndex = 0;
        messageIndex = (messageIndex + 1) % messages.length;
        typeMessage();
      }, 2000);
    }
  }
  typeMessage();
}

//Cursor personalizado
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});