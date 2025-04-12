// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    
    // Create mobile menu HTML
    mobileMenu.innerHTML = `
        <div class="mobile-menu-close"><i class="fas fa-times"></i></div>
        <div class="mobile-menu-links">
            <a href="#features">Features</a>
            <a href="#design">Design</a>
            <a href="#reviews">Reviews</a>
            <a href="#faq">FAQ</a>
        </div>
        <div class="mobile-cta">
            <a href="#buy-now" class="btn primary">Buy Now</a>
        </div>
    `;
    
    document.body.appendChild(mobileMenu);
    
    // Mobile menu toggle functionality
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close mobile menu
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close menu when clicking on overlay
    overlay.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close menu when clicking on links
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a, .mobile-cta a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle active class for clicked item
            item.classList.toggle('active');
        });
    });

    // Custom parallax effect for the parallax section
    const parallaxSection = document.querySelector('.parallax-section');
    if (parallaxSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const sectionOffset = parallaxSection.offsetTop;
            const distance = sectionOffset - scrollPosition;
            
            // Only apply parallax effect when the section is in view
            if (distance < window.innerHeight && distance > -parallaxSection.offsetHeight) {
                const yValue = (distance / 10);
                parallaxSection.style.backgroundPosition = `center ${yValue}px`;
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for proper scrolling position
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Additional animation for product image in hero section
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        // Add 3D rotation effect on mouse move
        document.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            // Apply rotation only if the image is in viewport
            const rect = heroImage.getBoundingClientRect();
            if (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            ) {
                heroImage.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            }
        });
        
        // Reset rotation when mouse leaves window
        document.addEventListener('mouseleave', function() {
            heroImage.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        });
    }

    // Custom scroll animations for elements without AOS
    const customAnimateElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
    
    function checkCustomAnimations() {
        customAnimateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check for elements in viewport
    checkCustomAnimations();
    
    // Check on scroll
    window.addEventListener('scroll', checkCustomAnimations);
});