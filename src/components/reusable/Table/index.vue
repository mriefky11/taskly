<template>
  <div :class="['overflow-x-auto', additionalClass]">
    <table class="table min-w-full">
      <thead>
        <tr>
          <th v-for="(h, idx) in headers" :key="idx" class="text-left p-2">
            {{ h }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rIdx) in rows" :key="rIdx" class="hover:bg-gray-800">
          <td v-for="(h, cIdx) in headers" :key="cIdx" class="p-2">
            {{ row[h] ?? '' }}
          </td>
        </tr>
        <tr v-if="rows.length === 0">
          <td
            :colspan="headers.length"
            class="p-4 text-center text-sm text-gray-500"
          >
            No data
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {computed} from 'vue';
const props = defineProps({
  headers: {type: Array, default: () => []},
  rows: {type: Array, default: () => []},
  additionalClass: {type: String, default: ''},
});

const computedHeaders = computed(() => props.headers || []);
</script>

<style scoped>
table {
  border-spacing: 0;
  border: 1px solid rgba(0, 0, 0, 0.06);
}
th,
td {
  ottom: 1px solid rgba(0, 0, 0, 0.04);
}
</style>
