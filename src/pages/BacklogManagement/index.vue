<template>
  <div class="space-y-6 p-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">Backlog</h2>
      <Button variant="primary" size="sm" @click="openCreateModal">
        + Tambah Task
      </Button>
    </div>

    <div class="card bg-base-200 shadow-lg">
      <div class="card-body">
        <div class="overflow-x-auto bg-base-100 rounded-lg border">
          <table class="table table-sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due</th>
                <th class="w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="task in allTasks"
                :key="task.id"
                class="hover"
              >
                <td class="font-semibold">{{ task.title }}</td>
                <td>
                  <span class="opacity-80">
                    {{ shortDesc(task.description) }}
                  </span>
                </td>
                <td>
                  <span class="badge" :class="priorityClass(task.priority)">
                    {{ task.priority }}
                  </span>
                </td>
                <td>
                  <span class="badge badge-ghost">{{ formatStatus(task.status) }}</span>
                </td>
                <td>{{ task.due || '-' }}</td>
                <td>
                  <div class="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      additional-class="btn-xs"
                      @click="openEditModal(task)"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="error"
                      additional-class="btn-xs"
                      @click="confirmDelete(task)"
                    >
                      Hapus
                    </Button>
                  </div>
                </td>
              </tr>
              <tr v-if="!allTasks.length">
                <td colspan="6" class="text-center py-8 opacity-60">
                  Belum ada task — klik Tambah Task
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Create / Edit -->
    <Modal v-model="showModal">
      <h3 class="font-bold text-lg mb-4">
        {{ editingTask ? 'Edit Task' : 'Buat Task Baru' }}
      </h3>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <TextInput
          v-model="form.title"
          name="title"
          label="Judul"
          type="text"
          placeholder="Masukkan judul task"
          :error-messages="formErrors.title"
        />
        <TextArea
          v-model="form.description"
          name="description"
          label="Deskripsi"
          placeholder="Masukkan deskripsi task"
        />
        <Select
          v-model="form.priority"
          label="Prioritas"
          :options="priorityOptions"
          key-field="value"
          text-field="label"
          placeholder="Pilih prioritas"
        />
        <Select
          v-model="form.status"
          label="Status"
          :options="statusOptions"
          key-field="value"
          text-field="label"
          placeholder="Pilih status"
        />
        <DatePicker
          v-model="form.due"
          label="Tanggal Jatuh Tempo"
          placeholder="Pilih tanggal"
        />
        <div class="modal-action">
          <Button type="button" variant="neutral" @click="closeModal">
            Batal
          </Button>
          <Button type="submit" variant="primary">
            {{ editingTask ? 'Simpan' : 'Buat' }}
          </Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/store/Task';

const taskStore = useTaskStore();
const { columns } = storeToRefs(taskStore);

const showModal = ref(false);
const editingTask = ref(null);

const form = reactive({
  title: '',
  description: '',
  priority: 'Low',
  status: 'Todo',
  due: '',
});

const formErrors = reactive({ title: '' });

const priorityOptions = [
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' },
];

const statusOptions = [
  { value: 'Todo', label: 'Todo' },
  { value: 'Ongoing', label: 'Ongoing' },
  { value: 'Done', label: 'Done' },
];

const allTasks = computed(() => {
  const c = columns.value;
  if (!c) return [];
  const tasks = [];
  for (const status of ['Todo', 'Ongoing', 'Done']) {
    const list = c[status];
    if (Array.isArray(list)) {
      tasks.push(...list.map((t) => ({ ...t, status })));
    }
  }
  return tasks;
});

function formatStatus(s) {
  if (!s) return '-';
  const map = { todo: 'Todo', ongoing: 'Ongoing', done: 'Done' };
  return map[String(s).toLowerCase()] || s;
}

function shortDesc(text) {
  if (!text) return '-';
  return text.length > 30 ? text.slice(0, 30) + '…' : text;
}

function priorityClass(p) {
  if (p === 'High') return 'badge-error';
  if (p === 'Medium') return 'badge-warning';
  return 'badge-success';
}

function openCreateModal() {
  editingTask.value = null;
  form.title = '';
  form.description = '';
  form.priority = 'Low';
  form.status = 'Todo';
  form.due = '';
  formErrors.title = '';
  showModal.value = true;
}

function openEditModal(task) {
  editingTask.value = task;
  form.title = task.title;
  form.description = task.description || '';
  form.priority = task.priority || 'Low';
  form.status = formatStatus(task.status);
  form.due = task.due || '';
  formErrors.title = '';
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  editingTask.value = null;
}

function handleSubmit() {
  formErrors.title = '';
  if (!form.title?.trim()) {
    formErrors.title = 'Judul wajib diisi';
    return;
  }
  const status = form.status || 'Todo';
  if (editingTask.value) {
    taskStore.updateTask({
      id: editingTask.value.id,
      updates: {
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        status: status.toLowerCase(),
        due: form.due || '',
      },
    });
    const oldStatus = formatStatus(editingTask.value.status);
    if (oldStatus !== status) {
      taskStore.moveTask({
        taskId: editingTask.value.id,
        fromStatus: oldStatus,
        toStatus: status,
      });
    }
  } else {
    taskStore.createTask({
      status,
      task: {
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        due: form.due || '',
      },
    });
  }
  closeModal();
}

function confirmDelete(task) {
  if (window.confirm(`Hapus task "${task.title}"?`)) {
    taskStore.deleteTask(task.id);
  }
}
</script>
