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
        <v-select
          v-model="selectedTipoDeIncidencia"
          :items="items"
          label="Tipo de incidencia"
          append-icon="mdi-chevron-down"
          class="body-2"
          dense
          outlined
        >
        </v-select>
        <v-textarea v-model="comentarios" label="Comentarios" outlined class="body-2"></v-textarea>
        <div class="img-input-style py-1 px-2">
          <!--
                    <v-btn class="pt-1" icon style="background-color: #CACCCF;">
                      <v-icon color="white">
                        mdi-camera-outline
                      </v-icon>
                    </v-btn>
          -->
          <v-btn icon style="margin-top: 2px;">
            <v-img width="40" height="40" src="@/assets/icons/ic_camera.svg" />
          </v-btn>
          <span class="caption ml-2">Seleccionar/arrastrar imagen</span>
        </div>
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
import { workStatus } from "@/helper/constants";

export default {
  name: "DialogIncidencia",
  props: {
    tareaId: {
      type: Number,
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
    closeDialog() {
      this.$store.commit("SHOW_SNACKBAR_MESSAGE", { content: "Mensaje obligatorio con notificación Roja (urgente)", color: "error" });
      this.dialog = false;
    },
    stopTareaTimerAndCloseDialog() {
      console.log("stopping tareaId---->", this.tareaId);
      this.$store.commit("STOP_WORK", { tareaId: this.tareaId, workStatus: workStatus.STOPPED });
      bus.$emit("tareaTimerPaused", true);
      this.dialog = !this.dialog;
    }
  }
};
</script>

<style scoped>
.btn-style {
  border: 2px solid;
}

.img-input-style {
  width: 246px;
  height: 48px;
  border: 1px dashed #a0a4a8;
  box-sizing: border-box;
  border-radius: 4px;
}

.v-textarea textarea {
  line-height: 0;
  padding: 10px;
}
</style>
