// Typed.js animation
const typed = new Typed("#typed-text", {
    strings: ["I'm TUian", "A Web Developer", "A Problem Solver", "A Tech Lover"],
    typeSpeed: 60,
    backSpeed: 30,
    loop: true
  });
  
  // Smooth scroll for navigation links
  document.querySelectorAll('.navbar-nav a, .sidenav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      targetElement.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Intersection Observer for section animations with delay
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100); // Slight delay based on section order (100ms)
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    observer.observe(section);
  });
