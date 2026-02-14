<template>
  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
      v-for="status in ['Todo','Ongoing','Done']"
        :key="status"
        class="bg-base-200 rounded-xl p-4 min-h-[300px]"
      >
        <div class="flex justify-between items-center mb-4">
          <span class="flex items-center gap-2">
            <span class="font-semibold badge" :class="statusColor[status]">
            {{ status }}
          </span>
          <span>
            {{ columns.length || 0 }}
          </span>
          </span>
          <Button size="sm" variant="primary" @click="openCreateModal(status)">
            + Add
          </Button>
        </div>
        <draggable
          v-model="columns[status]"
          item-key="id"
          :group="{ name: 'tasks' }"
          class="space-y-3 min-h-[200px]"
          @change="onDragChange(status, $event)"
        >
          <template #item="{ element }">
            <div
              class="card bg-base-100 shadow cursor-move hover:shadow-md transition"
            >
              <div class="card-body p-3">
                <h4 class="font-semibold text-sm">{{ element.title }}</h4>
                <p class="text-xs opacity-80 line-clamp-2">
                  {{ element.description || '-' }}
                </p>
                <div class="flex justify-between items-center mt-2">
                  <span
                    class="badge badge-sm"
                    :class="priorityClass(element.priority)"
                  >
                    {{ element.priority }}
                  </span>
                  <span class="text-xs opacity-60">{{ element.due || '-' }}</span>
                </div>
                <div class="flex gap-1 mt-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    additional-class="btn-xs"
                    @click.stop="openEditModal(element)"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="error"
                    additional-class="btn-xs"
                    @click.stop="confirmDelete(element)"
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>

    <!-- Modal Create / Edit (shared) -->
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
import draggable from 'vuedraggable';
import { useTaskStore } from '@/store/Task';

const taskStore = useTaskStore();
const { columns } = storeToRefs(taskStore);

const showModal = ref(false);
const editingTask = ref(null);
const createStatus = ref('Todo');

const form = reactive({
  title: '',
  description: '',
  priority: 'Low',
  due: '',
});

const formErrors = reactive({ title: '' });

const priorityOptions = [
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' },
];

const statusColor = {
  Todo: 'badge-neutral',
  Ongoing: 'badge-info',
  Done: 'badge-success',
};


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

function priorityClass(p) {
  if (p === 'High') return 'badge-error';
  if (p === 'Medium') return 'badge-warning';
  return 'badge-success';
}
</script>
