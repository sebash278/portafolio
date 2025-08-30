function initializeApp(){initLoader(),initThemeToggle(),initMobileMenu(),initSmoothScrolling(),initActiveNavigation(),initScrollEffects(),initSkillBars(),initPortfolioFilters(),initContactForm(),initBackToTop(),initTypingEffect(),initScrollAnimations(),initLazyLoading(),console.log("Portfolio initialized successfully! \uD83D\uDE80")}function initLoader(){let e=document.getElementById("loader");window.addEventListener("load",()=>{setTimeout(()=>{e.classList.add("hidden"),document.body.style.overflow="visible",setTimeout(()=>{e&&e.remove()},500)},1e3)})}function initThemeToggle(){let e=document.getElementById("theme-toggle"),t=e.querySelector("i"),i=localStorage.getItem("theme")||"light";document.documentElement.setAttribute("data-theme",i),updateThemeIcon(t,i),e.addEventListener("click",()=>{let e="dark"===document.documentElement.getAttribute("data-theme")?"light":"dark";document.documentElement.classList.add("theme-transition"),document.documentElement.setAttribute("data-theme",e),localStorage.setItem("theme",e),updateThemeIcon(t,e),setTimeout(()=>{document.documentElement.classList.remove("theme-transition")},300)})}function updateThemeIcon(e,t){e.className="dark"===t?"fas fa-sun":"fas fa-moon"}function initMobileMenu(){let e=document.getElementById("menu-toggle"),t=document.getElementById("nav"),i=t.querySelectorAll(".nav-link");e.addEventListener("click",()=>{t.classList.toggle("active"),e.classList.toggle("active");let i=e.querySelector(".hamburger");t.classList.contains("active")?(i.style.transform="rotate(45deg)",i.style.background="transparent"):(i.style.transform="rotate(0deg)",i.style.background="var(--text-primary)")}),i.forEach(i=>{i.addEventListener("click",()=>{t.classList.remove("active"),e.classList.remove("active");let i=e.querySelector(".hamburger");i.style.transform="rotate(0deg)",i.style.background="var(--text-primary)"})}),document.addEventListener("click",i=>{if(!t.contains(i.target)&&!e.contains(i.target)){t.classList.remove("active"),e.classList.remove("active");let n=e.querySelector(".hamburger");n.style.transform="rotate(0deg)",n.style.background="var(--text-primary)"}})}function initSmoothScrolling(){document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(e){e.preventDefault();let t=document.querySelector(this.getAttribute("href"));if(t){let i=document.querySelector(".header").offsetHeight,n=t.offsetTop-i;window.scrollTo({top:n,behavior:"smooth"})}})})}function initActiveNavigation(){let e=document.querySelectorAll(".section, .hero"),t=document.querySelectorAll(".nav-link"),i=document.querySelector(".header");window.addEventListener("scroll",()=>{let n=window.scrollY+100;window.scrollY>50?i.classList.add("scrolled"):i.classList.remove("scrolled"),e.forEach((e,i)=>{let o=e.offsetTop,a=e.offsetHeight,r=e.getAttribute("id");if(n>=o&&n<o+a){t.forEach(e=>e.classList.remove("active"));let l=document.querySelector(`.nav-link[href="#${r}"]`);l&&l.classList.add("active")}})})}function initScrollEffects(){let e=document.querySelector(".hero"),t=document.querySelector(".hero-particles");window.addEventListener("scroll",()=>{let i=window.pageYOffset;t&&i<e.offsetHeight&&(t.style.transform=`translateY(${-.5*i}px)`)})}function initSkillBars(){let e=document.querySelectorAll(".skill-progress"),t=()=>{e.forEach(e=>{let t=e.getAttribute("data-skill"),i=e.getBoundingClientRect().top,n=window.innerHeight;i<n-100&&(e.style.width=t+"%",e.classList.add("animated"))})};t(),window.addEventListener("scroll",t)}function initPortfolioFilters(){let e=document.querySelectorAll(".filter-btn"),t=document.querySelectorAll(".portfolio-item");e.forEach(i=>{i.addEventListener("click",()=>{let n=i.getAttribute("data-filter");e.forEach(e=>e.classList.remove("active")),i.classList.add("active"),t.forEach(e=>{let t=e.getAttribute("data-category");"all"===n||t===n?(e.style.display="block",setTimeout(()=>{e.style.opacity="1",e.style.transform="scale(1)"},100)):(e.style.opacity="0",e.style.transform="scale(0.8)",setTimeout(()=>{e.style.display="none"},300))})})})}function initContactForm(){let e=document.getElementById("contact-form");e&&e.addEventListener("submit",async function(t){t.preventDefault();let i=e.querySelector(".submit-btn"),n=i.innerHTML;i.innerHTML='<i class="fas fa-spinner fa-spin"></i> Enviando...',i.disabled=!0;try{await simulateFormSubmission(),i.innerHTML='<i class="fas fa-check"></i> \xa1Mensaje enviado!',i.style.background="#10B981",e.reset(),showNotification("\xa1Mensaje enviado exitosamente!","success")}catch(o){i.innerHTML='<i class="fas fa-times"></i> Error al enviar',i.style.background="#EF4444",showNotification("Error al enviar el mensaje. Intenta de nuevo.","error")}setTimeout(()=>{i.innerHTML=n,i.disabled=!1,i.style.background=""},3e3)})}function simulateFormSubmission(){return new Promise((e,t)=>{setTimeout(()=>{Math.random()>.1?e():t(Error("Submission failed"))},2e3)})}function showNotification(e,t){let i=document.createElement("div");i.className=`notification notification-${t}`,i.innerHTML=` // Inserta contenido con \xedcono, mensaje y bot\xf3n cerrar
        <i class="fas ${"success"===t?"fa-check-circle":"fa-exclamation-circle"}"></i>
        <span>${e}</span>
        <button class="notification-close">&times;</button>
    `,i.style.cssText=` // Estilos inline para evitar depender del CSS global
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${"success"===t?"#10B981":"#EF4444"};
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
    `,document.body.appendChild(i),setTimeout(()=>{i.style.transform="translateX(0)"},100);let n=i.querySelector(".notification-close");n.style.cssText="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; padding: 0; margin-left: 1rem;",n.addEventListener("click",()=>{removeNotification(i)}),setTimeout(()=>{removeNotification(i)},5e3)}function removeNotification(e){e.style.transform="translateX(100%)",setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},300)}function initBackToTop(){let e=document.getElementById("back-to-top");window.addEventListener("scroll",()=>{window.scrollY>500?e.classList.add("visible"):e.classList.remove("visible")}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}function initTypingEffect(){let e=document.querySelector(".hero-subtitle");if(!e)return;e.textContent;let t=["Desarrollador Full Stack","Creador de Experiencias Web","Solucionador de Problemas","Apasionado por la Tecnolog\xeda"],i=0,n=0,o=!1;function a(){let r=t[i];o?(e.textContent=r.substring(0,n-1),n--):(e.textContent=r.substring(0,n+1),n++);let l=o?50:100;o||n!==r.length?o&&0===n&&(o=!1,i=(i+1)%t.length,l=500):(l=2e3,o=!0),setTimeout(a,l)}setTimeout(a,2e3)}function initScrollAnimations(){let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add("animate-in")})},{threshold:.1,rootMargin:"0px 0px -50px 0px"}),t=document.querySelectorAll(` // Selecciona elementos a animar
        .section-header,
        .stat-item,
        .skill-item,
        .skill-card,
        .portfolio-item,
        .timeline-item,
        .contact-item
    `);t.forEach((t,i)=>{t.style.opacity="0",t.style.transform="translateY(30px)",t.style.transition=`all 0.6s ease ${.1*i}s`,e.observe(t)});let i=document.createElement("style");i.textContent=` // Define la clase final de animaci\xf3n
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `,document.head.appendChild(i)}function initLazyLoading(){let e=document.querySelectorAll("img[data-src]");if("IntersectionObserver"in window){let t=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){let i=e.target;i.src=i.dataset.src,i.classList.remove("lazy"),t.unobserve(i)}})});e.forEach(e=>t.observe(e))}else e.forEach(e=>{e.src=e.dataset.src})}function debounce(e,t,i){let n;return function o(...a){let r=()=>{n=null,i||e(...a)},l=i&&!n;clearTimeout(n),n=setTimeout(r,t),l&&e(...a)}}function throttle(e,t){let i;return function(){let n=arguments;i||(e.apply(this,n),i=!0,setTimeout(()=>i=!1,t))}}document.addEventListener("DOMContentLoaded",function(){initializeApp()});let konamiCode=[38,38,40,40,37,39,37,39,66,65],konamiIndex=0;function activateEasterEgg(){let e=document.createElement("style");e.textContent=` // Define animaci\xf3n de rotaci\xf3n de tono
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        .easter-egg-active {
            animation: rainbow 3s linear infinite;
        }
    `,document.head.appendChild(e),document.body.classList.add("easter-egg-active"),showNotification("\xa1C\xf3digo Konami activado! \uD83C\uDF08","success"),setTimeout(()=>{document.body.classList.remove("easter-egg-active"),document.head.removeChild(e)},1e4)}document.addEventListener("keydown",e=>{e.keyCode===konamiCode[konamiIndex]?++konamiIndex===konamiCode.length&&(activateEasterEgg(),konamiIndex=0):konamiIndex=0}),console.log(` // Mensaje estilizado en la consola con ASCII art
%c
 ██████╗ ██████╗ ██████╗ ███████╗    ██████╗ ███████╗██╗   ██╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝    ██╔══██╗██╔════╝██║   ██║
██║     ██║   ██║██║  ██║█████╗      ██║  ██║█████╗  ██║   ██║
██║     ██║   ██║██║  ██║██╔══╝      ██║  ██║██╔══╝  ╚██╗ ██╔╝
╚██████╗╚██████╔╝██████╔╝███████╗    ██████╔╝███████╗ ╚████╔╝ 
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═════╝ ╚══════╝  ╚═══╝  

%c\xa1Hola, desarrollador curioso! 
Si est\xe1s viendo esto, probablemente te interese el c\xf3digo.
Este portafolio fue creado con HTML, CSS y JavaScript vanilla.

\xbfQuieres aprender m\xe1s? Cont\xe1ctame y hablemos de desarrollo! 

%cPD: Intenta el c\xf3digo Konami (↑↑↓↓←→←→BA) 
`,"color: #667eea; font-family: monospace; font-size: 12px;","color: #2d3748; font-size: 14px; font-weight: normal;","color: #718096; font-size: 12px; font-style: italic;"),window.addEventListener("error",e=>{console.error("Portfolio Error:",e.error)}),window.addEventListener("unhandledrejection",e=>{console.error("Unhandled Promise Rejection:",e.reason),e.preventDefault()}),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(e=>{console.log("SW registered: ",e)}).catch(e=>{console.log("SW registration failed: ",e)})}),"undefined"!=typeof module&&module.exports&&(module.exports={initializeApp,showNotification,debounce,throttle}),document.getElementById("year").textContent=new Date().getFullYear();