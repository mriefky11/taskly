<template>
  <button
    :class="computedClass"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot v-if="!isLoading"></slot>
    <span v-else :class="`loading loading-${size} ${loadingClass}`"></span>
  </button>
</template>

<script setup>
import {computed, onMounted} from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  size: {
    type: String,
    default: 'md',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  loadingClass: {
    type: String,
    default: 'loading-ring',
  },
  additionalClass: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['click']);

const computedClass = computed(() => {
  // Map variant to the appropriate DaisyUI class
  const variantClass =
    props.variant === 'primary'
      ? 'btn-primary'
      : props.variant === 'secondary'
        ? 'btn-secondary'
        : props.variant === 'success'
          ? 'btn-success'
          : props.variant === 'warning'
            ? 'btn-warning'
            : props.variant === 'error'
              ? 'btn-error'
              : props.variant === 'accent'
                ? 'btn-accent'
                : props.variant === 'neutral'
                  ? 'btn-neutral'
                  : props.variant === 'ghost'
                    ? 'btn-ghost'
                    : 'btn-primary';

  return [
    'btn',
    variantClass,
    props.additionalClass,
    `btn-${props.size}`,
    {'btn-disabled': props.disabled},
  ];
});

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};

const handleEnterKey = (event) => {
  if (event.key === 'Enter') {
    if (!props.disabled) {
      emit('hit:enter', event);
    }
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEnterKey);
});
</script>
