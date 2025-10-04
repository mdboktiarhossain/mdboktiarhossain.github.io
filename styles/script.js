// Academic Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Mobile menu functionality
    initializeMobileMenu();
    
    // Navigation functionality
    initializeNavigation();
    
    // Smooth scrolling for navigation links
    initializeSmoothScrolling();
    
    // Intersection Observer for active section highlighting
    initializeIntersectionObserver();
    
    // Initialize animations
    initializeAnimations();
});

// Mobile Menu Functions
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);
    
    function toggleMobileMenu() {
        const isOpen = sidebar.classList.contains('open');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        sidebar.classList.add('open');
        mobileOverlay.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        sidebar.classList.remove('open');
        mobileOverlay.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.style.overflow = '';
    }
    
    // Close mobile menu when clicking on navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                closeMobileMenu();
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeMobileMenu();
        }
    });
}

// Navigation Functions
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    // Handle all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for Active Section
function initializeIntersectionObserver() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveSection() {
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            
            // Check if section is in viewport
            if (sectionTop <= window.innerHeight / 2 && sectionTop + sectionHeight > window.innerHeight / 2) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Special case: if we're at the bottom of the page, activate contact
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            currentSection = 'contact';
        }
        
        // Special case: if we're at the top of the page, activate about
        if (window.scrollY <= 100) {
            currentSection = 'about';
        }
        
        // Update active navigation link
        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Use scroll event instead of Intersection Observer for more reliable detection
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial call
    updateActiveSection();
}

// Animation Functions
function initializeAnimations() {
    // Animate cards on scroll
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.education-card, .publication-card, .contact-card');
        
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !card.classList.contains('animated')) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.classList.add('animated');
                }, index * 100);
            }
        });
    };
    
    // Initial setup for cards
    const cards = document.querySelectorAll('.education-card, .publication-card, .contact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation on load
    setTimeout(animateOnScroll, 100);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll event listener with debouncing for performance
window.addEventListener('scroll', debounce(() => {
    // Add any scroll-based functionality here
}, 10));

// Handle CV download buttons (placeholder functionality)
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn') || e.target.closest('.btn')) {
        const button = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
        const buttonText = button.textContent.trim();
        
        if (buttonText.includes('CV') || buttonText.includes('Resume')) {
            // Placeholder for CV download functionality
            alert('CV download functionality would be implemented here. Please add your actual CV file and update the link.');
        }
    }
});

// Handle external links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[target="_blank"]');
    if (link) {
        // Add any analytics tracking here if needed
        console.log('External link clicked:', link.href);
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Handle Escape key to close mobile menu
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('open')) {
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            mobileMenuBtn.click();
        }
    }
    
    // Handle arrow keys for navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            const navLinks = Array.from(document.querySelectorAll('.nav-link'));
            const currentIndex = navLinks.indexOf(activeLink);
            
            let nextIndex;
            if (e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % navLinks.length;
            } else {
                nextIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
            }
            
            navLinks[nextIndex].click();
            e.preventDefault();
        }
    }
});

// Print styles support
window.addEventListener('beforeprint', function() {
    // Ensure sidebar is visible for printing
    const sidebar = document.getElementById('sidebar');
    sidebar.style.transform = 'translateX(0)';
    sidebar.style.position = 'static';
    
    // Adjust main content for printing
    const mainContent = document.querySelector('.main-content');
    mainContent.style.marginLeft = '0';
});

window.addEventListener('afterprint', function() {
    // Restore normal styles after printing
    location.reload();
});

// Performance optimization: Lazy load images if any are added
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initializeLazyLoading();

// Add focus management for accessibility
function initializeFocusManagement() {
    // Trap focus in mobile menu when open
    const sidebar = document.getElementById('sidebar');
    const focusableElements = sidebar.querySelectorAll(
        'a, button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    if (focusableElements.length > 0) {
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];
        
        sidebar.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
}

initializeFocusManagement();

// Add theme detection and handling
function initializeThemeHandling() {
    // Detect system theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Listen for theme changes
    prefersDark.addEventListener('change', (e) => {
        // Theme changed - could add custom handling here
        console.log('Theme preference changed to:', e.matches ? 'dark' : 'light');
    });
}

initializeThemeHandling();
