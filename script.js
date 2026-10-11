// Parth Pansuriya Portfolio - Interactive JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80,
    });
  }

  // Dynamic Copyright Year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.innerText = new Date().getFullYear();
  }

  // Contact Form Submission Handler
  const contactForm = document.getElementById("contactForm");
  const formAlert = document.getElementById("formAlert");

  if (contactForm && formAlert) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const name = nameInput ? nameInput.value.trim() : "there";
      const email = emailInput ? emailInput.value.trim() : "";

      formAlert.style.display = "block";
      formAlert.innerHTML = `<i class="fa-solid fa-circle-check me-2" aria-hidden="true"></i> Thank you, <strong>${escapeHtml(
        name
      )}</strong>! Your message has been sent. I will get back to you at ${escapeHtml(
        email
      )} within 48 hours.`;

      contactForm.reset();

      setTimeout(() => {
        formAlert.style.display = "none";
      }, 6000);
    });
  }

  // Helper to prevent XSS in alert reflection
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // Glass Navbar & Scroll-to-Top Button on Scroll
  const nav = document.querySelector(".navbar");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 50) {
        if (nav) nav.classList.add("shadow-lg");
      } else {
        if (nav) nav.classList.remove("shadow-lg");
      }

      if (scrollTopBtn) {
        if (window.scrollY > 300) {
          scrollTopBtn.classList.add("show");
        } else {
          scrollTopBtn.classList.remove("show");
        }
      }
    },
    { passive: true }
  );

  // Close Navbar on Click (Mobile Devices)
  const navLinks = document.querySelectorAll(".nav-item .nav-link");
  const menuToggle = document.getElementById("navmenu");

  if (menuToggle && typeof bootstrap !== "undefined") {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (menuToggle.classList.contains("show")) {
          const bsCollapse = bootstrap.Collapse.getInstance(menuToggle) || new bootstrap.Collapse(menuToggle, { toggle: false });
          bsCollapse.hide();
        }
      });
    });
  }

  // Typing Animation Effect
  const typedTextSpan = document.getElementById("typed-text");
  if (typedTextSpan) {
    const textArray = ["SEO & Digital Marketing", "Responsive Web Design", "UI/UX & Optimization"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = textArray[0].length;

    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        setTimeout(erase, newTextDelay);
      }
    }

    function erase() {
      if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 900);
      }
    }

    setTimeout(erase, newTextDelay + 250);
  }
});
