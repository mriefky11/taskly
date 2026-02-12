<template>
  <div class="card bg-base-200 shadow-lg">
    <div :class="['card', additionalClass]">
      <div v-if="$slots.header" class="card-body">
        <h2 class="card-title"><slot name="header" /></h2>
        <slot />
        <div v-if="$slots.footer" class="card-actions justify-end">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  additionalClass: {type: String, default: ''},
});
</script>
