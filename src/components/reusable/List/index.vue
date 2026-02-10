<template>
  <div :class="['w-full', additionalClass]">
    <div class="mb-3">
      <div class="flex justify-end items-center gap-3">
        <input
          v-model="search"
          type="search"
          :placeholder="searchPlaceholder"
          class="input"
        />

        <select v-model="selectedFilter" class="select">
          <option
            v-for="opt in filterOptions"
            :key="opt.value"
            :value="opt.value"
          >
            {{ opt.label }}
          </option>
        </select>
      </div>
    </div>

    <Table :headers="headers" :rows="displayRows" />

    <div class="mt-3 flex items-center justify-between">
      <div class="flex items-center gap-3 w-full">
        <label class="text-sm">Show</label>
        <select v-model.number="pageSize" class="select w-1/12">
          <option v-for="opt in pageSizeOptions" :key="opt" :value="opt">
            {{ opt }}
          </option>
        </select>
        <div class="text-sm text-gray-600">
          Showing {{ startIndex + 1 }}-{{ endIndex }} of {{ filtered.length }}
        </div>
      </div>
      <Pagination v-model="page" :total="totalPages" />
    </div>
  </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue';

const props = defineProps({
  headers: {type: Array, default: () => []},
  rows: {type: Array, default: () => []},
  pageSize: {type: Number, default: 10},
  filterOptions: {type: Array, default: () => [{label: 'All', value: ''}]},
  filterField: {type: String, default: ''},
  searchPlaceholder: {type: String, default: 'Search...'},
  additionalClass: {type: String, default: ''},
});

const search = ref('');
const selectedFilter = ref('');
const page = ref(1);
const pageSize = ref(props.pageSize);
const pageSizeOptions = [5, 10, 25, 50];

watch([search, selectedFilter, () => props.rows], () => {
  page.value = 1;
});

watch(pageSize, () => {
  page.value = 1;
});

const filtered = computed(() => {
  let data = props.rows || [];

  if (props.filterField && selectedFilter.value) {
    data = data.filter(
      (r) => String(r[props.filterField]) === String(selectedFilter.value),
    );
  }

  if (search.value) {
    const q = search.value.toLowerCase();
    data = data.filter((r) =>
      props.headers.some((h) => String(r[h]).toLowerCase().includes(q)),
    );
  }

  return data;
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filtered.value.length / pageSize.value)),
);

const displayRows = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return filtered.value.slice(start, start + pageSize.value);
});

const startIndex = computed(() =>
  filtered.value.length === 0 ? 0 : (page.value - 1) * pageSize.value,
);
const endIndex = computed(() =>
  Math.min(filtered.value.length, page.value * pageSize.value),
);
</script>
