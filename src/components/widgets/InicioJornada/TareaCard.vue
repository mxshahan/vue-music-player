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
          <v-list>
            <v-list-item link>
              <v-list-item-title>Descanso</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="showDialogIncidencia()">
              <v-list-item-title>Incidencia...</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-title>Otros...</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <MultiTimerProgress :progress-data="progressData" />
    <DialogIncidencia :tarea-id="tareaDetails.id"/>
  </v-card>
</template>

<script>
import { bus } from "@/main";
import DialogIncidencia from "@/components/widgets/InicioJornada/dialogs/DialogIncidencia";
import { mapActions } from 'vuex'
import MultiTimerProgress from "@/components/widgets/InicioJornada/MultiTimerProgress";

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
  components: { MultiTimerProgress, DialogIncidencia },
  data() {
    return {
      play: false,
      progressData: [
        {
          progress: 10,
          duration: "1h 00min",
          time: "9:20-10:30",
          status: "late",
          color: "disabled"
        },
        {
          progress: 20,
          duration: "2h 00min",
          time: "10:30-12:30",
          status: "leave",
          color: "colorLeave"
        },
        {
          progress: 25,
          duration: "2h 30min",
          time: "12:30-3:00",
          status: "working",
          color: "primary"
        }
      ]
    };
  },
  created() {
    bus.$on("tareaTimerPaused", data => {
      console.log("tareaTimerPaused---->>", data);
      this.play = !data;
    });
  },
  methods: {
    ...mapActions(["requestStartWork"]),
    showDialogIncidencia() {
      bus.$emit("toggleDialogIncidencia", "someValue");
    },
    startWork() {
      if (!this.play) {
        //start work
        console.log("start work-->", this.tareaDetails);
        this.play = true;
        this.requestStartWork({ tareaId: this.tareaDetails.id });
        // this.$store.commit("START_WORK", this.tareaDetails.id);
      } else {
        //already working
        console.log("already working: -->", this.tareaDetails);
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
