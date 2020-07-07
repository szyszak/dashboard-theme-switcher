import { light, dark } from './theme';

const root = window.document.documentElement;
const toggle = document.querySelector('#toggle');

const getInitialTheme = () => {
  // use theme saved in local storage
  const persistedTheme = window.localStorage.getItem('theme');
  const hasPersistedPreference = typeof persistedTheme === 'string';

  if (hasPersistedPreference) {
    return persistedTheme;
  }

  // check if users browser/system supports this media query
  const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
  const hasMediaQueryPreference = typeof mediaQueryList.matches === 'boolean';

  // use theme preferred by used
  if (hasMediaQueryPreference) {
    return mediaQueryList.matches ? 'dark' : 'light';
  }

  // use default theme
  return 'light';
};

const setTheme = (newTheme) => {
  // update theme in local storage
  localStorage.setItem('theme', newTheme);

  // update theme toggle state
  if (newTheme === 'dark') {
    toggle.checked = true;
  } else {
    toggle.checked = false;
  }

  // change CSS variables according to theme
  root.style.setProperty('--background', newTheme === 'dark' ? dark.background : light.background);

  root.style.setProperty(
    '--background-top',
    newTheme === 'dark' ? dark.backgroundTop : light.backgroundTop,
  );

  root.style.setProperty('--card-bg', newTheme === 'dark' ? dark.cardBg : light.cardBg);

  root.style.setProperty(
    '--text-secondary',
    newTheme === 'dark' ? dark.textSecondary : light.textSecondary,
  );

  root.style.setProperty(
    '--text-primary',
    newTheme === 'dark' ? dark.textPrimary : light.textPrimary,
  );

  root.style.setProperty(
    '--card-bg-hover',
    newTheme === 'dark' ? dark.cardBgHover : light.cardBgHover,
  );

  root.style.setProperty('--toggle-bg', newTheme === 'dark' ? dark.toggleBg : light.toggleBg);

  root.style.setProperty('--toggle-dot', newTheme === 'dark' ? dark.toggleDot : light.toggleDot);
};

setTheme(getInitialTheme());

toggle.addEventListener('change', (ev) => setTheme(ev.target.checked ? 'dark' : 'light'));
