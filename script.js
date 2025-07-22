// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

  /**
   * Initializes the Typed.js animation for the hero section.
   */
  const initTypedJs = () => {
    const typedElement = document.querySelector("#typed-text");
    if (typedElement) {
      new Typed("#typed-text", {
        strings: ["I'm a TUian", "A Web Developer", "A Problem Solver", "A Tech Lover"],
        typeSpeed: 60,
        backSpeed: 30,
        loop: true
      });
    }
  };

  /**
   * Initializes the Intersection Observer to animate sections on scroll.
   */
  const initScrollAnimations = () => {
    const sections = document.querySelectorAll('.section');
    if (sections.length > 0) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });

      sections.forEach(section => {
        observer.observe(section);
      });
    }
  };

  /**
   * Adds a solid background to the navbar when scrolling down.
   */
  const initNavbarEffect = () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          navbar.classList.add('solid');
        } else {
          navbar.classList.remove('solid');
        }
      });
    }
  };

  /**
   * Shows or hides the "Back to Top" button based on scroll position.
   */
  const initBackToTopButton = () => {
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          backToTopButton.classList.add('show');
        } else {
          backToTopButton.classList.remove('show');
        }
      });
    }
  };

  /**
   * Initializes the profile picture flip on click.
   */
  const initProfileFlip = () => {
      const flipper = document.querySelector('.profile-flip-container');
      if(flipper) {
          flipper.addEventListener('click', () => {
              flipper.classList.toggle('flipped');
          });
      }
  };

  /**
   * Initializes the 3D "Featured Work" slider.
   */
  const initFeaturedSlider = () => {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;

    const slider = sliderContainer.querySelector('.slider');
    const slides = sliderContainer.querySelectorAll('.slide');
    const prevBtn = sliderContainer.querySelector('.prev-btn');
    const nextBtn = sliderContainer.querySelector('.next-btn');
    
    if (!slider || slides.length === 0 || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    let isTransitioning = false; // Flag to prevent rapid clicks
    const totalSlides = slides.length;
    const angle = 360 / totalSlides;
    const transitionTime = 600; // Must match the CSS transition duration
    
    const setupAndPositionSlider = () => {
        const slideWidth = slides[0].offsetWidth;
        // This formula calculates the distance from the center to push the slides out
        const tz = Math.round((slideWidth / 2) / Math.tan(Math.PI / totalSlides));

        slider.style.transform = `translateZ(${-tz}px) rotateY(${-currentIndex * angle}deg)`;

        slides.forEach((slide, index) => {
            const itemAngle = index * angle;
            slide.style.transform = `rotateY(${itemAngle}deg) translateZ(${tz}px)`;
        });
    };
    
    const updateSlider = () => {
        isTransitioning = true;
        
        setupAndPositionSlider();

        slides.forEach((slide, index) => {
            // This logic handles wrapping around the carousel for calculating distance
            let diff = (currentIndex - index + totalSlides) % totalSlides;
            if (diff > totalSlides / 2) {
                diff = totalSlides - diff;
            }

            // Set opacity based on distance from the current slide
            if (diff === 0) {
                slide.style.opacity = 1;
                slide.style.pointerEvents = 'auto'; // Center slide is clickable
            } else if (diff === 1) {
                slide.style.opacity = 0.6;
                slide.style.pointerEvents = 'none'; // Side slides are not
            } else {
                slide.style.opacity = 0.2;
                slide.style.pointerEvents = 'none'; // Far slides are not
            }
        });
        
        // Release the lock after the transition is complete
        setTimeout(() => {
            isTransitioning = false;
        }, transitionTime);
    };

    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return; // Exit if already moving
        currentIndex++;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return; // Exit if already moving
        currentIndex--;
        updateSlider();
    });
    
    // Initial setup on window load and resize
    window.addEventListener('resize', setupAndPositionSlider);
    setupAndPositionSlider(); // Initial setup
    updateSlider(); // Call once to set initial opacities
  };

  /**
   * Main function to initialize all scripts.
   */
  const init = () => {
    initTypedJs();
    initScrollAnimations();
    initNavbarEffect();
    initBackToTopButton();
    initProfileFlip();
    initFeaturedSlider();
  };

  // Run the initialization
  init();

});
