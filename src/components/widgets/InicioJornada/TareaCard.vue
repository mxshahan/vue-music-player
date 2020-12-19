<template>
  <v-card width="507" class="my-5 px-5 py-4">
    <v-row>
      <v-col align="left">
        <span class="body-2">
          {{ $store.state.selectedCliente }} / {{ $store.state.selectedProyecto }} / {{ $store.state.selectedServicio }} /
          <span class="primary--text font-weight-bold">{{ $store.state.selectedTarea }}</span>
        </span>
      </v-col>
      <v-col cols="2" class="pt-1">
        <v-menu rounded="rounded" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              @click="play = !play"
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
    <TimerProgress />
    <DialogIncidencia />
  </v-card>
</template>

<script>
import TimerProgress from "@/components/widgets/InicioJornada/TimerProgress";
import DialogIncidencia from "@/components/widgets/InicioJornada/dialogs/DialogIncidencia";
import { bus } from "@/main";

export default {
  name: "TareaCard",
  components: { DialogIncidencia, TimerProgress },
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
  methods: {
    showDialogIncidencia() {
      bus.$emit("toggleDialogIncidencia", "someValue");
    }
  }
};
</script>

<style scoped>
.play-btn-style {
  border: 2px solid;
}
</style>
