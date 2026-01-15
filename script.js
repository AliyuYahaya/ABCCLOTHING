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

    // Simple scroll reveal effect
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

    // Initialize Gallery
    initProductGallery();
});

// Product Gallery Logic
const productImages = {
    'Jeans': [
        'assets/images/jeans/IMG_5577.jpeg',
        'assets/images/jeans/IMG_5578.jpeg',
        'assets/images/jeans/IMG_5579.jpeg',
        'assets/images/jeans/IMG_5584.jpeg',
        'assets/images/jeans/IMG_5586.jpeg'
    ],
    'Skirts & Dresses': [
        'assets/images/denimdresses&skirts/IMG_5573.jpeg',
        'assets/images/denimdresses&skirts/IMG_5574.jpeg',
        'assets/images/denimdresses&skirts/IMG_5575.jpeg',
        'assets/images/denimdresses&skirts/IMG_5581.jpeg',
        'assets/images/denimdresses&skirts/IMG_5585.jpeg',
        'assets/images/denimdresses&skirts/IMG_5587.jpeg'
    ],

    'Semi-formal Pants': [
        'assets/images/semiformalpants/IMG_5570.jpeg',
        'assets/images/semiformalpants/IMG_5589.jpeg',
        'assets/images/semiformalpants/IMG_5590.jpeg',
        'assets/images/semiformalpants/IMG_5591.jpeg',
        'assets/images/semiformalpants/IMG_5592.jpeg'
    ]
};

function initProductGallery() {
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach(item => {
        const titleElement = item.querySelector('h3');
        if (!titleElement) return;

        const category = titleElement.textContent.trim();
        const images = productImages[category];

        if (images && images.length > 0) {
            const imgElement = item.querySelector('img');
            if (!imgElement) return;

            let currentIndex = 0;

            // Random start index to prevent all cards showing same image order
            currentIndex = Math.floor(Math.random() * images.length);
            imgElement.src = images[currentIndex];

            // Interval for rotation (randomized start delay to desync animations)
            const intervalTime = 4000 + Math.random() * 2000; // 4-6s

            setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                const nextImage = images[currentIndex];

                // Start fade out
                imgElement.classList.add('fade-out');

                setTimeout(() => {
                    // Swap source
                    imgElement.src = nextImage;

                    // Wait for load or just fade in
                    imgElement.onload = () => {
                        imgElement.classList.remove('fade-out');
                    };

                    // Fallback in case onload is instant or fails
                    setTimeout(() => {
                        if (imgElement.classList.contains('fade-out')) {
                            imgElement.classList.remove('fade-out');
                        }
                    }, 100);

                }, 500); // Wait for fade-out transition (0.5s)

            }, intervalTime);
        }
    });
}
