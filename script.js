// Automatische Scroll-Wiederherstellung deaktivieren (Seite öffnet immer ganz oben)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

// Sowohl beim Entladen als auch beim Laden die Seite nach oben zwingen
window.addEventListener('beforeunload', scrollToTop);
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scrollToTop);
} else {
    scrollToTop();
}

// CLOUDFLARE PUBLIC DEV URL
const R2_BASE_URL = 'https://pub-029611783ed14ebc9650ed56c4ffe937.r2.dev/';

// Galerie Daten
const galleryItems = [
    { src: R2_BASE_URL + 'vorhernacher1.jpeg', alt: 'Fahrersitz Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher2.jpeg', alt: 'Innenraum Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher3.jpeg', alt: 'Fußmatte Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher4.jpeg', alt: 'Polster Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher5.jpeg', alt: 'Armaturen Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher6.jpeg', alt: 'Detail Ergebnis Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher7.jpeg', alt: 'Detail Ergebnis Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher8.jpeg', alt: 'Detail Ergebnis Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher9.jpeg', alt: 'Detail Ergebnis Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher10.jpeg', alt: 'Detail Ergebnis Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher11.jpeg', alt: 'Detail Ergebnis Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher12.jpeg', alt: 'Detail Ergebnis Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher13.jpeg', alt: 'Detail Ergebnis Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher14.jpeg', alt: 'Detail Ergebnis Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher15.jpeg', alt: 'Detail Ergebnis Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher16.jpeg', alt: 'Detail Ergebnis Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher17.jpeg', alt: 'Detail Ergebnis Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher18.jpeg', alt: 'Detail Ergebnis Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher19.jpeg', alt: 'Detail Ergebnis Vorher / Nachher' },
    { src: R2_BASE_URL + 'vorhernacher20.jpeg', alt: 'Detail Ergebnis Vorher / Nachher' }
];

let currentLightboxIndex = 0;
let galleryExpanded = false;

// Rendert die Vorschaubilder automatisch in die HTML-Seite
function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    const btnContainer = document.getElementById('gallery-btn-container');
    if (!grid) return;

    const isMobile = window.innerWidth < 640;
    const limit = isMobile ? 5 : 9;
    const itemsToShow = galleryExpanded ? galleryItems.length : Math.min(limit, galleryItems.length);

    grid.innerHTML = galleryItems.slice(0, itemsToShow).map((item, index) => `
        <div onclick="openLightbox(${index})" class="overflow-hidden rounded-2xl group relative aspect-square shadow-sm border border-slate-200 cursor-pointer bg-slate-200">
            <img src="${item.src}" alt="${item.alt}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='https://placehold.co/600x600/2A485E/FFFFFF?text=Vorher+Nachher+${index + 1}'">
            <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span class="bg-white/90 text-slate-900 px-4 py-2 rounded-full text-xs font-bold shadow-md flex items-center gap-2">🔍</span>
            </div>
        </div>
    `).join('');

    if (btnContainer) {
        if (!galleryExpanded && galleryItems.length > limit) {
            btnContainer.classList.remove('hidden');
        } else {
            btnContainer.classList.add('hidden');
        }
    }
}

function expandGallery() {
    galleryExpanded = true;
    renderGallery();
}

window.addEventListener('resize', () => {
    if (!galleryExpanded) {
        renderGallery();
    }
});

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function updateLightbox() {
    const item = galleryItems[currentLightboxIndex];
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const counter = document.getElementById('lightbox-counter');
    
    if (img) {
        img.src = item.src;
        img.onerror = () => {
            img.src = `https://placehold.co/800x800/2A485E/FFFFFF?text=Vorher+Nachher+${currentLightboxIndex + 1}`;
        };
    }
    if (caption) caption.textContent = item.alt;
    if (counter) counter.textContent = `Bild ${currentLightboxIndex + 1} von ${galleryItems.length}`;
}

function prevLightboxImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();
}

function nextLightboxImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
    updateLightbox();
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (modal && !modal.classList.contains('hidden')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevLightboxImage();
        if (e.key === 'ArrowRight') nextLightboxImage();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderGallery();

    // Smarte Navbar
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (!navbar) return;
        const currentScrollY = window.scrollY;
        if (currentScrollY > 100 && currentScrollY > lastScrollY) {
            navbar.classList.add('-translate-y-full');
        } else {
            navbar.classList.remove('-translate-y-full');
        }

        if (currentScrollY > 50) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
        lastScrollY = currentScrollY;
    });

    // Mobile Menu
    const mobileBtn = document.getElementById('mobile-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconPath = document.getElementById('mobile-icon-path');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    function toggleMenu() {
        if (!mobileMenu || !iconPath) return;
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('menu-closed');
            mobileMenu.classList.add('menu-open');
            iconPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        } else {
            mobileMenu.classList.add('menu-closed');
            mobileMenu.classList.remove('menu-open');
            iconPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        }
    }

    if (mobileBtn) {
        mobileBtn.addEventListener('click', toggleMenu);
    }
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // Formular Handling
    const form = document.getElementById('booking-form');
    if (form) {
        form.addEventListener('submit', function() {
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                btn.innerHTML = 'Wird gesendet...';
                btn.classList.add('opacity-75');
            }
        });
    }
});

// Funktionen für die Spezialleistungen-Modals
function openServiceModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeServiceModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}