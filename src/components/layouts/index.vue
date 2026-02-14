<template>
  <div class="drawer lg:drawer-open min-h-screen bg-base-200">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col min-h-0">
      <!-- Fixed Navbar -->
      <nav class="navbar fixed top-0 left-0 right-0 bg-base-100 z-50 shadow">
        <div class="flex-1 flex justify-between">
          <div class="flex items-center">
            <label
              for="my-drawer-4"
              aria-label="open sidebar"
              class="btn btn-square btn-ghost"
            >
              <!-- Sidebar toggle icon -->
              <Menu size="20" />
            </label>

            <div class="px-4">Taskly</div>
          </div>
          <div class="flex items-center gap-4 pr-4">
            <label class="swap swap-rotate">
              <!-- this hidden checkbox controls the state -->
              <input
                type="checkbox"
                id="theme-toggle"
                @change="toggleTheme"
                :checked="isDarkMode"
              />

              <!-- sun icon (shown when unchecked) -->
              <Sun size="20" class="swap-off" />

              <!-- moon icon (shown when checked) -->
              <Moon size="20" class="swap-on" />
            </label>
          </div>
        </div>
      </nav>

      <!-- Page content with padding for fixed navbar AND margin for fixed sidebar -->
      <div
        ref="contentDiv"
        class="flex-1 flex flex-col pt-16 overflow-y-auto transition-all duration-300"
        :style="{marginLeft: contentMarginLeft}"
      >
        <!-- Scrollable content -->
        <div class="flex-1 bg-base-100 m-5 px-10 py-5 rounded-lg">
          <div class="text-sm breadcrumbs">
            <ul>
              <li
                v-for="(bc, i) in breadcrumbs"
                :key="i"
                :class="[
                  'no-underline',
                  i === breadcrumbs.length - 1
                    ? 'font-semibold text-primary'
                    : 'text-base-content',
                ]"
              >
                <!-- bukan item terakhir → link -->
                <router-link
                  v-if="bc.to && i !== breadcrumbs.length - 1"
                  :to="bc.to"
                  class="no-underline hover:no-underline hover:text-primary"
                >
                  {{ bc.label }}
                </router-link>

                <!-- item terakhir → span -->
                <span v-else class="font-semibold text-primary no-underline">
                  {{ bc.label }}
                </span>
              </li>
            </ul>
          </div>

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
        class="flex min-h-full flex-col items-start bg-base-100 is-drawer-close:w-14 is-drawer-open:w-64"
      >
        <!-- Sidebar content here -->
        <ul class="menu w-full grow gap-2">
          <!-- List menu item -->
          <li v-for="m in menus" :key="m.to">
            <router-link
              :to="m.to"
              class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              :data-tip="m.label"
            >
              <component :is="m.icon" size="20" />
              <span class="is-drawer-close:hidden">{{ m.label }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {
  Menu,
  House,
  Settings,
  ListTodo,
  Moon,
  Sun,
  FolderOpenDot,
  SquareKanban,
  ClipboardList,
} from 'lucide-vue-next';
import {useRoute} from 'vue-router';
import {computed} from 'vue';
import Footer from '@/components/layouts/Footer/index.vue';

const route = useRoute();

const breadcrumbs = computed(() => {
  return route.meta.breadcrumbs || [];
});

const contentMarginLeft = ref('0px');
const isDarkMode = ref(false);

const menus = [
  {to: '/', label: 'Homepage', icon: House},
  {to: '/project', label: 'Project', icon: FolderOpenDot},
  {to: '/tasks', label: 'Tasks', icon: ClipboardList},
  {to: '/kanban', label: 'Kanban', icon: SquareKanban},
  {to: '/backlog', label: 'Backlog', icon: ListTodo},
  {to: '/settings', label: 'Settings', icon: Settings},
];

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  const theme = isDarkMode.value ? 'dark' : 'emerald';

  // Set tema pada element html
  document.documentElement.setAttribute('data-theme', theme);

  // Simpan preferensi ke localStorage
  localStorage.setItem('theme', theme);
};

onMounted(() => {
  // Restore tema dari localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  isDarkMode.value = savedTheme === 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

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
