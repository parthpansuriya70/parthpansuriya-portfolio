// Parth Pansuriya portfolio: small progressive enhancements.
// The page is fully readable without JavaScript. This adds the mobile menu,
// the active-section indicator, reveal-on-scroll, copy-email and the footer year.

(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var mobileQuery = window.matchMedia("(max-width: 859px)");

  // Mobile menu ---------------------------------------------------------
  function setMenu(open, returnFocus) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
    if (open) {
      nav.setAttribute("data-open", "true");
    } else {
      nav.removeAttribute("data-open");
      if (returnFocus) toggle.focus();
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close after choosing a destination.
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    // Escape closes the menu and returns focus to the button.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false, true);
      }
    });

    // Tapping outside the header closes the menu.
    document.addEventListener("click", function (event) {
      if (toggle.getAttribute("aria-expanded") === "true" && !event.target.closest(".site-header")) {
        setMenu(false);
      }
    });

    // Leaving the mobile layout resets the menu state.
    var onBreakpoint = function (event) {
      if (!event.matches) setMenu(false);
    };
    if (mobileQuery.addEventListener) mobileQuery.addEventListener("change", onBreakpoint);
    else mobileQuery.addListener(onBreakpoint);
  }

  // Active section indicator (IntersectionObserver, no scroll listener) --
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-list a[href^='#']"));
  var targets = links
    .map(function (link) {
      return document.getElementById(link.getAttribute("href").slice(1));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && targets.length) {
    var current = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (link) {
            if (link.getAttribute("href") === "#" + entry.target.id) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    targets.forEach(function (target) {
      current.observe(target);
    });
  }

  // Reveal on scroll. Content is only hidden when JS has added .js to <html>
  // (see the inline script in <head>), and never under reduced motion.
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduce) {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var reveal = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            reveal.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    reveals.forEach(function (el) {
      reveal.observe(el);
    });
  }

  // Copy email ----------------------------------------------------------
  var copyBtn = document.querySelector(".copy-btn");
  var copyStatus = document.getElementById("copy-status");
  if (copyBtn) {
    var label = copyBtn.textContent;
    var resetTimer;

    var announce = function (ok) {
      copyBtn.textContent = ok ? "Copied" : "Copy failed";
      if (copyStatus) copyStatus.textContent = ok ? "Email address copied to clipboard." : "Could not copy. Select the address above instead.";
      clearTimeout(resetTimer);
      resetTimer = setTimeout(function () {
        copyBtn.textContent = label;
        if (copyStatus) copyStatus.textContent = "";
      }, 2200);
    };

    var legacyCopy = function (text) {
      var field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      var done = false;
      try {
        done = document.execCommand("copy");
      } catch (e) {
        done = false;
      }
      document.body.removeChild(field);
      return done;
    };

    copyBtn.addEventListener("click", function () {
      var text = copyBtn.getAttribute("data-copy");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { announce(true); },
          function () { announce(legacyCopy(text)); }
        );
      } else {
        announce(legacyCopy(text));
      }
    });
  }

  // Footer year ---------------------------------------------------------
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
