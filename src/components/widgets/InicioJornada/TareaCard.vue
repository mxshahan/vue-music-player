<template>
  <v-card width="507" class="my-5 px-5 py-4" :color="position === 0 ? 'white' : 'disabledCard'" v-if="position === 0 || $store.state.showHistory">
    <v-row>
      <v-col align="left">
        <span class="body-2">
          {{ tareaDetails.cliente }} / {{ tareaDetails.proyecto }} / {{ tareaDetails.servicio }} /
          <span class="primary--text font-weight-bold">{{ tareaDetails.tarea }}</span>
        </span>
      </v-col>
      <v-col cols="2" class="pt-1">
        <v-menu rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              @click="startWork()"
              class="float-right play-btn-style"
              height="40"
              width="40"
              icon
              :color="!play ? 'primary' : 'warning'"
              outlined
            >
              <v-icon v-if="!play">mdi-play </v-icon>
              <v-icon v-else v-bind="attrs" v-on="on">mdi-pause </v-icon>
            </v-btn>
          </template>
          <v-list class="select-item pa-1">
            <v-list-item class="pa-0 ma-0" dense>
              <v-list-item-content class="select-item pa-0 ma-0">
                <v-list-item-title class="px-4 py-3">
                  Descanso
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="pa-0 ma-0" dense @click="showDialogIncidencia()">
              <v-list-item-content class="select-item pa-0 ma-0">
                <v-list-item-title class="px-4 py-3">
                  Incidencia...
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="pa-0 ma-0" dense>
              <v-list-item-content class="select-item pa-0 ma-0">
                <v-list-item-title class="px-4 py-3">
                  Otros...
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <MultiTimerProgress
      :is-main-progress="false"
      :shifts="$store.state.shifts"
      :tarea-details="tareaDetails"
      :progress-data="tareaDetails.progressData"
    />
    <DialogIncidencia :tarea-details="tareaDetails" />
  </v-card>
</template>

<script>
import { bus } from "@/main";
import DialogIncidencia from "@/components/widgets/InicioJornada/dialogs/DialogIncidencia";
import { mapActions } from "vuex";
import MultiTimerProgress from "@/components/widgets/InicioJornada/MultiTimerProgress";
import TimeTrackerMixins from "@/mixins/TimeTrackerMixins";
import { workStatus } from "@/helper/constants";

export default {
  name: "TareaCard",
  props: {
    tareaDetails: {
      type: Object,
      required: true
    },
    position: {
      type: Number,
      required: true
    }
  },
  mixins: [TimeTrackerMixins],
  components: { MultiTimerProgress, DialogIncidencia },
  data() {
    return {
      play: false
    };
  },
  created() {
    bus.$on("tareaTimerPaused", data => {
      console.log("tareaTimerPaused---->>", data);
      this.play = !data;
    });
  },
  computed: {
    updateProgressData() {
      console.log("tarea updateProgressData-->");
      let progressList = [];
      // : [ { "startTime": "2020-12-23T06:40:02.173Z", "stopTime": 0, "status": "working" } ]
      this.tareaDetails.workingTimes.forEach(session => {
        console.log("session---->>>", session);
        progressList.push({
          progress: 25,
          duration: "2h 30min",
          time: "12:30-3:00",
          status: "working",
          color: "primary"
        });
      });
      return progressList;
    }
  },
  methods: {
    ...mapActions(["requestStartWork"]),
    showDialogIncidencia() {
      bus.$emit("toggleDialogIncidencia", "someValue");
    },
    startWork() {
      if (!this.play) {
        //start work
        this.play = true;
        console.log("start work-->", this.tareaDetails);

        let currentState = this.$store.state.progressData[this.$store.state.progressData.length - 1];
        console.log("currentState---->", currentState);
        let currentProgress = currentState.progress;
        let time = "9:20-10:30";
        let status = workStatus.WORKING;
        let color = this._getColorBasedOnStatus(status);

        this.requestStartWork({
          tareaId: this.tareaDetails.id,
          currentProgress,
          progress: currentProgress + 1,
          duration: currentProgress.duration,
          time,
          status,
          color
        });
        bus.$emit("work_started", this.tareaDetails);
      } else {
        //already working
        console.log("already working: -->", this.tareaDetails);
        bus.$emit("work_stopped", this.tareaDetails);
      }
    }
  }
};
</script>

<style scoped>
.play-btn-style {
  border: 2px solid;
}
</style>
