import Vue from "vue";
import Vuex from "vuex";
import { workStatus } from "@/helper/constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shifts: [
      {
        symbol: "M",
        symbolColor: "#7ACFEE",
        startTime: "09:10",
        endTime: "15:10"
      },
      {
        symbol: "T",
        symbolColor: "#1197D8",
        startTime: "16:00",
        endTime: "18:00"
      }
    ],
    todayDate: new Date(),
    userCurrentStatus: {
      tareaId: -1,
      status: workStatus.NOT_STARTED,
      initialWorkStartTime: -1
    },
    selectedCliente: "",
    selectedProyecto: "",
    selectedServicio: "",
    selectedTarea: null,
    startedTarea: [],
    showHistory: true
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
    ADD_TAREA_STARTED_TAREA_LIST: (state, value) => {
      /*const index = state.startedTarea.findIndex(t => {
        return t.cliente === value.cliente && t.proyecto === value.proyecto && t.servicio === value.servicio && t.tarea === value.tarea;
      });*/
      // console.log("UPDATE_STARTED_TAREA--->>", index);
      const id = state.startedTarea.length;
      state.startedTarea.push({ id, ...value, workingTimes: [], status: workStatus.NOT_STARTED });
    },
    START_WORK: (state, tareaId) => {
      const index = state.startedTarea.findIndex(tarea => tarea.id === tareaId);
      if (index !== -1) {
        const startTime = new Date();
        state.startedTarea[index].workingTimes.push({
          startTime,
          stopTime: 0,
          status: workStatus.WORKING
        });
        state.startedTarea[index].status = workStatus.WORKING;
      } else {
        console.log("OPERATION FAILED!!! Tarea not found by ID: ", tareaId);
      }
    },
    STOP_WORK: (state, { tareaId, workStatus }) => {
      const index = state.startedTarea.findIndex(tarea => tarea.id === tareaId);
      if (index !== -1) {
        const len = state.startedTarea[index].workingTimes.length;
        if (len !== 0) {
          state.startedTarea[index].workingTimes[len - 1].stopTime = new Date();
          state.startedTarea[index].workingTimes[len - 1].status = workStatus;
          state.startedTarea[index].status = workStatus;
        } else {
          console.log("OPERATION FAILED!!! Tarea not started. ");
        }
      } else {
        console.log("OPERATION FAILED!!! Tarea not found by ID: ", tareaId);
      }
    },
    UPDATE_USER_CURRENT_STATUS: (state, tareaId) => {
      const index = state.startedTarea.findIndex(tarea => tarea.id === tareaId);
      if (index !== -1) {
        state.userCurrentStatus.tareaId = tareaId
        state.userCurrentStatus.status = state.startedTarea[index].status
        if (state.userCurrentStatus.initialWorkStartTime === -1) {
          state.userCurrentStatus.initialWorkStartTime = new Date();
        }
      } else {
        console.log("OPERATION FAILED!!! Tarea not found by ID: ", tareaId);
      }
    },
    UPDATE_SHOW_HISTORY: (state, value) => {
      state.showHistory = value;
    }
  },
  actions: {
    requestStartWork: async ({ commit }, { tareaId }) => {
      await commit("START_WORK", tareaId);
      commit("UPDATE_USER_CURRENT_STATUS", tareaId );
    }
  },
  modules: {},
  getters: {

  }
});
