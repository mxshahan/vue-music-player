<template>
  <v-dialog v-model="dialog" width="400">
    <v-card>
      <v-row class="ma-0">
        <v-col align="center">
          <v-icon color="error" class="mb-7 mt-10" large>mdi-alert-outline</v-icon>
          <p >
            <span class="font-weight-bold">¿Estás seguro de finalizar la jornada? </span><br /><span class="font-weight-normal">Aún le quedan</span>
            <span class="font-weight-bold">1h 30 min</span>
          </p>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col class="pa-0" align="center">
          <v-avatar size="36px">
            <img v-if="image !== ''" alt="Avatar" :src="image" />
            <v-icon v-else>mdi-account-outline</v-icon>
          </v-avatar>
          <v-btn color="dattechs_black_5" elevation="0" class="ml-2 text-capitalize font-weight-normal dattechs_black_2--text">
            Añadir comentario <span class="error--text pl-1">*</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-row class="my-5">
          <v-col align="center">
            <v-btn outlined color="dattechs_black_3" class="text-capitalize font-weight-normal body-2 px-5 mx-2" text @click="dialog = false">
              Cancelar
            </v-btn>
            <v-btn color="primary" class="text-capitalize font-weight-normal body-2 px-5 mx-2" @click="dialog = !dialog">
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

export default {
  name: "DialogFinalizarJordana",
  data() {
    return {
      dialog: false,
      comentario: "",
      image: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
    };
  },
  created() {
    bus.$on("toggleDialogFinalizarJordana", data => {
      console.log("toggleDialogFinalizarJordana--->>", data);
      this.dialog = !this.dialog;
    });
  }
};
</script>
