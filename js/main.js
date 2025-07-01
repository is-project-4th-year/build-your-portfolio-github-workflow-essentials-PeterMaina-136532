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

// ===== PROJECT FILTERING =====
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");

      if (filterValue === "all" || category === filterValue) {
        card.classList.remove("hide");
        card.classList.add("show");
      } else {
        card.classList.remove("show");
        card.classList.add("hide");
      }
    });
  });
});

// ===== PROJECT MODAL FUNCTIONALITY =====
const modal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");
const viewProjectButtons = document.querySelectorAll(".view-project");

// Project data
const projectsData = {
  1: {
    title: "ShopMaster E-commerce",
    description:
      "A comprehensive e-commerce platform built with PHP and Laravel, featuring advanced inventory management, secure payment processing, real-time analytics, and responsive design. The platform supports multiple vendors, automated order processing, and includes a powerful admin dashboard for complete business management.",
    features: [
      "Multi-vendor marketplace functionality",
      "Secure payment gateway integration (Stripe, PayPal)",
      "Real-time inventory tracking and alerts",
      "Advanced search and filtering system",
      "Customer review and rating system",
      "Order tracking and notification system",
      "Responsive admin dashboard with analytics",
      "Email marketing integration",
    ],
    technologies: [
      "PHP",
      "Laravel",
      "JavaScript",
      "MySQL",
      "Bootstrap",
      "Stripe API",
      "Redis",
    ],
    highlights: [
      "Implemented secure payment processing handling $50K+ monthly transactions",
      "Built scalable architecture supporting 1000+ concurrent users",
      "Integrated real-time analytics dashboard with Chart.js",
      "Optimized database queries reducing page load time by 60%",
    ],
    github: "https://github.com/yourusername/shopmaster-ecommerce",
    demo: "https://shopmaster-demo.com",
  },
  2: {
    title: "TaskFlow Pro",
    description:
      "A modern task management application built with React, featuring intuitive drag-and-drop functionality, real-time collaboration, progress tracking, and team management. The application provides a seamless user experience with responsive design and offline capability.",
    features: [
      "Drag-and-drop task organization",
      "Real-time team collaboration",
      "Project timeline and Gantt charts",
      "File attachment and sharing",
      "Task dependencies and subtasks",
      "Time tracking and reporting",
      "Custom workflow creation",
      "Mobile-responsive design",
    ],
    technologies: [
      "React",
      "JavaScript",
      "CSS3",
      "REST API",
      "Context API",
      "Local Storage",
    ],
    highlights: [
      "Implemented drag-and-drop using React DnD library",
      "Built real-time updates using WebSocket connections",
      "Achieved 98% user satisfaction in beta testing",
      "Reduced project management overhead by 40%",
    ],
    github: "https://github.com/yourusername/taskflow-pro",
    demo: "https://taskflow-demo.com",
  },
  3: {
    title: "ChatConnect",
    description:
      "A real-time messaging application built with Node.js and Socket.io, featuring end-to-end encryption, file sharing, group chats, and voice/video calling. The application supports thousands of concurrent users with high-performance message delivery and offline message storage.",
    features: [
      "Real-time messaging with Socket.io",
      "End-to-end message encryption",
      "File and media sharing",
      "Group chat functionality",
      "Voice and video calling",
      "Message history and search",
      "Online/offline status indicators",
      "Push notifications",
    ],
    technologies: [
      "Node.js",
      "Socket.io",
      "Vue.js",
      "MongoDB",
      "WebRTC",
      "JWT",
      "Docker",
    ],
    highlights: [
      "Handles 5000+ concurrent connections with 99.9% uptime",
      "Implemented AES-256 encryption for message security",
      "Built WebRTC integration for voice/video calls",
      "Deployed using Docker containers on AWS",
    ],
    github: "https://github.com/yourusername/chatconnect",
    demo: "https://chatconnect-demo.com",
  },
  4: {
    title: "DataInsight Pro",
    description:
      "A comprehensive analytics dashboard built with PHP Laravel and Python, featuring advanced data visualization, machine learning insights, automated reporting, and real-time data processing. The platform serves multiple clients with customizable dashboards and API integrations.",
    features: [
      "Interactive data visualization charts",
      "Machine learning predictive analytics",
      "Automated report generation",
      "Real-time data processing",
      "Multi-tenant architecture",
      "API integrations and webhooks",
      "Custom dashboard builder",
      "Export functionality (PDF, Excel, CSV)",
    ],
    technologies: [
      "PHP",
      "Laravel",
      "Python",
      "MySQL",
      "Chart.js",
      "Docker",
      "Redis",
      "Pandas",
    ],
    highlights: [
      "Processes 1M+ data points daily with 99% accuracy",
      "Reduced manual reporting time by 85%",
      "Implemented ML models achieving 92% prediction accuracy",
      "Serves 500+ enterprise clients across multiple industries",
    ],
    github: "https://github.com/yourusername/datainsight-pro",
    demo: "https://datainsight-demo.com",
  },
  5: {
    title: "Dynamic Portfolio",
    description:
      "A responsive portfolio website featuring smooth animations, dark mode toggle, contact form integration, and optimized performance. Built with modern web technologies and best practices for SEO and accessibility.",
    features: [
      "Responsive design for all devices",
      "Smooth CSS animations and transitions",
      "Dark/light mode toggle",
      "Contact form with validation",
      "SEO optimized structure",
      "Accessibility compliant (WCAG 2.1)",
      "Progressive Web App features",
      "Performance optimized (95+ Lighthouse score)",
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
      "PWA",
      "SEO",
    ],
    highlights: [
      "Achieved 98+ Google Lighthouse performance score",
      "Implemented lazy loading reducing initial load time by 40%",
      "Built with mobile-first responsive design approach",
      "Integrated Google Analytics and contact form automation",
    ],
    github: "https://github.com/yourusername/dynamic-portfolio",
    demo: "https://yourportfolio.com",
  },
  6: {
    title: "MicroAPI Gateway",
    description:
      "A scalable API gateway built with Node.js and Express, featuring rate limiting, authentication, load balancing, comprehensive logging, and microservices orchestration. The gateway handles millions of requests daily with high availability and security.",
    features: [
      "Rate limiting and throttling",
      "JWT-based authentication",
      "Load balancing across services",
      "Request/response logging",
      "API versioning support",
      "Health check monitoring",
      "Circuit breaker pattern",
      "Comprehensive documentation",
    ],
    technologies: [
      "Node.js",
      "Express",
      "Redis",
      "JWT",
      "AWS",
      "Docker",
      "Nginx",
      "Prometheus",
    ],
    highlights: [
      "Handles 10M+ API requests daily with 99.99% uptime",
      "Reduced API response time by 45% through optimization",
      "Implemented auto-scaling handling traffic spikes",
      "Built comprehensive monitoring and alerting system",
    ],
    github: "https://github.com/yourusername/microapi-gateway",
    demo: "https://api-gateway-demo.com",
  },
};

