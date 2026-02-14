import { STORAGE_KEY } from './state';

function saveToStorage(columns, idCounter) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ columns, idCounter })
    );
  } catch (_) {
    console.warn('Failed to save tasks to localStorage');
  }
}

export default {
  createTask(payload) {
    const { status, task } = payload;
    const normalizedStatus = status || 'Todo';
    const id = this.idCounter;
    const newTask = {
      id,
      title: task?.title || 'New Task',
      description: task?.description || '',
      priority: task?.priority || 'Low',
      due: task?.due || '',
      status: normalizedStatus.toLowerCase(),
    };
    const list = [...(this.columns[normalizedStatus] || []), newTask];
    this.columns = {
      ...this.columns,
      [normalizedStatus]: list,
    };
    this.idCounter = id + 1;
    saveToStorage(this.columns, this.idCounter);
    return newTask;
  },

  updateTask(payload) {
    const { id, updates } = payload;
    const cols = { ...this.columns };
    let found = false;
    for (const key of Object.keys(cols)) {
      const idx = cols[key].findIndex((t) => t.id === id);
      if (idx >= 0) {
        cols[key] = cols[key].map((t) =>
          t.id === id ? { ...t, ...updates } : t
        );
        found = true;
        break;
      }
    }
    if (found) {
      this.columns = cols;
      saveToStorage(cols, this.idCounter);
    }
    return found;
  },

  deleteTask(id) {
    const cols = { ...this.columns };
    let found = false;
    for (const key of Object.keys(cols)) {
      const filtered = cols[key].filter((t) => t.id !== id);
      if (filtered.length !== cols[key].length) {
        cols[key] = filtered;
        found = true;
        break;
      }
    }
    if (found) {
      this.columns = cols;
      saveToStorage(cols, this.idCounter);
    }
    return found;
  },

  moveTask(payload) {
    const { taskId, fromStatus, toStatus } = payload;
    const cols = JSON.parse(JSON.stringify(this.columns));
    const fromList = cols[fromStatus] || [];
    const toList = cols[toStatus] || [];
    const idx = fromList.findIndex((t) => t.id === taskId);
    if (idx < 0) return false;
    const [task] = fromList.splice(idx, 1);
    task.status = toStatus.toLowerCase();
    toList.push(task);
    cols[fromStatus] = fromList;
    cols[toStatus] = toList;
    this.columns = cols;
    saveToStorage(cols, this.idCounter);
    return true;
  },

  loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { columns, idCounter } = JSON.parse(stored);
        if (columns) this.columns = columns;
        if (idCounter != null) this.idCounter = idCounter;
      }
    } catch (_) {
      console.warn('Failed to load tasks from localStorage');
    }
  },

  persist() {
    saveToStorage(this.columns, this.idCounter);
  },
};
