<template>
  <div class="space-y-2">
    <TaskItem
      v-for="t in tasks"
      :key="t.id"
      :task="t"
      @toggle="$emit('toggle', $event)"
      @delete="$emit('delete', $event)"
    />
    <div v-if="!tasks.length" class="text-center text-gray-500">
      No tasks yet.
    </div>
  </div>
</template>

<script setup>
import TaskItem from './TaskItem.vue';
const props = defineProps({tasks: Array});
</script>
