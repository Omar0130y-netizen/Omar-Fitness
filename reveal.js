/* Omar Fitness — tiny progressive-enhancement script.
   - Adds a subtle shadow to the nav once the page is scrolled.
   - Fades/slides cards in as they enter the viewport.
   Both effects are pure additions: if this file fails to load, or the
   browser has no IntersectionObserver, or the user prefers reduced
   motion, every element stays fully visible with no layout shift. */
(function () {
  "use strict";

  var nav = document.querySelector(".site-nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  var selectors = [
    ".panel", ".blog-card", "[class*='fp-card']", "[class*='ex-card']",
    ".plan-day", ".feature-card", ".contact-form", ".contact-info", ".footer-col"
  ];
  var els = document.querySelectorAll(selectors.join(","));
  if (!els.length) return;

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  els.forEach(function (el) {
    el.classList.add("reveal");
    io.observe(el);
  });
})();
