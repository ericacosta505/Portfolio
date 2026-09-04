const themeButton = document.querySelector('[data-theme-toggle]');
let nightTheme = false;
try { nightTheme = localStorage.getItem('portfolio-theme') === 'night'; } catch {}
function applyTheme() {
  document.documentElement.dataset.theme = nightTheme ? 'night' : 'day';
  if (!themeButton) return;
  themeButton.setAttribute('aria-pressed', String(nightTheme));
  themeButton.setAttribute('aria-label', nightTheme ? 'Lights on: switch to day theme' : 'Lights off: switch to night theme');
  themeButton.querySelector('[data-theme-label]').textContent = nightTheme ? 'Lights on' : 'Lights off';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', nightTheme ? '#242820' : '#f2f0e9');
}
applyTheme();
if (themeButton) {
  themeButton.hidden = false;
  themeButton.addEventListener('click', () => {
    nightTheme = !nightTheme;
    applyTheme();
    try { localStorage.setItem('portfolio-theme', nightTheme ? 'night' : 'day'); } catch {}
  });
}
const clock = document.querySelector('[data-clock]');
const austinTime = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', hour: 'numeric', minute: '2-digit', hour12: true });
function updateClock() {
  const now = new Date();
  if (clock) { clock.textContent = austinTime.format(now); clock.dateTime = now.toISOString(); }
  document.querySelectorAll('[data-year]').forEach(element => { element.textContent = now.getFullYear(); });
}
updateClock();
setInterval(updateClock, 1000 * 30);

// Project tabs: pointer, keyboard, and direct links all select the same panel.
const projectButtons = Array.from(document.querySelectorAll('[data-project-button]'));
const projectPanels = Array.from(document.querySelectorAll('[data-project-panel]'));
function activateProject(index, updateUrl = false) {
  if (!projectPanels[index]) return;
  projectButtons.forEach((button, position) => {
    button.setAttribute('aria-selected', String(position === index));
    button.tabIndex = position === index ? 0 : -1;
  });
  projectPanels.forEach((panel, position) => { panel.hidden = position !== index; });
  if (updateUrl) history.replaceState(null, '', `#project-${index}`);
}
function selectLinkedProject() {
  const match = window.location.hash.match(/^#project-([0-2])$/);
  if (match) activateProject(Number(match[1]));
}
projectButtons.forEach((button, index) => {
  button.addEventListener('click', () => activateProject(index, true));
  button.addEventListener('focus', () => activateProject(index));
  button.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') activateProject(index);
  });
  button.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % projectButtons.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + projectButtons.length) % projectButtons.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = projectButtons.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    projectButtons[next].focus();
    activateProject(next, true);
  });
});
selectLinkedProject();
window.addEventListener('hashchange', selectLinkedProject);
