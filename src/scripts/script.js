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

  const currentTheme = newTheme === 'light' ? light : dark;

  // change CSS variables according to theme
  for (const [key, value] of Object.entries(currentTheme)) {
    root.style.setProperty(key, value);
  }
};

setTheme(getInitialTheme());

toggle.addEventListener('change', (ev) => setTheme(ev.target.checked ? 'dark' : 'light'));
