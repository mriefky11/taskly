<template>
  <nav aria-label="breadcrumb" class="breadcrumbs">
    <ul class="flex items-center gap-1 list-none p-0 m-0">
      <li v-for="(it, idx) in items" :key="idx" class="breadcrumb-item">
        <template v-if="it.href">
          <a :href="it.href" class="text-sm text-primary">{{ it.text }}</a>
        </template>
        <template v-else>
          <span class="text-sm">{{ it.text }}</span>
        </template>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({items: {type: Array, default: () => []}});
</script>

<style scoped>
.breadcrumb-item a {
  text-decoration: none;
}
</style>
