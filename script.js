// script.js — reveal on scroll + dark mode toggle persistence

document.addEventListener('DOMContentLoaded', () => {
  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'none';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => io.observe(el));

  // Theme toggle with persistence
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');

  // initialize from localStorage or prefers-color-scheme
  const saved = localStorage.getItem('theme');
  if(saved) root.setAttribute('data-theme', saved);
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
  }

  if(toggle){
    toggle.addEventListener('click', () => {
      const cur = root.getAttribute('data-theme');
      if(cur === 'dark') {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme','light');
      } else {
        root.setAttribute('data-theme','dark');
        localStorage.setItem('theme','dark');
      }
      // small animation feedback
      toggle.animate([{ transform: 'translateY(-4px)' }, { transform: 'none' }], { duration: 250 });
    });
  }
});
