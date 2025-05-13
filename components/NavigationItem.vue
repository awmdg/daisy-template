<template>
  <div>
    <div
      class="flex items-center space-x-2 cursor-pointer p-1 rounded-lg transition-colors"
      :class="
        isActive(route)
          ? 'bg-pink-100 text-pink-500'
          : 'text-base-content hover:bg-base-300'
      "
    >
      <NuxtLink
        :to="resolveRoute(route)"
        class="flex items-center space-x-5 w-full p-2 rounded-lg transition-colors"
        :class="
          isActive(route)
            ? 'bg-pink-100 text-pink-500'
            : 'text-base-content hover:bg-base-300'
        "
      >
        <component :is="icon" class="h-5 w-5" />
        <span class="text-sm font-medium">{{ title }}</span>
      </NuxtLink>
    </div>

    <div v-if="children && children.length" class="pl-4 mt-1">
      <NavigationItem
        v-for="(child, childIndex) in children"
        :key="childIndex"
        :title="child.title"
        :route="child.route"
        :icon="child.icon"
        :children="child.children"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

interface TNavigationItem {
  title: string;
  icon?: any;
  route: Record<string, any>;
  children?: TNavigationItem[];
}

const currentRoute = useRoute();
defineProps<TNavigationItem>();

const isActive = (itemRoute: Record<string, any>) =>
  currentRoute.name === itemRoute.name;

const resolveRoute = (itemRoute: Record<string, any>) => {
  return typeof itemRoute === "string" ? { name: itemRoute } : itemRoute;
};
</script>
