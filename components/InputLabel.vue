<template>
  <label :for="for" class="block mb-1">
    <span class="label-text">
      {{ title }}
      <span v-if="required" class="text-error ml-1">*</span>
    </span>
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  for: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
});
</script>
