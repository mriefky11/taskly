<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar with integrated sidebar -->
    <Navbar />

    <!-- Main content area -->
    <!-- <main class="flex-1 bg-base-200 p-6">
      <slot name="default" />
    </main> -->

    <!-- Footer -->
    <!-- <Footer /> -->
  </div>
</template>

<script setup>
import Navbar from '@/components/layouts/Navbar/index.vue';
import Footer from '@/components/layouts/Footer/index.vue';
</script>

<style scoped>
/* Ensure layout takes full viewport height */
div {
  height: 100%;
}
</style>
