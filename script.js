document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navList = document.getElementById('nav-list');

    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            
            // Change icon based on state
            if (navList.classList.contains('active')) {
                mobileToggle.textContent = '✕';
            } else {
                mobileToggle.textContent = '☰';
            }
        });
    }

    // Optional: Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navList.classList.contains('active') && 
            !navList.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            navList.classList.remove('active');
            mobileToggle.textContent = '☰';
        }
    });

    // Simple scroll reveal effect (optional, as we used CSS animations on load)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to elements that might be below the fold if we want scroll animations
    // Currently, CSS handles the initial load animation.
});
