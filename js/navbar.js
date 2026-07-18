document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');

  if (!toggle || !nav) return;

  const openNav = () => {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  const closeNav = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('is-open');
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Closing after a link click matters even on a multi-page site: it keeps
  // the menu from re-opening in a stale "open" state on the back button.
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeNav();
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    const clickedInside = nav.contains(event.target) || toggle.contains(event.target);
    if (!clickedInside && nav.classList.contains('is-open')) {
      closeNav();
    }
  });

  // If the viewport grows past the mobile breakpoint, drop any open state
  // so the dropdown doesn't linger once it's no longer needed.
  const desktopQuery = window.matchMedia('(min-width: 861px)');
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) closeNav();
  });
});
