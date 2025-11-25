/**
 * Maysternya Theme Main JavaScript
 */
(function() {
    'use strict';

    // DOM Elements
    const header = document.getElementById('site-header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const contactModal = document.getElementById('contact-modal');
    const modalClose = document.getElementById('modal-close');
    const contactTriggers = document.querySelectorAll('.contact-trigger');
    const mobileDropdowns = document.querySelectorAll('.mobile-nav-item.has-dropdown');

    // Header scroll effect
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Mobile menu toggle
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    // Contact modal
    function openContactModal(e) {
        e.preventDefault();
        contactModal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeContactModal() {
        contactModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    // Mobile dropdown toggle
    function toggleMobileDropdown(e) {
        e.preventDefault();
        const parent = this.closest('.mobile-nav-item');
        parent.classList.toggle('active');
    }

    // Close modal on backdrop click
    function handleModalClick(e) {
        if (e.target.classList.contains('modal-backdrop')) {
            closeContactModal();
        }
    }

    // Close modal on escape key
    function handleKeydown(e) {
        if (e.key === 'Escape') {
            closeContactModal();
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    }

    // Gallery/Carousel functionality
    function initGallery() {
        const galleries = document.querySelectorAll('.gallery-carousel');
        
        galleries.forEach(gallery => {
            const track = gallery.querySelector('.gallery-track');
            const prevBtn = gallery.querySelector('.gallery-prev');
            const nextBtn = gallery.querySelector('.gallery-next');
            
            if (!track) return;

            const scrollAmount = 300;

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                });
            }
        });
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Intersection Observer for animations
    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.project-card, .performance-card, .team-member').forEach(el => {
            el.classList.add('animate-ready');
            observer.observe(el);
        });
    }

    // Initialize
    function init() {
        // Scroll handler
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial scroll position

        // Mobile menu
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }

        // Mobile dropdowns
        mobileDropdowns.forEach(item => {
            const link = item.querySelector('.mobile-nav-link');
            if (link) {
                link.addEventListener('click', toggleMobileDropdown);
            }
        });

        // Contact modal
        contactTriggers.forEach(trigger => {
            trigger.addEventListener('click', openContactModal);
        });

        if (modalClose) {
            modalClose.addEventListener('click', closeContactModal);
        }

        if (contactModal) {
            contactModal.addEventListener('click', handleModalClick);
        }

        // Keyboard events
        document.addEventListener('keydown', handleKeydown);

        // Initialize components
        initGallery();
        initSmoothScroll();
        initAnimations();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
