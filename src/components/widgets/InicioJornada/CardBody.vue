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
    <v-col cols="3" align-self="center" class="text-right pr-6">
      <v-menu rounded="rounded" offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            :disabled="$store.state.selectedTarea === null"
            v-if="!play"
            height="42"
            width="42"
            icon
            class="play-btn-style"
            :color="!play ? 'primary' : '#FB4E4E'"
            outlined
            @click="play = !play"
          >
            <v-icon size="28">mdi-play</v-icon>
          </v-btn>
          <v-btn v-else height="42" width="42" icon class="play-btn-style" :color="!play ? 'primary' : '#FB4E4E'" outlined v-bind="attrs" v-on="on">
            <v-icon size="28">mdi-stop</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link :disabled="hasMultipleShift">
            <v-list-item-title>Finalizar turno</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="showDialogFinalizarJordana()">
            <v-list-item-title>Finalizar jornada</v-list-item-title>
          </v-list-item>
          <v-list-item active-class="primary" link @click="showDialogParada()">
            <v-list-item-title>Parada...</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <br />
      <v-tooltip bottom color="dattechs_black_2">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :disabled="$store.state.startedTarea.length < 2"
            width="20"
            height="20"
            icon
            class="mt-2 pa-1"
            style="margin-right: 9px;"
            @click="showHistorial()"
            v-bind="attrs"
            v-on="on"
          >
            <v-img v-if="$store.state.startedTarea.length < 2" src="@/assets/icons/ic_menu.svg" />
            <v-img v-else src="@/assets/icons/ic_menu_active.svg" />
          </v-btn>
        </template>
        <span>Historial</span>
        <v-img style="position: absolute; top: 0;left: 47%;  margin-top: -4px;" width="10" height="4" src="@/assets/icons/bg_tooltip_tail.svg" />
      </v-tooltip>
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
    },
    hasMultipleShift: {
      type: Boolean,
      required: true
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
  created() {
    bus.$on("stopJordanaTimer", data => {
      this.play = !data;
    });
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
      this.$store.commit("ADD_TAREA_STARTED_TAREA_LIST", {
        cliente: this.selectedCliente,
        proyecto: this.selectedProyecto,
        servicio: this.selectedServicio,
        tarea: this.selectedTarea
      });
    }
  },
  methods: {
    showDialogFinalizarJordana() {
      bus.$emit("toggleDialogFinalizarJordana", "someValue");
    },
    showDialogParada() {
      bus.$emit("toggleDialogParada", "someValue");
    },
    showHistorial() {
      this.$store.commit("UPDATE_SHOW_HISTORY", !this.$store.state.showHistory);
    }
  }
};
</script>

<style scoped>
.play-btn-style {
  border: 3px solid;
}
</style>
