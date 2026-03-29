document.addEventListener('DOMContentLoaded', () => {
    // ═══════════════════════════════════════════════════════════════════════════
    // SHOPIFY EDITIONS WINTER 2026 - PREMIUM SCROLL ANIMATIONS & VISUAL EFFECTS
    // Featuring: Cursor glow, blur reveals, scroll velocity, parallax depth,
    // text splitting, smooth counters, section progress, and cinematic transitions
    // ═══════════════════════════════════════════════════════════════════════════

    // ═══════════════════════════════════════════════════════════════════════════
    // CURSOR GLOW EFFECT - Follows mouse with smooth lag
    // ═══════════════════════════════════════════════════════════════════════════
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);

    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        cursorGlow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('active');
    });

    function animateCursorGlow() {
        const speed = 0.08;
        glowX += (cursorX - glowX) * speed;
        glowY += (cursorY - glowY) * speed;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateCursorGlow);
    }
    animateCursorGlow();

    // ═══════════════════════════════════════════════════════════════════════════
    // DOT GRID BACKGROUND - Add to hero section
    // ═══════════════════════════════════════════════════════════════════════════
    const heroSection = document.querySelector('.hero');
    if (heroSection && !heroSection.querySelector('.dot-grid-bg')) {
        const dotGrid = document.createElement('div');
        dotGrid.className = 'dot-grid-bg animated';
        heroSection.insertBefore(dotGrid, heroSection.firstChild);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // GRADIENT MESH BACKGROUND - Add to feature sections
    // ═══════════════════════════════════════════════════════════════════════════
    const featureSection = document.querySelector('#features');
    if (featureSection && !featureSection.querySelector('.gradient-mesh')) {
        const gradientMesh = document.createElement('div');
        gradientMesh.className = 'gradient-mesh';
        featureSection.insertBefore(gradientMesh, featureSection.firstChild);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // SECTION PROGRESS INDICATOR - Right side navigation dots
    // ═══════════════════════════════════════════════════════════════════════════
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'section-progress';

        sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            dot.title = section.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            dot.addEventListener('click', () => {
                section.scrollIntoView({ behavior: 'smooth' });
            });
            progressContainer.appendChild(dot);
        });

        document.body.appendChild(progressContainer);

        // Update active dot on scroll
        function updateProgressDots() {
            const scrollPos = window.scrollY + window.innerHeight / 3;
            let activeIndex = 0;

            sections.forEach((section, index) => {
                if (scrollPos >= section.offsetTop) {
                    activeIndex = index;
                }
            });

            progressContainer.querySelectorAll('.progress-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });

            // Show/hide progress indicator based on scroll position
            if (window.scrollY > 200) {
                progressContainer.classList.add('visible');
            } else {
                progressContainer.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', () => requestAnimationFrame(updateProgressDots), { passive: true });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // TEXT SPLITTING - Split text into individual characters for animation
    // ═══════════════════════════════════════════════════════════════════════════
    function splitTextIntoChars(element) {
        const text = element.textContent;
        element.innerHTML = '';
        element.setAttribute('aria-label', text);

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${index * 0.03}s`;
            element.appendChild(span);
        });
    }

    // Apply text splitting to elements with .split-text class
    document.querySelectorAll('.split-text').forEach(splitTextIntoChars);

    // Apply wave text splitting
    document.querySelectorAll('.wave-text').forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.05}s`;
            el.appendChild(span);
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // SCROLL-LINKED OPACITY & SCALE - SHOPIFY STYLE
    // Elements fade and scale based on viewport position for cinematic effect
    // ═══════════════════════════════════════════════════════════════════════════
    const scrollFadeElements = document.querySelectorAll('.scroll-fade');
    const scrollZoomElements = document.querySelectorAll('.scroll-zoom');

    function updateScrollLinkedEffects() {
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;

        scrollFadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
            const maxDistance = viewportHeight * 0.7;
            const opacity = Math.max(0.2, 1 - (distanceFromCenter / maxDistance));
            const scale = Math.max(0.92, 1 - (distanceFromCenter / maxDistance) * 0.15);

            el.style.opacity = opacity;
            el.style.transform = `scale(${scale})`;
        });

        scrollZoomElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const progress = 1 - (rect.top / viewportHeight);
            const clampedProgress = Math.max(0, Math.min(1, progress));
            const scale = 0.75 + (clampedProgress * 0.25);

            el.style.transform = `scale(${scale})`;
            el.style.opacity = clampedProgress;
        });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // SMOOTH COUNTER ANIMATION - Animate numbers counting up
    // ═══════════════════════════════════════════════════════════════════════════
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();
        const suffix = element.dataset.suffix || '';
        const prefix = element.dataset.prefix || '';

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4); // Ease out quart
            const current = Math.round(start + (target - start) * easeProgress);

            element.textContent = prefix + current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Observe counter elements
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target) || 0;
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter-animate').forEach(el => counterObserver.observe(el));

    // ═══════════════════════════════════════════════════════════════════════════
    // SCROLL-TRIGGERED GLOW INTENSIFY
    // ═══════════════════════════════════════════════════════════════════════════
    const scrollGlowElements = document.querySelectorAll('.scroll-glow');

    function updateScrollGlow() {
        scrollGlowElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distance = Math.abs(centerY - viewportCenter);

            if (distance < window.innerHeight * 0.3) {
                el.classList.add('intense');
            } else {
                el.classList.remove('intense');
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // COLOR SHIFT ON SCROLL - Sections change color as they enter viewport
    // ═══════════════════════════════════════════════════════════════════════════
    const colorShiftSections = document.querySelectorAll('.color-shift');
    const colorClasses = ['shift-purple', 'shift-cyan', 'shift-pink'];

    function updateColorShift() {
        colorShiftSections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;

            colorClasses.forEach(cls => section.classList.remove(cls));

            if (inView) {
                section.classList.add(colorClasses[index % colorClasses.length]);
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // WAVE TEXT ANIMATION TRIGGER
    // ═══════════════════════════════════════════════════════════════════════════
    const waveTextObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animating');
            } else {
                entry.target.classList.remove('animating');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.wave-text').forEach(el => waveTextObserver.observe(el));

    // ═══════════════════════════════════════════════════════════════════════════
    // UNIFIED SCROLL HANDLER - Combines all scroll effects
    // ═══════════════════════════════════════════════════════════════════════════
    let scrollRAF;
    function handleScroll() {
        if (scrollRAF) return;

        scrollRAF = requestAnimationFrame(() => {
            updateScrollLinkedEffects();
            updateScrollGlow();
            updateColorShift();
            scrollRAF = null;
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ═══════════════════════════════════════════════════════════════════════════
    // ENHANCED REVEAL ANIMATIONS OBSERVER
    // ═══════════════════════════════════════════════════════════════════════════
    const enhancedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Handle reveal sequences
                if (entry.target.classList.contains('reveal-sequence')) {
                    entry.target.classList.add('visible');
                }

                // Handle split text
                if (entry.target.classList.contains('split-text')) {
                    entry.target.classList.add('visible');
                }

                // Handle flip cards
                if (entry.target.classList.contains('flip-card-3d')) {
                    entry.target.classList.add('visible');
                }

                // Handle line draws
                if (entry.target.classList.contains('line-draw')) {
                    entry.target.classList.add('visible');
                }

                enhancedObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    });

    // Observe new animation types
    const newAnimationSelectors = '.zoom-reveal, .blur-reveal-dramatic, .reveal-mask, .reveal-sequence, .split-text, .flip-card-3d, .line-draw, .hover-lift';
    document.querySelectorAll(newAnimationSelectors).forEach(el => enhancedObserver.observe(el));

    // ═══════════════════════════════════════════════════════════════════════════
    // SCROLL VELOCITY DETECTION
    // Detect fast scrolling and apply visual effects
    // ═══════════════════════════════════════════════════════════════════════════
    let lastScrollTop = 0;
    let scrollVelocity = 0;
    let scrollTimeout;
    const velocityElements = document.querySelectorAll('.scroll-velocity');

    function detectScrollVelocity() {
        const currentScroll = window.pageYOffset;
        scrollVelocity = Math.abs(currentScroll - lastScrollTop);
        lastScrollTop = currentScroll;

        if (scrollVelocity > 50) {
            velocityElements.forEach(el => el.classList.add('scrolling-fast'));
            document.body.classList.add('scrolling-fast');
        }

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            velocityElements.forEach(el => el.classList.remove('scrolling-fast'));
            document.body.classList.remove('scrolling-fast');
        }, 150);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ENHANCED INTERSECTION OBSERVER - Multi-type animations with smoother thresholds
    // ═══════════════════════════════════════════════════════════════════════════
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: [0, 0.1, 0.2, 0.3]
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Smooth stagger effect
                const siblings = entry.target.parentElement?.querySelectorAll('.fade-in-up, .reveal-up, .reveal-scale, .reveal-rotate, .reveal-blur');
                if (siblings && siblings.length > 1) {
                    const index = Array.from(siblings).indexOf(entry.target);
                    const delay = Math.min(index * 150, 1200);
                    entry.target.style.transitionDelay = `${delay}ms`;
                }

                // Use requestAnimationFrame for smoother animation trigger
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        entry.target.classList.add('visible');
                    });
                });

                // Trigger graph animations
                if (entry.target.classList.contains('graph-card')) {
                    const line = entry.target.querySelector('.graph-line');
                    if (line) setTimeout(() => line.classList.add('animate'), 300);

                    const radar = entry.target.querySelector('.radar-polygon');
                    if (radar) setTimeout(() => radar.classList.add('animate'), 400);

                    const heatmapContainer = entry.target.querySelector('.heatmap-container');
                    if (heatmapContainer && !heatmapContainer.hasChildNodes()) {
                        createHeatmap(heatmapContainer);
                    }
                }

                // Trigger stagger children animations
                if (entry.target.classList.contains('stagger-children')) {
                    entry.target.classList.add('visible');
                }

                // Trigger word reveal animations
                if (entry.target.classList.contains('word-reveal')) {
                    entry.target.classList.add('visible');
                }

                // Trigger character reveal animations
                if (entry.target.classList.contains('char-reveal')) {
                    entry.target.classList.add('visible');
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    function createHeatmap(container) {
        for (let i = 0; i < 50; i++) {
            const cell = document.createElement('div');
            cell.classList.add('heatmap-cell');
            container.appendChild(cell);

            const level = Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0;
            if (level > 0) {
                // CSS-driven delay for heatmap cells too
                cell.style.animationDelay = `${i * 20}ms`;
                requestAnimationFrame(() => cell.classList.add(`active-${level}`));
            }
        }
    }

    // Observe all animated elements - including new animation types
    const animatedElements = document.querySelectorAll('.fade-in-up, .reveal-up, .reveal-scale, .reveal-rotate, .reveal-blur, .stagger-children, .word-reveal, .char-reveal, .flow-step');
    animatedElements.forEach(el => observer.observe(el));

    // ═══════════════════════════════════════════════════════════════════════════
    // ENHANCED PARALLAX SCROLL EFFECT - SHOPIFY STYLE
    // Multi-layer parallax with smooth interpolation and scroll velocity awareness
    // ═══════════════════════════════════════════════════════════════════════════
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    const floatingOrbs = document.querySelectorAll('.floating-orb');
    const morphShapes = document.querySelectorAll('.morph-shape');

    let scrollY = 0;
    let targetScrollY = 0;
    let ticking = false;

    function updateParallax() {
        // Smooth scroll interpolation for buttery parallax
        scrollY += (targetScrollY - scrollY) * 0.08;

        // Parallax for data-parallax elements with smooth easing
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const yPos = -(scrollY * speed);
            const rotation = scrollY * speed * 0.008;
            el.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg)`;
        });

        // Enhanced parallax for floating orbs with sine wave movement
        floatingOrbs.forEach((orb, index) => {
            const speed = 0.025 + (index * 0.012);
            const yPos = scrollY * speed;
            const xPos = Math.sin(scrollY * 0.0015 + index * 1.5) * 40;
            const scale = 1 + Math.sin(scrollY * 0.0008 + index) * 0.08;
            orb.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${scale})`;
        });

        // Parallax for morph shapes with depth
        morphShapes.forEach((shape, index) => {
            const speed = 0.015 + (index * 0.008);
            const yPos = scrollY * speed;
            const rotation = scrollY * 0.01;
            shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });

        // Continue animation if not at target
        if (Math.abs(targetScrollY - scrollY) > 0.5) {
            requestAnimationFrame(updateParallax);
        } else {
            ticking = false;
        }
    }

    window.addEventListener('scroll', () => {
        targetScrollY = window.pageYOffset;
        detectScrollVelocity();

        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    // ═══════════════════════════════════════════════════════════════════════════
    // SECTION IN-VIEW DETECTION
    // Adds class when sections enter viewport for gradient transitions
    // ═══════════════════════════════════════════════════════════════════════════
    const sectionMorphObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.section-morph, section').forEach(section => {
        sectionMorphObserver.observe(section);
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // HORIZONTAL SCROLL ENHANCEMENT
    // Add mouse wheel horizontal scrolling for horizontal containers
    // ═══════════════════════════════════════════════════════════════════════════
    const horizontalContainers = document.querySelectorAll('.horizontal-scroll-container');
    horizontalContainers.forEach(container => {
        container.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                container.scrollLeft += e.deltaY * 2;
            }
        }, { passive: false });

        // Add scroll indicator dots
        const wrapper = container.closest('.horizontal-scroll-wrapper');
        if (wrapper) {
            const cards = container.querySelectorAll('.horizontal-card');
            if (cards.length > 0) {
                const dotsContainer = document.createElement('div');
                dotsContainer.className = 'scroll-dots';
                dotsContainer.style.cssText = 'display: flex; justify-content: center; gap: 8px; margin-top: 2rem;';

                cards.forEach((_, i) => {
                    const dot = document.createElement('div');
                    dot.style.cssText = `
                        width: 8px; height: 8px; border-radius: 50%;
                        background: ${i === 0 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)'};
                        transition: all 0.3s ease;
                        cursor: pointer;
                    `;
                    dot.addEventListener('click', () => {
                        cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
                    });
                    dotsContainer.appendChild(dot);
                });

                wrapper.appendChild(dotsContainer);

                // Update active dot on scroll
                container.addEventListener('scroll', () => {
                    const scrollLeft = container.scrollLeft;
                    const cardWidth = cards[0].offsetWidth + 32; // card width + gap
                    const activeIndex = Math.round(scrollLeft / cardWidth);
                    dotsContainer.querySelectorAll('div').forEach((dot, i) => {
                        dot.style.background = i === activeIndex ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)';
                        dot.style.transform = i === activeIndex ? 'scale(1.3)' : 'scale(1)';
                    });
                });
            }
        }
    });

    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // ENHANCED STICKY NAVIGATION
    // ═══════════════════════════════════════════════════════════════════════════
    const nav = document.querySelector('nav');
    let lastScrollY = 0;
    let navTicking = false;

    function updateNav() {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            nav.classList.add('scrolled');
            document.body.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
            document.body.classList.remove('scrolled');
        }

        // Scroll Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById("scroll-progress");
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }

        // Update section visibility for gradient transitions
        updateSectionVisibility();

        lastScrollY = currentScroll;
        navTicking = false;
    }

    function updateSectionVisibility() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible) {
                section.classList.add('in-view');
            }
        });
    }

    window.addEventListener('scroll', () => {
        if (!navTicking) {
            requestAnimationFrame(updateNav);
            navTicking = true;
        }
    }, { passive: true });

    // Enhanced Hero Parallax Effect with smoother movement
    const hero = document.querySelector('.hero');
    const heroGlow = document.querySelector('.hero-glow');

    if (hero && heroGlow) {
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;

        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            targetX = (e.clientX - rect.left - rect.width / 2) / rect.width * 40;
            targetY = (e.clientY - rect.top - rect.height / 2) / rect.height * 40;
        });

        function animateGlow() {
            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;

            heroGlow.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;
            requestAnimationFrame(animateGlow);
        }
        animateGlow();

        // Initialize enhanced Particles
        createParticles(heroGlow);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ENHANCED 3D TILT EFFECT FOR CARDS - SHOPIFY STYLE
    // Shopify-style smooth 3D perspective on hover with buttery transitions
    // ═══════════════════════════════════════════════════════════════════════════
    const spotlightCards = document.querySelectorAll('.spotlight-card, .tilt-card');
    spotlightCards.forEach(card => {
        let bounds;
        let animationFrame;
        let isHovering = false;
        let currentRotateX = 0;
        let currentRotateY = 0;
        let targetRotateX = 0;
        let targetRotateY = 0;

        function rotateToMouse(e) {
            if (!isHovering) return;

            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const leftX = mouseX - bounds.x;
            const topY = mouseY - bounds.y;
            const center = {
                x: leftX - bounds.width / 2,
                y: topY - bounds.height / 2
            };

            card.style.setProperty('--mouse-x', `${leftX}px`);
            card.style.setProperty('--mouse-y', `${topY}px`);

            // Enhanced 3D tilt effect with smoother values
            targetRotateX = (center.y / bounds.height) * -3;
            targetRotateY = (center.x / bounds.width) * 3;
            const glowX = (leftX / bounds.width) * 100;
            const glowY = (topY / bounds.height) * 100;

            card.style.setProperty('--glow-x', `${glowX}%`);
            card.style.setProperty('--glow-y', `${glowY}%`);
        }

        function animateTilt() {
            if (!isHovering) return;

            // Smooth interpolation for buttery movement
            currentRotateX += (targetRotateX - currentRotateX) * 0.1;
            currentRotateY += (targetRotateY - currentRotateY) * 0.1;

            card.style.transform = `perspective(1000px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) translateY(-8px) scale(1.02)`;

            animationFrame = requestAnimationFrame(animateTilt);
        }

        card.addEventListener('mouseenter', () => {
            isHovering = true;
            bounds = card.getBoundingClientRect();
            card.style.transition = 'box-shadow 0.6s var(--ease-shopify), border-color 0.6s var(--ease-shopify)';
            card.addEventListener('mousemove', rotateToMouse);
            animateTilt();
        });

        card.addEventListener('mouseleave', () => {
            isHovering = false;
            card.removeEventListener('mousemove', rotateToMouse);
            cancelAnimationFrame(animationFrame);
            currentRotateX = 0;
            currentRotateY = 0;
            targetRotateX = 0;
            targetRotateY = 0;
            card.style.transition = 'transform 0.8s var(--ease-shopify), box-shadow 0.8s var(--ease-shopify), border-color 0.8s var(--ease-shopify)';
            card.style.transform = '';
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // MAGNETIC HOVER EFFECT FOR BUTTONS - SHOPIFY STYLE
    // Elements subtly follow the cursor with smooth interpolation
    // ═══════════════════════════════════════════════════════════════════════════
    const magneticElements = document.querySelectorAll('.btn, .magnetic-hover');
    magneticElements.forEach(el => {
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        let animationFrame;
        let isHovering = false;

        function animateMagnetic() {
            if (!isHovering) return;

            // Smooth interpolation
            currentX += (targetX - currentX) * 0.15;
            currentY += (targetY - currentY) * 0.15;

            el.style.transform = `translate(${currentX}px, ${currentY}px)`;

            if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
                animationFrame = requestAnimationFrame(animateMagnetic);
            }
        }

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            targetX = (e.clientX - rect.left - rect.width / 2) * 0.2;
            targetY = (e.clientY - rect.top - rect.height / 2) * 0.2;

            if (!isHovering) {
                isHovering = true;
                animateMagnetic();
            }
        });

        el.addEventListener('mouseleave', () => {
            isHovering = false;
            targetX = 0;
            targetY = 0;
            cancelAnimationFrame(animationFrame);

            // Smooth return to original position
            const returnAnimation = () => {
                currentX += (0 - currentX) * 0.15;
                currentY += (0 - currentY) * 0.15;
                el.style.transform = `translate(${currentX}px, ${currentY}px)`;

                if (Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1) {
                    requestAnimationFrame(returnAnimation);
                } else {
                    el.style.transform = '';
                }
            };
            returnAnimation();
        });

        el.addEventListener('mouseenter', () => {
            el.style.transition = 'box-shadow 0.6s var(--ease-shopify), background 0.6s var(--ease-shopify), border-color 0.6s var(--ease-shopify)';
        });
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // SCROLL-TRIGGERED SCALE EFFECT
    // Elements scale based on their position in viewport
    // ═══════════════════════════════════════════════════════════════════════════
    const scrollScaleElements = document.querySelectorAll('.scroll-scale');

    function updateScrollScale() {
        scrollScaleElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distance = Math.abs(centerY - viewportCenter);
            const maxDistance = window.innerHeight / 2;
            const scale = 1 - (distance / maxDistance) * 0.1;

            el.style.transform = `scale(${Math.max(0.9, Math.min(1, scale))})`;
        });
    }

    if (scrollScaleElements.length > 0) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateScrollScale);
        }, { passive: true });
    }

    // Add button ripple effect
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Typing Effect
    const typingText = document.getElementById('typing-text');
    const words = ["Tutor", "Guide", "Mentor"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect
    setTimeout(type, 1000);

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
            const isOpen = navLinks.classList.contains('mobile-open');
            document.body.style.overflow = isOpen ? 'hidden' : '';
            document.body.classList.toggle('menu-open', isOpen);
        });

        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('mobile-open');
                document.body.style.overflow = '';
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Newsletter Form Feedback
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const submitBtn = newsletterForm.querySelector('.btn');
        const emailInput = newsletterForm.querySelector('.newsletter-input');

        submitBtn.addEventListener('click', () => {
            if (emailInput.value && emailInput.value.includes('@')) {
                // Success feedback
                submitBtn.textContent = '✓';
                submitBtn.style.background = '#4ADE80';
                emailInput.value = '';
                emailInput.placeholder = 'Thanks! We\'ll be in touch.';

                setTimeout(() => {
                    submitBtn.textContent = '→';
                    submitBtn.style.background = '';
                    emailInput.placeholder = 'Enter your email';
                }, 3000);
            } else {
                // Error feedback
                emailInput.style.borderColor = 'var(--accent-tertiary)';
                emailInput.style.boxShadow = '0 0 20px rgba(236, 72, 153, 0.15)';

                setTimeout(() => {
                    emailInput.style.borderColor = '';
                    emailInput.style.boxShadow = '';
                }, 2000);
            }
        });
    }
});

