<template>
  <div
    class="dropdown shadow-lg bg-base-100 rounded-lg"
    :class="additionalClass"
  >
    <div tabindex="0" class="dropdown-trigger">
      <slot name="trigger">Open</slot>
    </div>
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52"
    >
      <slot />
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({additionalClass: {type: String, default: ''}});
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 50;
}
</style>
