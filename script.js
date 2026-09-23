const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const letter = document.querySelector('#letter');
const form = document.querySelector('#letter-form');
const status = document.querySelector('#form-status');
const groups = [...document.querySelectorAll('.nav-group')];
function closeDropdowns(except) {
  groups.forEach(group => {
    if (group === except) return;
    group.classList.remove('is-open');
    group.querySelector('.nav-parent').setAttribute('aria-expanded', 'false');
    group.querySelector('.nav-dropdown').hidden = true;
  });
}
function closeMobile() {
  nav?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  closeDropdowns();
}
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    closeDropdowns();
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobile));
  nav.addEventListener('focusout', () => {
    setTimeout(() => { if (!nav.contains(document.activeElement)) closeDropdowns(); }, 0);
  });
}
groups.forEach(group => {
  const button = group.querySelector('.nav-parent');
  const panel = group.querySelector('.nav-dropdown');
  function open() {
    closeDropdowns(group);
    group.classList.add('is-open');
    button.setAttribute('aria-expanded', 'true');
    panel.hidden = false;
  }
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-expanded') === 'true') closeDropdowns();
    else open();
  });
  button.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') { event.preventDefault(); open(); panel.querySelector('a').focus(); }
  });
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const open = groups.find(group => group.classList.contains('is-open'));
  if (open) { event.preventDefault(); closeDropdowns(); open.querySelector('.nav-parent').focus(); }
  else if (nav?.classList.contains('is-open')) { closeMobile(); menuButton.focus(); }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMobile();
});
window.matchMedia('(min-width: 1101px)').addEventListener('change', closeMobile);

// Edit these three slots to update timely homepage promotions.
// Titles are navigation examples, not assertions of current event availability.
// Optional image: { src: 'existing-asset.jpg', alt: 'Descriptive alternative text' }.
const homepageFeatures = [
  { title: 'Daily Practice Live', href: 'daily-practice-live.html', cta: 'Explore Daily Practice Live' },
  { title: 'Courses', href: 'courses.html', cta: 'Explore Courses' },
  { title: 'Webinars', href: 'webinars.html', cta: 'Explore Webinars' }
];
const featureGrid = document.querySelector('#homepage-features');
if (featureGrid) {
  homepageFeatures.slice(0, 3).forEach(feature => {
    const article = document.createElement('article');
    article.className = 'home-feature';
    if (feature.image) {
      const image = document.createElement('img');
      image.src = feature.image.src; image.alt = feature.image.alt; image.loading = 'lazy';
      article.append(image);
    }
    const heading = document.createElement('h3'); heading.textContent = feature.title;
    article.append(heading);
    if (feature.description) {
      const description = document.createElement('p'); description.textContent = feature.description;
      article.append(description);
    }
    const link = document.createElement('a'); link.className = 'text-link';
    link.href = feature.href; link.textContent = feature.cta;
    article.append(link); featureGrid.append(article);
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
