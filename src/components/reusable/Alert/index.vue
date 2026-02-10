<template>
  <transition name="fade">
    <div v-if="show" role="alert" :class="['alert', type]" class="mt-2">
      <!-- Info Alert -->
      <svg
        v-if="type === 'alert-info'"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="h-6 w-6 shrink-0 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>

      <!-- Success Alert -->
      <svg
        v-if="type === 'alert-success'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <!-- Warning Alert -->
      <svg
        v-if="type === 'alert-warning'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>

      <!-- Error Alert -->
      <svg
        v-if="type === 'alert-error'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <span>{{ message }}</span>
      <button
        v-if="dismissible"
        class="btn btn-outline btn-sm rounded-full"
        @click="handleDismiss"
      >
        X
      </button>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    default: 'alert-info',
    validator: (value) =>
      ['alert-info', 'alert-success', 'alert-warning', 'alert-error'].includes(
        value,
      ),
  },
  message: {
    type: String,
    required: true,
  },
  dismissible: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:show']);

const handleDismiss = () => {
  emit('update:show', false);
};
</script>
