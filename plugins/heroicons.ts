import { defineNuxtPlugin } from "#app";
import * as OutlineIcons from "@heroicons/vue/24/outline";
import * as SolidIcons from "@heroicons/vue/24/solid";

export default defineNuxtPlugin((nuxtApp) => {
  Object.entries({ ...OutlineIcons, ...SolidIcons }).forEach(
    ([name, component]) => {
      if (!nuxtApp.vueApp.component(name)) {
        nuxtApp.vueApp.component(name, component);
      }
    }
  );
});
