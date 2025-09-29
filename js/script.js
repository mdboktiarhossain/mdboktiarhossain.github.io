// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    // Function to manage the active state of nav items
    function setActiveNavItem(targetId) {
        navItems.forEach(navItem => {
            if (navItem.getAttribute('data-target') === targetId) {
                navItem.classList.add('active');
            } else {
                navItem.classList.remove('active');
            }
        });
    }

    // Function to scroll to the section
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            // Scroll to the corresponding section
            section.scrollIntoView({ behavior: 'smooth' });
            // Set the nav item as active
            setActiveNavItem(sectionId);
        }
    }

    // Add click event listener to each nav item
    navItems.forEach(navItem => {
        navItem.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            scrollToSection(targetId);
        });
    });

    //Function to change the active nav item based on the current scroll position
    function changeActiveNavItemOnScroll() {
        console.log("HEY")
        let scrollPosition = window.scrollY + window.innerHeight / 3; // Adjust as needed

        contentSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                setActiveNavItem(sectionId);
            }
        });
    }

    // Add scroll event listener to change active nav item as you scroll
    window.addEventListener('scroll', changeActiveNavItemOnScroll);

    // Set the initial active nav item based on scroll position
    changeActiveNavItemOnScroll();
});

