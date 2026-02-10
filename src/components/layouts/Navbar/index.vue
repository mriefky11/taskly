<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col min-h-screen">
      <!-- Fixed Navbar -->
      <nav class="navbar fixed top-0 left-0 right-0 bg-base-300 z-50 shadow">
        <label
          for="my-drawer-4"
          aria-label="open sidebar"
          class="btn btn-square btn-ghost"
        >
          <!-- Sidebar toggle icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            fill="none"
            stroke="currentColor"
            class="my-1.5 inline-block size-4"
          >
            <path
              d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
            ></path>
            <path d="M9 4v16"></path>
            <path d="M14 10l2 2l-2 2"></path>
          </svg>
        </label>
        <div class="px-4">Navbar Title</div>
      </nav>

      <!-- Page content with padding for fixed navbar AND margin for fixed sidebar -->
      <div
        ref="contentDiv"
        class="flex-1 flex flex-col pt-16 overflow-hidden transition-all duration-300"
        :style="{marginLeft: contentMarginLeft}"
      >
        <!-- Scrollable content -->
        <div class="flex-1 overflow-y-auto bg-base-200 m-5 p-6 rounded-lg">
          <slot />
        </div>
        <!-- Footer -->
        <Footer />
      </div>
    </div>

    <div
      class="drawer-side is-drawer-close:overflow-visible fixed left-0 top-16 h-[calc(100vh-64px)] z-40"
    >
      <label
        for="my-drawer-4"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div
        class="flex min-h-full flex-col items-start bg-base-300 is-drawer-close:w-14 is-drawer-open:w-64 overflow-y-auto"
      >
        <!-- Sidebar content here -->
        <ul class="menu w-full grow">
          <!-- List item -->
          <li>
            <button
              class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Homepage"
            >
              <!-- Home icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
                class="my-1.5 inline-block size-4"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                <path
                  d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                ></path>
              </svg>
              <span class="is-drawer-close:hidden">Homepage</span>
            </button>
          </li>

          <!-- List item -->
          <li>
            <button
              class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Settings"
            >
              <!-- Settings icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
                class="my-1.5 inline-block size-4"
              >
                <path d="M20 7h-9"></path>
                <path d="M14 17h-5"></path>
                <circle cx="17" cy="17" r="3"></circle>
                <circle cx="7" cy="7" r="3"></circle>
              </svg>
              <span class="is-drawer-close:hidden">Settings</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import Footer from '@/components/layouts/Footer/index.vue';

const contentMarginLeft = ref('0px');

onMounted(() => {
  const checkbox = document.getElementById('my-drawer-4');

  const updateMargin = () => {
    const isChecked = checkbox?.checked || false;

    // Responsive margin berdasarkan sidebar state
    // Open (checked): 256px (w-64)
    // Close (unchecked): 56px (w-14)
    contentMarginLeft.value = isChecked ? '256px' : '56px';
  };

  // Listen to checkbox changes dengan response immediate
  if (checkbox) {
    checkbox.addEventListener('change', updateMargin);
  }

  // Listen to window resize
  window.addEventListener('resize', updateMargin);

  // Initial calculation
  updateMargin();
});
</script>
