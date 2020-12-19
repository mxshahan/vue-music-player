<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col class="py-0">
          <v-select
            v-model="selectedCliente"
            :items="cliente"
            label="Cliente"
            append-icon="mdi-chevron-down"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col class="py-0">
          <v-select
            v-model="selectedProyecto"
            :disabled="$store.state.selectedCliente === ''"
            :items="proyecto"
            label="Proyecto"
            append-icon="mdi-chevron-down"
            dense
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <v-select
            v-model="selectedServicio"
            :disabled="$store.state.selectedProyecto === ''"
            :items="servicio"
            label="Servicio"
            append-icon="mdi-chevron-down"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col class="py-0">
          <v-select
            v-model="selectedTarea"
            :disabled="$store.state.selectedServicio === ''"
            :items="tarea"
            label="Tarea"
            append-icon="mdi-chevron-down"
            dense
            outlined
          ></v-select>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="3" align-self="center" class="text-right pr-5">
      <v-menu rounded="rounded" offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            height="40"
            width="40"
            icon
            class="play-btn-style"
            :color="!play ? 'primary' : '#FB4E4E'"
            outlined
            @click="play = !play">
            <v-icon v-if="!play">mdi-play</v-icon>
            <v-icon v-else v-bind="attrs" v-on="on">mdi-stop</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link>
            <v-list-item-title>Finalizar jornada</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="showDialogParada()">
            <v-list-item-title>Parada...</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <br />
      <v-btn icon class="mt-2">
        <v-icon color="#A0A4A8" small>mdi-menu</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { bus } from "@/main";

export default {
  name: "CardBody",
  props: {
    cliente: {
      type: Array
    },
    proyecto: {
      type: Array
    },
    servicio: {
      type: Array
    },
    tarea: {
      type: Array
    }
  },
  data() {
    return {
      play: false,
      selectedCliente: "",
      selectedProyecto: "",
      selectedServicio: "",
      selectedTarea: ""
    };
  },
  watch: {
    selectedCliente(newValue) {
      this.$store.commit("UPDATE_SELECTED_CLIENTE", newValue);
    },
    selectedProyecto(newValue) {
      this.$store.commit("UPDATE_SELECTED_PROYECTO", newValue);
    },
    selectedServicio(newValue) {
      this.$store.commit("UPDATE_SELECTED_SERVICIO", newValue);
    },
    selectedTarea(newValue) {
      this.$store.commit("UPDATE_SELECTED_TAREA", newValue);
    }
  },
  methods: {
    showDialogParada(){
      bus.$emit("toggleDialogParada", "someValue");
    }
  }
};
</script>

<style scoped>
.play-btn-style {
  border: 2px solid;
}
</style>
