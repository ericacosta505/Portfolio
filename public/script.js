const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

window.requestAnimationFrame(() => {
  document.body.classList.add("is-ready");
});

document.querySelectorAll("a.page-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      reduceMotion.matches
    ) {
      return;
    }

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin) return;

    event.preventDefault();
    document.body.classList.add("is-leaving");
    window.setTimeout(() => {
      window.location.href = destination.href;
    }, 220);
  });
});

const projectButtons = Array.from(document.querySelectorAll("[data-project-button]"));
const projectPanels = Array.from(document.querySelectorAll(".project-panel[data-project]"));
const projectDetails = Array.from(document.querySelectorAll("[data-project-detail]"));

function activateProject(index) {
  projectButtons.forEach((button) => {
    const isActive = button.dataset.projectButton === String(index);
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  projectPanels.forEach((panel) => {
    const isActive = panel.dataset.project === String(index);
    panel.classList.toggle("is-active", isActive);
    panel.setAttribute("aria-hidden", String(!isActive));
  });

  projectDetails.forEach((detail) => {
    const isActive = detail.dataset.projectDetail === String(index);
    detail.classList.toggle("is-active", isActive);
    detail.hidden = !isActive;
  });
}

projectButtons.forEach((button, index) => {
  button.addEventListener("mouseenter", () => activateProject(index));
  button.addEventListener("focus", () => activateProject(index));
  button.addEventListener("click", () => {
    activateProject(index);
    if (window.matchMedia("(max-width: 760px)").matches) {
      document.querySelector(".work-stage")?.scrollIntoView({
        behavior: reduceMotion.matches ? "auto" : "smooth",
        block: "center",
      });
    }
  });
  button.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (index + direction + projectButtons.length) % projectButtons.length;
    projectButtons[nextIndex].focus();
    activateProject(nextIndex);
  });
});

const artwork = document.querySelector(".system-art, .contact-mark");
const artView = artwork?.closest(".view");

if (artwork && artView) {
  artView.addEventListener("pointermove", (event) => {
    if (reduceMotion.matches) return;
    const bounds = artView.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    artwork.style.setProperty("--art-x", `${x * 14}px`);
    artwork.style.setProperty("--art-y", `${y * 14}px`);
  });

  artView.addEventListener("pointerleave", () => {
    artwork.style.setProperty("--art-x", "0px");
    artwork.style.setProperty("--art-y", "0px");
  });
}
