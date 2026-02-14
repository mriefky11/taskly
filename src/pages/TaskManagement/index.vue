<template>
  <div class="space-y-6 p-6">
    <div
      v-for="status in columnKeys"
      :key="status"
      class="card bg-base-200 shadow-lg"
    >
      <div class="card-body">
        <!-- Header -->
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <span
              class="badge gap-1 items-center"
              :class="statusColor[status]"
            >
              <CircleCheck
                v-if="status === 'Done'"
                :size="12"
              />
              <CircleDotDashed
                v-else
                :size="12"
              />
              {{ status }}
            </span>
            <div class="badge badge-ghost">
              {{ (columns && columns[status] ? columns[status] : []).length }}
            </div>
          </div>

          <Button
            size="sm"
            variant="primary"
            @click="openCreateModal(status)"
          >
            + Create
          </Button>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto bg-base-100 rounded-lg border">
          <table class="table table-sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Due</th>
                <th class="w-24">Actions</th>
              </tr>
            </thead>

            <draggable
              tag="tbody"
              v-model="columns[status]"
              item-key="id"
              :group="{ name: 'tasks' }"
              @change="onDragChange(status, $event)"
            >
              <template #item="{ element }">
                <tr class="hover cursor-move">
                  <td class="font-semibold">
                    {{ element.title }}
                  </td>
                  <td>
                    <div
                      class="tooltip"
                      :data-tip="element.description"
                    >
                      <span class="opacity-80">
                        {{ shortDesc(element.description) }}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span class="badge" :class="priorityClass(element.priority)">
                      {{ element.priority }}
                    </span>
                  </td>
                  <td>
                    {{ element.due || '-' }}
                  </td>
                  <td>
                    <div class="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        additional-class="btn-xs"
                        @click="openEditModal(element)"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="error"
                        additional-class="btn-xs"
                        @click="confirmDelete(element)"
                      >
                        Hapus
                      </Button>
                    </div>
                  </td>
                </tr>
              </template>

              <template #footer>
                <tr v-if="!(columns && columns[status] && columns[status].length)">
                  <td colspan="5" class="text-center py-6 opacity-60">
                    Belum ada data — klik Create
                  </td>
                </tr>
              </template>
            </draggable>
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
        <DatePicker
          v-model="form.due"
          label="Tanggal Jatuh Tempo"
          placeholder="Pilih tanggal"
        />
        <div class="modal-action">
          <Button
            type="button"
            variant="neutral"
            @click="closeModal"
          >
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
import draggable from 'vuedraggable';
import { CircleCheck, CircleDotDashed } from 'lucide-vue-next';
import { useTaskStore } from '@/store/Task';

const taskStore = useTaskStore();
const { columns } = storeToRefs(taskStore);

const columnKeys = ['Todo', 'Ongoing', 'Done'];

const showModal = ref(false);
const editingTask = ref(null);
const createStatus = ref('Todo');

const form = reactive({
  title: '',
  description: '',
  priority: 'Low',
  due: '',
});

const formErrors = reactive({
  title: '',
});

const priorityOptions = [
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' },
];

const statusColor = computed(() => ({
  Todo: 'badge-neutral',
  Ongoing: 'badge-info',
  Done: 'badge-success',
}));

function openCreateModal(status) {
  editingTask.value = null;
  createStatus.value = status || 'Todo';
  form.title = '';
  form.description = '';
  form.priority = 'Low';
  form.due = '';
  formErrors.title = '';
  showModal.value = true;
}

function openEditModal(task) {
  editingTask.value = task;
  createStatus.value = null;
  form.title = task.title;
  form.description = task.description || '';
  form.priority = task.priority || 'Low';
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

  if (editingTask.value) {
    taskStore.updateTask({
      id: editingTask.value.id,
      updates: {
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        due: form.due || '',
      },
    });
  } else {
    taskStore.createTask({
      status: createStatus.value,
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

function onDragChange(targetStatus, evt) {
  if (evt.added) {
    evt.added.element.status = targetStatus.toLowerCase();
  }
  taskStore.persist();
}

function shortDesc(text) {
  if (!text) return '-';
  return text.length > 20 ? text.slice(0, 20) + '…' : text;
}

function priorityClass(p) {
  if (p === 'High') return 'badge-error';
  if (p === 'Medium') return 'badge-warning';
  return 'badge-success';
}
</script>
