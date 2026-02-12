<script setup>
import {useRoute, useRouter} from 'vue-router';

import MainLayout from '@/components/layouts/index.vue';
// import BlankLayout from '@/components/layouts/index.vue';

const route = useRoute();
const router = useRouter();

const layouts = {
  MainLayout,
  // BlankLayout,
};
</script>

<template>
  <component :is="layouts[route.meta.layout] || MainLayout">
    <router-view />
  </component>
</template>
