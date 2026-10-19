/* ===== MOBILE MENU ===== */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
  });
});

/* ===== TYPEWRITER EFFECT ===== */
const roles = [
  'Software Engineering Intern',
  'Web Developer',
  'PHP & MySQL Developer',
  'C# Desktop Developer'
];
let roleIndex = 0, charIndex = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    typeEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 80);
  } else {
    typeEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 40);
  }
}
typeLoop();

/* ===== SCROLL REVEAL (popup animations) ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== ACTIVE NAV DOT ON SCROLL ===== */
const sections = document.querySelectorAll('section');
const navDots = document.querySelectorAll('.nav-dot');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    if (
      scrollY >= section.offsetTop &&
      scrollY < section.offsetTop + section.offsetHeight
    ) {
      navDots.forEach(d => d.classList.remove('active'));
      const active = document.querySelector(`.nav-dot[href="#${section.id}"]`);
      if (active) active.classList.add('active');
    }
  });
});

/* ===== COUNT-UP STATS ===== */
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.count;
      let current = 0;
      const step = Math.max(1, Math.floor(target / 25));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current + '+';
      }, 40);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));