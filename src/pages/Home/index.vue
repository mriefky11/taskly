<template>
  <div class="mt-2">
    <div>
      <div class="text-2xl font-semibold mb-6">{{ date }}</div>
    </div>
    <div class="grid gap-4 mb-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card
        v-for="dt in data"
        :key="dt.id"
        :additionalClass="dt.color"
        class="w-full"
      >
        <template #header class="font-bold text-5xl">{{ dt.label }}</template>
        <div class="text-2xl font-bold">
          {{ dt.total }}
        </div>
      </Card>
    </div>
  </div>
</template>
<script setup>
import {formatDateDay} from '@/helper/DateHelper';

const date = formatDateDay(new Date());

const data = [
  {
    id: 1,
    label: 'Total Tasks',
    total: 20,
    color: 'border-l-10 border-l-primary text-primary',
  },
  {
    id: 2,
    label: 'Done',
    total: 10,
    color: 'border-l-10 border-l-success text-success',
  },
  {
    id: 3,
    label: 'In Progress',
    total: 7,
    color: 'border-l-10 border-l-info text-info',
  },
  {
    id: 4,
    label: 'Todo',
    total: 3,
    color: 'border-l-10 border-l-gray text-gray',
  },
];
</script>
