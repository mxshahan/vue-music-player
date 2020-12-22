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
        <SelectComponent label="Tipo de incidencia" :items="items" class="mt-3" customClass="body-2"
                         v-on:select="onSelectTipoDeIncidencia($event)" />
        <v-textarea v-model="comentarios" outlined class="body-2">
          <template v-slot:label>
            <div class="pa-0">Comentarios <strong class="error--text pr-1"> * </strong></div>
          </template>
        </v-textarea>
        <div v-if="imageData === null" class="img-input-style py-1 pl-2 pr-1" @click="chooseImage">
          <v-btn icon style="margin-top: 2px;">
            <v-img width="40" height="40" src="@/assets/icons/ic_camera.svg" />
          </v-btn>
          <span class="caption ml-2">Seleccionar/arrastrar imagen</span>
        </div>
        <div v-else class="img-input-style py-1 pl-2 pr-1">
          <v-btn icon style="margin-top: 2px;">
            <div class="base-image-input text-center" :style="{ 'background-image': `url(${imageData})` }"></div>
          </v-btn>
          <span class="caption ml-2 black--text">
            {{ fileName }}
            <v-btn small icon class="float-right pa-1" style="margin-top: 5px;" @click="clearFileSelection()"
            ><v-img width="16" height="16" src="@/assets/icons/ic_symbol_x.svg"
            /></v-btn>
          </span>
        </div>
        <input class="d-none" ref="imageFile" type="file" accept="image/*" @input="onSelectFile" />
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col align="center">
            <v-btn outlined color="dattechs_black_3" class="text-capitalize font-weight-normal body-2 px-5 mx-2" text
                   @click="closeDialog()">
              Cancelar
            </v-btn>
            <v-btn color="primary" class="text-capitalize font-weight-normal body-2 px-5 mx-2"
                   @click="stopTareaTimerAndCloseDialog()">
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
import SelectComponent from "@/components/widgets/InicioJornada/SelectComponent";

export default {
  name: "DialogIncidencia",
  components: { SelectComponent },
  props: {
    tareaId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      imageData: null,
      file: null,
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
    chooseImage() {
      this.$refs.imageFile.click();
    },
    onSelectFile() {
      // console.log("onSelectFile called");

      const input = this.$refs.imageFile;
      const files = input.files;

      if (files && files[0]) {
        console.log("image loaded");
        const reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
          this.file = this.$refs.imageFile.files[0];
        };
        reader.readAsDataURL(files[0]);
      } else {
        console.log("image not loaded");
      }
    },
    clearFileSelection() {
      this.imageData = null;
      this.file = null;
    },
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
    stopTareaTimerAndCloseDialog() {
      console.log("stopping tareaId---->", this.tareaId);
      this.$store.commit("STOP_WORK", { tareaId: this.tareaId, workStatus: workStatus.STOPPED });
      bus.$emit("tareaTimerPaused", true);
      this.dialog = !this.dialog;
    }
  },
  computed: {
    fileName() {
      let name = this.file.name;
      return name.length > 25 ? name.substring(0, 24).toString() + "..." : this.file.name;
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
  cursor: pointer;
}

.base-image-input {
  display: block;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}

.v-textarea textarea {
  line-height: 0;
  padding: 10px;
}
</style>
