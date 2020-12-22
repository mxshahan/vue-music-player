<template>
  <v-dialog v-model="dialog" persistent max-width="294">
    <v-card>
      <v-card-title>
        <v-btn icon disabled height="20" width="20" class="btn-style">
          <v-img width="20" height="20" src="@/assets/icons/ic_parada.svg" />
        </v-btn>
        <span class="ml-2 subtitle-1 font-weight-bold">Parada</span>
      </v-card-title>
      <v-card-text>
        <SelectComponent class="mt-4" customClass="body-2" label="Motivo" :items="items" v-on:select="onSelectParada($event)" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { bus } from "@/main";
import SelectComponent from "@/components/widgets/InicioJornada/SelectComponent";

export default {
  name: "DialogParada",
  components: { SelectComponent },
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
  methods: {
    onSelectParada(parada) {
      this.selectedParada = parada;
      bus.$emit("toggleDialogIncidencia", parada);
      this.dialog = false;
    }
  }
};
</script>
