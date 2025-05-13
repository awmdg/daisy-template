<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex flex-col min-h-screen">
      <header class="bg-base-200">
        <div class="flex items-center justify-between px-4 h-16">
          <div class="flex items-center gap-4">
            <label
              for="my-drawer-2"
              class="btn btn-ghost drawer-button lg:hidden"
            >
              <Bars3Icon class="h-6 w-6" />
            </label>
          </div>
        </div>
      </header>

      <main class="p-4 flex-1 bg-base-200">
        <slot />
      </main>
    </div>

    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <aside class="min-h-screen w-70 flex flex-col">
        <div class="grid place-items-center">
          <NuxtImg
            src="/proji-logo-2.png"
            alt="Proji Logo"
            class="w-40 h-20 p-1 mt-3 mb-4 object-contain"
            loading="lazy"
          />
        </div>

        <nav class="flex-1 px-2 space-y-2 overflow-y-auto">
          <NavigationItem
            v-for="(navigationItem, index) in navigationItems"
            :key="index"
            :title="navigationItem.title"
            :icon="navigationItem.icon"
            :route="navigationItem.route"
            :children="navigationItem.children"
          />
        </nav>

        <!-- User Dropdown -->
        <div class="p-4 border-t border-base-300">
          <div class="dropdown dropdown-top w-full">
            <div
              tabindex="0"
              role="button"
              class="btn btn-ghost btn-block justify-start gap-3"
            >
              <div class="avatar">
                <div class="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <span class="font-medium">User</span>
            </div>
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box w-52 p-2 shadow z-[999] mb-2"
            >
              <li>
                <a class="justify-between"
                  >Profile <span class="badge">New</span></a
                >
              </li>
              <li><a>Settings</a></li>
              <li><a @click="logout">Logout</a></li>
              <!-- Theme Switcher -->
              <li>
                <div class="flex items-center justify-between">
                  <span>Theme Switch</span>
                  <label class="toggle text-base-content">
                    <input
                      type="checkbox"
                      @change="toggleTheme"
                      :checked="isDarkTheme"
                      class="theme-controller"
                    />
                    <svg
                      aria-label="sun"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="h-5 w-5"
                    >
                      <g
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="12" r="4"></circle>
                        <path d="M12 2v2"></path>
                        <path d="M12 20v2"></path>
                        <path d="m4.93 4.93 1.41 1.41"></path>
                        <path d="m17.66 17.66 1.41 1.41"></path>
                        <path d="M2 12h2"></path>
                        <path d="M20 12h2"></path>
                        <path d="m6.34 17.66-1.41 1.41"></path>
                        <path d="m19.07 4.93-1.41 1.41"></path>
                      </g>
                    </svg>
                    <svg
                      aria-label="moon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="h-5 w-5"
                    >
                      <g
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                      </g>
                    </svg>
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from "vue";
const { navigationItems } = useNavigationRoute();

const logout = () => {
  console.log("Logging out...");
};

const currentTheme = ref<"light" | "dark">("light");

// Computed property for toggle state
const isDarkTheme = computed(() => currentTheme.value === "dark");

const applyTheme = (theme: "light" | "dark") => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  currentTheme.value = theme;
};

onBeforeMount(() => {
  if (process.client) {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = savedTheme ?? (systemPrefersDark ? "dark" : "light");
    currentTheme.value = theme;
  }
});

onMounted(() => {
  if (process.client) {
    applyTheme(currentTheme.value);

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
  }
});

const toggleTheme = () => {
  const newTheme = currentTheme.value === "dark" ? "light" : "dark";
  applyTheme(newTheme);
};
</script>
