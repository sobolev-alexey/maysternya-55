/**
 * Maysternya Carousel/Slider JavaScript
 * Handles carousel functionality for the carousel block
 */
(function() {
    'use strict';

    /**
     * Initialize all carousels on the page
     */
    function initCarousels() {
        const carousels = document.querySelectorAll('.wp-block-maysternya-carousel');
        
        carousels.forEach(carousel => {
            initCarousel(carousel);
        });
    }

    /**
     * Initialize a single carousel
     */
    function initCarousel(carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-arrow-prev');
        const nextBtn = carousel.querySelector('.carousel-arrow-next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        if (!track || slides.length === 0) return;

        let currentIndex = 0;
        const totalSlides = slides.length;

        // Create dots if container exists
        if (dotsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }

        const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];

        // Go to specific slide
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        // Update carousel position and active states
        function updateCarousel() {
            // Update track position
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active slide
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentIndex);
            });
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            // Update button states
            if (prevBtn) {
                prevBtn.disabled = currentIndex === 0;
            }
            if (nextBtn) {
                nextBtn.disabled = currentIndex === totalSlides - 1;
            }
        }

        // Previous slide
        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }

        // Next slide
        function nextSlide() {
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
                updateCarousel();
            }
        }

        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }

        // Keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
            }
        }

        // Auto-play (if enabled)
        const autoplay = carousel.dataset.autoplay === 'true';
        const interval = parseInt(carousel.dataset.interval) || 5000;

        if (autoplay) {
            let autoplayTimer;

            function startAutoplay() {
                autoplayTimer = setInterval(() => {
                    if (currentIndex < totalSlides - 1) {
                        nextSlide();
                    } else {
                        currentIndex = 0;
                        updateCarousel();
                    }
                }, interval);
            }

            function stopAutoplay() {
                clearInterval(autoplayTimer);
            }

            // Pause on hover
            carousel.addEventListener('mouseenter', stopAutoplay);
            carousel.addEventListener('mouseleave', startAutoplay);

            // Pause on focus
            carousel.addEventListener('focusin', stopAutoplay);
            carousel.addEventListener('focusout', startAutoplay);

            startAutoplay();
        }

        // Initial update
        updateCarousel();
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousels);
    } else {
        initCarousels();
    }

    // Re-initialize after AJAX content load (for Gutenberg editor)
    if (typeof wp !== 'undefined' && wp.domReady) {
        wp.domReady(initCarousels);
    }
})();
