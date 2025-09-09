/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /* ------------------------------------
   * Header toggle (mobile)
   * ---------------------------------- */
  const headerToggleBtn = document.querySelector('.header-toggle');
  function headerToggle() {
    const header = document.querySelector('#header');
    if (!header) return;
    header.classList.toggle('header-show');
    if (headerToggleBtn) {
      headerToggleBtn.classList.toggle('bi-list');
      headerToggleBtn.classList.toggle('bi-x');
    }
  }
  if (headerToggleBtn) headerToggleBtn.addEventListener('click', headerToggle);

  /* Hide mobile nav on same-page/hash links */
  document.querySelectorAll('#navmenu a').forEach(a => {
    a.addEventListener('click', () => {
      if (document.querySelector('.header-show')) headerToggle();
    });
  });

  /* Toggle mobile nav dropdowns */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(t => {
    t.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = this.parentNode;
      const next = this.parentNode.nextElementSibling;
      if (parent) parent.classList.toggle('active');
      if (next) next.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /* ------------------------------------
   * Preloader
   * ---------------------------------- */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => { preloader.remove(); });
  }

  /* ------------------------------------
   * Scroll top button
   * ---------------------------------- */
  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (!scrollTop) return;
    if (window.scrollY > 100) scrollTop.classList.add('active');
    else scrollTop.classList.remove('active');
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /* ------------------------------------
   * AOS init
   * ---------------------------------- */
  function aosInit() {
    if (window.AOS) {
      AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
    }
  }
  window.addEventListener('load', aosInit);

  /* ------------------------------------
   * typed.js
   * ---------------------------------- */
  const typedEl = document.querySelector('.typed');
  if (typedEl && window.Typed) {
    let typedStrings = typedEl.getAttribute('data-typed-items') || '';
    const strings = typedStrings.split(',').map(s => s.trim()).filter(Boolean);
    if (strings.length) {
      new Typed('.typed', { strings, loop: true, typeSpeed: 100, backSpeed: 50, backDelay: 2000 });
    }
  }

  /* ------------------------------------
   * PureCounter
   * ---------------------------------- */
  if (window.PureCounter) new PureCounter();

  /* ------------------------------------
   * Skills progress on reveal
   * ---------------------------------- */
  const skillsAnimation = document.querySelectorAll('.skills-animation');
  if (window.Waypoint && skillsAnimation.length) {
    skillsAnimation.forEach((item) => {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function () {
          item.querySelectorAll('.progress .progress-bar').forEach(el => {
            const v = el.getAttribute('aria-valuenow') || '0';
            el.style.width = v + '%';
          });
          this.destroy && this.destroy();
        }
      });
    });
  }

  /* ------------------------------------
   * GLightbox
   * ---------------------------------- */
  if (window.GLightbox) {
    GLightbox({ selector: '.glightbox' });
  }

  /* ------------------------------------
   * Isotope layout & filters
   * ---------------------------------- */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    const layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let iso;
    const container = isotopeItem.querySelector('.isotope-container');
    if (!container) return;

    if (window.imagesLoaded && window.Isotope) {
      imagesLoaded(container, function () {
        iso = new Isotope(container, { itemSelector: '.isotope-item', layoutMode: layout, filter, sortBy: sort });
      });
    }

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const active = isotopeItem.querySelector('.isotope-filters .filter-active');
        if (active) active.classList.remove('filter-active');
        this.classList.add('filter-active');
        if (iso) iso.arrange({ filter: this.getAttribute('data-filter') });
        aosInit();
      }, false);
    });
  });

  /* ------------------------------------
   * Swiper sliders
   * ---------------------------------- */
  function initSwiper() {
    if (!window.Swiper) return;
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      const cfgEl = swiperElement.querySelector(".swiper-config");
      let config = {};
      if (cfgEl) {
        try { config = JSON.parse(cfgEl.innerHTML.trim()); } catch (e) { config = {}; }
      }
      new Swiper(swiperElement, config);
    });
  }
  window.addEventListener("load", initSwiper);

  /* ------------------------------------
   * Hash scroll adjust on load
   * ---------------------------------- */
  window.addEventListener('load', function () {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          const scrollMarginTop = parseInt(getComputedStyle(section).scrollMarginTop || '0', 10);
          window.scrollTo({ top: section.offsetTop - scrollMarginTop, behavior: 'smooth' });
        }, 100);
      }
    }
  });

  /* ------------------------------------
   * Navmenu Scrollspy
   * ---------------------------------- */
  const navmenulinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    const pos = window.scrollY + 200;
    navmenulinks.forEach(link => {
      const hash = link.hash;
      if (!hash) return;
      const section = document.querySelector(hash);
      if (!section) return;
      if (pos >= section.offsetTop && pos <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /* ------------------------------------
   * Sidebar Particles
   * ---------------------------------- */
  const sidebarContainer = document.getElementById("sidebar-particles");
  if (sidebarContainer) {
    function createParticle() {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.left = Math.random() * 100 + "%";
      const size = Math.random() * 6 + 4;
      particle.style.width = size + "px";
      particle.style.height = size + "px";
      particle.style.animationDuration = (Math.random() * 5 + 3) + "s";
      sidebarContainer.appendChild(particle);
      setTimeout(() => { particle.remove(); }, 8000);
    }
    setInterval(createParticle, 300);
  }

  /* ------------------------------------
   * HERO Background Slider (new)
   * ---------------------------------- */
  function initHeroSlider() {
    const slides = Array.from(document.querySelectorAll('.hero .slide'));
    const bar = document.querySelector('.slider-progress');
    if (!slides.length) return;

    let i = 0;
    const D = 5000; // 5s per slide

    function show(k) {
      slides.forEach((s, idx) => s.classList.toggle('active', idx === k));
      if (bar) {
        bar.style.transition = 'none';
        bar.style.width = '0%';
        requestAnimationFrame(() => {
          bar.style.transition = `width ${D}ms linear`;
          bar.style.width = '100%';
        });
      }
    }

    function loop() {
      show(i);
      i = (i + 1) % slides.length;
      setTimeout(loop, D);
    }

    loop();
  }
  window.addEventListener('DOMContentLoaded', initHeroSlider);

})();
