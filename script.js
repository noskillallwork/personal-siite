/* ==========================================
   NAVIGATION & SCROLL
   ========================================== */

const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for CTA button
document.querySelector('.btn-cta').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

/* ==========================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ========================================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.about-card, .project-card, .explore-card, .skill-category, .timeline-content').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

/* ==========================================
   CONTACT FORM
   ========================================== */

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate
    if (!name.trim() || !email.trim() || !message.trim()) {
        alert('Please fill in all fields');
        return;
    }

    // Show success state
    contactForm.style.opacity = '0';
    contactForm.style.pointerEvents = 'none';
    formSuccess.classList.add('active');

    // Reset form
    contactForm.reset();

    // Reset after 4 seconds
    setTimeout(() => {
        formSuccess.classList.remove('active');
        contactForm.style.opacity = '1';
        contactForm.style.pointerEvents = 'auto';
    }, 4000);

    // Log the message (in a real site, this would send to a backend)
    console.log('Contact form submitted:', { name, email, message });
});

/* ==========================================
   ACTIVE NAV LINK ON SCROLL
   ========================================== */

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

/* ==========================================
   MAGNETIC BUTTON EFFECT (HOVER)
   ========================================== */

const magneticElements = document.querySelectorAll('.btn, .social-link');

magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = 50;

            const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        }
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
    });
});

/* ==========================================
   SMOOTH NUMBER COUNTER (For stats if added)
   ========================================== */

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/* ==========================================
   PARALLAX EFFECT (SUBTLE)
   ========================================== */

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-visual');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

/* ==========================================
   PAGE LOAD ANIMATION
   ========================================== */

window.addEventListener('load', () => {
    document.body.style.opacity = '1';

    // Animate hero elements
    const heroElements = document.querySelectorAll('.title-line');
    heroElements.forEach((el, i) => {
        el.style.animationDelay = `${i * 0.1}s`;
    });
});

// Ensure fade-in starts
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

/* ==========================================
   SCROLL PROGRESS INDICATOR (Optional)
   ========================================== */

function updateScrollProgress() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / totalHeight) * 100;

    // You can add a progress bar by uncommenting below
    // document.querySelector('.scroll-progress')?.style.setProperty('--progress', `${scrolled}%`);
}

window.addEventListener('scroll', updateScrollProgress);

/* ==========================================
   PRELOAD FONTS
   ========================================== */

if (document.fonts) {
    document.fonts.load('400 1em "Inter"');
    document.fonts.load('600 1em "Inter"');
    document.fonts.load('700 1em "Inter"');
}

/* ==========================================
   PERFORMANCE: LAZY LOAD IMAGES
   ========================================== */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ==========================================
   ACCESSIBILITY: REDUCED MOTION
   ========================================== */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('[class*="animate"], [class*="transition"]').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

/* ==========================================
   KEYBOARD NAVIGATION
   ========================================== */

document.addEventListener('keydown', (e) => {
    // Skip to main content
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        document.getElementById('home').focus();
    }
});

/* ==========================================
   THEME DETECTION (For future dark/light toggle)
   ========================================== */

function detectTheme() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // The site is already dark, so no changes needed
    // But this hook is available for future light mode implementation
    return isDark ? 'dark' : 'light';
}

/* ==========================================
   SEND KEYBOARD SHORTCUTS
   ========================================== */

// Ctrl+K or Cmd+K to focus contact form
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            document.getElementById('name').focus();
        }, 500);
    }
});

console.log('🚀 Portfolio loaded. Press Cmd/Ctrl+K to jump to contact.');
