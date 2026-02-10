const toggleToast = function (payload) {
  this.config = { ...this.config, ...payload };
};

export default {
  toggleToast,
};
