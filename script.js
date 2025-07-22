document.addEventListener('DOMContentLoaded', () => {

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

  const initScrollAnimations = () => {
    const sections = document.querySelectorAll('.section');
    if (sections.length > 0) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
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

  const initProfileFlip = () => {
      const flipper = document.querySelector('.profile-flip-container');
      if(flipper) {
          flipper.addEventListener('click', () => {
              flipper.classList.toggle('flipped');
          });
      }
  };

  const initFeaturedSlider = () => {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;

    const slider = sliderContainer.querySelector('.slider');
    const slides = sliderContainer.querySelectorAll('.slide');
    const prevBtn = sliderContainer.querySelector('.prev-btn');
    const nextBtn = sliderContainer.querySelector('.next-btn');
    
    if (!slider || slides.length === 0 || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    let isTransitioning = false;
    const totalSlides = slides.length;
    const angle = 360 / totalSlides;
    const transitionTime = 600;
    
    const setupAndPositionSlider = () => {
        const slideWidth = slides[0].offsetWidth;
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
            let diff = (currentIndex - index + totalSlides) % totalSlides;
            if (diff > totalSlides / 2) {
                diff = totalSlides - diff;
            }

            if (diff === 0) {
                slide.style.opacity = 1;
                slide.style.pointerEvents = 'auto';
            } else if (diff === 1) {
                slide.style.opacity = 0.6;
                slide.style.pointerEvents = 'none';
            } else {
                slide.style.opacity = 0.2;
                slide.style.pointerEvents = 'none';
            }
        });
        
        setTimeout(() => {
            isTransitioning = false;
        }, transitionTime);
    };

    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        currentIndex++;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        currentIndex--;
        updateSlider();
    });
    
    window.addEventListener('resize', setupAndPositionSlider);
    setupAndPositionSlider();
    updateSlider();
  };

  const initThemeSwitcher = () => {
    const themeToggle = document.getElementById('theme-toggle');
    const darkTheme = document.getElementById('dark-theme');
    const toggleIcon = themeToggle.querySelector('i');

    const setIcon = (isDark) => {
        if (isDark) {
            toggleIcon.classList.remove('fa-moon');
            toggleIcon.classList.add('fa-sun');
        } else {
            toggleIcon.classList.remove('fa-sun');
            toggleIcon.classList.add('fa-moon');
        }
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        darkTheme.disabled = false;
        setIcon(true);
    } else {
        darkTheme.disabled = true;
        setIcon(false);
    }

    themeToggle.addEventListener('click', () => {
        const isDark = !darkTheme.disabled;
        darkTheme.disabled = isDark;
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        setIcon(!isDark);
    });
  };

  const init = () => {
    initTypedJs();
    initScrollAnimations();
    initNavbarEffect();
    initBackToTopButton();
    initProfileFlip();
    initFeaturedSlider();
    initThemeSwitcher();
  };

  init();

});
