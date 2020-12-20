import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedCliente: "",
    selectedProyecto: "",
    selectedServicio: "",
    selectedTarea: null,
    startedTarea: [],
    showHistory: false
  },
  mutations: {
    UPDATE_SELECTED_CLIENTE: (state, value) => {
      state.selectedCliente = value;
    },
    UPDATE_SELECTED_PROYECTO: (state, value) => {
      state.selectedProyecto = value;
    },
    UPDATE_SELECTED_SERVICIO: (state, value) => {
      state.selectedServicio = value;
    },
    UPDATE_SELECTED_TAREA: (state, value) => {
      state.selectedTarea = value;
    },
    UPDATE_STARTED_TAREA: (state, value) => {
      /*const index = state.startedTarea.findIndex(t => {
        return t.cliente === value.cliente && t.proyecto === value.proyecto && t.servicio === value.servicio && t.tarea === value.tarea;
      });*/
      // console.log("UPDATE_STARTED_TAREA--->>", index);
      state.startedTarea.push(value);
    },
    UPDATE_SHOW_HISTORY: (state, value) => {
      state.showHistory = value;
    }
  },
  actions: {},
  modules: {}
});
