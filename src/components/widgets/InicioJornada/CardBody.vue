<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col class="py-0">
          <v-select :items="cliente" label="Cliente" append-icon="mdi-chevron-down" dense outlined></v-select>
        </v-col>
        <v-col class="py-0">
          <v-select :items="proyecto" label="Proyecto" append-icon="mdi-chevron-down" dense outlined></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <v-select :items="servicio" label="Servicio" append-icon="mdi-chevron-down" dense outlined></v-select>
        </v-col>
        <v-col class="py-0">
          <v-select :items="tarea" label="Tarea" append-icon="mdi-chevron-down" dense outlined></v-select>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="3" align-self="center" class="text-right pr-5">
      <v-btn class="play-btn-style" :color="!play ? '#1058FB' : '#FB4E4E'" icon outlined @click="play = !play">
        <v-icon v-if="!play">mdi-play</v-icon>
        <v-icon v-else>mdi-stop</v-icon>
      </v-btn>
      <br />
      <v-btn icon>
        <v-icon color="#A0A4A8" small>mdi-menu</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
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
      play: false
    };
  }
};
</script>

<style scoped>
.play-btn-style {
  border: 2px solid;
}
</style>
