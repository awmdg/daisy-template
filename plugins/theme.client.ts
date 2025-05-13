export default defineNuxtPlugin(() => {
  if (process.client) {
    // Apply theme immediately before Vue hydration
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = savedTheme ?? (systemPrefersDark ? "dark" : "light");

    // Apply theme to document
    document.documentElement.setAttribute("data-theme", theme);

    // Prevent flash by hiding content until theme is applied
    document.documentElement.style.visibility = "visible";
  }
});
