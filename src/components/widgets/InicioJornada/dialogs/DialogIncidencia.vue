<template>
  <v-dialog v-model="dialog" persistent max-width="294">
    <v-card>
      <v-card-title>
        <v-btn icon disabled height="20" width="20">
          <!-- <v-icon small>mdi-pause</v-icon>-->
          <v-img src="@/assets/icons/ic_pause_small.svg" />
        </v-btn>
        <span class="ml-2 subtitle-1 font-weight-bold">Incidencia</span>
      </v-card-title>
      <v-card-text>
        <SelectComponent label="Tipo de incidencia" :items="items" class="mt-3" customClass="body-2" v-on:select="onSelectTipoDeIncidencia($event)" />
        <v-textarea v-model="comentarios" outlined class="body-2">
          <template v-slot:label>
            <div class="pa-0">Comentarios <strong class="error--text pr-1"> * </strong></div>
          </template>
        </v-textarea>
        <ImageFileInputComponent />
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col align="center">
            <v-btn outlined color="dattechs_black_3" class="text-capitalize font-weight-normal body-2 px-5 mx-2" text @click="closeDialog()">
              Cancelar
            </v-btn>
            <v-btn color="primary" class="text-capitalize font-weight-normal body-2 px-5 mx-2" @click="stopTareaTimerAndCloseDialog()">
              Aceptar
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { bus } from "@/main";
import SelectComponent from "@/components/widgets/InicioJornada/SelectComponent";
import ImageFileInputComponent from "@/components/widgets/InicioJornada/ImageFileInputComponent";
import { mapActions } from "vuex";

export default {
  name: "DialogIncidencia",
  components: { ImageFileInputComponent, SelectComponent },
  props: {
    tareaDetails: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      selectedTipoDeIncidencia: "",
      comentarios:
        "Minim enim excepteur dolore eu incididunt non reprehenderit deserunt nostruddeserunt elit. Labore enim dolore ex reprehenderit aliquip ut excepteur. ",
      items: ["SIES", "Médico", "Licencia permitida", "Formación", "Hora sindical", "Rehabilitación", "Otros motivos"]
    };
  },
  created() {
    bus.$on("toggleDialogIncidencia", data => {
      console.log("toggleDialogIncidencia--->>", data);
      this.selectedTipoDeIncidencia = data;
      this.dialog = !this.dialog;
    });
  },
  methods: {
    ...mapActions(["requestStopWork"]),
    onSelectTipoDeIncidencia(tipoDeIncidencia) {
      this.selectedTipoDeIncidencia = tipoDeIncidencia;
    },
    closeDialog() {
      this.$store.commit("SHOW_SNACKBAR_MESSAGE", {
        content: "Mensaje obligatorio con notificación Roja (urgente)",
        color: "error"
      });
      this.dialog = false;
    },
    async stopTareaTimerAndCloseDialog() {
      console.log("stopping tareaId---->", this.tareaId);
      // this.$store.commit("STOP_WORK", { tareaId: this.tareaId, workStatus: workStatus.STOPPED });
      await this.requestStopWork({ tareaDetails: this.tareaDetails, progress: 20, duration: "1h 20min", time: "time" });
      bus.$emit("work_stopped", this.tareaDetails);
      bus.$emit("tareaTimerPaused", true);
      this.dialog = !this.dialog;
    }
  }
};
</script>

<style scoped>
.v-textarea textarea {
  line-height: 0;
  padding: 10px;
}
</style>
