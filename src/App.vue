<script setup>
import {ref, computed} from 'vue';
import {useToastStore} from '@/store/Toast';
import Navbar from '@/components/layouts/Navbar/index.vue';

const showAlert = ref(true);
const toastStore = useToastStore();

const showToast = (message) => {
  toastStore.toggleToast({
    show: true,
    message: message,
    variant: 'success',
    title: 'Notifikasi',
    duration: 3000,
    persistent: false,
  });
};

// Sample data for reusable components
const titleValue = ref('Sample task title');
const dueDate = ref('');

const tableHeaders = ref(['ID', 'Name', 'Status']);
const tableRows = ref([
  {ID: 1, Name: 'Task 1', Status: 'Open'},
  {ID: 2, Name: 'Task 2', Status: 'In Progress'},
  {ID: 3, Name: 'Task 3', Status: 'Done'},
  {ID: 4, Name: 'Task 4', Status: 'Open'},
  {ID: 5, Name: 'Task 5', Status: 'In Progress'},
  {ID: 6, Name: 'Task 6', Status: 'Done'},
  {ID: 7, Name: 'Task 7', Status: 'Open'},
  {ID: 8, Name: 'Task 8', Status: 'In Progress'},
  {ID: 9, Name: 'Task 9', Status: 'Done'},
  {ID: 10, Name: 'Task 10', Status: 'Open'},
  {ID: 11, Name: 'Task 11', Status: 'In Progress'},
  {ID: 12, Name: 'Task 12', Status: 'Done'},
  {ID: 13, Name: 'Task 13', Status: 'Open'},
  {ID: 14, Name: 'Task 14', Status: 'In Progress'},
  {ID: 15, Name: 'Task 15', Status: 'Done'},
  {ID: 16, Name: 'Task 16', Status: 'Open'},
  {ID: 17, Name: 'Task 17', Status: 'In Progress'},
  {ID: 18, Name: 'Task 18', Status: 'Done'},
  {ID: 19, Name: 'Task 19', Status: 'Open'},
  {ID: 20, Name: 'Task 20', Status: 'In Progress'},
  {ID: 21, Name: 'Task 21', Status: 'Done'},
  {ID: 22, Name: 'Task 22', Status: 'Open'},
  {ID: 23, Name: 'Task 23', Status: 'In Progress'},
  {ID: 24, Name: 'Task 24', Status: 'Done'},
  {ID: 1, Name: 'Task 1', Status: 'Open'},
  {ID: 2, Name: 'Task 2', Status: 'In Progress'},
  {ID: 3, Name: 'Task 3', Status: 'Done'},
  {ID: 4, Name: 'Task 4', Status: 'Open'},
  {ID: 5, Name: 'Task 5', Status: 'In Progress'},
  {ID: 6, Name: 'Task 6', Status: 'Done'},
  {ID: 7, Name: 'Task 7', Status: 'Open'},
  {ID: 8, Name: 'Task 8', Status: 'In Progress'},
  {ID: 9, Name: 'Task 9', Status: 'Done'},
  {ID: 10, Name: 'Task 10', Status: 'Open'},
  {ID: 11, Name: 'Task 11', Status: 'In Progress'},
  {ID: 12, Name: 'Task 12', Status: 'Done'},
  {ID: 13, Name: 'Task 13', Status: 'Open'},
  {ID: 14, Name: 'Task 14', Status: 'In Progress'},
  {ID: 15, Name: 'Task 15', Status: 'Done'},
  {ID: 16, Name: 'Task 16', Status: 'Open'},
  {ID: 17, Name: 'Task 17', Status: 'In Progress'},
  {ID: 18, Name: 'Task 18', Status: 'Done'},
  {ID: 19, Name: 'Task 19', Status: 'Open'},
  {ID: 20, Name: 'Task 20', Status: 'In Progress'},
  {ID: 21, Name: 'Task 21', Status: 'Done'},
  {ID: 22, Name: 'Task 22', Status: 'Open'},
  {ID: 23, Name: 'Task 23', Status: 'In Progress'},
  {ID: 24, Name: 'Task 24', Status: 'Done'},
]);

const listItems = ref(tableRows.value.map((r) => ({id: r.ID, name: r.Name})));

const filterOptions = ref([
  {label: 'Filter', value: ''},
  {label: 'Open', value: 'Open'},
  {label: 'In Progress', value: 'In Progress'},
  {label: 'Done', value: 'Done'},
]);

const paginationPage = ref(1);
const paginationTotal = ref(Math.ceil(tableRows.value.length / 5));

const modalVisible = ref(false);

const breadcrumbItems = ref([
  {text: 'Home', href: '#'},
  {text: 'Tasks', href: '#'},
  {text: 'List'},
]);
</script>

<template>
  <Navbar>
    <div class="flex items-center gap-4">
      <input type="checkbox" value="light" class="toggle theme-controller" />
      <Button @click="showToast('Form submitted successfully!')">Submit</Button>
      <Button variant="secondary" @click="modalVisible = true"
        >Open Modal</Button
      >
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <template #header> Card Header </template>
        <template #default> This is the main content of the card. </template>
        <template #footer>
          <Button size="sm">Action</Button>
        </template>
      </Card>

      <div class="md:col-span-2">
        <h3 class="font-semibold mb-2">
          List (Table with search, filter, pagination)
        </h3>
        <List
          :headers="tableHeaders"
          :rows="tableRows"
          :filterOptions="filterOptions"
          filterField="Status"
          :pageSize="10"
        />
      </div>

      <div>
        <h3 class="font-semibold mb-2">Pagination</h3>
        <Pagination v-model="paginationPage" :total="paginationTotal" />
      </div>

      <div>
        <h3 class="font-semibold mb-2">Dropdown</h3>
        <Dropdown>
          <template #trigger>
            <Button variant="ghost">Menu</Button>
          </template>
          <li><a href="#">Action 1</a></li>
          <li><a href="#">Action 2</a></li>
          <li><a href="#">Action 3</a></li>
        </Dropdown>
      </div>

      <div>
        <h3 class="font-semibold mb-2">Breadcrumb</h3>
        <Breadcrumb :items="breadcrumbItems" />
      </div>
    </div>

    <Modal v-model="modalVisible">
      <h3 class="font-bold text-lg">Demo Modal</h3>
      <p class="py-4">
        This is a simple modal to confirm it renders correctly.
      </p>
      <div class="modal-action">
        <Button @click="modalVisible = false">Close</Button>
      </div>
    </Modal>

    <Alert
      v-model:show="showAlert"
      :type="'alert-info'"
      :message="'Operation Successful!'"
      :dismissible="true"
    />

    <Select
      :label="'Category'"
      :options="[
        {value: 'feature', text: 'Feature'},
        {value: 'bug', text: 'Bug'},
      ]"
      modelValue=""
      keyField="value"
      textField="text"
    />

    <Toast />

    <div class="space-y-4">
      <TextInput
        :label="'Title'"
        name="title"
        :placeholder="'Enter title here'"
        :value="titleValue"
      />

      <TextArea
        :label="'Description'"
        name="description"
        :placeholder="'Enter description here'"
        value=""
      />

      <DatePicker
        :label="'Due Date'"
        :modelValue="dueDate"
        :placeholder="'Select due date'"
      />
    </div>
  </Navbar>
</template>

<style scoped>
@import './style.css';
</style>
