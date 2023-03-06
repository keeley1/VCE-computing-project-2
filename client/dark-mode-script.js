const themeLink = document.getElementById("theme-link");
const toggleButton = document.getElementById("theme-toggle");
const body = document.body;

// check if the user has a saved preference
const isDarkMode = localStorage.getItem("isDarkMode") === "true";

if (isDarkMode) {
  body.classList.add("dark");
  themeLink.href = "/assets/css/dark-mode.css";
  toggleButton.innerText = "Toggle Light Mode";
} else {
  themeLink.href = "/assets/css/styles.css";
}

toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isCurrentlyDarkMode = body.classList.contains("dark");
  toggleButton.innerText = isCurrentlyDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode";
  localStorage.setItem("isDarkMode", isCurrentlyDarkMode);
  themeLink.href = isCurrentlyDarkMode ? "/assets/css/dark-mode.css" : "/assets/css/styles.css";
});

