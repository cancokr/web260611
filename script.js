document.addEventListener('DOMContentLoaded', function() {

    // --- Sticky Header ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Smooth Scrolling for Nav Links ---
    const navLinks = document.querySelectorAll('nav a[href^="#"], .hero-content a[href^="#"], .scroll-down');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Modal Logic ---
    const modalTriggers = document.querySelectorAll('.learn-more');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');

    // Function to open a modal
    const openModal = (modalId) => {
        console.log('Opening modal:', modalId);
        const modal = document.getElementById(modalId);
        console.log('Modal element:', modal);
        if (modal) {
            // First close any open modals
            document.querySelectorAll('.modal.show').forEach(m => {
                m.classList.remove('show');
                m.style.display = 'none';
            });
            
            // Reset the modal state
            modal.style.display = 'flex';
            modal.style.opacity = '0';
            modal.style.pointerEvents = 'auto';
            
            // Force reflow/repaint
            void modal.offsetHeight;
            
            // Show the modal
            modal.classList.add('show');
            modal.style.opacity = '1';
            
            // Prevent background scrolling
            document.body.style.overflow = 'hidden';
            
            console.log('Modal should be visible now');
        } else {
            console.error('Modal not found with ID:', modalId);
        }
    };

    // Function to close a modal
    const closeModal = (modal) => {
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.classList.remove('show');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300); // Match this with the CSS transition time
        }
    };

    // Event listeners for modal triggers
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            console.log('Modal trigger clicked. Modal ID:', modalId);
            console.log('Modal element exists:', document.getElementById(modalId) !== null);
            openModal(modalId);
        });
    });

    // Event listeners for close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal with the 'Escape' key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    closeModal(modal);
                }
            });
        }
    });
});