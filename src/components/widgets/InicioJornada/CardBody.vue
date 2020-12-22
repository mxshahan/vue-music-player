<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col class="py-0">
          <SelectComponent label="Cliente" :items="cliente" v-on:select="onSelectCliente($event)" />
        </v-col>
        <v-col class="py-0">
          <SelectComponent
            label="Proyecto"
            :items="proyecto"
            v-on:select="onSelectProyecto($event)"
            :disabled="$store.state.selectedCliente === ''"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <SelectComponent
            label="Servicio"
            :items="servicio"
            v-on:select="onSelectServicio($event)"
            :disabled="$store.state.selectedProyecto === ''"
          />
        </v-col>
        <v-col class="py-0">
          <SelectComponent label="Tarea" :items="tarea" v-on:select="onSelectTarea($event)" :disabled="$store.state.selectedServicio === ''" />
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
        <v-list class="select-item pa-1">
          <v-list-item class="pa-0 ma-0" dense :disabled="hasMultipleShift">
            <v-list-item-content class="select-item pa-0 ma-0">
              <v-list-item-title class="px-4 py-3">
                Finalizar turno
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="pa-0 ma-0" dense @click="showDialogFinalizarJordana()">
            <v-list-item-content class="select-item pa-0 ma-0">
              <v-list-item-title class="px-4 py-3">
                Finalizar jornada
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="pa-0 ma-0" dense @click="showDialogParada()">
            <v-list-item-content class="select-item pa-0 ma-0">
              <v-list-item-title class="px-4 py-3">
                Parada...
              </v-list-item-title>
            </v-list-item-content>
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
import SelectComponent from "@/components/widgets/InicioJornada/SelectComponent";

export default {
  name: "CardBody",
  components: { SelectComponent },
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
  methods: {
    onSelectCliente(cliente) {
      this.selectedCliente = cliente;
      this.$store.commit("UPDATE_SELECTED_CLIENTE", cliente);
    },
    onSelectProyecto(proyecto) {
      this.selectedProyecto = proyecto;
      this.$store.commit("UPDATE_SELECTED_PROYECTO", proyecto);
    },
    onSelectServicio(servicio) {
      this.selectedServicio = servicio;
      this.$store.commit("UPDATE_SELECTED_SERVICIO", servicio);
    },
    onSelectTarea(tarea) {
      this.selectedTarea = tarea;
      this.$store.commit("UPDATE_SELECTED_TAREA", tarea);
      this.$store.commit("ADD_TAREA_STARTED_TAREA_LIST", {
        cliente: this.selectedCliente,
        proyecto: this.selectedProyecto,
        servicio: this.selectedServicio,
        tarea: this.selectedTarea
      });
    },
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
