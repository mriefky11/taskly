import {ref, watch} from 'vue';

const STORAGE_KEY = 'tasks_v1';

export default function useTasks() {
  const tasks = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value));
  }

  function addTask(task) {
    tasks.value.unshift(task);
    save();
  }

  function toggleTask(id) {
    const t = tasks.value.find((x) => x.id === id);
    if (t) {
      t.completed = !t.completed;
      save();
    }
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter((x) => x.id !== id);
    save();
  }

  watch(tasks, save, {deep: true});

  return {tasks, addTask, toggleTask, deleteTask};
}
