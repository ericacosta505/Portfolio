document
  .getElementById("contact-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const formResponse = document.getElementById("form-response");

    try {
      const response = await fetch("/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        formResponse.textContent = "Message sent successfully!";
        formResponse.style.color = "#4caf50";
        e.target.reset();
      } else {
        formResponse.textContent = `Error: ${data.error}`;
        formResponse.style.color = "#f44336";
      }
    } catch (error) {
      console.error("Error:", error);
      formResponse.textContent =
        "Failed to send message. Please try again later.";
      formResponse.style.color = "#f44336";
    }
  });

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("torus-canvas"),
  alpha: true,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const geometry = new THREE.TorusGeometry(5, 1.5, 16, 100);
const material = new THREE.MeshPhongMaterial({
  color: 0x00d4ff,
  emissive: 0x0099cc,
  emissiveIntensity: 0.2,
  shininess: 50,
  opacity: 0.9,
});

const torus = new THREE.Mesh(geometry, material);
torus.position.x = 8;
scene.add(torus);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00d4ff, 1);
pointLight.position.set(18, 10, 10);
scene.add(pointLight);

camera.position.z = 15;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

// Set dark theme by default
document.documentElement.setAttribute("data-theme", "dark");

function updateCanvasSize() {
  const canvas = document.getElementById("torus-canvas");
  canvas.style.width = "100%";
  canvas.style.height = "100%";

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", updateCanvasSize);
updateCanvasSize();

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links a");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

navLinksItems.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const navHeight = document.querySelector("nav").offsetHeight;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Enhanced Intersection Observer for comprehensive scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add the animate class to trigger the animation
      entry.target.classList.add("animate");
      // Unobserve after animation to improve performance
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all scroll animation elements
const scrollElements = document.querySelectorAll(
  ".scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-slide-up, .scroll-scale-in"
);

scrollElements.forEach((element) => {
  scrollObserver.observe(element);
});

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.style.boxShadow = "0 4px 30px var(--nav-shadow)";
    nav.style.padding = "1rem 10%";
  } else {
    nav.style.boxShadow = "0 4px 30px var(--nav-shadow)";
    nav.style.padding = "1.25rem 10%";
  }
  
  lastScroll = currentScroll;
});
