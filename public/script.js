const header = document.querySelector(".site-header");
const progress = document.querySelector(".page-progress i");
const menuButton = document.querySelector(".menu-button");
const menuLabel = menuButton.querySelector("span");
const navigation = document.querySelector(".navigation");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updatePageDetails() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const percent = available > 0 ? (window.scrollY / available) * 100 : 0;

  progress.style.width = `${percent}%`;
  header.classList.toggle("scrolled", window.scrollY > 20);
}

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuLabel.textContent = "MENU";
  navigation.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";

  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuLabel.textContent = isOpen ? "MENU" : "CLOSE";
  navigation.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("scroll", updatePageDetails, { passive: true });
updatePageDetails();

function updateAustinTime() {
  const value = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

  document.getElementById("austin-time").textContent = `${value} CT`;
}

updateAustinTime();
window.setInterval(updateAustinTime, 30_000);

const revealItems = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("in-view"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.11, rootMargin: "0px 0px -5% 0px" },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

document.getElementById("year").textContent = new Date().getFullYear();
