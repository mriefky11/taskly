<template>
  <div class="join" v-if="total > 1">
    <button
      class="join-item btn"
      :class="{'btn-disabled': page <= 1}"
      :disabled="page <= 1"
      @click="prev"
    >
      Prev
    </button>

    <button
      v-for="(p, idx) in displayPages"
      :key="idx + '-' + p"
      class="join-item btn"
      :class="[
        p === page ? 'btn-active' : '',
        p === '...' ? 'btn-disabled' : '',
      ]"
      @click="typeof p === 'number' && goto(p)"
      :disabled="p === '...'"
    >
      {{ p }}
    </button>

    <button
      class="join-item btn"
      :class="{'btn-disabled': page >= total}"
      :disabled="page >= total"
      @click="next"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import {computed} from 'vue';
const props = defineProps({
  modelValue: {type: Number, default: 1},
  total: {type: Number, default: 1},
});
const emit = defineEmits(['update:modelValue']);

const page = computed(() => props.modelValue);

const buildPages = (total, current) => {
  if (total <= 9) return Array.from({length: total}, (_, i) => i + 1);

  // show 3 first when near start
  if (current <= 3) {
    return [1, 2, 3, '...', total - 1, total];
  }

  // show 3 last when near end
  if (current >= total - 2) {
    return [1, 2, '...', total - 2, total - 1, total];
  }

  // middle: show first two, ellipsis, current-1,current,current+1, ellipsis, last two
  return [
    1,
    2,
    '...',
    current - 1,
    current,
    current + 1,
    '...',
    total - 1,
    total,
  ];
};

const displayPages = computed(() => buildPages(props.total, page.value));

const goto = (p) => emit('update:modelValue', p);
const prev = () => {
  if (page.value > 1) goto(page.value - 1);
};
const next = () => {
  if (page.value < props.total) goto(page.value + 1);
};
</script>

<style scoped>
.join {
  display: inline-flex;
}
.join-item {
  border-radius: 0;
  margin: 0;
}
.btn {
  padding: 0.375rem 0.75rem;
}
.btn-active {
  background-color: #4f46e5;
  color: white;
}
.btn-disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
