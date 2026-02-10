<template>
  <transition name="fade">
    <div v-if="modelValue" class="modal modal-open">
      <div class="modal-box">
        <button
          class="btn btn-sm btn-ghost btn-circle absolute right-2 top-2"
          @click="close"
        >
          ✕
        </button>
        <slot />
      </div>
      <div class="modal-backdrop" @click="close"></div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({modelValue: {type: Boolean, default: false}});
const emit = defineEmits(['update:modelValue']);
const close = () => emit('update:modelValue', false);
</script>
