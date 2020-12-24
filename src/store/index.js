import Vue from "vue";
import Vuex from "vuex";
import { workStatus } from "@/helper/constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: {
      content: "",
      color: ""
    },
    shifts: [],
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
    showHistory: true,
    progressData: []
  },
  mutations: {
    SET_SHIFT: (state, data) => {
      state.shifts = data;
    },
    ADD_PROGRESS_DATA: (state, payload) => {
      const id = state.progressData.length;
      state.progressData.push({ id, ...payload });
    },
    UPDATE_PROGRESS_DATA: (state, payload) => {
      const index = state.progressData.findIndex(progress => progress.id === payload.id);
      if (index !== -1) {
        // console.log("Updating progress data: ", payload);
        state.progressData[index].progress = payload.progress;
        state.progressData[index].duration = payload.duration;
        state.progressData[index].time = payload.time;
      } else {
        console.log("NO PROGRESS DATA FOUND BY ID ", payload.id);
      }
    },
    ADD_PROGRESS_DATA_IN_TAREA: (state, payload) => {
      console.log("ADD_PROGRESS_DATA_IN_TAREA==>", payload);
      const index = state.startedTarea.findIndex(tarea => tarea.id === payload.tareaId);
      if (index !== -1) {
        const id = state.startedTarea[index].progressData.length;
        console.log("ADD_PROGRESS_DATA_IN_TAREA--- adding>>");

        state.startedTarea[index].progressData.push({
          id,
          ...payload,
          status: state.progressData[state.progressData.length - 1].status,
          color:
            state.progressData[state.progressData.length - 1].color === "disabled"
              ? "dattechs_black_5"
              : state.progressData[state.progressData.length - 1].color
        });
        payload.progress = 0;

        state.startedTarea[index].progressData.push({ id, ...payload });
      } else {
        console.log("ADD_PROGRESS_DATA_IN_TAREA FAILED!!! Tarea not found by ID: ", payload.tareaId);
      }
    },
    UPDATE_PROGRESS_DATA_IN_TAREA: (state, payload) => {
      const tareaIndex = state.startedTarea.findIndex(tarea => tarea.id === payload.tareaId);
      if (tareaIndex !== -1) {
        state.startedTarea[tareaIndex].progressData[state.startedTarea[tareaIndex].progressData.length - 1].progress = payload.progress;
        state.startedTarea[tareaIndex].progressData[state.startedTarea[tareaIndex].progressData.length - 1].duration = payload.duration;
        state.startedTarea[tareaIndex].progressData[state.startedTarea[tareaIndex].progressData.length - 1].time = payload.time;
      } else {
        console.log("UPDATE_PROGRESS_DATA_IN_TAREA FAILED!!! Tarea not found by ID: ", payload.tareaId);
      }
    },
    STOP_PROGRESS_DATA_IN_TAREA: (state, payload) => {
      console.log("STOP_PROGRESS_DATA_IN_TAREA--->>", payload);
      const index = state.startedTarea.findIndex(tarea => tarea.id === payload.tareaDetails.id);
      if (index !== -1) {
        console.log("STOP_PROGRESS_DATA_IN_TAREA--->>", payload);
        // todo:: UPDATE STATUS OF TAREA
        const startTime = new Date().getTime();
        state.startedTarea[index].workingTimes.push({
          startTime,
          stopTime: 0,
          status: workStatus.STOPPED
        });
      } else {
        console.log("STOP_PROGRESS_DATA_IN_TAREA FAILED!!! Tarea not found by ID: ", payload.tareaId);
      }
    },
    SHOW_SNACKBAR_MESSAGE: (state, { content, color }) => {
      state.snackbar.content = content;
      state.snackbar.color = color;
    },
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
      state.startedTarea.push({ id, ...value, workingTimes: [], status: workStatus.NOT_STARTED, progressData: [] });
    },
    START_WORK: (state, tareaId) => {
      const index = state.startedTarea.findIndex(tarea => tarea.id === tareaId);
      if (index !== -1) {
        const startTime = new Date().getTime();
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
    STOP_WORK: (state, tareaDetails) => {
      console.log("STOP_WORK----->>", tareaDetails);
      const index = state.startedTarea.findIndex(tarea => tarea.id === tareaDetails.id);
      if (index !== -1) {
        const len = state.startedTarea[index].workingTimes.length;
        if (len !== 0) {
          state.startedTarea[index].workingTimes[len - 1].stopTime = new Date().getTime();
          state.startedTarea[index].workingTimes[len - 1].status = workStatus.STOPPED;
          state.startedTarea[index].status = workStatus.STOPPED;
          state.userCurrentStatus.status = workStatus.STOPPED;
          state.userCurrentStatus.initialWorkStartTime = new Date().getTime();
        } else {
          console.log("OPERATION FAILED!!! Tarea not started.");
        }
      } else {
        console.log("OPERATION FAILED!!! Tarea not found by ID: ", tareaDetails.id);
      }
    },
    UPDATE_USER_CURRENT_STATUS: (state, tareaId) => {
      const index = state.startedTarea.findIndex(tarea => tarea.id === tareaId);
      if (index !== -1) {
        state.userCurrentStatus.tareaId = tareaId;
        state.userCurrentStatus.status = state.startedTarea[index].status;
        state.userCurrentStatus.initialWorkStartTime = new Date().getTime();
      } else {
        console.log("OPERATION FAILED!!! Tarea not found by ID: ", tareaId);
      }
    },
    UPDATE_SHOW_HISTORY: (state, value) => {
      state.showHistory = value;
    }
  },
  actions: {
    requestStartWork: async ({ commit, dispatch }, { tareaId, currentProgress, progress, duration, time, status, color }) => {
      await commit("START_WORK", tareaId);
      commit("UPDATE_USER_CURRENT_STATUS", tareaId);
      //workingTimes
      console.log("requestStartWork progress-->>", progress);
      await dispatch("addProgressDataInTarea", {
        tareaId,
        progress: currentProgress,
        duration,
        time,
        status,
        color
      });

      await dispatch("addItemInProgressData", {
        duration,
        time,
        status,
        color
      });
      // await commit("ADD_PROGRESS_DATA_IN_TAREA", { tareaId, currentProgress, duration, time, status: "late", color: "disabled" });
      // commit("ADD_PROGRESS_DATA_IN_TAREA", { tareaId, progress, duration, time, status: "working", color: "primary" });
    },
    requestStopWork: async ({ commit }, { tareaDetails, progress, duration, time }) => {
      await commit("STOP_WORK", tareaDetails);
      //workingTimes
      commit("STOP_PROGRESS_DATA_IN_TAREA", { tareaDetails, progress, duration, time, status: workStatus.STOPPED, color: "disabled" });
    },
    addItemInProgressData: ({ commit }, { duration, time, status, color }) => {
      commit("ADD_PROGRESS_DATA", { progress: 0, duration, time, status, color });
    },
    updateItemInProgressData: ({ commit }, { id, progress, duration, time }) => {
      commit("UPDATE_PROGRESS_DATA", { id, progress, duration, time });
    },
    addProgressDataInTarea: ({ commit }, { tareaId, progress, duration, time, status, color }) => {
      commit("ADD_PROGRESS_DATA_IN_TAREA", { tareaId, progress, duration, time, status, color });
    },
    updateProgressDataInTarea: ({ commit }, { tareaId, progress, duration, time }) => {
      commit("UPDATE_PROGRESS_DATA_IN_TAREA", { tareaId, progress, duration, time });
    }
  },
  modules: {},
  getters: {}
});
