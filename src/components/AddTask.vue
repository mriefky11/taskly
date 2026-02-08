<template>
  <form @submit.prevent="submit" class="mb-4">
    <div class="form-control">
      <input
        v-model="title"
        placeholder="Task title"
        class="input input-bordered w-full mb-2"
      />
      <textarea
        v-model="description"
        placeholder="Description (optional)"
        class="textarea textarea-bordered w-full mb-2"
      ></textarea>
      <div class="flex gap-2">
        <button class="btn btn-primary" type="submit">Add Task</button>
        <button class="btn btn-ghost" type="button" @click="clear">
          Clear
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import {ref} from 'vue';
const emit = defineEmits(['add']);
const title = ref('');
const description = ref('');

function submit() {
  if (!title.value.trim()) return;
  emit('add', {
    id: Date.now(),
    title: title.value.trim(),
    description: description.value.trim(),
    completed: false,
  });
  title.value = '';
  description.value = '';
}

function clear() {
  title.value = '';
  description.value = '';
}
</script>
