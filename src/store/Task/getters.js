export default {
  allColumns: (state) => state.columns,
  getTasksByStatus: (state) => (status) => state.columns[status] || [],
  getTaskById: (state) => (id) => {
    for (const list of Object.values(state.columns)) {
      const t = list.find((x) => x.id === id);
      if (t) return t;
    }
    return null;
  },
};
