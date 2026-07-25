/* ═══════════════════════════════════════════
   AGRIMITRA — Main Script
   1. Mobile navigation toggle
   2. Active nav-link on scroll
   3. Scroll-reveal animation
   4. IBM WatsonX Orchestrate chat agent
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     1. MOBILE NAVIGATION
  ───────────────────────────────────────── */
  var hamburger  = document.getElementById('hamburger');
  var mobileNav  = document.getElementById('mobileNav');
  var mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  function openMenu() {
    mobileNav.classList.add('is-open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileNav.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    if (mobileNav.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });
  }

  /* Close when a mobile link is clicked */
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close on outside click */
  document.addEventListener('click', function (e) {
    if (
      mobileNav &&
      mobileNav.classList.contains('is-open') &&
      !mobileNav.contains(e.target) &&
      e.target !== hamburger
    ) {
      closeMenu();
    }
  });

  /* Close on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ─────────────────────────────────────────
     2. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
  ───────────────────────────────────────── */
  var allNavLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var scrollSections = [];

  allNavLinks.forEach(function (a) {
    var id = a.getAttribute('href').replace('#', '');
    var el = document.getElementById(id);
    if (el) scrollSections.push({ link: a, el: el });
  });

  function onScroll() {
    var scrollY = window.scrollY + 80;
    scrollSections.forEach(function (item) {
      var top    = item.el.offsetTop;
      var bottom = top + item.el.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        allNavLinks.forEach(function (a) { a.removeAttribute('style'); });
        item.link.style.color = '#ffffff';
        item.link.style.fontWeight = '700';
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─────────────────────────────────────────
     3. SCROLL-REVEAL ANIMATION
     (uses IntersectionObserver if supported)
  ───────────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Fallback: show all immediately */
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ─────────────────────────────────────────
     4. IBM WatsonX ORCHESTRATE CHAT AGENT
  ───────────────────────────────────────── */
  window.wxOConfiguration = {
    orchestrationID: "4e1061270251463aa6ab9151415b6411_f2a3285e-e1e9-46e6-b5e6-0d4c835f76fd",
    hostURL: "https://au-syd.watson-orchestrate.cloud.ibm.com",
    rootElementID: "root",
    deploymentPlatform: "ibmcloud",
    crn: "crn:v1:bluemix:public:watsonx-orchestrate:au-syd:a/4e1061270251463aa6ab9151415b6411:f2a3285e-e1e9-46e6-b5e6-0d4c835f76fd::",
    chatOptions: {
      agentId: "5bae9998-d350-41ef-894b-81d6931f7df8"
    }
  };

  setTimeout(function () {
    var script = document.createElement('script');
    script.src = window.wxOConfiguration.hostURL + '/wxochat/wxoLoader.js?embed=true';
    script.addEventListener('load', function () {
      wxoLoader.init();
    });
    document.head.appendChild(script);
  }, 0);

})();