// Enhanced Particle Effect with smoother animation
// Generate Heatmap using an IIFE to avoid polluting global scope or conflicts
(function initHeatmap() {
    const heatmapContainer = document.getElementById('heatmap-container');
    if (!heatmapContainer) return;

    function generate() {
        heatmapContainer.innerHTML = '';
        const days = 70; // 7 rows x 10 cols

        for (let i = 0; i < days; i++) {
            const cell = document.createElement('div');
            cell.classList.add('heatmap-cell');

            // Randomly assign activity levels
            const rand = Math.random();
            if (rand > 0.85) cell.classList.add('active-4');
            else if (rand > 0.65) cell.classList.add('active-3');
            else if (rand > 0.4) cell.classList.add('active-2');
            else if (rand > 0.2) cell.classList.add('active-1');

            // Staggered entrance
            cell.style.animation = `fadeIn 0.5s ease forwards ${i * 0.02}s`;
            cell.style.opacity = '0';

            heatmapContainer.appendChild(cell);
        }
    }

    generate();
    heatmapContainer.addEventListener('click', generate);

    // Add keyframe for simple fade in
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
    @keyframes fadeIn {
        to { opacity: 1; }
    }`;
    document.head.appendChild(styleSheet);
})();

// Enhanced Particle Effect with smoother animation
function createParticles(container) {
    const particles = [];

    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${particle.style.width};
            background: rgba(99, 102, 241, ${Math.random() * 0.4 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            box-shadow: 0 0 ${Math.random() * 12 + 6}px rgba(99, 102, 241, 0.25);
            will-change: transform, opacity;
        `;

        container.appendChild(particle);

        particles.push({
            el: particle,
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            targetX: 0,
            targetY: 0,
            speed: Math.random() * 0.02 + 0.01,
            baseOpacity: Math.random() * 0.4 + 0.1
        });
    }

    function animateParticles() {
        const time = Date.now() * 0.001;

        particles.forEach((p, index) => {
            const smoothFactor = 0.015 + p.speed * 0.5;
            p.x += (p.targetX - p.x) * smoothFactor;
            p.y += (p.targetY - p.y) * smoothFactor;

            if (Math.random() < 0.008) {
                p.targetX = Math.random() * 120 - 60;
                p.targetY = Math.random() * 120 - 60;
            }

            const opacityWave = Math.sin(time * 0.8 + index * 0.5) * 0.12;
            const opacity = p.baseOpacity + opacityWave;
            const scaleWave = 1 + Math.sin(time * 0.6 + index * 0.3) * 0.1;

            p.el.style.transform = `translate(${p.x}px, ${p.y}px) scale(${scaleWave})`;
            p.el.style.opacity = Math.max(0.08, Math.min(0.5, opacity));
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

// Interactive Demo Logic
function runDemo(type, event) {
    const placeholder = document.getElementById('demo-placeholder');
    const loader = document.getElementById('demo-loader');
    const result = document.getElementById('demo-result');

    // Smooth fade out current content
    placeholder.classList.add('demo-hidden');
    result.classList.add('demo-hidden');
    result.classList.remove('demo-visible');

    setTimeout(() => {
        placeholder.style.display = 'none';
        result.style.display = 'none';
        loader.style.display = 'block';
        // Trigger reflow
        void loader.offsetWidth;
        loader.style.opacity = '1';
    }, 300);

    // Track active button state with smooth transition
    document.querySelectorAll('.demo-controls .btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.transition = 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)';
    });
    if (event?.target) {
        event.target.classList.add('active');
    }

    // Simulate AI processing steps with varied timing
    const steps = [
        { text: "Analyzing content...", duration: 450 },
        { text: "Identifying key concepts...", duration: 500 },
        { text: "Generating output...", duration: 550 },
        { text: "Finalizing...", duration: 300 }
    ];

    let stepIndex = 0;
    const updateLoader = () => {
        if (stepIndex < steps.length) {
            stepIndex++;
            setTimeout(updateLoader, steps[stepIndex - 1].duration);
        } else {
            showResult();
        }
    };

    updateLoader();

    function showResult() {
        loader.style.opacity = '0';

        setTimeout(() => {
            loader.style.display = 'none';
            result.style.display = 'block';

            // Trigger reflow
            void result.offsetWidth;

            result.classList.remove('demo-hidden');
            result.classList.add('demo-visible');
        }, 200);

        let content = '';
        if (type === 'quiz') {
            content = `
                <div class="demo-content-enter">
                    <div class="app-card" style="width: 100%; max-width: 400px; margin: 0 auto; background: rgba(30, 30, 35, 0.9);">
                        <div class="card-header">
                            <div class="card-dot red"></div>
                            <div class="card-dot yellow"></div>
                            <div class="card-dot green"></div>
                        </div>
                        <div class="card-body">
                            <h4 class="demo-result-header" style="color: var(--accent-primary); font-size: 1rem; margin-top: 0;">Generated Quiz: Biology 101</h4>
                            <div class="quiz-ui">
                                <p style="font-size: 0.9rem; margin-bottom: 0.8rem; color: white;">1. What is the primary function of the mitochondria?</p>
                                <div class="quiz-opt">A. Protein Synthesis</div>
                                <div class="quiz-opt selected">B. Energy Production <span class="check">✓</span></div>
                                <div class="quiz-opt">C. Cell Division</div>
                            </div>
                            <div class="grade-badge" style="top: 10px; right: 10px; transform: scale(1) rotate(15deg); width: 40px; height: 40px; font-size: 1rem;">A+</div>
                        </div>
                    </div>
                </div>
            `;
        } else if (type === 'summary') {
            content = `
                <div class="demo-content-enter">
                    <div class="app-card" style="width: 100%; max-width: 400px; margin: 0 auto; background: rgba(30, 30, 35, 0.9);">
                         <div class="card-header">
                            <div class="card-dot red"></div>
                            <div class="card-dot yellow"></div>
                            <div class="card-dot green"></div>
                        </div>
                        <div class="card-body">
                            <h4 class="demo-result-header" style="color: var(--accent-secondary); font-size: 1rem; margin-top: 0;">Summary: Photosynthesis</h4>
                             <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                                <strong style="color: white;">Key Concept:</strong> Plants convert light energy into chemical energy.<br><br>
                                • <strong>Inputs:</strong> Sunlight, Water, CO2<br>
                                • <strong>Outputs:</strong> Glucose (Energy), Oxygen<br>
                                • <strong>Location:</strong> Chloroplasts
                            </p>
                        </div>
                    </div>
                </div>
            `;
        } else if (type === 'plan') {
            content = `
                <div class="demo-content-enter">
                    <div class="app-card" style="width: 100%; max-width: 400px; margin: 0 auto; background: rgba(30, 30, 35, 0.9);">
                         <div class="card-header">
                            <div class="card-dot red"></div>
                            <div class="card-dot yellow"></div>
                            <div class="card-dot green"></div>
                        </div>
                        <div class="card-body">
                            <h4 class="demo-result-header" style="color: var(--accent-primary); font-size: 1rem; margin-top: 0;">Study Plan: Finals Week</h4>
                            <div style="display: flex; flex-direction: column; gap: 0.8rem;">
                                <div class="demo-plan-item" style="border: 1px solid rgba(255,255,255,0.1);">
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <span style="width: 8px; height: 8px; background: #4ADE80; border-radius: 50%; box-shadow: 0 0 5px #4ADE80;"></span>
                                        <span>Mon 9:00 AM</span>
                                    </div>
                                    <span style="color: var(--text-secondary);">Biology Review</span>
                                </div>
                                <div class="demo-plan-item" style="border: 1px solid rgba(255,255,255,0.1);">
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <span style="width: 8px; height: 8px; background: var(--accent-secondary); border-radius: 50%; box-shadow: 0 0 5px var(--accent-secondary);"></span>
                                        <span>Tue 2:00 PM</span>
                                    </div>
                                    <span style="color: var(--text-secondary);">Chemistry Quiz</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (type === 'podcast') {
            content = `
                <div class="demo-content-enter">
                    <div class="app-card" style="width: 100%; max-width: 400px; margin: 0 auto; background: rgba(30, 30, 35, 0.9);">
                         <div class="card-header">
                            <div class="card-dot red"></div>
                            <div class="card-dot yellow"></div>
                            <div class="card-dot green"></div>
                        </div>
                        <div class="card-body" style="text-align: center;">
                            <h4 class="demo-result-header" style="color: var(--accent-secondary); font-size: 1rem; margin-top: 0;">Now Playing: Biology Lecture 1</h4>
                             <div class="visual-podcast" style="height: 60px; margin-bottom: 1.5rem; justify-content: center; gap: 4px;">
                                <div class="sound-wave" style="animation-delay: 0s; height: 40%;"></div>
                                <div class="sound-wave" style="animation-delay: 0.1s; height: 70%;"></div>
                                <div class="sound-wave" style="animation-delay: 0.2s; height: 100%;"></div>
                                <div class="sound-wave" style="animation-delay: 0.3s; height: 60%;"></div>
                                <div class="sound-wave" style="animation-delay: 0.4s; height: 80%;"></div>
                                <div class="sound-wave" style="animation-delay: 0.5s; height: 50%;"></div>
                            </div>
                            <div style="display: flex; justify-content: center; gap: 1rem;">
                                <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.8rem;">⏮ 10s</button>
                                <button class="btn btn-primary" style="padding: 0.5rem 1.5rem; font-size: 0.8rem;">⏸ Pause</button>
                                <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.8rem;">10s ⏭</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (type === 'lecture') {
            content = `
                <div class="demo-content-enter">
                    <div class="app-card" style="width: 100%; max-width: 400px; margin: 0 auto; background: rgba(30, 30, 35, 0.9);">
                         <div class="card-header">
                            <div class="card-dot red"></div>
                            <div class="card-dot yellow"></div>
                            <div class="card-dot green"></div>
                        </div>
                        <div class="card-body">
                             <h4 class="demo-result-header" style="color: var(--accent-primary); font-size: 1rem; margin-top: 0;">AI Lecturer</h4>
                             <div class="demo-lecturer-box" style="border: none; background: transparent; padding: 0;">
                                <div style="position: absolute; top: 1rem; right: 1rem; font-size: 1.5rem;">🗣️</div>
                                <p style="font-size: 1rem; color: white; font-style: italic; margin-bottom: 0.5rem;">"As we can see here, the mitochondria is essential for cellular respiration..."</p>
                                <div style="height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; margin-top: 1rem; overflow: hidden;">
                                    <div style="height: 100%; width: 45%; background: var(--accent-primary); animation: progress 2s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p style="font-size: 0.8rem; color: var(--text-tertiary); text-align: center; margin-top: 1rem;">Syncing with slide 4/20...</p>
                        </div>
                    </div>
                </div>
            `;
        }
        result.innerHTML = content;

        // Add entrance animation to child elements
        const children = result.querySelectorAll('.demo-content-enter > *');
        children.forEach((child, index) => {
            child.classList.add('demo-item-enter');
            child.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// Add progress animation keyframes if not present
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes progress {
    0% { width: 45%; }
    50% { width: 55%; }
    100% { width: 45%; }
}`;
document.head.appendChild(styleSheet);

// ═══════════════════════════════════════════════════════════════════════════
// EPIC FLOW SECTION - SCROLL ANIMATIONS
// Powerful animations that trigger as user scrolls through the flow
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// SCROLLYTELLING FLOW SECTION - Cinematic Scroll Experience
// Powerful scroll-triggered animations with parallax and reveals
// ═══════════════════════════════════════════════════════════════════════════

function initScrollytellingFlow() {
    const stepScenes = document.querySelectorAll('.step-scene');
    const finaleScene = document.querySelector('.finale-scene');
    const parallaxLayers = document.querySelectorAll('.parallax-bg-layer');
    
    if (stepScenes.length === 0) return;
    
    // Intersection Observer for scene activation
    const sceneObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sticky = entry.target.querySelector('.scene-sticky');
            if (sticky) {
                if (entry.isIntersecting) {
                    sticky.classList.add('active');
                } else {
                    sticky.classList.remove('active');
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-10% 0px -10% 0px'
    });
    
    // Observe all step scenes
    stepScenes.forEach(scene => {
        sceneObserver.observe(scene);
    });
    
    // Observe finale scene
    if (finaleScene) {
        const finaleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const content = entry.target.querySelector('.finale-content');
                if (content && entry.isIntersecting) {
                    content.classList.add('active');
                    animateFinaleStats();
                }
            });
        }, { threshold: 0.3 });
        
        finaleObserver.observe(finaleScene);
    }
    
    // Parallax effect on scroll
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxLayers.forEach((layer, index) => {
            const speed = (index + 1) * 0.3;
            const yPos = -(scrolled * speed);
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
    
    // Add SVG gradient for progress ring
    addProgressRingGradient();
}

// Animate finale statistics
function animateFinaleStats() {
    const statNums = document.querySelectorAll('.stat-num');
    
    statNums.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Add SVG gradient definition for progress ring
function addProgressRingGradient() {
    const progressRing = document.querySelector('.progress-ring svg');
    if (!progressRing) return;
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'ringGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('style', 'stop-color:#6366F1;stop-opacity:1');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '50%');
    stop2.setAttribute('style', 'stop-color:#A855F7;stop-opacity:1');
    
    const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop3.setAttribute('offset', '100%');
    stop3.setAttribute('style', 'stop-color:#84CC16;stop-opacity:1');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    gradient.appendChild(stop3);
    defs.appendChild(gradient);
    progressRing.insertBefore(defs, progressRing.firstChild);
}

// Initialize scrollytelling when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollytellingFlow);
} else {
    initScrollytellingFlow();
}

// Add CSS for active step state
const epicFlowStyles = document.createElement('style');
epicFlowStyles.textContent = `
    .step-card.active-step {
        transform: translateX(10px) scale(1.05) !important;
        border-color: var(--accent-primary) !important;
        box-shadow: 
            0 30px 80px rgba(99, 102, 241, 0.5),
            0 0 0 2px rgba(99, 102, 241, 0.3) !important;
        z-index: 10;
    }
    
    .step-card.active-step .step-icon-large {
        transform: scale(1.2) rotate(360deg);
        transition: transform 0.8s var(--ease-shopify);
    }
`;
document.head.appendChild(epicFlowStyles);


/* ═══════════════════════════════════════════════════════════════════════════
   APPLE-STYLE FLOW SECTION SCROLL ANIMATIONS
   ═══════════════════════════════════════════════════════════════════════════ */

// Intersection Observer for scroll-triggered animations
const flowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all scene elements
document.addEventListener('DOMContentLoaded', () => {
    const sceneCanvases = document.querySelectorAll('.scene-canvas');
    const sceneTexts = document.querySelectorAll('.scene-text');
    
    sceneCanvases.forEach(canvas => flowObserver.observe(canvas));
    sceneTexts.forEach(text => flowObserver.observe(text));
    
    // Restart SVG animations when they come into view
    const scenes = document.querySelectorAll('.flow-cinematic-scene');
    scenes.forEach(scene => {
        flowObserver.observe(scene);
        
        scene.addEventListener('transitionend', () => {
            if (scene.classList.contains('visible')) {
                // Trigger SVG animations
                const svg = scene.querySelector('.scene-svg');
                if (svg) {
                    // Clone and replace to restart animations
                    const clone = svg.cloneNode(true);
                    svg.parentNode.replaceChild(clone, svg);
                }
            }
        });
    });
});


/* ═══════════════════════════════════════════════════════════════════════════
   INTRO HERO - WEBGL BACKGROUND (Revolution-style energy field)
   ═══════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('intro-nebula-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const heroSection = document.getElementById('introduction');
    if (!heroSection) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const clock = new THREE.Clock();

    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        precision mediump float;
        uniform vec2 iResolution;
        uniform float iTime;
        uniform vec2 iMouse;
        varying vec2 vUv;

        float hash(vec2 p){
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(in vec2 p){
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                       mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
        }

        float fbm(vec2 p){
            float v = 0.0;
            float a = 0.5;
            mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
            for (int i = 0; i < 5; i++) {
                v += a * noise(p);
                p = m * p;
                a *= 0.55;
            }
            return v;
        }

        void main() {
            vec2 uv = vUv;
            vec2 p = (uv - 0.5) * vec2(iResolution.x / iResolution.y, 1.0) * 2.0;
            float t = iTime * 0.25;

            vec2 mouse = (iMouse / iResolution - 0.5) * vec2(iResolution.x / iResolution.y, 1.0) * 2.0;
            float mDist = length(p - mouse);
            float mGlow = smoothstep(0.9, 0.0, mDist) * 0.35;

            float n1 = fbm(p * 2.0 + vec2(t * 0.8, -t * 0.5));
            float n2 = fbm(p * 3.4 + vec2(-t * 0.4, t * 0.7));
            float bands = sin((p.x + n1 * 0.85) * 9.5 + t * 6.0) * 0.5 + 0.5;
            bands += sin((p.x + n2 * 0.6) * 16.0 - t * 3.4) * 0.25 + 0.25;

            vec3 c1 = vec3(1.0, 0.16, 0.62);
            vec3 c2 = vec3(0.65, 0.18, 1.0);
            vec3 c3 = vec3(0.10, 0.52, 1.0);
            vec3 base = mix(c1, c2, smoothstep(0.1, 0.9, uv.y));
            base = mix(base, c3, smoothstep(0.25, 1.0, uv.x));

            float flow = smoothstep(0.15, 1.0, bands + n1 * 0.65);
            vec3 col = base * flow;

            float core = smoothstep(0.9, 0.0, length(p * vec2(1.0, 1.25)));
            col += vec3(0.35, 0.25, 0.75) * core * 0.35;
            col += base * mGlow;

            float vignette = smoothstep(1.35, 0.2, length(p));
            col *= vignette;

            gl_FragColor = vec4(col, 0.95);
        }
    `;

    const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2() },
        iMouse: { value: new THREE.Vector2(0, 0) }
    };

    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const resize = () => {
        const rect = heroSection.getBoundingClientRect();
        const w = Math.max(1, rect.width);
        const h = Math.max(1, rect.height);
        renderer.setSize(w, h, false);
        uniforms.iResolution.value.set(w, h);
    };

    const onMouseMove = (e) => {
        const rect = heroSection.getBoundingClientRect();
        uniforms.iMouse.value.set(e.clientX - rect.left, rect.height - (e.clientY - rect.top));
    };

    window.addEventListener('resize', resize);
    heroSection.addEventListener('mousemove', onMouseMove);
    resize();

    const animate = () => {
        uniforms.iTime.value = clock.getElapsedTime();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();
});

/* ═══════════════════════════════════════════════════════════════════════════
   THREE.JS NEBULA BACKGROUND FOR FLOW SECTION - HIGH TECH SHADER
   ═══════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('flow-nebula-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const flowSection = document.querySelector('.explosive-flow-section');
    if (!flowSection) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    
    const clock = new THREE.Clock();

    // Vertex Shader
    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `;

    // Fragment Shader - High-Tech Nebula Effect with Purple/Blue Gradients
    const fragmentShader = `
        precision mediump float;
        uniform vec2 iResolution;
        uniform float iTime;
        uniform vec2 iMouse;
        uniform float explosionTrigger;
        varying vec2 vUv;

        #define t iTime
        mat2 m(float a){ 
            float c=cos(a), s=sin(a); 
            return mat2(c,-s,s,c); 
        }
        
        float map(vec3 p){
            p.xz *= m(t*0.4);
            p.xy *= m(t*0.3);
            vec3 q = p*2. + t;
            return length(p + vec3(sin(t*0.7))) * log(length(p)+1.0)
                 + sin(q.x + sin(q.z + sin(q.y))) * 0.5 - 1.0;
        }

        void mainImage(out vec4 O, in vec2 fragCoord) {
            vec2 uv = fragCoord / min(iResolution.x, iResolution.y) - vec2(.9, .5);
            uv.x += .4;
            vec3 col = vec3(0.0);
            float d = 2.5;
            
            // Ray-march with explosion effect
            for (int i = 0; i <= 5; i++) {
                vec3 p = vec3(0,0,5.) + normalize(vec3(uv, -1.)) * d;
                float rz = map(p);
                float f  = clamp((rz - map(p + 0.1)) * 0.5, -0.1, 1.0);
                
                // Purple/Blue gradient colors (matching website theme)
                vec3 color1 = vec3(0.39, 0.40, 0.95); // #6366F1 - Indigo
                vec3 color2 = vec3(0.66, 0.33, 0.97); // #A855F7 - Purple
                vec3 color3 = vec3(0.93, 0.28, 0.60); // #EC4899 - Pink
                vec3 color4 = vec3(0.00, 0.78, 1.00); // #00C8FF - Cyan
                
                // Mix colors based on position and time
                vec3 baseColor = mix(color1, color2, sin(t * 0.3 + p.x) * 0.5 + 0.5);
                baseColor = mix(baseColor, color3, sin(t * 0.2 + p.y) * 0.3 + 0.3);
                baseColor = mix(baseColor, color4, sin(t * 0.4 + p.z) * 0.2 + 0.2);
                
                // Add explosion intensity
                float explosionIntensity = explosionTrigger * 2.0;
                vec3 l = baseColor * (1.0 + f * 3.0 + explosionIntensity);
                
                col = col * l + smoothstep(2.5, 0.0, rz) * 0.7 * l;
                d += min(rz, 1.0);
            }
            
            // Add center glow effect
            vec2 center = iResolution * 0.5;
            float dist = distance(fragCoord, center);
            float radius = min(iResolution.x, iResolution.y) * 0.5;
            float glow = 1.0 - smoothstep(0.0, radius * 0.8, dist);
            col += vec3(0.39, 0.40, 0.95) * glow * 0.3 * (1.0 + explosionTrigger);
            
            O = vec4(col, 1.0);
        }

        void main() {
            mainImage(gl_FragColor, vUv * iResolution);
        }
    `;

    // Uniforms
    const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2() },
        iMouse: { value: new THREE.Vector2() },
        explosionTrigger: { value: 0 }
    };

    const material = new THREE.ShaderMaterial({ 
        vertexShader, 
        fragmentShader, 
        uniforms 
    });
    
    // Expose uniforms globally for explosion trigger
    window.flowShaderUniforms = uniforms;
    
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    // Resize handler - size to Flow section only
    const onResize = () => {
        const rect = flowSection.getBoundingClientRect();
        const w = rect.width;
        const h = flowSection.scrollHeight;
        renderer.setSize(w, h);
        uniforms.iResolution.value.set(w, h);
    };

    // Mouse handler
    const onMouseMove = (e) => {
        uniforms.iMouse.value.set(e.clientX, window.innerHeight - e.clientY);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    onResize();

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        uniforms.iTime.value = clock.getElapsedTime();
        renderer.render(scene, camera);
    }
    animate();
});

/* ═══════════════════════════════════════════════════════════════════════════
   APPLE-STYLE SCROLL-DRIVEN FLOW ANIMATION
   Continuous scroll-linked narrative like Apple product reveals
   ═══════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const flowSection = document.querySelector('.apple-scroll-flow');
    if (!flowSection) {
        console.warn('⚠️ Flow section not found');
        return;
    }

    const scrollContainer = flowSection.querySelector('.flow-scroll-container');
    const scenes = flowSection.querySelectorAll('.flow-scene');
    const progressBar = flowSection.querySelector('.progress-bar');
    
    // Scene references
    const sceneHero = flowSection.querySelector('.scene-hero');
    const sceneProblem = flowSection.querySelector('.scene-problem');
    const sceneExplosion = flowSection.querySelector('.scene-explosion');
    const sceneReorganize = flowSection.querySelector('.scene-reorganize');
    const sceneFinale = flowSection.querySelector('.scene-finale');
    
    // Verify all scenes exist
    if (!sceneHero || !sceneProblem || !sceneExplosion || !sceneReorganize || !sceneFinale) {
        console.error('❌ Some flow scenes are missing!');
        return;
    }
    
    console.log('✅ Flow section found with', scenes.length, 'scenes');
    
    // Flow debug toggle (keep false in normal development)
    const FLOW_DEBUG = false;
    let debugProgress, debugScene, debugTop, debugDirection, debugHero, debugProblem, debugExplosion, debugReorganize, debugFinale;
    
    // Helper to update scene debug info
    function updateSceneDebug() {
        if (!FLOW_DEBUG) return;
        
        if (debugHero) debugHero.textContent = `Hero: opacity=${sceneHero.style.opacity}, visible=${sceneHero.style.visibility}, z=${sceneHero.style.zIndex}`;
        if (debugProblem) debugProblem.textContent = `Problem: opacity=${sceneProblem.style.opacity}, visible=${sceneProblem.style.visibility}, z=${sceneProblem.style.zIndex}`;
        if (debugExplosion) debugExplosion.textContent = `Explosion: opacity=${sceneExplosion.style.opacity}, visible=${sceneExplosion.style.visibility}, z=${sceneExplosion.style.zIndex}`;
        if (debugReorganize) debugReorganize.textContent = `Reorganize: opacity=${sceneReorganize.style.opacity}, visible=${sceneReorganize.style.visibility}, z=${sceneReorganize.style.zIndex}`;
        if (debugFinale) debugFinale.textContent = `Finale: opacity=${sceneFinale.style.opacity}, visible=${sceneFinale.style.visibility}, z=${sceneFinale.style.zIndex}`;
    }
    
    // Helper function to hide ALL scenes - DEFINE BEFORE USE
    function hideAllScenes() {
        [sceneHero, sceneProblem, sceneExplosion, sceneReorganize, sceneFinale].forEach(scene => {
            scene.classList.remove('active');
            scene.style.opacity = '0';
            scene.style.visibility = 'hidden';
            scene.style.zIndex = '1';
            scene.style.pointerEvents = 'none';
            scene.style.display = 'none'; // Force hide to prevent overlay
        });
        sceneExplosion.classList.remove('exploded');
        updateSceneDebug();
    }
    
    // Helper function to show a specific scene - DEFINE BEFORE USE
    function showScene(scene, opacity = 1) {
        scene.classList.add('active');
        scene.style.display = 'flex'; // Show the scene
        scene.style.visibility = 'visible';
        scene.style.zIndex = '100';
        scene.style.pointerEvents = 'auto';
        scene.style.opacity = opacity.toString();
        updateSceneDebug();
    }
    
    // DON'T make hero scene visible initially - let scroll handler control it
    // The scene will show when user scrolls to the flow section
    // hideAllScenes(); // MOVED BELOW - call after debug panel is created
    
    // Optional debug panel (disabled by default)
    if (FLOW_DEBUG) {
        const debugPanel = document.createElement('div');
        debugPanel.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: #fff;
            padding: 15px;
            border-radius: 10px;
            font-family: monospace;
            font-size: 11px;
            z-index: 10000;
            border: 2px solid #6366F1;
            min-width: 250px;
            max-height: 400px;
            overflow-y: auto;
        `;
        debugPanel.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 10px; color: #6366F1;">Flow Debug</div>
            <div>Progress: <span id="debug-progress">0%</span></div>
            <div>Active: <span id="debug-scene">None</span></div>
            <div>Section Top: <span id="debug-top">0</span></div>
            <div>Scroll Dir: <span id="debug-direction">-</span></div>
            <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #6366F1;">
                <div style="font-weight: bold; margin-bottom: 5px;">Scene States:</div>
                <div id="debug-hero" style="font-size: 10px;">Hero: hidden</div>
                <div id="debug-problem" style="font-size: 10px;">Problem: hidden</div>
                <div id="debug-explosion" style="font-size: 10px;">Explosion: hidden</div>
                <div id="debug-reorganize" style="font-size: 10px;">Reorganize: hidden</div>
                <div id="debug-finale" style="font-size: 10px;">Finale: hidden</div>
            </div>
        `;
        document.body.appendChild(debugPanel);

        debugProgress = document.getElementById('debug-progress');
        debugScene = document.getElementById('debug-scene');
        debugTop = document.getElementById('debug-top');
        debugDirection = document.getElementById('debug-direction');
        debugHero = document.getElementById('debug-hero');
        debugProblem = document.getElementById('debug-problem');
        debugExplosion = document.getElementById('debug-explosion');
        debugReorganize = document.getElementById('debug-reorganize');
        debugFinale = document.getElementById('debug-finale');
    }
    
    
    // Get shader uniforms
    let shaderUniforms = null;
    setTimeout(() => {
        if (window.flowShaderUniforms) {
            shaderUniforms = window.flowShaderUniforms;
            console.log('✅ Shader uniforms connected');
        }
    }, 100);

    // Track last scroll direction
    let lastScrollTop = 0;
    let scrollDirection = 'down';
    
    // Scroll handler - Apple-style with smooth easing
    function handleFlowScroll() {
        if (!flowSection) return;
        
        // Detect scroll direction
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scrollDirection = currentScrollTop > lastScrollTop ? 'down' : 'up';
        lastScrollTop = currentScrollTop;
        
        const sectionRect = flowSection.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        const viewportHeight = window.innerHeight;
        
        // If section is not sufficiently in viewport yet, hide everything
        if (sectionTop > viewportHeight * 0.25) {
            hideAllScenes();
            if (debugScene) debugScene.textContent = 'Not in view yet';
            return;
        }
        
        // If section is far above viewport, hide all scenes (scrolled past)
        if (sectionTop < -sectionHeight) {
            hideAllScenes();
            if (debugScene) debugScene.textContent = 'Scrolled past';
            return;
        }
        
        // Calculate scroll progress (0 to 1) with smooth easing
        const rawProgress = -sectionTop / (sectionHeight - viewportHeight);
        const scrollProgress = Math.max(0, Math.min(1, rawProgress));
        
        // If scrolling up and at the beginning of the section, hide everything
        if (scrollDirection === 'up' && scrollProgress < 0.02) {
            hideAllScenes();
            if (debugScene) debugScene.textContent = 'Scrolling up - hidden';
            return;
        }
        
        // Debug logging
        if (FLOW_DEBUG) {
            console.log('Scroll Progress:', (scrollProgress * 100).toFixed(1) + '%', 'Section Top:', sectionTop.toFixed(0));
        }
        
        // Update debug panel
        if (debugProgress) {
            debugProgress.textContent = (scrollProgress * 100).toFixed(1) + '%';
            debugTop.textContent = sectionTop.toFixed(0) + 'px';
            if (debugDirection) debugDirection.textContent = scrollDirection;
        }
        
        // Update progress bar
        if (progressBar) {
            progressBar.style.width = `${scrollProgress * 100}%`;
        }
        
        // Show/hide progress indicator
        if (scrollProgress > 0.05 && scrollProgress < 0.95) {
            flowSection.classList.add('scrolling');
        } else {
            flowSection.classList.remove('scrolling');
        }
        
        // Scene 1: Hero (0% - 18%)
        if (scrollProgress < 0.18) {
            hideAllScenes();
            const heroProgress = scrollProgress / 0.18;
            const heroEase = 1 - Math.pow(1 - heroProgress, 3);
            const burst = Math.sin(heroProgress * Math.PI);

            // Smooth entrance: fade in over first 5% of scroll, then fade out
            const entranceFade = scrollDirection === 'down' ? Math.min(1, scrollProgress / 0.05) : 1;
            const exitFade = 1 - heroProgress * 0.92;
            showScene(sceneHero, entranceFade * exitFade);
            sceneHero.style.transform = `scale(${0.9 + heroEase * 0.16}) translateY(${24 - heroEase * 24}px)`;

            const heroTitle = sceneHero.querySelector('.flow-main-title');
            const heroSubtitle = sceneHero.querySelector('.flow-main-subtitle');
            const heroBadge = sceneHero.querySelector('.hero-badge');

            if (heroTitle) {
                heroTitle.style.transform = `translateY(${24 - heroEase * 22}px) scale(${0.86 + heroEase * 0.31})`;
                heroTitle.style.letterSpacing = `${-0.045 + burst * 0.018}em`;
                heroTitle.style.textShadow = `0 0 ${24 + heroEase * 34 + burst * 24}px rgba(99, 102, 241, ${0.3 + heroEase * 0.25 + burst * 0.2})`;
                heroTitle.style.filter = `brightness(${0.88 + heroEase * 0.22 + burst * 0.14}) saturate(${0.92 + heroEase * 0.2 + burst * 0.14})`;
            }

            if (heroSubtitle) {
                heroSubtitle.style.transform = `translateY(${20 - heroEase * 16}px) scale(${0.95 + heroEase * 0.08})`;
                heroSubtitle.style.opacity = `${0.68 + (1 - heroEase) * 0.32}`;
            }

            if (heroBadge) {
                heroBadge.style.transform = `translateY(${14 - heroEase * 12}px) scale(${0.94 + heroEase * 0.12})`;
                heroBadge.style.boxShadow = `0 0 ${12 + heroEase * 16 + burst * 22}px rgba(168, 85, 247, ${0.16 + heroEase * 0.18 + burst * 0.22})`;
            }

            if (debugScene) debugScene.textContent = 'Hero';
        }
        // Transition gap (18% - 20%) - nothing visible
        else if (scrollProgress >= 0.18 && scrollProgress < 0.20) {
            hideAllScenes();
            if (debugScene) debugScene.textContent = 'Transition';
        }
        // Scene 2: Problem/Chaos (20% - 36%)
        else if (scrollProgress >= 0.20 && scrollProgress < 0.36) {
            hideAllScenes();
            const chaosProgress = (scrollProgress - 0.20) / 0.16;
            
            // Smooth fade in
            showScene(sceneProblem, Math.min(1, chaosProgress * 3));
            sceneProblem.style.transform = 'scale(1)';
            if (debugScene) debugScene.textContent = 'Problem';

            // Animate scene title with blur-reveal-dramatic style entrance
            const sceneTitle = sceneProblem.querySelector('.scene-title');
            if (sceneTitle) {
                const titleProgress = Math.min(1, chaosProgress * 5);
                const titleEase = 1 - Math.pow(1 - titleProgress, 4);
                sceneTitle.style.opacity = titleEase;
                sceneTitle.style.filter = `blur(${(1 - titleEase) * 24}px)`;
                sceneTitle.style.transform = `translateY(${(1 - titleEase) * 60}px) scale(${0.88 + titleEase * 0.12})`;
            }
            
            // Animate chaos items with stagger
            const chaosItems = sceneProblem.querySelectorAll('.chaos-item');
            chaosItems.forEach((item, index) => {
                const delay = index * 0.08;
                const itemProgress = Math.max(0, Math.min(1, (chaosProgress - delay) / 0.3));
                const eased = 1 - Math.pow(1 - itemProgress, 3);
                item.style.opacity = eased;
                item.style.transform = `translate(-50%, -50%) rotate(${eased * 15}deg) scale(${0.8 + eased * 0.2})`;
            });
            
            // Animate question marks with bounce
            const questions = sceneProblem.querySelectorAll('.chaos-question');
            questions.forEach((q, index) => {
                const delay = index * 0.12;
                const qProgress = Math.max(0, Math.min(1, (chaosProgress - delay) / 0.3));
                const bounce = qProgress < 0.5 ? 2 * qProgress * qProgress : 1 - Math.pow(-2 * qProgress + 2, 2) / 2;
                q.style.opacity = bounce;
                q.style.transform = `translate(-50%, -50%) scale(${bounce})`;
            });
        }
        // Scene 3: Explosion (36% - 56%)
        else if (scrollProgress >= 0.36 && scrollProgress < 0.56) {
            hideAllScenes();
            showScene(sceneExplosion, 1);
            sceneExplosion.style.transform = 'scale(1)';
            const explosionProgress = (scrollProgress - 0.36) / 0.20;
            if (debugScene) debugScene.textContent = 'Explosion';

            // Animate explosion scene title with blur-reveal entrance
            const explosionTitle = sceneExplosion.querySelector('.scene-title');
            if (explosionTitle) {
                const titleProgress = Math.min(1, explosionProgress * 4);
                const titleEase = 1 - Math.pow(1 - titleProgress, 4);
                explosionTitle.style.opacity = titleEase;
                explosionTitle.style.filter = `blur(${(1 - titleEase) * 24}px)`;
                const isMobile = window.innerWidth <= 768;
                if (isMobile) {
                    explosionTitle.style.transform = `translateY(${(1 - titleEase) * 60}px) scale(${0.88 + titleEase * 0.12})`;
                    // Stagger pill reveal based on scroll progress
                    const pills = sceneExplosion.querySelectorAll('.mobile-feature-pill');
                    pills.forEach((pill, i) => {
                        const pillDelay = i * 0.06;
                        const pillProgress = Math.min(1, Math.max(0, (explosionProgress - 0.15 - pillDelay) / 0.25));
                        const pillEase = 1 - Math.pow(1 - pillProgress, 3);
                        pill.style.opacity = pillEase;
                        pill.style.transform = `translateY(${(1 - pillEase) * 14}px) scale(${0.92 + pillEase * 0.08})`;
                    });
                } else {
                    explosionTitle.style.transform = `translateX(-50%) translateY(${(1 - titleEase) * 60}px) scale(${0.88 + titleEase * 0.12})`;
                }
            }
            
            // Cards explode out immediately
            sceneExplosion.classList.add('exploded');
            
            const cards = sceneExplosion.querySelectorAll('.feature-card-mini');
            cards.forEach((card, index) => {
                const delay = index * 0.05;
                const cardProgress = Math.max(0, Math.min(1, (explosionProgress - delay) / 0.3));
                const eased = cardProgress < 0.5 ? 4 * cardProgress * cardProgress * cardProgress : 1 - Math.pow(-2 * cardProgress + 2, 3) / 2;
                
                card.style.opacity = eased;
                
                // Get position
                const position = card.getAttribute('data-position');
                let tx = 0, ty = 0;
                
                switch(position) {
                    case 'tl': tx = -250; ty = -250; break;
                    case 't': tx = -50; ty = -300; break;
                    case 'tr': tx = 150; ty = -250; break;
                    case 'l': tx = -300; ty = -50; break;
                    case 'r': tx = 200; ty = -50; break;
                    case 'bl': tx = -250; ty = 150; break;
                    case 'b': tx = -50; ty = 200; break;
                    case 'br': tx = 150; ty = 150; break;
                }
                
                card.style.transform = `translate(${tx * eased}%, ${ty * eased}%) scale(${eased})`;
                card.style.setProperty('--tx', `${tx}%`);
                card.style.setProperty('--ty', `${ty}%`);
            });
            
            // Fade in background image (desktop only — mobile handles it via CSS)
            const bgImage = sceneExplosion.querySelector('.explosion-bg-image');
            if (bgImage && window.innerWidth > 768) {
                bgImage.style.opacity = explosionProgress * 0.3;
            }
        }
        // Scene 4: Reorganize (56% - 84%)
        else if (scrollProgress >= 0.56 && scrollProgress < 0.84) {
            hideAllScenes();
            const reorganizeProgress = (scrollProgress - 0.56) / 0.28;
            
            // Smooth fade in
            showScene(sceneReorganize, Math.min(1, reorganizeProgress * 2));
            sceneReorganize.style.transform = 'scale(1)';
            if (debugScene) debugScene.textContent = 'Reorganize';
            
            // Animate function blocks with stagger and 3D effect
            const blocks = sceneReorganize.querySelectorAll('.function-block');
            blocks.forEach((block, index) => {
                const blockDelay = index * 0.12;
                const blockProgress = Math.max(0, Math.min(1, (reorganizeProgress - blockDelay) / 0.3));
                const eased = 1 - Math.pow(1 - blockProgress, 3);
                block.style.opacity = eased;
                block.style.transform = `scale(${0.8 + (eased * 0.2)}) rotateY(${-15 + (eased * 15)}deg)`;
            });
        }
        // Scene 5: Finale (84% - 97%)
        else if (scrollProgress >= 0.84 && scrollProgress < 0.97) {
            hideAllScenes();
            const finaleProgress = (scrollProgress - 0.84) / 0.13;
            
            // Fade in from 84-89%, stay visible 89-97%
            let opacity;
            if (scrollProgress < 0.89) {
                // Fade in phase (84-89%)
                const fadeInProgress = (scrollProgress - 0.84) / 0.05;
                opacity = fadeInProgress;
            } else {
                // Stay visible (85-95%)
                opacity = 1;
            }
            
            showScene(sceneFinale, opacity);
            sceneFinale.style.transform = `scale(${0.95 + (finaleProgress * 0.05)})`;
            if (debugScene) debugScene.textContent = 'Finale';
        }
        // After 97% - hide everything (finale disappears)
        else if (scrollProgress >= 0.97) {
            hideAllScenes();
            if (debugScene) debugScene.textContent = 'Complete - Finale Hidden';
        }
    }

    // Throttled scroll handler for performance (60fps)
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleFlowScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial call to set up first scene
    handleFlowScroll();
    
    // Also call on load to ensure proper initialization
    window.addEventListener('load', () => {
        setTimeout(() => {
            handleFlowScroll();
            console.log('✅ Apple-style Flow scroll animation initialized and ready');
        }, 100);
    });
    
    console.log('✅ Flow scroll listeners attached');
});


// ═══════════════════════════════════════════════════════════════════════════
// ZOOM PARALLAX EFFECT - Vanilla JavaScript Implementation
// ═══════════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    const parallaxSection = document.querySelector('.zoom-parallax-section');
    if (!parallaxSection) return;

    const container = parallaxSection.querySelector('.zoom-parallax-container');
    const images = parallaxSection.querySelectorAll('.parallax-image-wrapper');
    
    if (!container || images.length === 0) return;

    // Define scale ranges for each image (matching React component behavior)
    const scaleRanges = [
        { start: 1, end: 4 },   // img-1
        { start: 1, end: 5 },   // img-2
        { start: 1, end: 6 },   // img-3
        { start: 1, end: 5 },   // img-4
        { start: 1, end: 6 }    // img-5
    ];

    function updateZoomParallax() {
        const rect = container.getBoundingClientRect();
        const containerTop = rect.top;
        const containerHeight = rect.height;
        const viewportHeight = window.innerHeight;

        // Calculate scroll progress (0 to 1)
        // Progress is 0 when container top is at viewport bottom
        // Progress is 1 when container bottom is at viewport top
        const scrollProgress = Math.max(0, Math.min(1, 
            (viewportHeight - containerTop) / (containerHeight + viewportHeight)
        ));

        // Apply scale to each image based on scroll progress
        images.forEach((img, index) => {
            const range = scaleRanges[index] || { start: 1, end: 5 };
            const scale = range.start + (range.end - range.start) * scrollProgress;
            img.style.transform = `scale(${scale})`;
        });
    }

    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateZoomParallax();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial call
    updateZoomParallax();
    
    console.log('✅ Zoom Parallax effect initialized');
});

// ═══════════════════════════════════════════════════════════════════════════
// 4-LEVEL LEARNING LOOP - Circular Interaction
// ═══════════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    const loopDiagram = document.getElementById('llDiagram');
    if (!loopDiagram) return;

    const stages = Array.from(loopDiagram.querySelectorAll('.ll-stage'));
    const mobileCardsWrap = document.querySelector('.ll-mobile-cards');
    const mobileCards = mobileCardsWrap ? Array.from(mobileCardsWrap.querySelectorAll('.ll-mc')) : [];
    const mobileDots = Array.from(document.querySelectorAll('.ll-mobile-dots span'));

    let activeIndex = 0;
    let isPaused = false;
    let timer = null;

    const setActive = (index) => {
        activeIndex = index % stages.length;

        stages.forEach((stage, i) => {
            stage.classList.toggle('active', i === activeIndex);
        });

        mobileCards.forEach((card, i) => {
            card.classList.toggle('active', i === activeIndex);
        });

        mobileDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
    };

    const startAutoRotate = () => {
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            if (isPaused) return;
            setActive((activeIndex + 1) % stages.length);
        }, 5200);
    };

    // Hover: pause/resume auto rotation
    loopDiagram.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    loopDiagram.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    // Click stage: expand details, also set active
    stages.forEach((stage, index) => {
        stage.addEventListener('click', () => {
            const isExpanded = stage.classList.contains('expanded');
            stages.forEach((s) => {
                s.classList.remove('expanded');
                const panel = s.querySelector('.ll-detail-panel');
                if (panel) panel.style.display = 'none';
            });
            if (!isExpanded) {
                stage.classList.add('expanded');
                const panel = stage.querySelector('.ll-detail-panel');
                if (panel) panel.style.display = 'block';
            }
            setActive(index);
        });
    });

    // Mobile: swipe cards + sticky mini progress indicator
    if (mobileCardsWrap && mobileCards.length > 0) {
        mobileCardsWrap.addEventListener('scroll', () => {
            const wrapCenter = mobileCardsWrap.scrollLeft + mobileCardsWrap.clientWidth / 2;
            let nearestIndex = 0;
            let minDistance = Infinity;

            mobileCards.forEach((card, i) => {
                const center = card.offsetLeft + card.clientWidth / 2;
                const distance = Math.abs(center - wrapCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestIndex = i;
                }
            });

            setActive(nearestIndex);
        }, { passive: true });

        mobileCards.forEach((card, i) => {
            card.addEventListener('click', () => {
                card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                setActive(i);
            });
        });
    }

    setActive(0);
    startAutoRotate();
});
