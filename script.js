// =====================================================
// International Business — Perm State University
// =====================================================

// Tell CSS that JavaScript works (needed for scroll animations)
document.documentElement.classList.add('js-ready');


// ---------- 1. Burger menu on phones ----------
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', function () {
  const isOpen = nav.classList.toggle('is-open');
  burger.classList.toggle('is-open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
});

// Close the menu after a link is clicked
nav.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', false);
  });
});


// ---------- 2. Request form ----------
const form = document.getElementById('request-form');
const message = document.getElementById('form-message');

form.addEventListener('submit', function (event) {
  event.preventDefault(); // do not reload the page

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const country = document.getElementById('country');

  [name, email, country].forEach(function (input) {
    input.classList.remove('is-error');
  });

  if (name.value.trim().length < 2) {
    return showError(name, 'Please enter your full name.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    return showError(email, 'Please enter a valid e-mail, for example name@example.com.');
  }
  if (country.value.trim().length < 2) {
    return showError(country, 'Please enter your country.');
  }

  message.textContent = 'Thank you, ' + name.value.trim() + '! The admissions office will contact you by e-mail.';
  form.reset();
});

function showError(input, text) {
  input.classList.add('is-error');
  input.focus();
  message.textContent = text;
}


// ---------- 3. Sections appear smoothly on scroll ----------
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach(function (item) { observer.observe(item); });
} else {
  revealItems.forEach(function (item) { item.classList.add('is-visible'); });
}
