const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const letter = document.querySelector('#letter');
const counter = document.querySelector('#character-count');
const form = document.querySelector('#letter-form');
const status = document.querySelector('#form-status');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

if (letter && counter) {
  const updateCount = () => {
    counter.textContent = `${letter.value.length} / 2000 characters`;
  };
  letter.addEventListener('input', updateCount);
  updateCount();
}

if (form && status) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    status.textContent = 'Prototype only — nothing was sent or stored.';
  });
}