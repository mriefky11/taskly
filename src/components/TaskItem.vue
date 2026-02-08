<template>
  <div class="card card-compact bg-base-100 shadow p-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <input
          type="checkbox"
          class="checkbox"
          :checked="task.completed"
          @change="$emit('toggle', task.id)"
        />
        <div>
          <div
            :class="{'line-through opacity-60': task.completed}"
            class="font-medium"
          >
            {{ task.title }}
          </div>
          <div class="text-sm text-gray-500">{{ task.description }}</div>
        </div>
      </div>
      <button class="btn btn-sm btn-error" @click="$emit('delete', task.id)">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({task: Object});
</script>
