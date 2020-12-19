import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedCliente: "",
    selectedProyecto: "",
    selectedServicio: "",
    selectedTarea: "",
    
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
    }
  },
  actions: {},
  modules: {}
});
