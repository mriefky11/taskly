<template>
  <div class="min-h-[70vh] flex items-center justify-center">
    <div class="max-w-md w-full">
      <div class="card bg-base-100 shadow-xl border-2 border-primary">
        <div class="card-body items-center text-center">
          <!-- badge -->
          <div class="badge badge-warning badge-outline mb-3">
            Under Development
          </div>

          <!-- icon -->
          <div class="mb-4 text-warning">
            <Construction size="100" />
          </div>

          <!-- title -->
          <h2 class="card-title text-2xl">Halaman Sedang Dikembangkan</h2>

          <!-- description -->
          <p class="text-base-content/70">
            Fitur pada halaman ini masih dalam proses perbaikan atau
            pengembangan. Silakan kembali beberapa waktu lagi.
          </p>

          <!-- actions -->
          <div class="card-actions mt-6">
            <router-link to="/" class="btn btn-primary btn-sm">
              Kembali ke Beranda
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {Construction} from 'lucide-vue-next';
</script>
