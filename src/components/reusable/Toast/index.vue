<script setup>
import {watch, computed, ref} from 'vue';
import {useToastStore} from '@/store/Toast';

const toastStore = useToastStore();

const closeToast = () => {
  toastStore.toggleToast({show: false});
};

const additionalClass = computed(() => ({
  'bg-info': toastStore.config.variant === 'info',
  'bg-error': toastStore.config.variant === 'error',
  'bg-warning': toastStore.config.variant === 'warning',
  'bg-success': toastStore.config.variant === 'success',
}));

const toastRef = ref(null);

watch(
  () => toastStore.config.show,
  (val) => {
    if (val) {
      toastRef.value?.showPopover();

      if (!toastStore.config.persistent) {
        setTimeout(() => {
          closeToast();
        }, toastStore.config.duration);
      }
    } else {
      toastRef.value?.hidePopover();
    }
  },
);
</script>

<template>
  <transition name="fade">
    <div
      v-show="toastStore.config.show"
      ref="toastRef"
      popover="manual"
      class="toast toast-end z-[9999] p-0"
    >
      <div
        class="alert flex justify-between shadow-xl"
        :class="additionalClass"
      >
        <div class="content">
          <p v-if="toastStore.config.title" class="font-bold mb-1">
            {{ toastStore.config.title }}
          </p>
          <p>{{ toastStore.config.message }}</p>
        </div>
        <!-- <Button
          variant="ghost"
          additionalClass="btn-sm btn-circle"
          @click="closeToast"
        >
          ✕
        </Button> -->
      </div>
    </div>
  </transition>
</template>

<style scoped>
[popover] {
  border: none;
  overflow: visible;
  background: transparent;
}
[popover]::backdrop {
  background: transparent;
}
</style>
