const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const closeMobileMenu = document.getElementById('close-mobile-menu');

// Toggle mobile menu visibility and hamburger icon animation
hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
});

// Close mobile menu when close button is clicked
closeMobileMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
});

// Close mobile menu when a link inside it is clicked (optional)
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
    });
});

// Add a simple search functionality (for demonstration)
const searchInputDesktop = document.querySelector('.navbar .search-input');
const searchInputMobile = document.querySelector('#mobile-menu .search-input');

const handleSearch = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
        const searchTerm = event.target.value || searchInputDesktop.value; // Get value from clicked button or current input
        if (searchTerm.trim()) {
            console.log('Searching for:', searchTerm);
            // In a real application, you'd redirect or filter content here
        }
    }
};

// Listen for 'Enter' key press on search inputs
searchInputDesktop.addEventListener('keypress', handleSearch);
searchInputMobile.addEventListener('keypress', handleSearch);

// Listen for click on search icons (if you want to trigger search on icon click)
document.querySelectorAll('.search-icon').forEach(icon => {
    icon.addEventListener('click', (event) => {
        // Find the associated input field
        const input = event.target.closest('div').querySelector('input');
        if (input) {
            handleSearch({ key: 'Enter', target: input }); // Simulate Enter key press
        }
    });
});

// Prevent body scrolling when mobile menu is open
const toggleBodyScroll = () => {
    if (mobileMenu.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
};

// Observe changes to the mobile menu's 'open' class
const observer = new MutationObserver(toggleBodyScroll);
observer.observe(mobileMenu, { attributes: true, attributeFilter: ['class'] });

// Initial check for body scroll
toggleBodyScroll();


// Carousel Logic
const carouselSlidesContainer = document.getElementById('carousel-slides');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselPrevBtn = document.getElementById('carousel-prev');
const carouselNextBtn = document.getElementById('carousel-next');
const carouselDotsContainer = document.getElementById('carousel-dots');

let currentSlideIndex = 0;
let autoPlayInterval;

function showSlide(index) {
    // Hide all slides and remove active class
    carouselSlides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Remove active class from all dots
    Array.from(carouselDotsContainer.children).forEach(dot => {
        dot.classList.remove('active');
    });

    // Ensure index is within bounds
    if (index >= carouselSlides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = carouselSlides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    // Show the current slide and add active class to corresponding dot
    carouselSlides[currentSlideIndex].classList.add('active');
    carouselDotsContainer.children[currentSlideIndex].classList.add('active');

    // Re-trigger animation for the text in the active slide
    const activeText = carouselSlides[currentSlideIndex].querySelector('.animate-welcome-text');
    if (activeText) {
        activeText.style.animation = 'none'; // Reset animation
        void activeText.offsetWidth; // Trigger reflow
        activeText.style.animation = null; // Re-apply animation
    }
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
    resetAutoPlay();
}

function prevSlide() {
    showSlide(currentSlideIndex - 1);
    resetAutoPlay();
}

function createDots() {
    carouselSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoPlay();
        });
        carouselDotsContainer.appendChild(dot);
    });
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    createDots();
    showSlide(0); // Show the first slide initially
    startAutoPlay(); // Start auto-play
});

// Add event listeners for carousel arrows
carouselPrevBtn.addEventListener('click', prevSlide);
carouselNextBtn.addEventListener('click', nextSlide);