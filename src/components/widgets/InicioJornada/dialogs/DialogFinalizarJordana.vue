<template>
  <v-dialog v-model="dialog" persistent width="400">
    <v-card>
      <v-row class="ma-0">
        <v-col align="center">
          <v-img width="28" height="28" class="mb-7 mt-10" src="@/assets/icons/ic_warning.svg" />
          <p>
            <span class="font-weight-bold subtitle-1">¿Estás seguro de finalizar la jornada? </span><br /><span class="font-weight-normal"
              >Aún le quedan</span
            >
            <span class="font-weight-bold subtitle-1">1h 30 min</span>
          </p>
          <div>
            <div v-if="!addComentario" class="py-4">
              <v-avatar size="36px" class="mr-3">
                <img v-if="image !== ''" alt="Avatar" :src="image" />
                <v-icon v-else>mdi-account-outline</v-icon>
              </v-avatar>
              <v-btn
                @click="showAddComentario()"
                color="dattechs_black_5"
                elevation="0"
                class="text-capitalize font-weight-normal dattechs_black_2--text"
              >
                Añadir comentario <span class="error--text pl-1">*</span>
              </v-btn>
            </div>
            <v-row v-else class="mx-10">
              <v-col cols="2" class="pa-0" align="right">
                <v-avatar size="36px" class="mr-3">
                  <img v-if="image !== ''" alt="Avatar" :src="image" />
                  <v-icon v-else>mdi-account-outline</v-icon>
                </v-avatar>
              </v-col>
              <v-col class="pa-0 pr-5" align="left">
                <div>
                  <v-textarea outlined hide-details v-model="comentario" />
                  <div class="text-left mt-2 pl-2">
                    <v-btn icon width="12" height="12">
                      <v-img width="12" height="15" src="@/assets/icons/ic_bold.svg" />
                    </v-btn>
                    <v-btn icon width="12" height="12" class="ml-4">
                      <v-img width="12" height="15" src="@/assets/icons/ic_itelic.svg" />
                    </v-btn>
                    <v-btn icon width="15" height="14" class="ml-4">
                      <v-img width="15" height="12" src="@/assets/icons/ic_list.svg" />
                    </v-btn>
                    <v-btn icon width="15" height="15" class="ml-4">
                      <v-img width="15" height="15" src="@/assets/icons/ic_image.svg" />
                    </v-btn>
                    <v-btn icon width="16" height="16" class="ml-4">
                      <v-img width="16" height="16" src="@/assets/icons/ic_link.svg" />
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-row class="mt-2 mb-5">
          <v-col align="center">
            <v-btn outlined color="dattechs_black_3" class="text-capitalize font-weight-normal body-2 px-5 mx-2" text @click="closeDialog()">
              Cancelar
            </v-btn>
            <v-btn color="primary" class="text-capitalize font-weight-normal body-2 px-5 mx-2" @click="stopJordanaTimerAndCloseDialog()">
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
      addComentario: false,
      comentario: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus cursus est interdum sit fusce eu. ",
      image: "/img/user_profile_image.svg"
    };
  },
  created() {
    bus.$on("toggleDialogFinalizarJordana", data => {
      console.log("toggleDialogFinalizarJordana--->>", data);
      this.dialog = !this.dialog;
    });
  },
  methods: {
    showAddComentario() {
      this.addComentario = true;
      this.$store.commit("SHOW_SNACKBAR_MESSAGE", { content: "Mensaje obligatorio con notificación Roja (urgente)", color: "error" });
    },
    closeDialog() {
      this.$store.commit("SHOW_SNACKBAR_MESSAGE", { content: "Si pone mensaje notificación azul (normal)", color: "info" });
      this.dialog = false;
      this.addComentario = false;
    },
    stopJordanaTimerAndCloseDialog() {
      bus.$emit("stopJordanaTimer", true);
      this.dialog = !this.dialog;
      this.addComentario = false;
    }
  }
};
</script>
