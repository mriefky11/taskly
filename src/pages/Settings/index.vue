<template>
  <div class="min-h-[70vh] flex items-center justify-center">
    <div class="max-w-md w-full">
      <div class="card bg-base-100 shadow-xl border">
        <div class="card-body items-center text-center">
          <!-- badge -->
          <div class="badge badge-warning badge-outline mb-3">
            Under Development
          </div>

          <!-- icon -->
          <div class="mb-4 text-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-16 h-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M19.428 15.428a8 8 0 11-10.856-10.856M15 9l-6 6"
              />
            </svg>
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
