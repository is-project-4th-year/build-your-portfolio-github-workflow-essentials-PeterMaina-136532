// ===== MOBILE NAVIGATION TOGGLE =====
const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.getElementById("nav-menu");

mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on nav links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar height

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ===== ACTIVE NAVIGATION LINK HIGHLIGHTING =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const highlightActiveLink = () => {
  const scrollPosition = window.scrollY + 100; // Offset for better UX

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      // Remove active class from all links
      navLinks.forEach((link) => link.classList.remove("active"));

      // Add active class to current section's link
      const activeLink = document.querySelector(
        `.nav-link[href="#${sectionId}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
};

// Update active link on scroll
window.addEventListener("scroll", highlightActiveLink);

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");

      // Trigger skill bar animations
      if (entry.target.classList.contains("skills-showcase")) {
        animateSkillBars();
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".hero-text > *, .about-text, .skills-showcase, .section-header"
  );
  animateElements.forEach((el) => observer.observe(el));
});

// ===== SKILL BAR ANIMATIONS =====
const animateSkillBars = () => {
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach((item, index) => {
    const progressBar = item.querySelector(".skill-progress");
    const level = item.getAttribute("data-level");

    if (progressBar && level) {
      setTimeout(() => {
        progressBar.style.width = level + "%";
        progressBar.style.setProperty("--skill-width", level + "%");
      }, index * 200); // Stagger the animations
    }
  });
};

// ===== TOOL ITEMS HOVER EFFECTS =====
document.addEventListener("DOMContentLoaded", () => {
  const toolItems = document.querySelectorAll(".tool-item");

  toolItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.background =
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      const icon = item.querySelector("i");
      const text = item.querySelector("span");
      if (icon) icon.style.color = "white";
      if (text) text.style.color = "white";
    });

    item.addEventListener("mouseleave", () => {
      item.style.background = "";
      const icon = item.querySelector("i");
      const text = item.querySelector("span");
      if (icon) icon.style.color = "";
      if (text) text.style.color = "";
    });
  });
});

// ===== SKILL ITEM COUNTER ANIMATION =====
const animateNumbers = () => {
  const skillItems = document.querySelectorAll(".skill-item[data-level]");

  skillItems.forEach((item) => {
    const level = parseInt(item.getAttribute("data-level"));
    const skillName = item.querySelector(".skill-name");

    if (skillName && level) {
      let currentNumber = 0;
      const increment = level / 50; // Animation duration control

      const updateNumber = () => {
        if (currentNumber < level) {
          currentNumber += increment;
          skillName.textContent = `${
            skillName.textContent.split(" ")[0]
          } (${Math.floor(currentNumber)}%)`;
          requestAnimationFrame(updateNumber);
        } else {
          skillName.textContent = `${
            skillName.textContent.split(" ")[0]
          } (${level}%)`;
        }
      };

      // Start animation when section is visible
      const aboutSection = document.querySelector(".about-section");
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => updateNumber(), 1000);
            sectionObserver.unobserve(entry.target);
          }
        });
      });

      sectionObserver.observe(aboutSection);
    }
  });
};

// ===== TYPING ANIMATION FOR CODE BLOCK =====
const codeElement = document.querySelector(".code-content pre code");
if (codeElement) {
  const originalText = codeElement.innerHTML;
  codeElement.innerHTML = "";

  let i = 0;
  const typeWriter = () => {
    if (i < originalText.length) {
      // Handle HTML tags properly
      if (originalText.charAt(i) === "<") {
        let tag = "";
        while (originalText.charAt(i) !== ">" && i < originalText.length) {
          tag += originalText.charAt(i);
          i++;
        }
        tag += originalText.charAt(i); // Add the closing '>'
        codeElement.innerHTML += tag;
        i++;
      } else {
        codeElement.innerHTML += originalText.charAt(i);
        i++;
      }

      // Randomize typing speed for more natural effect
      const speed = Math.random() * 50 + 30;
      setTimeout(typeWriter, speed);
    }
  };

  // Start typing animation after a delay
  setTimeout(typeWriter, 2000);
}

// ===== PARALLAX EFFECT FOR FLOATING SHAPES =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".shape");

  parallaxElements.forEach((element, index) => {
    const speed = (index + 1) * 0.1;
    const yPos = -(scrolled * speed);
    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
  });
});

// ===== LOADING ANIMATION =====
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Add staggered animation to hero elements
  const heroElements = document.querySelectorAll(".hero-text > *");
  heroElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`;
  });
});

// ===== UTILITY FUNCTIONS =====

// Throttle function for scroll events
const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Debounce function for resize events
const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    highlightActiveLink();
  }, 100)
);

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation for mobile menu
mobileMenu.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    mobileMenu.click();
  }
});

// Focus management for mobile menu
navMenu.addEventListener("transitionend", () => {
  if (navMenu.classList.contains("active")) {
    const firstLink = navMenu.querySelector(".nav-link");
    if (firstLink) firstLink.focus();
  }
});

// Escape key to close mobile menu
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    mobileMenu.classList.remove("active");
    navMenu.classList.remove("active");
    mobileMenu.focus();
  }
});

// ===== PERFORMANCE OPTIMIZATIONS =====

// Preload critical resources
const preloadImages = () => {
  const imageUrls = [
    // Add any image URLs that will be used in future sections
  ];

  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

// Initialize preloading
document.addEventListener("DOMContentLoaded", preloadImages);

// Lazy load non-critical elements
const lazyLoadElements = document.querySelectorAll("[data-lazy]");
const lazyLoadObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      // Load element content
      element.classList.add("loaded");
      lazyLoadObserver.unobserve(element);
    }
  });
});

lazyLoadElements.forEach((element) => {
  lazyLoadObserver.observe(element);
});

// ===== ANALYTICS & TRACKING =====

// Track button clicks (placeholder for analytics)
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    const buttonText = e.target.textContent.trim();
    console.log(`Button clicked: ${buttonText}`);
    // Add your analytics tracking code here
  });
});

// Track navigation usage
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    const linkText = e.target.textContent.trim();
    console.log(`Navigation link clicked: ${linkText}`);
    // Add your analytics tracking code here
  });
});

console.log("Portfolio website initialized successfully! 🚀");
