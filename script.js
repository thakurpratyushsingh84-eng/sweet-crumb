/* =====================================================
   SWEET CRUMBS - PREMIUM BAKERY JAVASCRIPT
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // =====================================================
    // NAVBAR SCROLL EFFECT
    // =====================================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // =====================================================
    // MOBILE MENU TOGGLE
    // =====================================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // =====================================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // =====================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =====================================================
    // WHATSAPP ORDER FUNCTION
    // =====================================================
    window.orderWA = function(productName) {
        const message = `Hello Sweet Crumbs Bakery, I would like to order ${productName}. Please confirm availability.`;
        const encodedMessage = encodeURIComponent(message);
        const waLink = `https://wa.me/919876543210?text=${encodedMessage}`;
        window.open(waLink, '_blank');
    };

    // =====================================================
    // SCROLL ANIMATIONS (Fade In Up)
    // =====================================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animateElements = document.querySelectorAll('.product-card, .gallery-item, .why-card, .review-card, .about-images, .about-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // =====================================================
    // PRODUCT CARD HOVER EFFECTS
    // =====================================================
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // =====================================================
    // GALLERY HOVER ZOOM EFFECT
    // =====================================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const img = item.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.15)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const img = item.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // =====================================================
    // HERO PARALLAX EFFECT
    // =====================================================
    const heroBg = document.querySelector('.hero-bg');
    
    window.addEventListener('scroll', () => {
        if (heroBg) {
            const scrolled = window.scrollY;
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });

    // =====================================================
    // STATS COUNTER ANIMATION
    // =====================================================
    const statNumbers = document.querySelectorAll('.stat-num');
    let statsCounted = false;
    
    window.addEventListener('scroll', () => {
        if (!statsCounted && window.scrollY > 500) {
            statsCounted = true;
            statNumbers.forEach(stat => {
                const target = stat.textContent;
                const num = parseInt(target.replace(/\D/g, ''));
                const suffix = target.replace(/[0-9]/g, '');
                animateValue(stat, 0, num, 2000, suffix);
            });
        }
    });
    
    function animateValue(element, start, end, duration, suffix) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + (suffix || '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = end + (suffix || '');
            }
        };
        window.requestAnimationFrame(step);
    }

    // =====================================================
    // ACTIVE NAV LINK ON SCROLL
    // =====================================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // =====================================================
    // FOOTER CURRENT YEAR
    // =====================================================
    const yearEl = document.querySelector('.footer-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // =====================================================
    // LAZY LOAD IMAGES
    // =====================================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    // =====================================================
    // SCROLL TO TOP BUTTON
    // =====================================================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        font-size: 1.2rem;
    `;
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =====================================================
    // CONSOLE LOG
    // =====================================================
    console.log('🧁 Sweet Crumbs Bakery Website Loaded Successfully!');
});