

document.addEventListener('DOMContentLoaded', () => {
    const parallaxBg = document.getElementById('parallax-bg');
    const nav = document.getElementById('main-nav');
    const animatedElements = document.querySelectorAll('.animate-text');

  
    // ... (ostatní proměnné)
    const viewportHeight = window.innerHeight;

    function handleScroll() {
        const scrollY = window.scrollY;
        
        // 🔑 1. VÝŠKA POZADÍ
        const bgHeight = 5135; 

        // 🔑 2. VÝPOČET MAXIMÁLNÍHO SCROLLU STRÁNKY
        // Vypočítáme celkovou délku scrollování, kterou má HTML obsah (body)
        const totalContentHeight = document.body.scrollHeight;
        
        // Maximální scroll je celková výška stránky mínus výška okna (viewportu), 
        // protože scroll končí, když je spodní okraj stránky zarovnán se spodním okrajem okna.
        const maxScroll = totalContentHeight - viewportHeight; 
        
        // POZNÁMKA: Pokud máte 4 sekce (4320px) a pozadí má 5400px, JS zajistí,
        // aby se během scrollování o 4320px posunulo pozadí o 5400px.

        // 3. VÝPOČET POSUNU
        const maxBgOffset = bgHeight - viewportHeight; 
        const scrollFraction = scrollY / maxScroll;
        
        // Důležité: Kontrola, aby offset nepřekročil maximální možný posun
        const bgOffset = Math.min(scrollFraction * maxBgOffset, maxBgOffset); 
        
        parallaxBg.style.backgroundPositionY = `-${bgOffset}px`;

        // ... (zbytek handleScroll funkce pro navigaci a animace) ...
    

        // Navigace se objeví po scrollu
        if (scrollY > 100) {
            nav.classList.remove('hidden');
        } else {
            nav.classList.add('hidden');
        }

        // --- 2. ANIMACE TEXTU PŘI SCROLLU (Fade In/Out) ---
        const activationThreshold = 100;
        
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            
            // Kontrola viditelnosti
            const isVisible = rect.top < viewportHeight - activationThreshold && rect.bottom > activationThreshold;
            
            // Spouštíme animaci jen pokud je viditelný a nejsme hned na začátku stránky
            if (isVisible && scrollY > 100) { 
                el.classList.add('is-visible');
            } else if (!isVisible && scrollY > 100) {
                 el.classList.remove('is-visible');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Spustí se hned pro nastavení počátečních pozic


    // --- 3. CAROUSEL FUNKČNOST ---
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    const itemWidth = 220; 
    let currentIndex = 0;
    const itemsPerPage = 3; 

    function updateCarousel() {
        const offset = -currentIndex * itemWidth;
        track.style.transform = `translateX(${offset}px)`;
    }

    rightArrow.addEventListener('click', () => {
        if (currentIndex < items.length - itemsPerPage) {
            currentIndex++;
        } 
        updateCarousel();
    });

    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } 
        updateCarousel();
    });

    // Pevné scrollování na kliknutí v navigaci
    document.querySelectorAll('#main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});

