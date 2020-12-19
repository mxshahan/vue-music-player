<template>
  <v-dialog v-model="dialog" persistent max-width="294">
    <v-card>
      <v-card-title>
        <v-btn icon disabled height="20" width="20" class="btn-style">
          <v-icon>mdi-stop-circle-outline</v-icon>
        </v-btn>
        <span class="ml-2 subtitle-1">Parada</span>
      </v-card-title>
      <v-card-text>
        <v-select v-model="selectedParada" :items="items" label="Motivo" append-icon="mdi-chevron-down" class="body-2" dense outlined>
        </v-select>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { bus } from "@/main";

export default {
  name: "DialogParada",
  data() {
    return {
      dialog: false,
      selectedParada: "",
      items: ["Médico", "Licencia permitida", "Formación", "Hora sindical", "Rehabilitación", "Otros motivos"]
    };
  },
  created() {
    bus.$on("toggleDialogParada", data => {
      console.log("toggleDialogParada--->>", data);
      this.dialog = !this.dialog;
    });
  },
  watch: {
    selectedParada(newValue) {
      bus.$emit("toggleDialogIncidencia", newValue);
      this.dialog = false
    }
  }
};
</script>
