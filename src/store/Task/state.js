const STORAGE_KEY = 'task_management_v1';

const defaultColumns = () => ({
  Todo: [],
  Ongoing: [],
  Done: [],
});

const COLUMN_KEYS = ['Todo', 'Ongoing', 'Done'];

function normalizeColumns(raw) {
  const cols = defaultColumns();
  if (!raw || typeof raw !== 'object') return cols;
  for (const key of COLUMN_KEYS) {
    const val = raw[key] ?? raw[key.toLowerCase()];
    cols[key] = Array.isArray(val) ? val : [];
  }
  return cols;
}

const getInitialState = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        columns: normalizeColumns(parsed.columns),
        idCounter: parsed.idCounter ?? 1,
        _storageKey: STORAGE_KEY,
      };
    }
  } catch (_) {
    // ignore parse error
  }
  return {
    columns: defaultColumns(),
    idCounter: 1,
    _storageKey: STORAGE_KEY,
  };
};

const state = () => getInitialState();

export default state;
export { STORAGE_KEY };
