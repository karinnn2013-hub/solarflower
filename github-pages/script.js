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

const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.gallery-controls > div button')];
const heroVideo = document.querySelector('.hero-video');
let currentSlide = 0;

const showSlide = (index) => {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  if (currentSlide === 2) heroVideo?.play().catch(() => {});
};

document.querySelector('.gallery-prev')?.addEventListener('click', () => showSlide(currentSlide - 1));
document.querySelector('.gallery-next')?.addEventListener('click', () => showSlide(currentSlide + 1));
dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
window.setInterval(() => showSlide(currentSlide + 1), 7000);
