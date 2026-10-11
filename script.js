const navbar = document.getElementById("navbar");
const navMenu = document.getElementById("navMenu");
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelectorAll(".nav-link");


// mobile menu stuff
if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navToggle.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}


// navbar changes when scrolling
window.addEventListener("scroll", () => {
    if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
});


// lets connect button
const connectBtn = document.querySelector(".btn-cta");

if (connectBtn) {
    connectBtn.addEventListener("click", () => {
        document.getElementById("contact")?.scrollIntoView({
            behavior: "smooth"
        });
    });
}


// animations when stuff appears on screen
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

document.querySelectorAll(
    ".about-card, .project-card, .explore-card, .skill-category, .timeline-content"
).forEach(card => {
    card.classList.add("fade-in");
    observer.observe(card);
});


// contact form
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (contactForm && formSuccess) {
    contactForm.addEventListener("submit", e => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields");
            return;
        }

        console.log("New message:", {
            name: name,
            email: email,
            message: message
        });

        contactForm.style.display = "none";
        formSuccess.classList.add("active");

        contactForm.reset();

        setTimeout(() => {
            formSuccess.classList.remove("active");
            contactForm.style.display = "flex";
        }, 4000);
    });
}


// highlight the nav link for the current section
function updateActiveLink() {
    let current = "";

    document.querySelectorAll("section[id]").forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + current
        );
    });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();


// little hover effect for buttons
document.querySelectorAll(".btn, .social-link").forEach(el => {
    el.addEventListener("mousemove", e => {
        if (window.innerWidth <= 768) return;

        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    el.addEventListener("mouseleave", () => {
        el.style.transform = "";
    });
});


// number counter if i add stats later
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
        current += step;

        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}


// small parallax effect on the hero
window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero-visual");

    if (hero && window.scrollY < window.innerHeight) {
        hero.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    }
});


// page load
window.addEventListener("load", () => {
    document.body.style.opacity = "1";

    document.querySelectorAll(".title-line").forEach((line, i) => {
        line.style.animationDelay = `${i * 0.1}s`;
    });
});

document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.5s ease";


// lazy loading images
if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                img.src = img.dataset.src;
                img.classList.add("loaded");

                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll("img[data-src]").forEach(img => {
        imageObserver.observe(img);
    });
}


// respect reduced motion settings
const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (reduceMotion) {
    document.documentElement.style.scrollBehavior = "auto";

    document.querySelectorAll(".fade-in").forEach(el => {
        el.style.transition = "none";
        el.style.transform = "none";
        el.style.opacity = "1";
    });
}


// keyboard shortcuts
document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();

        document.getElementById("contact")?.scrollIntoView({
            behavior: "smooth"
        });

        setTimeout(() => {
            document.getElementById("name")?.focus();
        }, 500);
    }
});


// load the font
if (document.fonts) {
    document.fonts.load('400 1em "Inter"');
    document.fonts.load('600 1em "Inter"');
    document.fonts.load('700 1em "Inter"');
}

console.log("Portfolio loaded :)");
