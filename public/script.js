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
  color: 0xff7a4a,
  emissive: 0xff5e3a,
  emissiveIntensity: 0.2,
  shininess: 50,
  opacity: 0.9,
});

const torus = new THREE.Mesh(geometry, material);
torus.position.x = 8;
scene.add(torus);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff7a4a, 1);
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

const themeToggleBtn = document.getElementById("theme-toggle-btn");
const themeIcon = themeToggleBtn.querySelector("i");

const currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
}