// Open modal functionality
viewProjectButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const projectId = button.getAttribute("data-project");
    showProjectModal(projectId);
  });
});

// Close modal functionality
closeModal.addEventListener("click", hideProjectModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    hideProjectModal();
  }
});

// Escape key to close modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    hideProjectModal();
  }
});

function showProjectModal(projectId) {
  const project = projectsData[projectId];
  if (!project) return;

  // Populate modal content
  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalDescription").textContent = project.description;
  document.getElementById("modalGithub").href = project.github;
  document.getElementById("modalDemo").href = project.demo;

  // Populate features
  const featuresList = document.getElementById("modalFeatures");
  featuresList.innerHTML = "";
  project.features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    featuresList.appendChild(li);
  });

  // Populate technologies
  const techContainer = document.getElementById("modalTech");
  techContainer.innerHTML = "";
  project.technologies.forEach((tech) => {
    const span = document.createElement("span");
    span.className = `tech-tag ${tech.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
    span.textContent = tech;
    techContainer.appendChild(span);
  });

  // Populate highlights
  const highlightsList = document.getElementById("modalHighlights");
  highlightsList.innerHTML = "";
  project.highlights.forEach((highlight) => {
    const li = document.createElement("li");
    li.textContent = highlight;
    highlightsList.appendChild(li);
  });

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function hideProjectModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// ===== PROJECT CARDS INTERSECTION OBSERVER =====
const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${
          Array.from(projectCards).indexOf(entry.target) * 0.1
        }s`;
        entry.target.classList.add("animate-in");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

// Observe project cards
projectCards.forEach((card) => {
  projectObserver.observe(card);
});

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
