/*
 * script.js — Apple UI homepage replica
 * Plain JS, no frameworks, no modules. Loaded via <script src="script.js" defer>.
 *
 * Responsibilities (see BUILD_CONTRACT.md "script.js — behavior spec"):
 *   1. Progressive enhancement: drop html.no-js on load.
 *   2. Mobile nav toggle (#globalnav-menutrigger flips body.nav-open + aria-expanded).
 *   3. Nav scrim intensify (#globalnav.nav-stuck) on scroll, rAF-throttled.
 *   4. Scroll-reveal for .tile-wrapper via IntersectionObserver (adds .is-visible).
 *   5. Respect prefers-reduced-motion for 3 & 4.
 *   6. No globals — everything wrapped in one IIFE.
 */
(function () {
  'use strict';

  /* --- Feature / preference probes (cached once) -------------------------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Run `fn` now if the DOM is already parsed, otherwise on DOMContentLoaded.
     With <script defer> this runs immediately after parsing (before DCL),
     which is ideal — it removes .no-js before first paint. */
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  function init() {
    // 1. Progressive enhancement — remove the no-js flag so JS-driven styles apply.
    document.documentElement.classList.remove('no-js');

    initNavToggle();
    initNavScrim();
    initScrollReveal();
    initFlyouts();
    initCarousel();
  }

  /* 2. Mobile nav toggle ---------------------------------------------------- */
  /* CSS reveals the product-link tray purely via body.nav-open (≤833px). JS
     only flips state + aria; it does not build or animate the tray. */
  function initNavToggle() {
    var trigger = document.getElementById('globalnav-menutrigger');
    var list    = document.getElementById('globalnav-list');
    if (!trigger) return;

    function open()  { document.body.classList.add('nav-open');    trigger.setAttribute('aria-expanded', 'true');  }
    function close() { document.body.classList.remove('nav-open'); trigger.setAttribute('aria-expanded', 'false'); }
    function toggle() { document.body.classList.contains('nav-open') ? close() : open(); }

    // Trigger click flips the open state. preventDefault keeps the button inert.
    trigger.addEventListener('click', function (e) { e.preventDefault(); toggle(); });

    // Clicking any link inside the open tray closes it (the trigger is a
    // <button>, not a link, so it is excluded and handled above).
    if (list) {
      list.addEventListener('click', function (e) {
        if (!document.body.classList.contains('nav-open')) return;
        if (trigger.contains(e.target)) return;
        if (e.target.closest('a')) close();
      });
    }

    // Escape closes.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) close();
    });

    // Crossing to desktop (>833px) closes the tray and resets aria-expanded.
    var mq = window.matchMedia('(max-width: 833px)');
    var onBreakpoint = function (m) { if (!m.matches) close(); };
    if (mq.addEventListener) mq.addEventListener('change', onBreakpoint);
    else if (mq.addListener) mq.addListener(onBreakpoint); // legacy Safari
  }

  /* 3. Nav scrim intensify on scroll --------------------------------------- */
  /* Skipped entirely under prefers-reduced-motion (state change is visual). */
  function initNavScrim() {
    if (reduceMotion) return;
    var nav = document.getElementById('globalnav');
    if (!nav) return;

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        nav.classList.toggle('nav-stuck', window.scrollY > 8);
        ticking = false;
      });
    }, { passive: true });

    // Apply the correct state on load (covers a refresh performed mid-scroll).
    nav.classList.toggle('nav-stuck', window.scrollY > 8);
  }

  /* 4. Scroll-reveal for tiles --------------------------------------------- */
  /* Adds .is-visible to each .tile-wrapper as it enters the viewport.
     CSS only hides tiles under (prefers-reduced-motion: no-preference), so
     reduced-motion users are never hidden — adding .is-visible is harmless. */
  function initScrollReveal() {
    var tiles = document.querySelectorAll('.tile-wrapper');
    if (!tiles.length) return;

    // Reduced-motion OR no IntersectionObserver support: reveal all up front.
    if (reduceMotion || !('IntersectionObserver' in window)) {
      tiles.forEach(function (t) { t.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // reveal once
        }
      });
    }, { threshold: 0.15 });

    tiles.forEach(function (t) { io.observe(t); });
  }

  /* 5. Nav flyouts ---------------------------------------------------------- */
  /* CSS opens the full-bleed dropdown on hover / :focus-within. JS adds a
     keyboard-friendly .is-open class and closes every flyout on Escape. */
  function initFlyouts() {
    var items = document.querySelectorAll('.globalnav-item');
    var flyoutItems = [];
    items.forEach(function (item) {
      if (item.querySelector('.globalnav-flyout')) flyoutItems.push(item);
    });
    if (!flyoutItems.length) return;

    function closeAll() {
      flyoutItems.forEach(function (item) { item.classList.remove('is-open'); });
    }

    flyoutItems.forEach(function (item) {
      var link = item.querySelector('.globalnav-link');
      if (link) {
        link.addEventListener('focusin', function () { item.classList.add('is-open'); });
        link.addEventListener('focusout', function () { item.classList.remove('is-open'); });
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (document.body.classList.contains('nav-open')) return; // let mobile handler close
      if (document.activeElement && document.activeElement.closest('.globalnav')) {
        document.activeElement.blur();
      }
      closeAll();
    });
  }

  /* 6. Endless Entertainment carousel -------------------------------------- */
  function initCarousel() {
    var gallery = document.querySelector('.tv-media-gallery');
    var track = document.querySelector('.media-gallery-track');
    var items = document.querySelectorAll('.media-gallery-item');
    var dots = document.querySelectorAll('.dotnav-link');
    var playBtn = document.querySelector('.media-gallery-dotnav-iconcontrol');
    if (!gallery || !track || !items.length) return;

    var totalSlides = 8;
    var currentIndex = 0;
    var autoplayInterval = null;
    var isPlaying = !reduceMotion;

    function getStep() {
      var itemWidth = items[0].getBoundingClientRect().width;
      var gap = parseFloat(getComputedStyle(track).gap || getComputedStyle(track).columnGap || 0);
      return itemWidth + gap;
    }

    function updateDots() {
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === currentIndex);
      });
    }

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentIndex = index;
      track.style.transform = 'translateX(' + (-currentIndex * getStep()) + 'px)';
      updateDots();
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayInterval = setInterval(function () {
        goToSlide((currentIndex + 1) % totalSlides);
      }, 4160);
    }

    function updatePlayButton() {
      if (!playBtn) return;
      playBtn.setAttribute('aria-label', (isPlaying ? 'Pause' : 'Play') + ' endless entertainment gallery');
      playBtn.setAttribute('aria-pressed', String(!isPlaying));
      playBtn.textContent = isPlaying ? '⏸' : '▶';
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function (e) {
        e.preventDefault();
        var slide = parseInt(dot.getAttribute('data-slide'), 10);
        if (Number.isNaN(slide)) return;
        stopAutoplay();
        if (slide >= totalSlides) {
          dots.forEach(function (d) { d.classList.remove('is-active'); });
          var fam = document.querySelector('.fam-media-gallery');
          if (fam) fam.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        } else {
          goToSlide(slide);
        }
        updatePlayButton();
      });
    });

    if (playBtn) {
      playBtn.addEventListener('click', function () {
        isPlaying = !isPlaying;
        if (isPlaying) startAutoplay();
        else stopAutoplay();
        updatePlayButton();
      });
    }

    gallery.addEventListener('mouseenter', stopAutoplay);
    gallery.addEventListener('mouseleave', function () {
      if (isPlaying) startAutoplay();
    });

    gallery.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        stopAutoplay();
        goToSlide(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        stopAutoplay();
        goToSlide(currentIndex + 1);
      }
    });

    window.addEventListener('resize', function () {
      var previous = track.style.transition;
      track.style.transition = 'none';
      goToSlide(currentIndex);
      requestAnimationFrame(function () {
        track.style.transition = previous;
      });
    });

    updateDots();
    updatePlayButton();
    if (isPlaying) startAutoplay();
  }

  ready(init);
})();
