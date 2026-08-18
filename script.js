const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('nav');
const progress = document.querySelector('.scroll-progress');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const updateProgress = () => {
  const length = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${length > 0 ? (window.scrollY / length) * 100 : 0}%`;
};

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();
