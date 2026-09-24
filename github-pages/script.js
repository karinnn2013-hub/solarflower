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
let heroTimer;
const scheduleHeroSlide = () => {
  window.clearTimeout(heroTimer);
  heroTimer = window.setTimeout(() => {
    showSlide(currentSlide + 1);
    scheduleHeroSlide();
  }, 6500);
};

document.querySelector('.gallery-prev')?.addEventListener('click', scheduleHeroSlide);
document.querySelector('.gallery-next')?.addEventListener('click', scheduleHeroSlide);
dots.forEach((dot) => dot.addEventListener('click', scheduleHeroSlide));
scheduleHeroSlide();

const structureSlides = [...document.querySelectorAll('.structure-gallery-slide')];
const structureDots = [...document.querySelectorAll('.structure-gallery-controls > div button')];
let currentStructureSlide = 0;

const showStructureSlide = (index) => {
  currentStructureSlide = (index + structureSlides.length) % structureSlides.length;
  structureSlides.forEach((slide, i) => slide.classList.toggle('active', i === currentStructureSlide));
  structureDots.forEach((dot, i) => dot.classList.toggle('active', i === currentStructureSlide));
};

document.querySelector('.structure-prev')?.addEventListener('click', () => showStructureSlide(currentStructureSlide - 1));
document.querySelector('.structure-next')?.addEventListener('click', () => showStructureSlide(currentStructureSlide + 1));
structureDots.forEach((dot, index) => dot.addEventListener('click', () => showStructureSlide(index)));
window.setInterval(() => showStructureSlide(currentStructureSlide + 1), 5200);
