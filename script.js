/* =============================================
   NAVIGATION & MOBILE MENU
   ============================================= */

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
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

/* =============================================
   SMOOTH SCROLLING
   ============================================= */

// Smooth scroll for button clicks
document.querySelectorAll('.btn[data-scroll]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSelector = e.target.getAttribute('data-scroll');
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* =============================================
   STATISTICS COUNTER ANIMATION
   ============================================= */

const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / (target / increment);

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(counter);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, stepTime);
};

// Intersection Observer for statistics
const statCards = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

statCards.forEach(card => observer.observe(card));

/* =============================================
   FORM HANDLING & VALIDATION
   ============================================= */

const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('successModal');

// Email validation
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Form validation
const validateForm = () => {
    let isValid = true;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Clear errors
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';
    document.getElementById('nameError').classList.remove('show');
    document.getElementById('emailError').classList.remove('show');
    document.getElementById('messageError').classList.remove('show');

    // Validate name
    if (nameInput.value.trim().length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
        document.getElementById('nameError').classList.add('show');
        isValid = false;
    }

    // Validate email
    if (!validateEmail(emailInput.value)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        document.getElementById('emailError').classList.add('show');
        isValid = false;
    }

    // Validate message
    if (messageInput.value.trim().length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        document.getElementById('messageError').classList.add('show');
        isValid = false;
    }

    return isValid;
};

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate delay
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Show success modal
            openModal();
        }, 1000);
    }
});

// Survey form handling
const surveyForm = document.getElementById('surveyForm');

const validateSurvey = () => {
    const requiredFields = surveyForm.querySelectorAll('select[required], input[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value) {
            isValid = false;
            field.style.borderColor = '#ff6b6b';
        } else {
            field.style.borderColor = 'var(--border-color)';
        }
    });

    return isValid;
};
surveyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateSurvey()) {
        const submitButton = surveyForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        // REAL Formspree submission
        fetch("https://formspree.io/f/maqadyjl", {
            method: "POST",
            body: new FormData(surveyForm),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Reset form
                surveyForm.reset();
                // Show success modal
                openModal();
            } else {
                alert("Oops! There was a problem submitting your form.");
            }
        })
        .catch(error => {
            alert("Error: Could not connect to the server.");
        })
        .finally(() => {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    }
});
// Modal functions
const openModal = () => {
    modal.classList.add('show');
};

const closeModal = () => {
    modal.classList.remove('show');
};

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

/* =============================================
   SCROLL ANIMATIONS
   ============================================= */

// Animate elements on scroll
const observerScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Observe service cards, about cards, etc.
document.querySelectorAll('.service-card, .about-card, .process-step, .benefit-item, .highlight').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observerScroll.observe(el);
});

/* =============================================
   SERVICE CARDS HOVER EFFECTS
   ============================================= */

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        serviceCards.forEach(c => {
            if (c !== card) {
                c.style.opacity = '0.5';
                c.style.pointerEvents = 'none';
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        serviceCards.forEach(c => {
            c.style.opacity = '1';
            c.style.pointerEvents = 'auto';
        });
    });
});

/* =============================================
   PARALLAX EFFECT & BATTERY SCROLL ANIMATION
   ============================================= */

window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    const scrollPosition = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    
    if (scrollPosition < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }

    // Update battery charge based on scroll progress to about section
    const batteryCharge = document.querySelector('.battery-charge');
    const aboutSection = document.getElementById('about');
    if (batteryCharge && aboutSection) {
        const aboutPosition = aboutSection.offsetTop;
        const scrollProgress = (window.scrollY / aboutPosition) * 100;
        const start = 30; // initial charge percentage
        const height = Math.min(start + (scrollProgress * (100 - start) / 100), 100);
        batteryCharge.style.height = `${height}%`;
    }
});

/* =============================================
   INPUT FOCUS EFFECTS
   ============================================= */

const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

/* =============================================
   REAL-TIME FORM VALIDATION
   ============================================= */

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim().length < 2 && nameInput.value.trim().length > 0) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
        document.getElementById('nameError').classList.add('show');
    } else {
        document.getElementById('nameError').classList.remove('show');
    }
});

emailInput.addEventListener('blur', () => {
    if (emailInput.value && !validateEmail(emailInput.value)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        document.getElementById('emailError').classList.add('show');
    } else {
        document.getElementById('emailError').classList.remove('show');
    }
});

messageInput.addEventListener('blur', () => {
    if (messageInput.value.trim().length < 10 && messageInput.value.trim().length > 0) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        document.getElementById('messageError').classList.add('show');
    } else {
        document.getElementById('messageError').classList.remove('show');
    }
});

/* =============================================
   ACTIVE NAVIGATION LINK
   ============================================= */

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const activateNavLink = () => {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.style.color = 'var(--text-primary)';
        if (item.getAttribute('href') === `#${currentSection}`) {
            item.style.color = 'var(--accent-color)';
        }
    });
};

window.addEventListener('scroll', activateNavLink);

/* =============================================
   PAGE LOAD ANIMATION
   ============================================= */

window.addEventListener('load', () => {
    // Fade in hero content
    const heroText = document.querySelector('.hero-text');
    const heroVisual = document.querySelector('.hero-visual');

    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.animation = 'fadeInUp 0.8s ease forwards';
    }

    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.animation = 'fadeInUp 0.8s ease 0.2s forwards';
    }
});

/* =============================================
   UTILITY FUNCTIONS
   ============================================= */

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

/* =============================================
   KEYBOARD NAVIGATION
   ============================================= */

// Allow Tab key to navigate through links and buttons
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

/* =============================================
   PERFORMANCE OPTIMIZATION
   ============================================= */

// Debounce function for scroll events
const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
    activateNavLink();
}, 10));

/* =============================================
   ACCESSIBILITY
   ============================================= */

// Add ARIA labels and roles
document.querySelectorAll('.btn').forEach(btn => {
    if (!btn.hasAttribute('aria-label')) {
        btn.setAttribute('aria-label', 'Action button');
    }
});

// Link focus styles
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('focus', () => {
        link.style.outline = '2px solid var(--accent-color)';
        link.style.outlineOffset = '4px';
    });

    link.addEventListener('blur', () => {
        link.style.outline = 'none';
    });
});

console.log('✨ EnergyVault website loaded successfully!');