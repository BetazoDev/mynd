document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Scroll Effect for Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.top = '1rem';
            nav.style.padding = '0.5rem 2rem';
            nav.style.background = 'rgba(255, 255, 255, 0.85)';
        } else {
            nav.style.top = '1.5rem';
            nav.style.padding = '0.75rem 2rem';
            nav.style.background = 'rgba(255, 255, 255, 0.7)';
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Track scroll direction for a custom feel
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            // Scrolling down - hide nav slightly?
        } else {
            // Scrolling up
        }
        lastScrollTop = st <= 0 ? 0 : st;
    }, false);

    // Apply observer to various elements
    document.querySelectorAll('.glass-card, .service-card, .bento-item, .faq-item, .reveal-stagger').forEach(el => {
        observer.observe(el);
    });

    // Handle background move effect
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const blobs = document.querySelectorAll('.blob');
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navContent = document.querySelector('.nav-content');
    const menuIcon = menuBtn.querySelector('i');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navContent.classList.toggle('active');
            const isActive = navContent.classList.contains('active');
            
            // Change icon
            if (isActive) {
                menuBtn.innerHTML = '<i data-lucide="x"></i>';
            } else {
                menuBtn.innerHTML = '<i data-lucide="menu"></i>';
            }
            lucide.createIcons();
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a, .nav-cta').forEach(link => {
        link.addEventListener('click', () => {
            navContent.classList.remove('active');
            menuBtn.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });
    });

    // Simple Smooth Scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjusted for smaller nav
                    behavior: 'smooth'
                });
            }
        });
    });
});
