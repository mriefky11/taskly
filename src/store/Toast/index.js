import { defineStore } from "pinia";
import state from "./state";
import actions from "./actions";
import getters from "./getters";

export const useToastStore = defineStore("toastStore", {
  state,
  actions,
  getters,
});
