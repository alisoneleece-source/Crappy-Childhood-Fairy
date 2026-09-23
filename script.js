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

if (letter) {
  const charCounter = document.querySelector('#character-count');
  const wordCounter = document.querySelector('#word-count');

  const updateCount = () => {
    if (charCounter) {
      charCounter.textContent = `${letter.value.length} / 2000 characters`;
    }

    if (wordCounter) {
      const words = letter.value.trim() ? letter.value.trim().split(/\s+/).length : 0;
      wordCounter.textContent = `${words} / 1000 words`;
      wordCounter.classList.toggle('is-over', words > 1000);
    }
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
// Keep keyboard navigation predictable when the mobile menu is dismissed.
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('is-open')) {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 901px)').addEventListener('change', event => {
  if (event.matches) {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});


// Accessible dropdown navigation.
document.querySelectorAll('.nav-parent').forEach(button => {
  button.addEventListener('click', event => {
    event.stopPropagation();
    const group = button.closest('.nav-group');
    const willOpen = !group.classList.contains('is-open');

    document.querySelectorAll('.nav-group.is-open').forEach(openGroup => {
      openGroup.classList.remove('is-open');
      openGroup.querySelector('.nav-parent')?.setAttribute('aria-expanded', 'false');
    });

    group.classList.toggle('is-open', willOpen);
    button.setAttribute('aria-expanded', String(willOpen));
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.nav-group.is-open').forEach(group => {
    group.classList.remove('is-open');
    group.querySelector('.nav-parent')?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.nav-dropdown').forEach(menu => {
  menu.addEventListener('click', event => event.stopPropagation());
});


// Prevent the prototype letter form from accepting more than 1000 words.
if (form && letter) {
  form.addEventListener('submit', event => {
    const words = letter.value.trim() ? letter.value.trim().split(/\s+/).length : 0;

    if (words < 500 || words > 1000) {
      event.preventDefault();
      status.textContent = words < 500
        ? 'Your letter is currently under 500 words. Anna asks for 500–1,000 words.'
        : 'Please shorten your letter to 1,000 words or less.';
      letter.focus();
      return;
    }

    event.preventDefault();
    status.textContent = 'Your letter is within the 500–1,000 word range. Use the official form link to send it to Anna’s team.';
  });
}
